<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\CashOutProjection;
use App\Models\CashInProjection;
use App\Models\CashIn;
use App\Models\CashInItem;
use App\Models\FpdItem;
use App\Models\Bu;
use App\Models\Dept;
use App\Models\Account;
use App\Models\Dompet;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use DateTime;
use DateInterval;
use DatePeriod;

class DashboardApiController extends Controller
{
    public function index(Request $request)
    {
        $dept = Dept::where('bu_id', $request->bu_id)->get(['id', 'name', 'code']);

        if(empty($request->startDate) || empty($request->endDate)) {
            return response()->json([
                'data' => [],
                'meta' => [
                    'dept' => $dept
                ]
            ]);
        }

        $month_list = $request->startDate && $request->endDate ? $this->createDateRangeArray($request->startDate, $request->endDate) : [];

        $dataCashIn = $this->dataCashIn($request->bu_id, $month_list);
        $dataCashOut = $this->dataCashOut($request->bu_id, $month_list);
        $summary = $this->summary($request->bu_id, $request->startDate, $request->endDate);

        $deptId = json_decode($request->input('dept'), true); // Decoding to an array

        if(empty($deptId['id'])) {
            return response()->json([
                'data' => [
                    'dataCashIn' => $dataCashIn,
                    'dataCashOut' => $dataCashOut,
                    'summary' => $summary,
                ],
                'meta' => [
                    'dept' => $dept
                ]
            ]);
        }

        $dataCoaDept = $this->dataCoaDept($deptId['id'], $request->startDate, $request->endDate);

        return response()->json([
            'data' => [
                'dataCashIn' => $dataCashIn,
                'dataCashOut' => $dataCashOut,
                'summary' => $summary,
                'dataCoaDept' => $dataCoaDept,
            ],
            'meta' => [
                'dept' => $dept
            ]
        ]);

    }

    protected function createDateRangeArray($startDate, $endDate) {
        $start = new DateTime($startDate);
        $end = new DateTime($endDate);    
        $interval = new DateInterval('P1M'); // 1-month interval
        $period = new DatePeriod($start, $interval, $end);
    
        $labels = [];
        $months = [];
        foreach ($period as $date) {
            $labels[] = $date->format('M Y'); // e.g., 'Jan 2023'
            $months[] = $date->format('m-Y'); // e.g., '01-2023'
            $dates[] = $date;
        }
    
        return [
            'labels' => $labels,
            'months' => $months
        ];
    }

    protected function dataCashIn($bu, $months) {
        $arr = [];
        foreach ($months['months'] as $index => $val) {
            $projection = CashInProjection::where('bu_id', $bu)->whereYear('date', substr($val, 3, 4))->whereMonth('date', substr($val, 0, 2))->sum('projection_amount');
            $actual = CashInItem::whereYear('date', substr($val, 3, 4))->whereMonth('date', substr($val, 0, 2))
                        ->whereHas('cashIn', function($q) use($bu) {
                            $q->where('bu_id', $bu);
                        })->sum('real_amount');
            // $actual = CashInItem::whereHas('cash_in', function ($query) use ($val) {
            //             $query->where('status', 9)->whereYear('date', substr($val, 3, 4))->whereMonth('date', substr($val, 0, 2));
            //             })->sum('real_amount');
            $arr['projection']['data'][] = $projection;
            $arr['projection']['percentage'][] = $projection == 0 ? 0 : 1;
            $arr['actual']['data'][] = $actual;
            $arr['actual']['percentage'][] = $projection == 0 ? 0 : ($actual / $projection);
            $arr['labels'][] = $months['labels'][$index];
        }

        return $arr;
    }

    protected function dataCashOut($bu, $months) {
        $arr = [];
        foreach ($months['months'] as $index => $val) {
            $projection = CashOutProjection::where('bu_id', $bu)->whereYear('date', substr($val, 3, 4))->whereMonth('date', substr($val, 0, 2))->sum('projection_amount');
            $actual = FpdItem::whereHas('fpd', function($q) use($bu, $val) {
                    $q->where('bu_id', $bu)->whereYear('processed_date', substr($val, 3, 4))->whereMonth('processed_date', substr($val, 0, 2));
                })->sum('real_amount');
            $mc = $this->materialCost($bu, $val);
            $lc = $this->laborCost($bu, $val);
            $total_projection = $projection + $mc->projection_amount + $lc->projection_amount;
            $total_actual = $actual + $mc->cash_out_actual + $lc->cash_out_actual;
            $arr['projection']['data'][] = $total_projection;
            $arr['projection']['percentage'][] = $total_projection == 0 ? 0 : 1;
            $arr['actual']['data'][] = $total_actual;
            $arr['actual']['percentage'][] = $total_projection == 0 ? 0 : ($total_actual / $total_projection);
            $arr['labels'][] = $months['labels'][$index];
        }

        return $arr;
    }

    protected function dataCoaDept($deptId, $startDate, $endDate) {
        $startDate1 = $startDate ? Carbon::parse(trim($startDate, '"'))->startOfDay() : null;
        $endDate1 = $endDate ? Carbon::parse(trim($endDate, '"'))->endOfDay() : null;
        // dd($startDate, $endDate);
        $arr = [];
        $dept = Dept::with('coa')->where('id', $deptId)->first();

        foreach($dept->coa as $coa) {
            $projection = $coa->cashOutProjections()
                        ->whereBetween('date', [$startDate1, $endDate1])
                        ->sum('projection_amount');
            $actual = $coa->getTotalCashOutActual($startDate1, $endDate1);

            if($projection == 0 && $actual == 0) {
                continue;
            }

            $arr['projection']['data'][] = $projection;
            $arr['projection']['percentage'][] = $projection == 0 ? 0 : 1;
            $arr['actual']['data'][] = $actual;
            $arr['actual']['percentage'][] = $projection == 0 ? 0 : ($actual / $projection);
            $arr['labels'][] = $coa->name;
            
        }

        return $arr;
    }

    protected function summary($bu, $startDate, $endDate) {
        $startDate1 = $startDate ? Carbon::parse(trim($startDate, '"'))->startOfDay() : null;
        $endDate1 = $endDate ? Carbon::parse(trim($endDate, '"'))->endOfDay() : null;
        $arr = [];
        $dompet = Dompet::where('bu_id',$bu)->whereBetween('date',['2000-01-01',$startDate1])->orderBy('date','desc')->first();

        // Saldo Awal
        $saldo_awal = $dompet ? $dompet->amount : 0;
        $total_in = CashInItem::whereHas('cashIn', function($q) use($startDate1) {
            $q->whereBetween('date', ['2000-01-01',$startDate1]);
        })->sum('real_amount');
        $total_out = FpdItem::whereHas('fpd', function($q) use($startDate1) {
            $q->whereBetween('processed_date', ['2000-01-01',$startDate1]);
        })->sum('real_amount');

        $arr['saldo_awal'] = $saldo_awal - $total_in + $total_out;

        // Cash IN
        $arr['rev']['unrealized'] = CashIn::where('bu_id', $bu)->where('cash_in_type', 1)->whereBetween('date', [$startDate1, $endDate1])->sum('amount');
        $arr['rev']['realized'] = CashInItem::whereBetween('date', [$startDate1, $endDate1])->whereHas('cashIn', function($q) use($bu) {
                $q->where('bu_id', $bu)->where('cash_in_type', 1);
            })->sum('real_amount');
        $arr['loan_prisma']['unrealized'] = CashIn::where('bu_id', $bu)->where('cash_in_type', 2)->whereBetween('date', [$startDate1, $endDate1])->sum('amount');
        $arr['loan_prisma']['realized'] = CashInItem::whereBetween('date', [$startDate1, $endDate1])->whereHas('cashIn', function($q) use($bu) {
                $q->where('bu_id', $bu)->where('cash_in_type', 2);
            })->sum('real_amount');
        $arr['loan_bank']['unrealized'] = CashIn::where('bu_id', $bu)->where('cash_in_type', 3)->whereBetween('date', [$startDate1, $endDate1])->sum('amount');
        $arr['loan_bank']['realized'] = CashInItem::whereBetween('date', [$startDate1, $endDate1])->whereHas('cashIn', function($q) use($bu) {
                $q->where('bu_id', $bu)->where('cash_in_type', 2);
            })->sum('real_amount');
        $arr['cash_in']['unrealized'] = $arr['rev']['unrealized'] + $arr['loan_prisma']['unrealized'] + $arr['loan_bank']['unrealized'];
        $arr['cash_in']['realized'] = $arr['rev']['realized'] + $arr['loan_prisma']['realized'] + $arr['loan_bank']['realized'];

        // Cash Out
        /// Unrealized
        $arr['mc']['unrealized'] = FpdItem::whereHas('fpd', function ($q) use($bu, $startDate1, $endDate1) {
                $q->where('bu_id', $bu)->where('klasifikasi', 'COGS-MC')->where('status', '<=', 5)->whereBetween('req_date',[$startDate1, $endDate1]);
            })->sum('amount');
        $arr['lc']['unrealized'] = FpdItem::whereHas('fpd', function ($q) use($bu, $startDate1, $endDate1) {
                $q->where('bu_id', $bu)->where('klasifikasi', 'COGS-LC')->where('status', '<=', 5)->whereBetween('req_date',[$startDate1, $endDate1]);
            })->sum('amount');
        $arr['opex']['unrealized'] = FpdItem::whereHas('fpd', function ($q) use($bu, $startDate1, $endDate1) {
                $q->where('bu_id', $bu)->whereIn('klasifikasi', ['Operasional'])->where('status', '<=', 5)->whereBetween('req_date',[$startDate1, $endDate1]);
            })->sum('amount');
        $arr['cash_out']['unrealized'] = $arr['mc']['unrealized'] + $arr['lc']['unrealized'] + $arr['opex']['unrealized'];
        /// Realized
        $arr['mc']['realized'] = FpdItem::whereHas('fpd', function ($q) use($bu, $startDate1, $endDate1) {
                $q->where('bu_id', $bu)->where('klasifikasi', 'COGS-MC')->where('status', '>', 5)->whereBetween('req_date',[$startDate1, $endDate1]);
            })->sum('real_amount');
        $arr['lc']['realized'] = FpdItem::whereHas('fpd', function ($q) use($bu, $startDate1, $endDate1) {
                $q->where('bu_id', $bu)->where('klasifikasi', 'COGS-MC')->where('status', '>', 5)->whereBetween('req_date',[$startDate1, $endDate1]);
            })->sum('real_amount');
        $arr['opex']['realized'] = FpdItem::whereHas('fpd', function ($q) use($bu, $startDate1, $endDate1) {
                $q->where('bu_id', $bu)->where('klasifikasi', 'COGS-MC')->where('status', '>', 5)->whereBetween('req_date',[$startDate1, $endDate1]);
            })->sum('real_amount');
        $arr['cash_out']['realized'] = $arr['mc']['realized'] + $arr['lc']['realized'] + $arr['opex']['realized'];

        $arr['diff']['unrealized'] = $arr['cash_in']['unrealized'] - $arr['cash_out']['unrealized'];
        $arr['diff']['realized'] = $arr['cash_in']['realized'] - $arr['cash_out']['realized'];

        // Number Format
        $arr['saldo_awal'] = number_format($arr['saldo_awal'], 0, ',', '.');
        $arr['rev']['unrealized'] = number_format($arr['rev']['unrealized'], 0, ',', '.');
        $arr['rev']['realized'] = number_format($arr['rev']['realized'] , 0, ',', '.');
        $arr['loan_prisma']['unrealized'] = number_format($arr['loan_prisma']['unrealized'], 0, ',', '.');
        $arr['loan_prisma']['realized'] = number_format($arr['loan_prisma']['realized'] , 0, ',', '.');
        $arr['loan_bank']['unrealized'] = number_format($arr['loan_bank']['unrealized'], 0, ',', '.');
        $arr['loan_bank']['realized'] = number_format($arr['loan_bank']['realized'] , 0, ',', '.');
        $arr['mc']['unrealized'] = number_format($arr['mc']['unrealized'], 0, ',', '.');
        $arr['mc']['realized'] = number_format($arr['mc']['realized'] , 0, ',', '.');
        $arr['lc']['unrealized'] = number_format($arr['lc']['unrealized'], 0, ',', '.');
        $arr['lc']['realized'] = number_format($arr['lc']['realized'] , 0, ',', '.');
        $arr['opex']['unrealized'] = number_format($arr['opex']['unrealized'], 0, ',', '.');
        $arr['opex']['realized'] = number_format($arr['opex']['realized'] , 0, ',', '.');
        $arr['cash_in']['unrealized'] = number_format($arr['cash_in']['unrealized'], 0, ',', '.');
        $arr['cash_in']['realized'] = number_format($arr['cash_in']['realized'] , 0, ',', '.');
        $arr['cash_out']['unrealized'] = number_format($arr['cash_out']['unrealized'], 0, ',', '.');
        $arr['cash_out']['realized'] = number_format($arr['cash_out']['realized'] , 0, ',', '.');
        $arr['diff']['unrealized'] = number_format($arr['diff']['unrealized'], 0, ',', '.');
        $arr['diff']['realized'] = number_format($arr['diff']['realized'] , 0, ',', '.');

        return $arr;
    }

    protected function materialCost($buId, $date)
    {
        $mc = new CashOutProjection();
        $mc->projection_amount = CashIn::where('bu_id', $buId)->where('transaction_type',1)->whereYear('date', substr($date, 3, 4))->whereMonth('date', substr($date, 0, 2))->get()->sum('mc_amount');
        $mc->cash_out_actual = FpdItem::whereHas('fpd', function($q) use($buId, $date) {
            $q->where('klasifikasi', 'COGS-MC')->where('bu_id', $buId)->whereYear('processed_date', substr($date, 3, 4))->whereMonth('processed_date', substr($date, 0, 2));
        })->sum('real_amount');

        return $mc;
    }

    protected function laborCost($buId, $date)
    {
        $lc = new CashOutProjection();
        $lc->projection_amount = CashIn::where('bu_id', $buId)->where('transaction_type',1)->whereYear('date', substr($date, 3, 4))->whereMonth('date', substr($date, 0, 2))->get()->sum('lc_amount');
        $lc->cash_out_actual = FpdItem::whereHas('fpd', function($q) use($buId, $date) {
            $q->where('klasifikasi', 'COGS-LC')->where('bu_id', $buId)->whereYear('processed_date', substr($date, 3, 4))->whereMonth('processed_date', substr($date, 0, 2));
        })->sum('real_amount');

        return $lc;
    }
}