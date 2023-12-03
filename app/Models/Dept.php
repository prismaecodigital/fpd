<?php

namespace App\Models;

use App\Support\HasAdvancedFilter;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dept extends Model
{
    use HasAdvancedFilter, HasFactory;

    public $table = 'depts';

    protected $orderable = [
        'id',
        'code',
        'name',
        'bu.name'
    ];

    protected $filterable = [
        'id',
        'code',
        'name',
        'bu.name',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $fillable = [
        'code',
        'name',
        'bu_id',
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

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function coa()
    {
        return $this->belongsToMany(Account::class);
    }
}