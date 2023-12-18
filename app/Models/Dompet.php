<?php

namespace App\Models;

use App\Support\HasAdvancedFilter;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Dompet extends Model
{
    use HasAdvancedFilter, HasFactory;

    public $table = 'dompet';

    protected $appends = [
        'amount_label',
        'date_label'
    ];

    protected $orderable = [
        'id',
        'bu_id',
        'amount',
        'date'
    ];

    protected $filterable = [
        'id',
        'bu_id',
        'amount',
        'date'
    ];

    protected $dates = [
        'date',
        'created_at',
        'updated_at',
    ];

    protected $fillable = [
        'bu_id',
        'amount',
        'date',
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

    public function getAmountLabelAttribute()
    {
        return $this->attributes['amount'] ? number_format($this->attributes['amount'], 0, ',','.') : 0;
    }

    public function getDateLabelAttribute()
    {
        return $this->attributes['date'] ? Carbon::createFromFormat('Y-m-d', $this->attributes['date'])->format('F Y') : null;
    }

}