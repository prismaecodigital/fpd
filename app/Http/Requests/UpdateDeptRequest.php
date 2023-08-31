<?php

namespace App\Http\Requests;

use App\Models\Dept;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;

class UpdateDeptRequest extends FormRequest
{
    public function authorize()
    {
        return Gate::allows('bu_dept_site_edit');
    }

    public function rules()
    {
        return [
            'code' => [
                'string',
                'required',
                'unique:depts,code,' . request()->route('dept')->id,
            ],
            'name' => [
                'string',
                'required',
                'unique:depts,name,' . request()->route('dept')->id,
            ],
        ];
    }
}