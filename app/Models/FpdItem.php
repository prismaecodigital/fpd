<?php

namespace App\Models;

use App\Support\HasAdvancedFilter;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FpdItem extends Model
{
    use HasAdvancedFilter, HasFactory;

    public $table = 'fpd_items';

    protected $appends = [
        'amount_label',
        'real_amount_label',
    ];

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

    protected $casts = [
        'fpd_id'     => 'integer',
        'site_id'   => 'integer',
        'account_id'   => 'integer',
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

    public function getAmountLabelAttribute()
    {
        return $this->attributes['amount'] ? number_format($this->attributes['amount'], 0, ',','.') : 0;
    }

    public function getRealAmountLabelAttribute()
    {
        return $this->attributes['real_amount'] ? number_format($this->attributes['real_amount'], 0, ',','.') : 0;
    }

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