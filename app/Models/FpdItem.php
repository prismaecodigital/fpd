<?php

namespace App\Models;

use App\Support\HasAdvancedFilter;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dept extends Model
{
    use HasAdvancedFilter, HasFactory;

    public $table = 'fpd_items';

    protected $orderable = [
        'id',
        'amount',
        'ket',
    ];

    protected $filterable = [
        'id',
        'amount',
        'ket',
        'fpd.code_voucher',
        'user.name'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $fillable = [
        'amount',
        'real_amount',
        'ket',
        'fpd_id',
        'site_id',
        'account_id',
        'created_at',
        'updated_at',
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function fpd()
    {
        return $this->belongsTo(Fpd::class);
    }

    public function site()
    {
        return $this->belongsTo(Site::class);
    }
}