<?php
namespace App\Support;

class CashInType {
    public const CASH_IN_TYPE_SELECT = [
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
}