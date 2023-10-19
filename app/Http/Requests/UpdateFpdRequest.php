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
        return Gate::allows('fpd_edit');
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
            'items' => [
                'required', // Make sure 'items' is present
                'array', // Ensure 'items' is an array
            ],
            'items.*.account_id' => [
                'required',
            ],
            'items.*.amount' => [
                'required',
            ],
            'items.*.real_amount' => [
                'required_if:status,5', // Make 'real_amount' required if 'status' is 4 for each item
            ],
            'processed_date' => [
                'required_if:status,3',
            ],
            'lampiran' => [
                'array',
                'required_if:status,5'
            ],
            'lampiran.*.id' => [
                'integer',
                'exists:media,id',
            ],
            'bukti_transfer' => [
                'array',
                new ValidateBuktiTransfer(),
            ],
            'bukti_transfer.*.id' => [
                'integer',
                'exists:media,id',
            ],
        ];
    }
}