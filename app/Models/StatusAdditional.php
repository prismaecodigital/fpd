<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Support\HasAdvancedFilter;
use DateTimeInterface;
use Carbon\Carbon;

class StatusAdditional extends Model
{
    use HasFactory, HasAdvancedFilter;

    public $table = 'status_additional';

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $fillable = [
        'status',
        'user_id',
        'additional_id',
        'created_at',
        'updated_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function additional()
    {
        return $this->belongsTo(AdditionalLimit::class, 'additional_id');
    }

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
