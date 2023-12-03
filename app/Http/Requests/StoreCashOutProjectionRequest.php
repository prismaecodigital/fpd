<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCashOutProjectionRequest extends FormRequest
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
            'bu_id' => [
                'required',
            ],
            'items' => [
                'required', // Make sure 'items' is present
                'array', // Ensure 'items' is an array
            ],
            'items.*.coa_id' => [
                'required',
            ],
            'items.*.date' => [
                'date_format:' . config('project.date_format'),
                'required',
            ],
            'items.*.projection_amount' => [
                'required',
            ],
            'items.*.dept_id' => [
                'required',
            ],
        ];
    }
}
