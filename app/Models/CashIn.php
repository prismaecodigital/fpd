<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Support\HasAdvancedFilter;
use App\Support\CashInType;
use DateTimeInterface;
use Carbon\Carbon;

class CashIn extends Model
{
    use HasAdvancedFilter, HasFactory;

    public $table = 'cash_ins';

    protected $appends = [
        'date_label',
        'date_raw',
        'mc_amount',
        'lc_amount',
        'transaction_type_label',
        'cash_in_type_label',
        'status_label',
        'amount_label'
    ];

    protected $dates = [
        'date',
        'created_at',
        'updated_at',
    ];

    protected $orderable = [
        'id',
        'date',
        'number',
        'transaction_type',
        'cash_in_type',
        'amount',
        'ket',
        'status',
        'mc_percentage',
        'lc_percentage',
        'bu.name',
        'partner.name'
    ];

    protected $filterable = [
        'id',
        'date',
        'number',
        'transaction_type',
        'cash_in_type',
        'amount',
        'ket',
        'status',
        'mc_percentage',
        'lc_percentage',
        'bu.name',
        'partner.name'
    ];

    protected $casts = [
        'bu_id'         => 'integer',
        'partner_id'    => 'integer',
        'status'        => 'boolean',
    ];

    protected $fillable = [
        'id',
        'date',
        'number',
        'transaction_type',
        'cash_in_type',
        'amount',
        'ket',
        'status',
        'mc_percentage',
        'lc_percentage',
        'bu_id',
        'partner_id',
        'created_at',
        'updated_at',
    ];

    public const TRANSACTION_TYPE_SELECT = [
        [
            'label' => 'Kontrak',
            'value' => '1',
        ],
        [
            'label' => 'Invoice',
            'value' => '2',
        ],
    ];

    public const STATUS_LABEL = [
        [
            'label' => 'Open',
            'value' => false,
        ],
        [
            'label' => 'Closed',
            'value' => true,
        ],
    ];

    public function getStatusLabelAttribute()
    {
        return collect(static::STATUS_LABEL)->firstWhere('value', $this->status)['label'] ?? '';
    }

    public function getTransactionTypeLabelAttribute()
    {
        return collect(static::TRANSACTION_TYPE_SELECT)->firstWhere('value', $this->transaction_type)['label'] ?? '';
    }

    public function getCashInTypeLabelAttribute() {
        return collect(CashInType::CASH_IN_TYPE_SELECT)->firstWhere('value', $this->cash_in_type)['label'] ?? '';
    }

    public function getAmountLabelAttribute() {
        return $this->attributes['amount'] ? number_format((float)$this->attributes['amount'], 0,',','.') : 0;
    }

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d');
    }

    public function getDateLabelAttribute()
    {
        return Carbon::createFromFormat('Y-m-d', $this->attributes['date'])->format(config('project.date_format'));
    }

    public function getDateRawAttribute()
    {
        return $this->attributes['date'];
    }

    public function setDateAttribute($value)
    {
        $this->attributes['date'] = $value ? Carbon::createFromFormat(config('project.date_format'), $value)->format('Y-m-d') : null;
    }

    public function getDateAttribute($value)
    {
        return $value ? Carbon::createFromFormat('Y-m-d', $value)->format(config('project.date_format')) : null;
    }

    public function getMcAmountAttribute()
    {
        return $this->attributes['mc_percentage'] ? (float)$this->attributes['amount']*$this->attributes['mc_percentage']/100 : 0;
    }

    public function getLcAmountAttribute()
    {
        return $this->attributes['lc_percentage'] ? (float)$this->attributes['amount']*$this->attributes['lc_percentage']/100 : 0;
    }

    public function getTotalMcAmountByBuId($startDate, $endDate)
    {
        return $query->when($startDate && $endDate, function ($q) use ($startDate, $endDate) {
            $q->whereBetween('date', [$startDate, $endDate]);
        })->get()->sum(function ($cashIn) {
            return $cashIn->mc_amount;
        });
    }

    public function getTotalLcAmountByBuId($startDate, $endDate)
    {
        return $query->when($startDate && $endDate, function ($q) use ($startDate, $endDate) {
            $q->whereBetween('date', [$startDate, $endDate]);
        })->get()->sum(function ($cashIn) {
            return $cashIn->lc_amount;
        });
    }

    public function bu()
    {
        return $this->belongsTo(Bu::class);
    }

    public function partner()
    {
        return $this->belongsTo(Partner::class);
    }

    public function cash_in_items()
    {
        return $this->hasMany(CashInItem::class, 'cash_in_id');
    }

    public function getTotalCashInActual($type, $startDate, $endDate)
    {
        return $this->where('cash_in_type', $type)->cash_in_items()->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
            $query->whereBetween('source_date', [$startDate, $endDate]);
        })->sum('real_amount');
    }

    public function scopeGetSummedActualAmountByType($query, $startDate, $endDate)
    {
        return $query->with(['cash_in_items' => function ($subQuery) use ($startDate, $endDate) {
            if ($startDate && $endDate) {
                $subQuery->whereBetween('date', [$startDate, $endDate]);
            }
            }])
            ->get()
            ->groupBy('cash_in_type')
            ->map(function ($group) {
                return $group->sum(function ($cashIn) {
                    return $cashIn->cash_in_items->sum('real_amount');
                });
            });
    }

    public static function getSumUnrealized($bu, $type, $startDate1, $endDate1)
    {
        if (self::where('status', 0)->exists()) {
            $cashIns = self::with('cash_in_items')
                        ->where('bu_id', $bu)
                        ->where('status', 0)
                        ->where('cash_in_type', $type)
                        ->whereBetween('date', [$startDate1, $endDate1])
                        ->get();

            $un_cash = $cashIns->sum('amount');
            $real_cash = $cashIns->reduce(function ($carry, $cashIn) {
                return $carry + $cashIn->cash_in_items->sum('real_amount');
            }, 0);

            return $un_cash - $real_cash;
        }

        return 0;
    }

}
