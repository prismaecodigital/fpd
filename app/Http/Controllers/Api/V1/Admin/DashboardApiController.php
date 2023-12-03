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
            $arr['projection']['data'][] = $projection;
            $arr['projection']['percentage'][] = $projection == 0 ? 0 : 1;
            $arr['actual']['data'][] = $actual;
            $arr['actual']['percentage'][] = $projection == 0 ? 0 : ($actual / $projection);
            $arr['labels'][] = $months['labels'][$index];
        }

        return $arr;
    }

    protected function dataCoaDept($deptId, $startDate, $endDate) {
        // $startDate = $startDate ? Carbon::parse(trim($startDate, '"'))->format('Y-m-d') : null;
        // $endDate = $endDate ? Carbon::parse(trim($endDate, '"'))->format('Y-m-d') : null;
        // dd($startDate, $endDate);
        $arr = [];
        $dept = Dept::with('coa')->where('id', $deptId)->first();

        foreach($dept->coa as $coa) {
            $projection = $coa->cashOutProjections()
                        ->whereBetween('date', [$startDate, $endDate])
                        ->sum('projection_amount');
            $actual = $coa->getTotalCashOutActual($startDate, $endDate);

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
        $arr = [];

        return $arr;
    }

    // public function indexOld()
    // {
    //     $line0 = new ChartsService([
    //         'title'              => 'Test',
    //         'chart_type'         => 'line',
    //         'model'              => 'App\Models\Fpd',
    //         'group_by_field'     => 'processed_date_raw',
    //         'group_by_period'    => 'day',
    //         'column_class'       => 'col-md-6',
    //         'aggregate_function' => 'count',
    //         'aggregate_field'    => '',
    //     ]);

    //     return response()->json(compact('line0'));
    // }
}