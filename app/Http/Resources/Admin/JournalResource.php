<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;

class JournalResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'no_journal' => $this->item,
            'trans_date' => $this->trans_date,
            'noDetail' => $this->no_detail,
            'ket' => $this->ket,
            'account_no' => $this->account_no,
            'amount' => $this->amount,
            'account_type' => $this->account_type,
            'memo' => $this->memo,
        ];
    }
}
