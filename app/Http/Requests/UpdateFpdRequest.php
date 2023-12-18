<?php

namespace App\Http\Requests;

use App\Models\Fpd;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
use App\Rules\ValidateBuktiTransfer;

class UpdateFpdRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => [
                'string',
                'nullable',
            ],
            'code_voucher' => [
                'required_if:status,4'
            ],
            'code_voucher_lrd' => [
                'required_if:status,7'
            ],
            'transact_type' => [
                'required',
                'in:' . implode(',', Arr::pluck(Fpd::TRANSACT_TYPE_SELECT, 'value')),
            ],
            'klasifikasi' => [
                'string',
                'nullable',
            ],
            'bu_id' => [
                'integer',
                'exists:bus,id',
                'required',
            ],
            'dept_id' => [
                'integer',
                'exists:depts,id',
                'required',
            ],
            'status' => [
                'nullable',
                'in:' . implode(',', Arr::pluck(Fpd::STATUS_SELECT, 'value')),
            ],
            'req_date' => [
                'date_format:' . config('project.date_format'),
                'required',
            ],
            'ket' => [
                'string',
                'nullable',
            ],
            'total_amount' => [
                function($attribute, $value, $fail) {
                    $amount = $this->total_amount;
                    $sourceAmount = $this->total_source_amount;
                    $status = $this->status;

                    if ($status <= 4 && $amount > $sourceAmount) {
                        $fail('Nominal pengajuan melebihi batas maksimum');
                    }
                }
            ],
            'items' => [
                'required', // Make sure 'items' is present
                'array', // Ensure 'items' is an array
            ],
            'items.*.account' => [
                'required',
            ],
            'items.*.amount' => [
                'nullable',
                // function($attribute, $value, $fail) {
                //     $itemIndex = explode('.', $attribute)[1];
                //     $sourceAmount = $this->items[$itemIndex]['source_amount'];
                //     $projection_lock = $this->items[$itemIndex]['account']['projection_lock'];

                //     if ($this->status <= 4 && $projection_lock == true && $value > $sourceAmount) {
                //         $fail('The amount for each item must be less than or equal to the source amount.');
                //     }
                // }
            ],
            'items.*.real_amount' => [
                'required_if:status,5', // Make 'real_amount' required if 'status' is 4 for each item
            ],
            'processed_date' => [
                'required_if:status,3',
            ],
            'lampiran' => [
                'array',
                'nullable'
            ],
            'lampiran.*.id' => [
                'integer',
                'exists:media,id',
            ],
            'bukti_transfer' => [
                'array',
                'nullable'
            ],
            'bukti_transfer.*.id' => [
                'integer',
                'exists:media,id',
            ],
        ];
    }
}