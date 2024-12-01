<?php

namespace App\Notifications\Historia;

use App\Models\Historia;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class HistoriaCreated extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable, Historia $historia): MailMessage
    {

        $url = route('historias.show', ['historia' => $historia->id]);

        return (new MailMessage)
            ->subject('Historia creada')
            ->greeting('Hola! 🦷')
            ->line('Has creado una nueva historia clínica. Para verla, pulsa el botón de abajo')
            ->action('Ver historia', $url)
            ->salutation("Saludos. " . env('APP_NAME', 'UGMA - Facultad de Odontología'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
