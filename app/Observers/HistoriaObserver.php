<?php

namespace App\Observers;

use App\Models\Historia;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class HistoriaObserver
{
    /**
     * Handle the Historia "created" event.
     */
    public function created(Historia $historia): void
    {
        /** @var User $user */
        $user = request()->user();
        Log::info("[Historia|Creación]: Usuario @{username} [ID:{id}] ha creado la historia [ID:{historiaID}]", [
            'username' => $user->name,
            'id' => $user->id,
            'historiaID' => $historia->id
        ]);
    }

    /**
     * Handle the Historia "updated" event.
     */
    public function updated(Historia $historia): void
    {
        $user = request()->user();
        Log::info("[Historia|Actualización]: Usuario @{username} [ID:{id}] ha actualizado la historia HCN:{hcn} [ID:{historiaID}]", [
            'username' => $user->name,
            'id' => $user->id,
            'hcn' => $historia->numero ?? '(Sin asignar)',
            'historiaID' => $historia->id
        ]);
    }

    /**
     * Handle the Historia "deleted" event.
     */
    public function deleted(Historia $historia): void
    {
        $user = request()->user();
        Log::notice("[Historia|Eliminación]: Usuario @{username} [ID:{id}] ha eliminado la historia HCN:{hcn} [ID:{historiaID}]", [
            'username' => $user->name,
            'id' => $user->id,
            'hcn' => $historia->numero ?? '(Sin asignar)',
            'historiaID' => $historia->id
        ]);
    }

    /**
     * Handle the Historia "restored" event.
     */
    public function restored(Historia $historia): void
    {
        $user = request()->user();
        Log::notice("[Historia|Restauración]: Usuario @{username} [ID:{id}] ha restaurado la historia HCN:{hcn} [ID:{historiaID}]", [
            'username' => $user->name,
            'id' => $user->id,
            'hcn' => $historia->numero ?? '(Sin asignar)',
            'historiaID' => $historia->id
        ]);
    }

    /**
     * Handle the Historia "force deleted" event.
     */
    public function forceDeleted(Historia $historia): void
    {
        $user = request()->user();
        Log::notice("[Historia|Forzar_eliminación]: Usuario @{username} [ID:{id}] ha forzado la eliminación de la historia HCN:{hcn} [ID:{historiaID}]", [
            'username' => $user->name,
            'id' => $user->id,
            'hcn' => $historia->numero ?? '(Sin asignar)',
            'historiaID' => $historia->id
        ]);
    }
}
