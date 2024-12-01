<?php

namespace App\Notifications\Paciente;

use App\Models\Paciente;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PacienteCreated extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(protected Paciente $paciente)
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
        return $notifiable->hasRole(['admin', 'admision']) ? ['database'] : ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $url = route('pacientes.show', ['paciente' => $this->paciente->id]);

        return (new MailMessage)
            ->subject('Paciente registrado')
            ->greeting('Hola! 🦷')
            ->line('Has registrado un nuevo paciente.')
            ->line('Para crear su historia clínica, pulsa la pestaña "Historia Clínica" y crea la historia correspondiente.')
            ->action('Ver paciente', $url)
            ->salutation("Saludos. " . env('APP_NAME', 'UGMA - Facultad de Odontología'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $nombre =$this->paciente->nombre;
        $apellido =$this->paciente->apellido;

        return [
            'url' => route('pacientes.show', [
                'paciente' => $this->paciente->id,
            ]),
            'message' => "Nuevo paciente registrado: $nombre $apellido"
        ];
    }

    public function databaseType(object $notifiable): string
    {
        return 'paciente-created';
    }
}
