<?php

namespace App\Http\Requests;

use App\Models\Account;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;

class UpdateAccountRequest extends FormRequest
{
    public function authorize()
    {
        return Gate::allows('account_edit');
    }

    public function rules()
    {
        return [
            'code' => [
                'string',
                'required',
                'unique:accounts,code,' . request()->route('account')->id,
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