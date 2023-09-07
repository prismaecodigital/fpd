<?php

namespace App\Models;

use App\Support\HasAdvancedFilter;
use Carbon\Carbon;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Fpd extends Model implements HasMedia
{
    use HasAdvancedFilter, InteractsWithMedia, HasFactory;

    public $table = 'fpds';

    protected $appends = [
        'transact_type_label',
        'status_label',
        'klasifikasi_label',
        'lampiran',
        'total_amount'
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
        'code',
        'bu.name',
        'dept.name',
        'user.name',
        'status',
        'req_date',
    ];

    protected $filterable = [
        'id',
        'code_voucher',
        'code',
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
            'label' => 'Menunggu Persetujuan Leader',
            'value' => '0',
        ],
        [
            'label' => 'Menunggu Persetujuan Direktur',
            'value' => '1',
        ],
        [
            'label' => 'Menunggu Penjadwalan Finance',
            'value' => '2',
        ],
        [
            'label' => 'Menunggu Proses Finance',
            'value' => '3',
        ],
        [
            'label' => 'Confirm, Menunggu Realisasi',
            'value' => '4',
        ],
        [
            'label' => 'Realisasi, Menunggu Persetujuan Leader',
            'value' => '5',
        ],
        [
            'label' => 'Realisasi, Menunggu Proses Finance',
            'value' => '6',
        ],
        [
            'label' => 'Konfirmasi Selisih oleh User',
            'value' => '7',
        ],
        [
            'label' => 'Selesai',
            'value' => '8',
        ],
        [
            'label' => 'Tidak Disetujui',
            'value' => '99',
        ],
    ];

    public const KLASIFIKASI_SELECT = [
        [
            'label' => 'Operasional',
            'value' => 'Operasional',
        ],
        [
            'label' => 'Hutang Supplier',
            'value' => 'Hutang_Supplier',
        ],
        [
            'label' => 'Hutang NonSupplier',
            'value' => 'Hutang_NonSupplier',
        ],
    ];

    protected $casts = [
        'bu_id'     => 'integer',
        'dept_id'   => 'integer',
        'user_id'   => 'integer',
    ];

    protected $fillable = [
        'code_voucher',
        'code',
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
        return $this->hasMany(FpdItem::class, 'fpd_id')->with(['account','site']);
    }

    public function getTotalAmountAttribute()
    {
        $totalAmount = $this->items->sum('amount');
        return number_format($totalAmount, 0, ',', '.');
    }

    public function statusHistories()
    {
        return $this->hasMany(StatusHistory::class, 'fpd_id')->with('user');
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

    public function getCreatedAtAttribute($value)
    {
        return $value ? Carbon::createFromFormat('Y-m-d H:i:s', $value)->format('d-m-Y') : null;
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