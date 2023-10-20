<?php

namespace App\Http\Requests;

use App\Models\User;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;

class UpdateUserRequest extends FormRequest
{
    public function authorize()
    {
        return Gate::allows('user_edit');
    }

    public function rules()
    {
        return [
            'name' => [
                'string',
                'required',
            ],
            'username' => [
                'required',
                'unique:users,username,' . request()->route('user')->id,
            ],
            'email' => [
                'required',
                'unique:users,email,' . request()->route('user')->id,
            ],
            'password' => [
                'nullable',
            ],
            'bu_roles' => [
                'required',
                'array',
            ],
            'bu_roles.*.role_id' => [
                'integer',
                'required',
            ],
            'bu_roles.*.bu_id' => [
                'integer',
                'required',
            ],
            'bu_roles.*.depts' => [
                'array',
                'required',
            ],
        ];
    }
}