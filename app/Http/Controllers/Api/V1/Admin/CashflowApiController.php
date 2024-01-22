<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\CashInResource;
use App\Models\CashIn;
use App\Models\CashInItem;
use App\Models\Fpd;
use App\Models\FpdItem;
use App\Support\CashInType;
use App\Models\Bu;
use App\Models\Dept;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Carbon\Carbon;

class CashflowApiController extends Controller
{
    public function index(Request $request)
    {
        $buCode = Bu::where('id', $request->bu_id)->first()->code;
        abort_if(Gate::denies($buCode.'-fpd_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response()->json('success');
    }

    public function weeklyCashflow(Request $request)
    {
        $buCode = Bu::where('id', $request->bu_id)->first()->code;
        abort_if(Gate::denies($buCode.'-fpd_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        if(empty($request->startDate) || empty($request->endDate)) {
            return response()->json('success');
        }

        $startDate = Carbon::createFromFormat('d-m-Y', $request->startDate);
        $endDate = Carbon::createFromFormat('d-m-Y', $request->endDate);

        $cashIn = $this->cashIn($request->bu_id, $startDate, $endDate);
        $cashOut = $this->cashOut($request->bu_id, $startDate, $endDate);

        return response()->json([
            'cash_in'       => $cashIn,
            'cash_out'      => $cashOut
        ]);
    }

    protected function cashIn($bu, $startDate, $endDate)
    {
        $cashIn = CashIn::with(['partner','cash_in_items' => function ($q1) use ($startDate, $endDate) {
                $q1->whereBetween('date', [$startDate, $endDate]);
            }])->where('bu_id', $bu)->whereHas('cash_in_items', function($q) use ($startDate, $endDate) {
                $q->whereBetween('date', [$startDate, $endDate]);
            })->get();
        
        $cashIn = $cashIn->toArray();
        $cashIn = $this->groupByWeekCashIn($cashIn, $startDate, $endDate);

        return $cashIn;
    }

    protected function cashOut($bu, $startDate, $endDate)
    {
        $cashOut = Fpd::with(['items'])->where('bu_id', $bu)->where('status','<',9)->whereBetween('processed_date', [$startDate, $endDate])->get()->toArray();

        $cashOut = $this->groupByWeekCashOut($cashOut, $startDate, $endDate);

        return $cashOut;
    }

    protected function groupByWeekCashIn($data, $startDate, $endDate) {
        $groupedByWeek = [];
        $groupedByWeek['total'] = [];
        $start = $startDate;
        $end = $endDate;
        $total = [];
    
        foreach($data as $key=>$item) {
            // Generate all weeks within the range
            $current = clone $start;
            while ($current <= $end) {
                $weekStart = $current->format('d/M/y');
                $weekEnd = (clone $current)->modify('+6 days');
                if ($weekEnd > $end) {
                    $weekEnd = $end;
                }
                $weekRange = $weekStart . ' - ' . $weekEnd->format('d/M/y');
                $groupedByWeek[$key]['id'] = $item['id'];
                $groupedByWeek[$key]['partner'] = $item['partner']['name'];
                $groupedByWeek[$key]['data'][$weekRange] = [];
                if(!array_key_exists($weekRange, $groupedByWeek['total'])) {
                    $groupedByWeek['total'][$weekRange] = 0;
                }
                $current->modify('+7 days');
            }

            // Iterate object through items
            foreach ($item['cash_in_items'] as $subitem) {
                // Convert the date to a DateTime object
                $date = Carbon::createFromFormat('d-m-Y', $subitem['date']);
            
                // Calculate the start of the week for this date
                $interval = $date->diff($start)->days % 7;
                $weekStart = (clone $date)->modify("-$interval days");
                $weekEnd = (clone $weekStart)->modify('+6 days');
                if ($weekEnd > $end) {
                    $weekEnd = $end;
                }
                $weekRange = $weekStart->format('d/M/y') . ' - ' . $weekEnd->format('d/M/y');
            
                // Add the subitem to the corresponding week
                if (array_key_exists($weekRange, $groupedByWeek[$key]['data'])) {
                    $groupedByWeek[$key]['data'][$weekRange][] = $subitem;
                }
                // Total Amount
                if (array_key_exists($weekRange, $groupedByWeek['total'])) {
                    $groupedByWeek['total'][$weekRange] += $subitem['real_amount'];
                }
            }

        }

        foreach($groupedByWeek['total'] as $key => $total)
        {
            $groupedByWeek['total'][$key] = number_format($groupedByWeek['total'][$key], 0, ',', '.');
        }
    
        return $groupedByWeek;
    }

    protected function groupByWeekCashOut($data, $startDate, $endDate) {
        $groupedByWeek = [];
        $groupedByWeek['total'] = [];
        $start = $startDate;
        $end = $endDate;
        $total = [];
    
        foreach($data as $key=>$item) {
            // Generate all weeks within the range
            $current = clone $start;
            while ($current <= $end) {
                $weekStart = $current->format('d/M/y');
                $weekEnd = (clone $current)->modify('+6 days');
                if ($weekEnd > $end) {
                    $weekEnd = $end;
                }
                $weekRange = $weekStart . ' - ' . $weekEnd->format('d/M/y');
                $groupedByWeek[$key]['id'] = $item['id'];
                $groupedByWeek[$key]['name'] = $item['name'];
                $groupedByWeek[$key]['code'] = $item['code'];
                $groupedByWeek[$key]['status'] = (int)$item['status'];
                $groupedByWeek[$key]['data'][$weekRange] = [];
                if(!array_key_exists($weekRange, $groupedByWeek['total'])) {
                    $groupedByWeek['total'][$weekRange] = 0;
                }
                $current->modify('+7 days');
            }

            // Convert the date to a DateTime object
            $date = Carbon::createFromFormat('d-m-Y', $item['processed_date']);

            // Calculate the start of the week for this date
            $interval = $date->diff($start)->days % 7;
            $weekStart = (clone $date)->modify("-$interval days");
            $weekEnd = (clone $weekStart)->modify('+6 days');
            if ($weekEnd > $end) {
                $weekEnd = $end;
            }
            $weekRange = $weekStart->format('d/M/y') . ' - ' . $weekEnd->format('d/M/y');
        
            // Add the item to the corresponding week
            if (array_key_exists($weekRange, $groupedByWeek[$key]['data'])) {
                $groupedByWeek[$key]['data'][$weekRange][] = number_format($item['total_amount'], 0, ',', '.');
                $groupedByWeek[$key]['data'][$weekRange]['status'] = (int)$item['status'];
            }
            // Total Amount
            if (array_key_exists($weekRange, $groupedByWeek['total'])) {
                $groupedByWeek['total'][$weekRange] += $item['total_amount'];
            }
        }

        foreach($groupedByWeek['total'] as $key => $total)
        {
            $groupedByWeek['total'][$key] = number_format($groupedByWeek['total'][$key], 0, ',', '.');
        }
    
        return $groupedByWeek;
    }


    

    // Unused

    protected function cashInOld($bu, $startDate, $endDate)
    {
        $cashIn = CashInItem::with('cashIn')->whereHas('cashIn', function($q) use($bu) {
            return $q->where('bu_id', $bu);
        })->whereBetween('date', [$startDate, $endDate])->get();

        $cashIn = $cashIn->toArray();
        $cashIn = $this->groupByWeekCashIn($cashIn, $startDate, $endDate);

        return $cashIn;
    }
    
    protected function groupByWeekCashInOld($data, $startDate, $endDate) {
        $groupedByWeek = [];
        $start = $startDate;
        $end = $endDate;
    
        // Generate all weeks within the range
        $current = clone $start;
        while ($current <= $end) {
            $weekStart = $current->format('d/M/y');
            $weekEnd = (clone $current)->modify('+6 days');
            if ($weekEnd > $end) {
                $weekEnd = $end;
            }
            $weekRange = $weekStart . ' - ' . $weekEnd->format('d/M/y');
            $groupedByWeek[$weekRange] = [];
            $current->modify('+7 days');
        }
    
        foreach ($data as $item) {
            // Convert the date to a DateTime object
            $date = Carbon::createFromFormat('d-m-Y', $item['date']);
        
            // Calculate the start of the week for this date
            $interval = $date->diff($start)->days % 7;
            $weekStart = (clone $date)->modify("-$interval days");
            $weekEnd = (clone $weekStart)->modify('+6 days');
            if ($weekEnd > $end) {
                $weekEnd = $end;
            }
            $weekRange = $weekStart->format('d/M/y') . ' - ' . $weekEnd->format('d/M/y');
        
            // Add the item to the corresponding week
            if (array_key_exists($weekRange, $groupedByWeek)) {
                $groupedByWeek[$weekRange][] = $item;
            }
        }
    
        return $groupedByWeek;
    }

    protected function cashOutOld($bu, $startDate, $endDate)
    {
        $cashOut = FpdItem::with('fpd')->whereHas('fpd', function($q) use($bu, $startDate, $endDate) {
            return $q->where('bu_id', $bu)->whereBetween('processed_date', [$startDate, $endDate]);
        })->get();
        $cashOut = $cashOut->map(function ($item) {
            // Copy the item to a new variable to avoid modifying the original item
            $itemWithDate = clone $item;
        
            // Append the date attribute
            $itemWithDate->processed_date = $item->fpd ? Carbon::createFromFormat('Y-m-d', $item->fpd->processed_date_raw)->format('d-m-Y') : null;
        
            return $itemWithDate;
        });

        $cashOut = $cashOut->toArray();
        $cashOut = $this->groupByWeekCashOut($cashOut, $startDate, $endDate);

        return $cashOut;
    }

    protected function groupByWeekCashOutOld($data, $startDate, $endDate) {
        $groupedByWeek = [];
        $start = $startDate;
        $end = $endDate;
    
        // Generate all weeks within the range
        $current = clone $start;
        while ($current <= $end) {
            $weekStart = $current->format('d/M/y');
            $weekEnd = (clone $current)->modify('+6 days');
            if ($weekEnd > $end) {
                $weekEnd = $end;
            }
            $weekRange = $weekStart . '-' . $weekEnd->format('d/M/y');
            $groupedByWeek[$weekRange] = [];
            $current->modify('+7 days');
        }
    
        foreach ($data as $item) {
            // Convert the date to a DateTime object
            $date = Carbon::createFromFormat('d-m-Y', $item['processed_date']);
        
            // Calculate the start of the week for this date
            $interval = $date->diff($start)->days % 7;
            $weekStart = (clone $date)->modify("-$interval days");
            $weekEnd = (clone $weekStart)->modify('+6 days');
            if ($weekEnd > $end) {
                $weekEnd = $end;
            }
            $weekRange = $weekStart->format('d/M/y') . '-' . $weekEnd->format('d/M/y');
        
            // Add the item to the corresponding week
            if (array_key_exists($weekRange, $groupedByWeek)) {
                $groupedByWeek[$weekRange][] = $item;
            }
        }
    
        return $groupedByWeek;
    }
}