<?php

namespace App\Models;

use App\Support\HasAdvancedFilter;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bu extends Model
{
    use HasAdvancedFilter, HasFactory;

    public $table = 'bus';

    protected $orderable = [
        'id',
        'code',
        'name',
    ];

    protected $filterable = [
        'id',
        'code',
        'name',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $fillable = [
        'code',
        'name',
        'created_at',
        'updated_at',
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    public function accounts()
    {
        return $this->hasMany(Account::class, 'bu_id');
    }
}