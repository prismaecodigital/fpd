<?php

namespace App\Models;

use App\Support\HasAdvancedFilter;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasAdvancedFilter, HasFactory;

    public $table = 'accounts';

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
        'parent_id',
        'bu_id'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $fillable = [
        'code',
        'name',
        'parent_id',
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

    public function depts()
    {
        return $this->belongsToMany(Dept::class);
    }

    public function scopeParent($query)
    {
        return $query->where('parent_id', null)->with('childrens');
    }
    
    public function childrens()
    {
        return $this->hasMany(Account::class, 'parent_id')->with('childrens');
    }
}