<?php

namespace App\Http\Requests;

use App\Models\Dept;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;

class StoreDeptRequest extends FormRequest
{
    public function authorize()
    {
        return Gate::allows('bu_dept_site_create');
    }

    public function rules()
    {
        return [
            'code' => [
                'string',
                'required',
                'unique:depts',
            ],
            'bu_id' => [
                'required',
            ],
            'name' => [
                'string',
                'required',
                'unique:depts',
            ],
        ];
    }
}