<?php

namespace App\Models;

use App\Support\HasAdvancedFilter;
use Carbon\Carbon;
use DateTimeInterface;
use Hash;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasAdvancedFilter, Notifiable, HasFactory;

    public $table = 'users';

    protected $hidden = [
        'remember_token',
        'password',
    ];

    protected $orderable = [
        'id',
        'username',
        'name',
        'email',
        'email_verified_at',
    ];

    protected $dates = [
        'email_verified_at',
        'created_at',
        'updated_at',
    ];

    protected $filterable = [
        'id',
        'username',
        'name',
        'email',
        'email_verified_at',
        'roles.title',
    ];

    protected $fillable = [
        'name',
        'username',
        'email',
        'email_verified_at',
        'password',
        'remember_token',
        'notifable',
        'has_completed_survey',
        'created_at',
        'updated_at',
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    public function getIsAdminAttribute()
    {
        return $this->roles()->where('title', 'Admin')->exists();
    }

    public function getEmailVerifiedAtAttribute($value)
    {
        return $value ? Carbon::createFromFormat('Y-m-d H:i:s', $value)->format(config('project.datetime_format')) : null;
    }

    public function setEmailVerifiedAtAttribute($value)
    {
        $this->attributes['email_verified_at'] = $value ? Carbon::createFromFormat(config('project.datetime_format'), $value)->format('Y-m-d H:i:s') : null;
    }

    public function setPasswordAttribute($input)
    {
        if ($input) {
            $this->attributes['password'] = Hash::needsRehash($input) ? Hash::make($input) : $input;
        }
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'bu_role_user', 'user_id', 'role_id')->withPivot('bu_id');
    }

    public function hasRole($roleName)
    {
        return $this->roles()->where('title', $roleName)->exists();
    }

    public function bus()
    {
        return $this->belongsToMany(Bu::class, 'bu_role_user', 'user_id', 'bu_id')->withPivot('role_id');
    }

    public function depts()
    {
        return $this->belongsToMany(Dept::class);
    }

    public function buRoles()
    {
        return $this->hasMany(BuRoleUser::class, 'user_id')
            ->with(['depts' => function ($query) {
                $query->whereHas('users', function ($subQuery) {
                    $subQuery->where('user_id', $this->id);
                });
            }]);
    }
    
}