<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
            return (new MailMessage)
                ->subject('Verificación de correo electrónico')
                ->greeting('Hola! 🦷')
                ->line('Por favor, presiona el botón debajo para verificar tu correo electrónico.')
                ->action('Verificar 👍🏻', $url)
                ->salutation("Nuestros mejores deseos en tus estudios. " . env('APP_NAME', 'UGMA - Facultad de Odontología'));
        });

        ResetPassword::toMailUsing(
            function (object $notifiable, string $token) {
                $url = route('password.reset', ['token' => $token]);

                return (new MailMessage)
                    ->subject('Restablecer contraseña')
                    ->greeting('Hola! 🦷')
                    ->line('Al parecer, has olvidado tu contraseña de acceso al sistema. Por favor, presiona el botón debajo para restablecer tu contraseña.')
                    ->action('Restablecer contraseña', $url)
                    ->salutation("Saludos. " . env('APP_NAME', 'UGMA - Facultad de Odontología'));
            }
        );
    }
}
