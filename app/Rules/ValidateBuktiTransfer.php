<?php
namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ValidateBuktiTransfer implements Rule
{
    public function passes($attribute, $value)
    {
        // Get the request data
        $data = request()->all();

        // Check if the 'bukti_transfer' array is required based on your condition
        if ($data['status'] == 6 && $data['total_real_amount'] > $data['total_amount']) {
            // Validate that 'bukti_transfer' is an array and not empty
            return is_array($value) && count($value) > 0;
        }
        if ($data['status'] == 7 && $data['total_real_amount'] < $data['total_amount']) {
            // Validate that 'bukti_transfer' is an array and not empty
            return is_array($value) && count($value) > 0;
        }

        // If the condition doesn't apply, the validation passes
        return true;
    }

    public function message()
    {
        return 'The :attribute field is required.';
    }
}
