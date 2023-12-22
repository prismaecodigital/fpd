<?php

namespace App\Http\Requests;

use App\Models\Account;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;

class StoreAccountRequest extends FormRequest
{
    public function authorize()
    {
        return Gate::allows('account_create');
    }

    public function rules()
    {
        return [
            'code' => [
                'string',
                'required',
            ],
            'name' => [
                'string',
                'required',
            ],
            'bu_id' => [
                'integer',
                'exists:bus,id',
                'required',
            ],
            'parent_id' => [
                'integer',
                'exists:bus,id',
                'nullable',
            ],
            'dept' => [
                'array',
            ],
            'dept.*.id' => [
                'integer',
                'exists:depts,id',
            ],
        ];
    }
}