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
                'required', 
                'array', 
            ],
            'validation.*.amount' => [
                'required',
                function($attribute, $value, $fail) {
                    $itemIndex = explode('.', $attribute)[1];
                    $sourceAmount = $this->validation[$itemIndex]['source_amount'];
                    $amount = $this->validation[$itemIndex]['amount'];
                    $projection_lock = $this->validation[$itemIndex]['projection_lock'];

                    if ($projection_lock == true && $value > $sourceAmount) {
                        $fail('Nominal pengajuan harus kurang dari maksimum yang dibatasi');
                    }
                }
            ],
            'items.*.account' => [
                'required',
            ],
            'items.*.amount' => [
                'required',
                // function($attribute, $value, $fail) {
                //     $itemIndex = explode('.', $attribute)[1];
                //     $sourceAmount = $this->items[$itemIndex]['source_amount'];
                //     $projection_lock = $this->items[$itemIndex]['account']['projection_lock'];

                //     if ($projection_lock == true && $value > $sourceAmount) {
                //         $fail('Nominal pengajuan harus kurang dari maksimum yang dibatasi');
                //     }
                // }
            ],
        ];
    }
}