<?php

namespace App\Http\Requests;

use App\Models\Site;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;

class StoreSiteRequest extends FormRequest
{
    public function authorize()
    {
        return Gate::allows('bu_dept_site_create');
    }

    public function rules()
    {
        return [
            'name' => [
                'string',
                'required',
                'unique:sites',
            ],
            'bu_id' => [
                'required'
            ]
        ];
    }
}
