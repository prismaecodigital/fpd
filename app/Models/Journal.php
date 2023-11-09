<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Support\HasAdvancedFilter;
use DatTimeInterface;

class Journal extends Model
{
    use HasFactory, HasAdvancedFilter;

    protected $fillable = [
        'no_journal',
        'trans_date',
        'keterangan',
        'no_detail',
        'account_no',
        'ket',
        'account_type',
        'amount',
        'memo'
    ];

    protected $dates = [
        'trans_date'
    ];
}
