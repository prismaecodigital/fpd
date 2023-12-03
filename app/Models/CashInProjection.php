<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Support\HasAdvancedFilter;
use App\Support\CashInType;
use DateTimeInterface;
use Carbon\Carbon;

class CashInProjection extends Model
{
    use HasAdvancedFilter, HasFactory;

    public $table = 'cash_in_projections';

    protected $appends = [
        'cash_in_type_label',
    ];

    protected $dates = [
        'date',
        'created_at',
        'updated_at',
    ];

    protected $orderable = [
        'id',
        'date',
        'cash_in_type',
        'projection_amount',
        'bu.name'
    ];

    protected $filterable = [
        'id',
        'date',
        'cash_in_type',
        'projection_amount',
        'bu.name'
    ];

    protected $casts = [
        'bu_id' => 'integer'
    ];

    protected $fillable = [
        'id',
        'date',
        'cash_in_type',
        'projection_amount',
        'bu_id',
        'created_at',
        'updated_at',
    ];

    // public const CASH_IN_TYPE_SELECT = [
    //     [
    //         'label' => 'Revenue',
    //         'value' => '1',
    //     ],
    //     [
    //         'label' => 'Loan Prisma',
    //         'value' => '2',
    //     ],
    //     [
    //         'label' => 'Loan Bank',
    //         'value' => '3',
    //     ],
    // ];

    public function getCashInTypeLabelAttribute()
    {
        return collect(CashInType::CASH_IN_TYPE_SELECT)->firstWhere('value', $this->cash_in_type)['label'] ?? '';
    }

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

    public function bu()
    {
        return $this->belongsTo(Bu::class);
    }

    public function scopeGetSummedProjectionAmountByType($query, $startDate, $endDate)
    {
        return $query->select('cash_in_type','bu_id')
                     ->selectRaw('SUM(projection_amount) as total_projection_amount')
                     ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                         $query->whereBetween('date', [$startDate, $endDate]);
                     })
                     ->groupBy('cash_in_type','bu_id');
    }
    
}
