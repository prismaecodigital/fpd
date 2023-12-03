<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Support\HasAdvancedFilter;
use DateTimeInterface;
use Carbon\Carbon;

class StatusAdjustment extends Model
{
    use HasFactory, HasAdvancedFilter;

    public $table = 'status_adjustment';

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $fillable = [
        'status',
        'user_id',
        'adjustment_id',
        'created_at',
        'updated_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function adjustment()
    {
        return $this->belongsTo(Adjustment::class);
    }

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
