<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class LampiranRequired implements Rule
{
    protected $status;

    public function __construct($status)
    {
        $this->status = $status;
    }

    public function passes($attribute, $value)
    {
        // Check if $fpd->status is 4 and validate accordingly
        return $this->status == 4 ? !empty($value) : true;
    }

    public function message()
    {
        return 'The lampiran field is required.';
    }
}
