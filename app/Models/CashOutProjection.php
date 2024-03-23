<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Support\HasAdvancedFilter;
use DateTimeInterface;
use Carbon\Carbon;

class CashOutProjection extends Model
{
    use HasAdvancedFilter, HasFactory;

    public $table = 'cash_out_projections';

    protected $appends = [
        'projection',
    ];

    protected $dates = [
        'date',
        'created_at',
        'updated_at',
    ];

    protected $orderable = [
        'id',
        'date',
        'projection_amount',
        'coa.name',
        'bu.name',
        'dept.name'
    ];

    protected $filterable = [
        'id',
        'date',
        'projection_amount',
        'coa_name',
        'bu.name',
        'dept.name',
        'dept.code',
    ];

    protected $casts = [
        'bu_id' => 'integer',
        'coa_id' => 'integer',
        'dept_id' => 'integer',
        'cash_in_id' => 'integer'
    ];

    protected $fillable = [
        'name',
        'date',
        'projection_amount',
        'coa_id',
        'bu_id',
        'cash_in_id',
        'dept_id',
        'created_at',
        'updated_at',
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    public function getDateAttribute($value)
    {
        return $value ? Carbon::createFromFormat('Y-m-d H:i:s', $value)->format(config('project.date_format')) : null;
    }

    public function setDateAttribute($value)
    {
        $this->attributes['date'] = $value ? Carbon::createFromFormat(config('project.date_format'), $value)->format('Y-m-d') : null;
    }

    public function getProjectionAttribute()
    {
        return number_format($this->projection_amount, 2, ',', '.');
    }

    public function getCoaProjection($date, $coaId)
    {
        $month = Carbon::parse($date)->month;
        return $this->where('coa_id', $coaId)
                    ->whereMonth('date', $month)
                    ->sum('projection_amount');
    }

    // public function getTotalCashOutActual($startDate, $endDate)
    // {
    //     return number_format($this->coa->getTotalCashOutActual($startDate, $endDate), 2, ',', '.');
    // }

    // public function getPercentage($startDate, $endDate)
    // {
    //     return  $this->projection_amount && $this->projection_amount != 0 ?
    //             ($this->coa->getTotalCashOutActual($startDate, $endDate) / $this->projection_amount * 100) . '%' 
    //             : '-';
    // }

    public function bu()
    {
        return $this->belongsTo(Bu::class);
    }

    public function dept()
    {
        return $this->belongsTo(Dept::class);
    }

    public function coa()
    {
        return $this->belongsTo(Account::class, 'coa_id');
    }

    public function scopeGetSummedProjectionAmountByCoa($query, $startDate, $endDate)
    {
        return $query->select('coa_id','dept_id')
                     ->selectRaw('SUM(projection_amount) as total_projection_amount')
                     ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                         $query->whereBetween('date', [$startDate, $endDate]);
                     })
                     ->groupBy('coa_id','dept_id');
    }

    public function cashIn()
    {
        return $this->belongsTo(CashIn::class, 'cash_in_id');
    }
}
