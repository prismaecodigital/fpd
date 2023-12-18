<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Support\HasAdvancedFilter;
use DateTimeInterface;
use Carbon\Carbon;

class AdditionalLimit extends Model
{
    use HasFactory, HasAdvancedFilter;

    public $table = 'additional_limits';

    protected $appends = [
        'amount_label',
        'status_label',
        'date_label'
    ];

    protected $fillable = [
        'date',
        'coa_id',
        'amount',
        'ket',
        'created_at',
        'updated_at',
        'status',
        'reject'
    ];

    protected $dates = [
        'date',
        'created_at',
        'updated_at',
    ];

    protected $filterable = [
        'date',
        'coa.name',
        'coa.code',
        'amount',
        'ket',
    ];

    protected $orderable = [
        'date',
        'coa_id',
        'amount',
        'ket',
    ];

    protected $casts = [
        'coa_id'       => 'integer'
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
    
    public function getAmountLabelAttribute()
    {
        return $this->attributes['amount'] ? number_format($this->attributes['amount'], 0, ',', '.') : '-';
    }
    
    public function coa()
    {
        return $this->belongsTo(Account::class, 'coa_id');
    }

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    public function getDateAttribute($value)
    {
        return $value ? Carbon::createFromFormat('Y-m-d H:i:s', $value)->format(config('project.date_format')) : null;
    }

    public function getDateLabelAttribute()
    {
        return $this->attributes['date'] ? Carbon::createFromFormat('Y-m-d', $this->attributes['date'])->format('F Y') : null;
    }

    public function setDateAttribute($value)
    {
        $this->attributes['date'] = $value ? Carbon::createFromFormat(config('project.date_format'), $value)->format('Y-m-d') : null;
    }

}
