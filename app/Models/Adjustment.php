<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Support\HasAdvancedFilter;
use DateTimeInterface;
use Carbon\Carbon;

class Adjustment extends Model
{
    use HasFactory, HasAdvancedFilter;

    public $table = 'adjustments';

    protected $appends = [
        'type_label',
        'status_label',
        'source_date_label',
        'destination_date_label',
        'amount_label',
        'source_amount',
        'destination_amount',
    ];

    protected $dates = [
        'date',
        'created_at',
        'updated_at',
    ];

    protected $orderable = [
        'id',
        'type',
        'processed_date',
        'source_date',
        'destination_date',
        'amount',
        'source_coa.name',
        'destination_coa.name',
        'user.name',
        'status',
        'ket'
    ];

    protected $filterable = [
        'id',
        'type',
        'dept.code',
        'processed_date',
        'source_date',
        'destination_date',
        'amount',
        'source_coa.name',
        'destination_coa.name',
        'user.name',
        'status',
        'ket'
    ];

    protected $casts = [
        'source_coa_id'      => 'integer',
        'destination_coa_id' => 'integer',
    ];

    protected $fillable = [
        'type',
        'processed_date',
        'source_date',
        'destination_date',
        'amount',
        'source_coa_id',
        'destination_coa_id',
        'user_id',
        'created_at',
        'updated_at',
        'status',
        'ket',
        'reject',
        'dept_id'
    ];

    public const TYPE_SELECT = [
        [
            'label' => 'Period',
            'value' => '1',
        ],
        [
            'label' => 'COA',
            'value' => '2',
        ],
    ];

    public const STATUS_SELECT = [
        [
            'label' => 'Menunggu Persetujuan Direktur',
            'value' => '1',
        ],
        [
            'label' => 'Selesai',
            'value' => '9',
        ],
        [
            'label' => 'Tidak Disetujui',
            'value' => '99',
        ],
    ];

    public function getStatusLabelAttribute()
    {
        return collect(static::STATUS_SELECT)->firstWhere('value', $this->status)['label'] ?? '';
    }
    
    public function getTypeLabelAttribute()
    {
        return collect(static::TYPE_SELECT)->firstWhere('value', $this->type)['label'] ?? '';
    }

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    public function getSourceDateAttribute($value)
    {
        return $value ? Carbon::createFromFormat('Y-m-d', $value)->format(config('project.date_format')) : null;
    }

    public function getSourceDateLabelAttribute()
    {
        return $this->attributes['source_date'] ? Carbon::createFromFormat('Y-m-d', $this->attributes['source_date'])->format('F Y') : null;
    }

    public function setSourceDateAttribute($value)
    {
        $this->attributes['source_date'] = $value ? Carbon::createFromFormat(config('project.date_format'), $value)->format('Y-m-d') : null;
    }

    public function getDestinationDateAttribute($value)
    {
        return $value ? Carbon::createFromFormat('Y-m-d', $value)->format(config('project.date_format')) : null;
    }

    public function getDestinationDateLabelAttribute()
    {
        return $this->attributes['destination_date'] ? Carbon::createFromFormat('Y-m-d', $this->attributes['destination_date'])->format('F Y') : null;
    }

    public function setDestinationDateAttribute($value)
    {
        $this->attributes['destination_date'] = $value ? Carbon::createFromFormat(config('project.date_format'), $value)->format('Y-m-d') : null;
    }

    public function getAmountLabelAttribute()
    {
        return number_format($this->attributes['amount'], 0, ',', '.');
    }

    public function getSourceAmountAttribute()
    {
        return $this->sourceCoa->getBalance($this->attributes['source_date'], $this->attributes['type']);
    }

    public function getDestinationAmountAttribute()
    {
        if($this->attributes['type'] == 1) {
            return $this->sourceCoa->getBalance($this->attributes['destination_date'], $this->attributes['type']);
        }
        if($this->attributes['type'] == 1) {
            return $this->destinationCoa->getBalance($this->attributes['source_date'], $this->attributes['type']);
        }
    }

    public function sourceCoa()
    {
        return $this->belongsTo(Account::class, 'source_coa_id')->with('bu');
    }

    public function destinationCoa()
    {
        return $this->belongsTo(Account::class, 'destination_coa_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function status_adjustments()
    {
        return $this->hasMany(StatusAdjustment::class, 'adjustment_id');
    }

    public function dept()
    {
        return $this->belongsTo(Dept::class);
    }
}
