<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Support\HasAdvancedFilter;
use DateTimeInterface;
use Carbon\Carbon;

class CashInItem extends Model
{
    use HasFactory, HasAdvancedFilter;

    public $table = 'cash_in_items';

    protected $appends = [
        'date_label',
        'real_amount_label',
        'status_label'
    ];

    protected $dates = [
        'date',
        'created_at',
        'updated_at',
    ];

    protected $orderable = [
        'id',
        'ket',
        'date',
        'real_amount',
    ];

    protected $filterable = [
        'id',
        'ket',
        'date',
        'real_amount',
    ];

    protected $casts = [
        'cash_in_id' => 'integer',
        'status_paid' => 'boolean'
    ];

    protected $fillable = [
        'id',
        'date',
        'real_amount',
        'ket',
        'status_paid',
        'created_at',
        'updated_at',
    ];

    public function getStatusLabelAttribute()
    {
        if($this->attributes['status_paid']) {
            return 'Sudah dibayar';
        }
        return 'Belum dibayar';
    }

    public function getRealAmountLabelAttribute()
    {
        return $this->attributes['real_amount'] ? number_format((float)$this->attributes['real_amount'], 0, ',', '.') : 0;
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
        return $this->attributes['date'];
    }

    public function setDateAttribute($value)
    {
        $this->attributes['date'] = $value ? Carbon::createFromFormat(config('project.date_format'), $value)->format('Y-m-d') : null;
    }

    public function cashIn()
    {
        return $this->belongsTo(CashIn::class, 'cash_in_id')->with('partner');
    }
}
