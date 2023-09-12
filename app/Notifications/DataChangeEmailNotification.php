<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DataChangeEmailNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return $this->getMessage();
    }

    public function getMessage()
    {
        if ($this->data['ket'] == '') {
            return (new MailMessage)
            ->subject('FPD Notification')
            ->greeting('Hello, ')
            ->line('FPD nomor ' . $this->data['code'] . ' telah ' . $this->data['action'] . ' oleh ' . $this->data['user'] . ' dan saat ini ' . $this->data['status'])
            ->line('Silahkan diproses lebih lanjut.')
            ->action(config('app.name'), (config('app.url').'/admin/fpds/'.$this->data['id']))
            ->line('Thank you')
            ->line(config('app.name') . ' Team')
            ->salutation(' ');
        }
        if ($this->data['ket'] != '') {
            return (new MailMessage)
            ->subject('FPD Notification')
            ->greeting('Hello, ')
            ->line('FPD nomor ' . $this->data['code'] . ' telah ' . $this->data['action'] . ' oleh ' . $this->data['user'] . ' dengan alasan ' . $this->data['ket'])
            ->line('')
            ->action(config('app.name'), (config('app.url').'/admin/fpds/'.$this->data['id']))
            ->line('Thank you')
            ->line(config('app.name') . ' Team')
            ->salutation(' ');
        }
    }
}