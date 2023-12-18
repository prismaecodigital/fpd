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
        'journaled_label',
        'klasifikasi_label',
        'lampiran',
        'total_amount',
        'total_amount_label',
        'total_real_amount',
        'total_real_amount_label',
        'bukti_transfer',
        'req_date_raw',
        'processed_date_raw',
        'accurate_total'
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
        'code_voucher_lrd',
        'code',
        'name',
        'bu.name',
        'dept.name',
        'user.name',
        'status',
        'journaled',
        'req_date',
    ];

    protected $filterable = [
        'id',
        'code_voucher',
        'code_voucher_lrd',
        'code',
        'name',
        'bu.name',
        'dept.name',
        'user.name',
        'status',
        'req_date',
        'processed_date',
        'ket',
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

    public const JOURNALED_SELECT = [

        [
            'label' => 'Belum Dijurnal',
            'value' => null,
        ],
        [
            'label' => 'Belum Dijurnal',
            'value' => 0,
        ],
        [
            'label' => 'Sudah Dijurnal',
            'value' => 1,
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
            'label' => 'Mengetahui Finance Manager',
            'value' => '2',
        ],
        [
            'label' => 'Menunggu Penjadwalan Finance',
            'value' => '3',
        ],
        [
            'label' => 'Menunggu Proses Finance',
            'value' => '4',
        ],
        [
            'label' => 'Confirm, Menunggu Realisasi',
            'value' => '5',
        ],
        [
            'label' => 'Realisasi, Menunggu Persetujuan Leader',
            'value' => '6',
        ],
        [
            'label' => 'Realisasi, Menunggu Proses Finance',
            'value' => '7',
        ],
        [
            'label' => 'Konfirmasi Selisih oleh User',
            'value' => '8',
        ],
        [
            'label' => 'Selesai',
            'value' => '9',
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
        [
            'label' => 'COGS - Material Cost',
            'value' => 'COGS-MC',
        ],
        [
            'label' => 'COGS - Labor Cost',
            'value' => 'COGS-LC',
        ],
    ];

    protected $casts = [
        'bu_id'     => 'integer',
        'dept_id'   => 'integer',
        'user_id'   => 'integer',
        'journaled' => 'integer'
    ];

    protected $fillable = [
        'code_voucher',
        'code_voucher_lrd',
        'code',
        'name',
        'transact_type',
        'klasifikasi',
        'bu_id',
        'dept_id',
        'user_id',
        'status',
        'req_date',
        'processed_date',
        'ket',
        'journaled',
        'created_at',
        'updated_at',
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
    
    public function getReqDateRawAttribute()
    {
        return $this->attributes['req_date'];
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
        return $this->items->sum('amount');
        
    }

    public function getTotalAmountLabelAttribute()
    {
        $totalAmount = $this->items->sum('amount');
        return number_format($totalAmount, 0, ',', '.');
    }

    public function getTotalRealAmountAttribute()
    {
        return $this->items->sum('real_amount');
    }

    public function getTotalRealAmountLabelAttribute()
    {
        $totalRealAmount = $this->items->sum('real_amount');
        return number_format($totalRealAmount, 0, ',', '.');
    }

    public function statusHistories()
    {
        return $this->hasMany(StatusHistory::class, 'fpd_id')->with('user');
    }

    public function getStatusLabelAttribute()
    {
        return collect(static::STATUS_SELECT)->firstWhere('value', $this->status)['label'] ?? '';
    }

    public function getJournaledLabelAttribute()
    {
        return collect(static::JOURNALED_SELECT)->firstWhere('value', $this->journaled)['label'] ?? '';
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

    public function getProcessedDateRawAttribute()
    {
        return $this->attributes['processed_date'];
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
            $url          = $item->getUrl();
            
            $parts = explode('/', $url);

            // Find the index of 'storage' in the parts
            $index = array_search('storage', $parts);
            
            // Extract the desired substring
            $path = implode('/', array_slice($parts, $index + 1));
            
            $media['url'] = 'https://dana.onprisma.com/storage/private/'.$path;

            return $media;
        });
    }
    public function getBuktiTransferAttribute()
    {
        return $this->getMedia('fpd_bukti_transfer')->map(function ($item) {
            $media        = $item->toArray();
            $url          = $item->getUrl();
            
            $parts = explode('/', $url);

            // Find the index of 'storage' in the parts
            $index = array_search('storage', $parts);
            
            // Extract the desired substring
            $path = implode('/', array_slice($parts, $index + 1));
            
            $media['url'] = 'https://dana.onprisma.com/storage/private/'.$path;

            return $media;
        });
    }

    public function getAccurateTotalAttribute()
    {
        $accurateTotal = $this->items->sum('real_amount');
        return $accurateTotal;
    }
}