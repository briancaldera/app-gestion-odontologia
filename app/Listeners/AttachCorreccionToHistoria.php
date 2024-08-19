<?php

namespace App\Listeners;

use App\Events\HistoriaCreated;
use App\Services\CorreccionService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class AttachCorreccionToHistoria
{
    /**
     * Create the event listener.
     */
    public function __construct(protected CorreccionService $correccionService)
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(HistoriaCreated $event): void
    {
        $this->correccionService->attachCorreccion($event->historia);
    }
}
