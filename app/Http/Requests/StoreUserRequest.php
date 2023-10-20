<?php

namespace App\Http\Requests;

use App\Models\User;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;

class StoreUserRequest extends FormRequest
{
    public function authorize()
    {
        return Gate::allows('user_create');
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
                'unique:users',
            ],
            'email' => [
                'required',
                'unique:users',
            ],
            'password' => [
                'required',
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