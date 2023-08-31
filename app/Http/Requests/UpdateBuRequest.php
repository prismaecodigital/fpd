<?php

namespace App\Http\Requests;

use App\Models\Bu;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;

class UpdateBuRequest extends FormRequest
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
                'unique:bus,code,' . request()->route('bu')->id,
            ],
            'name' => [
                'string',
                'required',
                'unique:bus,name,' . request()->route('bu')->id,
            ],
        ];
    }
}