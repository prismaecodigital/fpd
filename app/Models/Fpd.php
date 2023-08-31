<?php

namespace App\Models;

use App\Support\HasAdvancedFilter;
use Carbon\Carbon;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Fpd extends Model implements HasMedia
{
    use HasAdvancedFilter, InteractsWithMedia, HasFactory;

    public $table = 'fpds';

    protected $appends = [
        'transact_type_label',
        'status_label',
        'klasifikasi_label',
        'lampiran',
    ];

    protected $dates = [
        'req_date',
        'processed_date',
        'created_at',
        'updated_at',
    ];

    protected $orderable = [
        'id',
        'code_voucher',
        'bu.name',
        'dept.name',
        'user.name',
        'status',
        'req_date',
    ];

    protected $filterable = [
        'id',
        'code_voucher',
        'bu.name',
        'dept.name',
        'user.name',
        'status',
        'req_date',
    ];

    public const TRANSACT_TYPE_SELECT = [
        [
            'label' => 'CASH',
            'value' => 'CASH',
        ],
        [
            'label' => 'TRANSFER',
            'value' => 'TRANSFER',
        ],
    ];

    public const STATUS_SELECT = [
        [
            'label' => 'a',
            'value' => '0',
        ],
        [
            'label' => 'b',
            'value' => '1',
        ],
        [
            'label' => 'c',
            'value' => '2',
        ],
    ];

    public const KLASIFIKASI_SELECT = [
        [
            'label' => 'a',
            'value' => '0',
        ],
        [
            'label' => 'b',
            'value' => '1',
        ],
        [
            'label' => 'c',
            'value' => '2',
        ],
    ];

    protected $fillable = [
        'code_voucher',
        'transact_type',
        'klasifikasi',
        'bu_id',
        'dept_id',
        'user_id',
        'status',
        'req_date',
        'processed_date',
        'ket',
        'created_at',
        'updated_at',
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    public function getTransactTypeLabelAttribute()
    {
        return collect(static::TRANSACT_TYPE_SELECT)->firstWhere('value', $this->transact_type)['label'] ?? '';
    }

    public function getKlasifikasiLabelAttribute()
    {
        return collect(static::KLASIFIKASI_SELECT)->firstWhere('value', $this->klasifikasi)['label'] ?? '';
    }

    public function bu()
    {
        return $this->belongsTo(Bu::class);
    }

    public function dept()
    {
        return $this->belongsTo(Dept::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(FpdItem::class, 'fpd_items', 'fpd_id');
    }

    public function statusHistory()
    {
        return $this->hasMany(StatusHistory::class, 'status_histories', 'fpd_id');
    }

    public function getStatusLabelAttribute()
    {
        return collect(static::STATUS_SELECT)->firstWhere('value', $this->status)['label'] ?? '';
    }

    public function getReqDateAttribute($value)
    {
        return $value ? Carbon::createFromFormat('Y-m-d H:i:s', $value)->format(config('project.date_format')) : null;
    }

    public function setReqDateAttribute($value)
    {
        $this->attributes['req_date'] = $value ? Carbon::createFromFormat(config('project.date_format'), $value)->format('Y-m-d') : null;
    }

    public function getProcessedDateAttribute($value)
    {
        return $value ? Carbon::createFromFormat('Y-m-d H:i:s', $value)->format(config('project.date_format')) : null;
    }

    public function setProcessedDateAttribute($value)
    {
        $this->attributes['processed_date'] = $value ? Carbon::createFromFormat(config('project.date_format'), $value)->format('Y-m-d') : null;
    }

    public function getLampiranAttribute()
    {
        return $this->getMedia('fpd_lampiran')->map(function ($item) {
            $media        = $item->toArray();
            $media['url'] = $item->getUrl();

            return $media;
        });
    }
}