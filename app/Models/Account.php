<?php

namespace App\Models;

use App\Support\HasAdvancedFilter;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Account extends Model
{
    use HasAdvancedFilter, HasFactory;

    public $table = 'accounts';

    protected $appends = [
    ];

    protected $orderable = [
        'id',
        'code',
        'name',
        'bu.name',
        'parent_id',
        'projection_lock',
    ];

    protected $filterable = [
        'id',
        'code',
        'name',
        'parent_id',
        'bu_id',
        'projection_lock',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $fillable = [
        'code',
        'name',
        'parent_id',
        'bu_id',
        'projection_lock',
        'created_at',
        'updated_at',
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    public function bu()
    {
        return $this->belongsTo(Bu::class);
    }

    public function depts()
    {
        return $this->belongsToMany(Dept::class);
    }

    public function scopeParents($query)
    {
        return $query->where('parent_id', null)->with('childrens');
    }

    public function parent()
    {
        return $this->belongsTo(Account::class, 'parent_id');
    }
    
    public function childrens()
    {
        return $this->hasMany(Account::class, 'parent_id')->with('childrens');
    }

    public function cashOutProjections()
    {
        return $this->hasMany(cashOutProjection::class, 'coa_id');
    }

    public function fpdItems()
    {
        return $this->hasMany(FpdItem::class, 'account_id');
    }

    public function getTotalCashOutActual($startDate, $endDate)
    {
        return $this->fpdItems()
                    ->whereHas('fpd', function ($query) use ($startDate, $endDate) {
                        if ($startDate && $endDate) {
                            $query->whereBetween('processed_date', [$startDate, $endDate]);
                        }
                    })
                    ->sum('real_amount');
    }

    public function getCashOutActual($date)
    {
        $month = Carbon::parse($date)->month;
        $year = Carbon::parse($date)->year;
        return $this->fpdItems()->whereHas('fpd', function($query) use ($month, $year) {
            $query->whereYear('processed_date', $year)->whereMonth('processed_date', $month);
        })->sum('real_amount');
    }

    public function getProjection($date)
    {
        $month = Carbon::parse($date)->month;
        $year = Carbon::parse($date)->year;
        return $this->cashOutProjections()
                    ->whereYear('date', $year)
                    ->whereMonth('date', $month)
                    ->sum('projection_amount');
    }

    public function sourceAdjustments()
    {
        return $this->hasMany(Adjustment::class, 'source_coa_id');
    }

    public function destinationAdjustments()
    {
        return $this->hasMany(Adjustment::class, 'destination_coa_id');
    }

    public function getAmountSourceAdjustment($date)
    {
        $month = Carbon::parse($date)->month;
        $year = Carbon::parse($date)->year;
        return $this->sourceAdjustments()->where('status','9')->whereYear('source_date', $year)->whereMonth('source_date', $month)->sum('amount');
    }

    public function getAmountDestinationAdjustmentPeriod($date)
    {
        $month = Carbon::parse($date)->month;
        $year = Carbon::parse($date)->year;
        return $this->sourceAdjustments()->where('type', '1')->whereYear('destination_date', $year)->where('status','9')->whereMonth('destination_date', $month)->sum('amount');
    }

    public function getAmountDestinationAdjustmentCoa($date)
    {
        $month = Carbon::parse($date)->month;
        $year = Carbon::parse($date)->year;
        return $this->destinationAdjustments()->where('type', '2')->where('status','9')->whereYear('source_date', $year)->whereMonth('source_date', $month)->sum('amount');
    }

    public function getTotalAmountSourceAdjustment($startDate, $endDate)
    {
        return $this->sourceAdjustments()->where('status','9')->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
            $query->whereBetween('source_date', [$startDate, $endDate]);
        })->sum('amount');
    }

    public function getTotalAmountDestinationAdjustmentPeriod($startDate, $endDate)
    {
        return $this->sourceAdjustments()->where('type', '1')->where('status','9')->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
            $query->whereBetween('destination_date', [$startDate, $endDate]);
        })->sum('amount');
    }

    public function getTotalAmountDestinationAdjustmentCoa($startDate, $endDate)
    {
        return $this->destinationAdjustments()->where('type', '2')->where('status','9')->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
            $query->whereBetween('source_date', [$startDate, $endDate]);
        })->sum('amount');
    }

    public function getBalance($date, $type)
    {
        if($type == 1) {
            return $this->calculateBalanceType1($date);
        } elseif ($type == 2) {
            return $this->calculateBalanceType2($date);
        }

        return 0;
    }

    protected function calculateBalanceType1($date)
    {
        if($date == '') {
            return 0;
        }

        return $this->getProjection($date) - $this->getCashOutActual($date) -
               $this->getAmountSourceAdjustment($date) + $this->getAmountDestinationAdjustmentPeriod($date);
    }

    protected function calculateBalanceType2($date)
    {
        if($date == '') {
            return 0;
        }

        return $this->getProjection($date) - $this->getCashOutActual($date);
    }
}