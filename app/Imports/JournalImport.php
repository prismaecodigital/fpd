<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use App\Models\Journal;
use App\Http\Resources\JournalResource;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithCustomValueBinder;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Carbon\Carbon;

class JournalImport extends \PhpOffice\PhpSpreadsheet\Cell\StringValueBinder implements ToCollection, WithHeadingRow, WithCustomValueBinder
{
    /**
    * @param Collection $collection
    */
    public function collection(Collection $collection)
    {
        //
        $resources = $collection->map(function ($item) {
            return new JournalResource(new Journal([
                'no_journal' => $item['no_journal'], // Adjust the field names according to your Excel file
                'trans_date' => $item['trans_date'],
                'no_detail' => $item['no_detail'],
                'ket' => $item['ket'],
                'account_no' => $item['account_no'],
                'amount' => $item['amount'],
                'amount_type' => $item['amount_type'],
                'memo' => $item['memo'],
                'dept_name' => $item['dept_name'],
                // Add more fields as needed
            ]));
        });

        return $resources;
    }
}
