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
        'lock_label'
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


    protected $casts = [
        'projection_lock'   => 'boolean',
        'bu_id'             => 'integer',
        'parent_id'         => 'integer',
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    public function getLockLabelAttribute()
    {
        if(array_key_exists('projection_lock', $this->attributes)) {
            return $this->attributes['projection_lock'] == 1 ? 'Dibatasi' : 'Tidak Dibatasi';
        }

        return 'Tidak Dibatasi';
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
        return $this->hasMany(CashOutProjection::class, 'coa_id');
    }

    public function fpdItems()
    {
        return $this->hasMany(FpdItem::class, 'account_id');
    }

    public function getTotalCashOutActual($startDate, $endDate, $deptId)
    {
        return $this->fpdItems()
                    ->whereHas('fpd', function ($query) use ($startDate, $endDate, $deptId) {
                        $query->whereNotNull('processed_date')->where('dept_id', $deptId);
                        if ($startDate && $endDate) {
                            $query->where('status', '>' , 4 )->whereBetween('processed_date', [$startDate, $endDate]);
                        }
                    })
                    ->sum('real_amount');
    }

    public function getCashOutActual($date, $deptId)
    {
        $month = Carbon::parse($date)->month;
        $year = Carbon::parse($date)->year;
        return $this->fpdItems()->whereHas('fpd', function($query) use ($month, $year, $deptId) {
            $query->where('status', '>' , 4 )->whereYear('processed_date', $year)->whereMonth('processed_date', $month)->where('dept_id', $deptId);
        })->sum('real_amount');
    }

    public function getProjection($date, $deptId)
    {
        $month = Carbon::parse($date)->month;
        $year = Carbon::parse($date)->year;
        return $this->cashOutProjections()
                    ->whereYear('date', $year)
                    ->whereMonth('date', $month)
                    ->where('dept_id', $deptId)
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

    public function getAmountSourceAdjustment($date, $deptId)
    {
        $month = Carbon::parse($date)->month;
        $year = Carbon::parse($date)->year;
        return $this->sourceAdjustments()->where('status','9')->where('dept_id', $deptId)->whereYear('source_date', $year)->whereMonth('source_date', $month)->sum('amount');
    }

    public function getAmountDestinationAdjustmentPeriod($date, $deptId)
    {
        $month = Carbon::parse($date)->month;
        $year = Carbon::parse($date)->year;
        return $this->sourceAdjustments()->where('type', '1')->where('dept_id', $deptId)->where('status','9')->whereYear('destination_date', $year)->whereMonth('destination_date', $month)->sum('amount');
    }

    public function getAmountDestinationAdjustmentCoa($date, $deptId)
    {
        $month = Carbon::parse($date)->month;
        $year = Carbon::parse($date)->year;
        return $this->destinationAdjustments()->where('type', '2')->where('dept_id', $deptId)->where('status','9')->whereYear('source_date', $year)->whereMonth('source_date', $month)->sum('amount');
    }

    public function getTotalAmountSourceAdjustment($startDate, $endDate, $deptId)
    {
        return $this->sourceAdjustments()->where('status','9')->when($startDate && $endDate, function ($query) use ($startDate, $endDate, $deptId) {
            $query->whereBetween('source_date', [$startDate, $endDate])->where('dept_id', $deptId);
        })->sum('amount');
    }

    public function getTotalAmountDestinationAdjustmentPeriod($startDate, $endDate, $deptId)
    {
        return $this->sourceAdjustments()->where('type', '1')->where('status','9')->when($startDate && $endDate, function ($query) use ($startDate, $endDate, $deptId) {
            $query->whereBetween('destination_date', [$startDate, $endDate])->where('dept_id', $deptId);
        })->sum('amount');
    }

    public function getTotalAmountDestinationAdjustmentCoa($startDate, $endDate, $deptId)
    {
        return $this->destinationAdjustments()->where('type', '2')->where('status','9')->when($startDate && $endDate, function ($query) use ($startDate, $endDate, $deptId) {
            $query->whereBetween('source_date', [$startDate, $endDate])->where('dept_id', $deptId);
        })->sum('amount');
    }

    public function getBalance($date, $deptId)
    {
        return $this->getProjection($date, $deptId) - $this->getCashOutActual($date, $deptId) -
               $this->getAmountSourceAdjustment($date, $deptId) + $this->getAmountDestinationAdjustmentPeriod($date, $deptId) + $this->getAmountDestinationAdjustmentCoa($date, $deptId);
    }

    public function additionalLimits()
    {
        return $this->hasMany(AdditionalLimit::class,'coa_id');
    }

    public function getAdditionalLimit($date, $deptId)
    {
        $month = Carbon::parse($date)->month;
        $year = Carbon::parse($date)->year;
        return $this->additionalLimits()->where('status','9')->where('dept_id', $deptId)->whereYear('date', $year)->whereMonth('date', $month)->sum('amount');
    }

    public function getMaxAmount($date, $deptId)
    {
        return $this->getBalance($date, $deptId) + $this->getAdditionalLimit($date, $deptId);
    }
}
