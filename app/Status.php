<?php

namespace App;

enum Status: string
{
    case ABIERTA = 'abierta';
    case ENTREGADA = 'entregada';
    case CORRECCION = 'correccion';
    case CERRADA = 'cerrada';
}
