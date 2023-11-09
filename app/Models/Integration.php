<?php

namespace App\Models;

use App\Support\HasAdvancedFilter;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Integration extends Model
{
    use HasAdvancedFilter, HasFactory;

    public $table = 'integrations';

    protected $orderable = [
        'id',
        'name',
    ];

    protected $filterable = [
        'id',
        'name',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'expire_date',
    ];

    protected $fillable = [
        'name',
        'access_token',
        'client_id',
        'client_secret',
        'oauth_callback',
        'status',
        'scope',
        'created_at',
        'updated_at',
        'expire_date',
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}