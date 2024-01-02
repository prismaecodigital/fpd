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
        if ($this->data['ket'] == '' && $this->data['status_label'] < 5) {
            return (new MailMessage)
            ->subject('Notifikasi Pengajuan Dana')
            ->greeting('Hello, ')
            ->line('Pengajuan Dana dengan nomor ' . $this->data['code'] . ' telah ' . $this->data['action'] . ' oleh ' . $this->data['user'] . ' dan saat ini ' . $this->data['status'])
            ->line('Silahkan diproses lebih lanjut.')
            ->action(config('app.name'), (config('app.url').'admin/fpd-processes/'.$this->data['id']))
            ->line('Thank you')
            ->line('Digitalisasi Team')
            ->salutation(' ');
        }
        if ($this->data['ket'] != '' && $this->data['status_label'] < 5) {
            return (new MailMessage)
            ->subject('Notifikasi Pengajuan Dana')
            ->greeting('Hello, ')
            ->line('Pengajuan Dana nomor ' . $this->data['code'] . ' telah ' . $this->data['action'] . ' oleh ' . $this->data['user'] . ' dengan alasan ' . $this->data['ket'])
            ->line('')
            ->action(config('app.name'), (config('app.url').'admin/fpd-processes/'.$this->data['id']))
            ->line('Thank you')
            ->line('Digitalisasi Team')
            ->salutation(' ');
        }
        if ($this->data['ket'] == '' && $this->data['status_label'] >= 5) {
            return (new MailMessage)
            ->subject('Notifikasi Pengajuan Dana')
            ->greeting('Hello, ')
            ->line('Pengajuan Dana dengan nomor ' . $this->data['code'] . ' telah ' . $this->data['action'] . ' oleh ' . $this->data['user'] . ' dan saat ini ' . $this->data['status'])
            ->line('Silahkan diproses lebih lanjut.')
            ->action(config('app.name'), (config('app.url').'admin/lrds/'.$this->data['id']))
            ->line('Thank you')
            ->line('Digitalisasi Team')
            ->salutation(' ');
        }
    }
}