<?php

namespace App\Models;

use App\Support\HasAdvancedFilter;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Bu extends Model
{
    use HasAdvancedFilter, HasFactory;

    public $table = 'bus';

    protected $appends = [
        'status'
    ];

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
        'accurate_bu_id',
        'accurate_session',
        'accurate_host',
        'accurate_session_expire',
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

    public function fpds()
    {
        return $this->hasMany(Fpd::class, 'bu_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'bu_role_user', 'bu_id', 'user_id')
            ->withPivot('role_id'); // Include the role_id from the pivot table
    }

    public function getStatusAttribute()
    {
        if (!empty($this->attributes['accurate_session_expire'])) {
            $expireDate = Carbon::createFromFormat('Y-m-d', $this->attributes['accurate_session_expire']);
            if (Carbon::now() < $expireDate) {
                return 'Connected';
            }
        }
        return 'Not Connected';
    }

    public function depts()
    {
        return $this->hasMany(Dept::class);
    }

}