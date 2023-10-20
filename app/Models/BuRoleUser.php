<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BuRoleUser extends Model
{
    use HasFactory;

    public $table = 'bu_role_user';

    protected $fillable = [
        'bu_id',
        'role_id',
        'user_id',
    ];

    protected $casts = [
        'bu_id'     => 'integer',
        'user_id'   => 'integer',
        'role_id'   => 'integer'
    ];

    public function bu() {
        return $this->belongsTo(Bu::class, 'bu_id');
    }

    public function role() {
        return $this->belongsTo(Role::class, 'role_id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function depts()
    {
        return $this->hasMany(Dept::class, 'bu_id', 'bu_id');
    }

    public function listDepts()
    {
        return $this->hasMany(Dept::class, 'bu_id', 'bu_id');
    }
}
