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

    public function getTotalCashOutActual($startDate, $endDate)
    {
        return $this->fpdItems()
                    ->whereHas('fpd', function ($query) use ($startDate, $endDate) {
                        $query->whereNotNull('processed_date');
                        if ($startDate && $endDate) {
                            $query->where('status', '>' , 4 )->whereBetween('processed_date', [$startDate, $endDate]);
                        }
                    })
                    ->sum('real_amount');
    }

    public function getCashOutActual($date)
    {
        $month = Carbon::parse($date)->month;
        $year = Carbon::parse($date)->year;
        return $this->fpdItems()->whereHas('fpd', function($query) use ($month, $year) {
            $query->where('status', '>' , 4 )->whereYear('processed_date', $year)->whereMonth('processed_date', $month);
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
        return $this->sourceAdjustments()->where('type', '1')->where('status','9')->whereYear('destination_date', $year)->whereMonth('destination_date', $month)->sum('amount');
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

    public function getBalance($date)
    {
        return $this->getProjection($date) - $this->getCashOutActual($date) -
               $this->getAmountSourceAdjustment($date) + $this->getAmountDestinationAdjustmentPeriod($date) + $this->getAmountDestinationAdjustmentCoa($date);
    }

    public function additionalLimits()
    {
        return $this->hasMany(AdditionalLimit::class,'coa_id');
    }

    public function getAdditionalLimit($date)
    {
        $month = Carbon::parse($date)->month;
        $year = Carbon::parse($date)->year;
        return $this->additionalLimits()->where('status','9')->whereYear('date', $year)->whereMonth('date', $month)->sum('amount');
    }

    public function getMaxAmount($date)
    {
        return $this->getBalance($date) + $this->getAdditionalLimit($date);
    }
}