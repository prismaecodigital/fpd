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

    ];

    protected $fillable = [
        'date',
        'coa_id',
        'amount',
        'ket',
        'created_at',
        'updated_at'
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
        return $value ? Carbon::createFromFormat('Y-m-d H:i:s', $value)->format('F Y') : null;
    }

    public function setDateAttribute($value)
    {
        $this->attributes['date'] = $value ? Carbon::createFromFormat(config('project.date_format'), $value)->format('Y-m-d') : null;
    }

}
