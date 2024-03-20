<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;

class StoreAdjustmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            //
            'type' => [
                'required',
            ],
            'source_date' => [
                'required',
            ],
            'destination_date' => [
                'nullable',
            ],
            'amount' => [
                'required',
                function ($attribute, $value, $fail) {
                    if ($value > (float)str_replace('.', '', $this->source_amount)) {
                        $fail('The '.$attribute.' must be less than the source amount.');
                    }
                },
            ],
            'source_amount' => [
                'required',
            ],
            'source_coa_id' => [
                'required',
            ],
            'destination_coa_id' => [
                'nullable',
            ],
            'status' => [
                'nullable',
            ],
            'ket' => [
                'nullable',
            ],
            'user_id' => [
                'nullable',
            ],
            'dept_id' => [
                'nullable',
            ],
        ];
    }
}
