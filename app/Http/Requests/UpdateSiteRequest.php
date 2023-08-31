<?php

namespace App\Http\Requests;

use App\Models\Site;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;

class UpdateSiteRequest extends FormRequest
{
    public function authorize()
    {
        return Gate::allows('bu_dept_site_edit');
    }

    public function rules()
    {
        return [
            'name' => [
                'string',
                'required',
                'unique:sites,name,' . request()->route('site')->id,
            ],
            'bu_id' => [
                'required',
            ],
        ];
    }
}