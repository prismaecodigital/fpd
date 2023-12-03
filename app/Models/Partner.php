<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Support\HasAdvancedFilter;
use DateTimeInterface;
use Carbon\Carbon;

class Partner extends Model
{
    use HasAdvancedFilter, HasFactory;

    public $table = 'partners';

    protected $appends = [
        'type_label'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $orderable = [
        'id',
        'name',
        'type',
        'bu.name'
    ];

    protected $filterable = [
        'id',
        'name',
        'type',
        'bu.name'
    ];

    protected $casts = [
        'bu_id' => 'integer'
    ];

    protected $fillable = [
        'name',
        'type',
        'bu_id',
        'created_at',
        'updated_at',
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    public const TYPE_SELECT = [
        [
            'label' => 'Revenue',
            'value' => '1',
        ],
        [
            'label' => 'Loan Prisma',
            'value' => '2',
        ],
        [
            'label' => 'Loan Bank',
            'value' => '3',
        ],
    ];

    public function getTypeLabelAttribute()
    {
        return collect(static::TYPE_SELECT)->firstWhere('value', $this->type)['label'] ?? '';
    }

    public function bu()
    {
        return $this->belongsTo(Bu::class);
    }
}
