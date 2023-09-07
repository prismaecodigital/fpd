<?php

namespace App\Http\Requests;

use App\Models\Fpd;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;

class StoreFpdRequest extends FormRequest
{
    public function authorize()
    {
        return Gate::allows('fpd_create');
    }

    public function rules()
    {
        return [
            'code_voucher' => [
                'string',
                'nullable',
            ],
            'transact_type' => [
                'required',
                'in:' . implode(',', Arr::pluck(Fpd::TRANSACT_TYPE_SELECT, 'value')),
            ],
            'klasifikasi' => [
                'required',
                'in:' . implode(',', Arr::pluck(Fpd::KLASIFIKASI_SELECT, 'value')),
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
        ];
    }
}