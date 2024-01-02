<?php

namespace App\Observers;

use App\Models\Fpd;
use App\Models\StatusHistory;
use App\Models\User;
use App\Notifications\DataChangeEmailNotification;
use Illuminate\Support\Facades\Notification;

class StatusHistoryActionObserver
{
    public function created(StatusHistory $statusHistory)
    {
        $fpd = $statusHistory->fpd;
        $statusVal = array_search($fpd->status, array_column(Fpd::STATUS_SELECT, 'value'));
        $status = Fpd::STATUS_SELECT[$statusVal]['label'];

        if($status !== 'Tidak Disetujui') {
            $users = User::where('notifable', true)->whereNot('id',$statusHistory->user_id)->whereHas('roles', function ($q) use($statusHistory) {
                return $q->whereHas('permissions', function ($q) use($statusHistory) {
                    return $q->where('title', $statusHistory->status);
                });
            })->whereHas('depts', function ($q) use($fpd) {
                return $q->where('id', $fpd->dept_id);
            })->get();
            $ket = '';
            $action = 'diproses';
        }
        if($status === 'Tidak Disetujui') {
            $users = User::where('id', $fpd->user_id)->get();
            $ket = $fpd->ket;
            $action = 'Tidak disetujui';
        }
        $data  = ['action' => $action, 'id' => $fpd->id, 'code' => $fpd->code, 'status' => $status, 'status_label' => $fpd->status ,'user' => $statusHistory->user->name, 'users' => $users, 'ket' => $ket];
        Notification::send($users, new DataChangeEmailNotification($data));
    }
}