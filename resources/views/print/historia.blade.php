@php use Illuminate\Support\Carbon; @endphp
@php
    if(!function_exists('insert_ws')){
        function insert_ws(int $count = 1): string {
            return html_entity_decode(str_repeat('&nbsp;', $count));
        }
    }

    if(!function_exists('insert_field')){
        function insert_field($field, int $expectedSpaces = 1): string {

            if (!isset($field)) {
                return insert_ws($expectedSpaces);
            }

            return $field;
        }
    }

@endphp
    <!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{$historia->numero ?? 'Historia sin número'}}</title>

    <style>
        @page {
            margin: 50px;
        }

        body {
            margin: 0px;
        }

        .page-break {
            page-break-after: always;
        }

        .page-break-before {
            page-break-before: always;
        }

        .fillable {
            word-break: break-word;
            text-decoration: underline;
            text-decoration-color: #000;
            text-underline-offset: 4px;
        }

        *, ::before, ::after {
            --tw-border-spacing-x: 0;
            --tw-border-spacing-y: 0;
            --tw-translate-x: 0;
            --tw-translate-y: 0;
            --tw-rotate: 0;
            --tw-skew-x: 0;
            --tw-skew-y: 0;
            --tw-scale-x: 1;
            --tw-scale-y: 1;
            --tw-pan-x: ;
            --tw-pan-y: ;
            --tw-pinch-zoom: ;
            --tw-scroll-snap-strictness: proximity;
            --tw-gradient-from-position: ;
            --tw-gradient-via-position: ;
            --tw-gradient-to-position: ;
            --tw-ordinal: ;
            --tw-slashed-zero: ;
            --tw-numeric-figure: ;
            --tw-numeric-spacing: ;
            --tw-numeric-fraction: ;
            --tw-ring-inset: ;
            --tw-ring-offset-width: 0px;
            --tw-ring-offset-color: #fff;
            --tw-ring-color: rgb(59 130 246 / 0.5);
            --tw-ring-offset-shadow: 0 0 #0000;
            --tw-ring-shadow: 0 0 #0000;
            --tw-shadow: 0 0 #0000;
            --tw-shadow-colored: 0 0 #0000;
            --tw-blur: ;
            --tw-brightness: ;
            --tw-contrast: ;
            --tw-grayscale: ;
            --tw-hue-rotate: ;
            --tw-invert: ;
            --tw-saturate: ;
            --tw-sepia: ;
            --tw-drop-shadow: ;
            --tw-backdrop-blur: ;
            --tw-backdrop-brightness: ;
            --tw-backdrop-contrast: ;
            --tw-backdrop-grayscale: ;
            --tw-backdrop-hue-rotate: ;
            --tw-backdrop-invert: ;
            --tw-backdrop-opacity: ;
            --tw-backdrop-saturate: ;
            --tw-backdrop-sepia: ;
            --tw-contain-size: ;
            --tw-contain-layout: ;
            --tw-contain-paint: ;
            --tw-contain-style: ;
        }
        ::backdrop {
            --tw-border-spacing-x: 0;
            --tw-border-spacing-y: 0;
            --tw-translate-x: 0;
            --tw-translate-y: 0;
            --tw-rotate: 0;
            --tw-skew-x: 0;
            --tw-skew-y: 0;
            --tw-scale-x: 1;
            --tw-scale-y: 1;
            --tw-pan-x: ;
            --tw-pan-y: ;
            --tw-pinch-zoom: ;
            --tw-scroll-snap-strictness: proximity;
            --tw-gradient-from-position: ;
            --tw-gradient-via-position: ;
            --tw-gradient-to-position: ;
            --tw-ordinal: ;
            --tw-slashed-zero: ;
            --tw-numeric-figure: ;
            --tw-numeric-spacing: ;
            --tw-numeric-fraction: ;
            --tw-ring-inset: ;
            --tw-ring-offset-width: 0px;
            --tw-ring-offset-color: #fff;
            --tw-ring-color: rgb(59 130 246 / 0.5);
            --tw-ring-offset-shadow: 0 0 #0000;
            --tw-ring-shadow: 0 0 #0000;
            --tw-shadow: 0 0 #0000;
            --tw-shadow-colored: 0 0 #0000;
            --tw-blur: ;
            --tw-brightness: ;
            --tw-contrast: ;
            --tw-grayscale: ;
            --tw-hue-rotate: ;
            --tw-invert: ;
            --tw-saturate: ;
            --tw-sepia: ;
            --tw-drop-shadow: ;
            --tw-backdrop-blur: ;
            --tw-backdrop-brightness: ;
            --tw-backdrop-contrast: ;
            --tw-backdrop-grayscale: ;
            --tw-backdrop-hue-rotate: ;
            --tw-backdrop-invert: ;
            --tw-backdrop-opacity: ;
            --tw-backdrop-saturate: ;
            --tw-backdrop-sepia: ;
            --tw-contain-size: ;
            --tw-contain-layout: ;
            --tw-contain-paint: ;
            --tw-contain-style: ;
        }
        /*
        ! tailwindcss v3.4.15 | MIT License | https://tailwindcss.com
        */
        /*
        1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
        2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
        */
        *,
        ::before,
        ::after {
            box-sizing: border-box;
            /* 1 */
            border-width: 0;
            /* 2 */
            border-style: solid;
            /* 2 */
            border-color: #e5e7eb;
            /* 2 */
        }
        ::before,
        ::after {
            --tw-content: '';
        }
        /*
        1. Use a consistent sensible line-height in all browsers.
        2. Prevent adjustments of font size after orientation changes in iOS.
        3. Use a more readable tab size.
        4. Use the user's configured `sans` font-family by default.
        5. Use the user's configured `sans` font-feature-settings by default.
        6. Use the user's configured `sans` font-variation-settings by default.
        7. Disable tap highlights on iOS
        */
        html,
        :host {
            line-height: 1.5;
            /* 1 */
            -webkit-text-size-adjust: 100%;
            /* 2 */
            -moz-tab-size: 4;
            /* 3 */
            tab-size: 4;
            /* 3 */
            font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            /* 4 */
            font-feature-settings: normal;
            /* 5 */
            font-variation-settings: normal;
            /* 6 */
            -webkit-tap-highlight-color: transparent;
            /* 7 */
        }
        /*
        1. Remove the margin in all browsers.
        2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.
        */
        body {
            margin: 0;
            /* 1 */
            line-height: inherit;
            /* 2 */
        }
        /*
        1. Add the correct height in Firefox.
        2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
        3. Ensure horizontal rules are visible by default.
        */
        hr {
            height: 0;
            /* 1 */
            color: inherit;
            /* 2 */
            border-top-width: 1px;
            /* 3 */
        }
        /*
        Add the correct text decoration in Chrome, Edge, and Safari.
        */
        abbr:where([title]) {
            text-decoration: underline dotted;
        }
        /*
        Remove the default font size and weight for headings.
        */
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            font-size: inherit;
            font-weight: inherit;
        }
        /*
        Reset links to optimize for opt-in styling instead of opt-out.
        */
        a {
            color: inherit;
            text-decoration: inherit;
        }
        /*
        Add the correct font weight in Edge and Safari.
        */
        b,
        strong {
            font-weight: bolder;
        }
        /*
        1. Use the user's configured `mono` font-family by default.
        2. Use the user's configured `mono` font-feature-settings by default.
        3. Use the user's configured `mono` font-variation-settings by default.
        4. Correct the odd `em` font sizing in all browsers.
        */
        code,
        kbd,
        samp,
        pre {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            /* 1 */
            font-feature-settings: normal;
            /* 2 */
            font-variation-settings: normal;
            /* 3 */
            font-size: 1em;
            /* 4 */
        }
        /*
        Add the correct font size in all browsers.
        */
        small {
            font-size: 80%;
        }
        /*
        Prevent `sub` and `sup` elements from affecting the line height in all browsers.
        */
        sub,
        sup {
            font-size: 75%;
            line-height: 0;
            position: relative;
            vertical-align: baseline;
        }
        sub {
            bottom: -0.25em;
        }
        sup {
            top: -0.5em;
        }
        /*
        1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
        2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
        3. Remove gaps between table borders by default.
        */
        table {
            text-indent: 0;
            /* 1 */
            border-color: inherit;
            /* 2 */
            border-collapse: collapse;
            /* 3 */
        }
        /*
        1. Change the font styles in all browsers.
        2. Remove the margin in Firefox and Safari.
        3. Remove default padding in all browsers.
        */
        button,
        input,
        optgroup,
        select,
        textarea {
            font-family: inherit;
            /* 1 */
            font-feature-settings: inherit;
            /* 1 */
            font-variation-settings: inherit;
            /* 1 */
            font-size: 100%;
            /* 1 */
            font-weight: inherit;
            /* 1 */
            line-height: inherit;
            /* 1 */
            letter-spacing: inherit;
            /* 1 */
            color: inherit;
            /* 1 */
            margin: 0;
            /* 2 */
            padding: 0;
            /* 3 */
        }
        /*
        Remove the inheritance of text transform in Edge and Firefox.
        */
        button,
        select {
            text-transform: none;
        }
        /*
        1. Correct the inability to style clickable types in iOS and Safari.
        2. Remove default button styles.
        */
        button,
        input:where([type='button']),
        input:where([type='reset']),
        input:where([type='submit']) {
            -webkit-appearance: button;
            /* 1 */
            background-color: transparent;
            /* 2 */
            background-image: none;
            /* 2 */
        }
        /*
        Use the modern Firefox focus style for all focusable elements.
        */
        :-moz-focusring {
            outline: auto;
        }
        /*
        Remove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
        */
        :-moz-ui-invalid {
            box-shadow: none;
        }
        /*
        Add the correct vertical alignment in Chrome and Firefox.
        */
        progress {
            vertical-align: baseline;
        }
        /*
        Correct the cursor style of increment and decrement buttons in Safari.
        */
        ::-webkit-inner-spin-button,
        ::-webkit-outer-spin-button {
            height: auto;
        }
        /*
        1. Correct the odd appearance in Chrome and Safari.
        2. Correct the outline style in Safari.
        */
        [type='search'] {
            -webkit-appearance: textfield;
            /* 1 */
            outline-offset: -2px;
            /* 2 */
        }
        /*
        Remove the inner padding in Chrome and Safari on macOS.
        */
        ::-webkit-search-decoration {
            -webkit-appearance: none;
        }
        /*
        1. Correct the inability to style clickable types in iOS and Safari.
        2. Change font properties to `inherit` in Safari.
        */
        ::-webkit-file-upload-button {
            -webkit-appearance: button;
            /* 1 */
            font: inherit;
            /* 2 */
        }
        /*
        Add the correct display in Chrome and Safari.
        */
        summary {
            display: list-item;
        }
        /*
        Removes the default spacing and border for appropriate elements.
        */
        blockquote,
        dl,
        dd,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        hr,
        figure,
        p,
        pre {
            margin: 0;
        }
        fieldset {
            margin: 0;
            padding: 0;
        }
        legend {
            padding: 0;
        }
        ol,
        ul,
        menu {
            list-style: none;
            margin: 0;
            padding: 0;
        }
        /*
        Reset default styling for dialogs.
        */
        dialog {
            padding: 0;
        }
        /*
        Prevent resizing textareas horizontally by default.
        */
        textarea {
            resize: vertical;
        }
        /*
        1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
        2. Set the default placeholder color to the user's configured gray 400 color.
        */
        input::placeholder,
        textarea::placeholder {
            opacity: 1;
            /* 1 */
            color: #9ca3af;
            /* 2 */
        }
        /*
        Set the default cursor for buttons.
        */
        button,
        [role="button"] {
            cursor: pointer;
        }
        /*
        Make sure disabled buttons don't get the pointer cursor.
        */
        :disabled {
            cursor: default;
        }
        /*
        1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)
        2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
           This can trigger a poorly considered lint error in some tools but is included by design.
        */
        img,
        svg,
        video,
        canvas,
        audio,
        iframe,
        embed,
        object {
            display: block;
            /* 1 */
            vertical-align: middle;
            /* 2 */
        }
        /*
        Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
        */
        img,
        video {
            max-width: 100%;
            height: auto;
        }
        /* Make elements with the HTML hidden attribute stay hidden by default */
        [hidden]:where(:not([hidden="until-found"])) {
            display: none;
        }
        .absolute {
            position: absolute;
        }
        .relative {
            position: relative;
        }
        .right-0 {
            right: 0px;
        }
        .top-0 {
            top: 0px;
        }
        .float-right {
            float: right;
        }
        .m-auto {
            margin: auto;
        }
        .mx-auto {
            margin-left: auto;
            margin-right: auto;
        }
        .ml-6 {
            margin-left: 1.5rem;
        }
        .inline {
            display: inline;
        }
        .table {
            display: table;
        }
        .size-20 {
            width: 5rem;
            height: 5rem;
        }
        .h-48 {
            height: 12rem;
        }
        .h-\[200px\] {
            height: 200px;
        }
        .h-\[700px\] {
            height: 700px;
        }
        .h-full {
            height: 100%;
        }
        .w-1\/2 {
            width: 50%;
        }
        .w-1\/3 {
            width: 33.333333%;
        }
        .w-1\/5 {
            width: 20%;
        }
        .w-1\/6 {
            width: 16.666667%;
        }
        .w-2\/5 {
            width: 40%;
        }
        .w-2\/6 {
            width: 33.333333%;
        }
        .w-4\/6 {
            width: 66.666667%;
        }
        .w-\[150px\] {
            width: 150px;
        }
        .w-full {
            width: 100%;
        }
        .table-fixed {
            table-layout: fixed;
        }
        .space-x-2 > :not([hidden]) ~ :not([hidden]) {
            --tw-space-x-reverse: 0;
            margin-right: calc(0.5rem * var(--tw-space-x-reverse));
            margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
        }
        .space-x-4 > :not([hidden]) ~ :not([hidden]) {
            --tw-space-x-reverse: 0;
            margin-right: calc(1rem * var(--tw-space-x-reverse));
            margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
        }
        .border {
            border-width: 1px;
        }
        .border-4 {
            border-width: 4px;
        }
        .border-black {
            --tw-border-opacity: 1;
            border-color: rgb(0 0 0 / var(--tw-border-opacity, 1));
        }
        .object-contain {
            object-fit: contain;
        }
        .p-2 {
            padding: 0.5rem;
        }
        .p-6 {
            padding: 1.5rem;
        }
        .px-4 {
            padding-left: 1rem;
            padding-right: 1rem;
        }
        .py-2 {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
        }
        .py-3 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
        }
        .py-4 {
            padding-top: 1rem;
            padding-bottom: 1rem;
        }
        .py-6 {
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
        }
        .py-8 {
            padding-top: 2rem;
            padding-bottom: 2rem;
        }
        .pt-6 {
            padding-top: 1.5rem;
        }
        .text-center {
            text-align: center;
        }
        .text-lg {
            font-size: 1.125rem;
            line-height: 1.75rem;
        }
        .text-xl {
            font-size: 1.25rem;
            line-height: 1.75rem;
        }
        .font-bold {
            font-weight: 700;
        }
        .uppercase {
            text-transform: uppercase;
        }
        .underline {
            text-decoration: underline;
        }
        .decoration-black {
            text-decoration-color: #000;
        }
        .underline-offset-4 {
            text-underline-offset: 4px;
        }


    </style>
    @vite('resources/css/app.css')
    @viteReactRefresh
</head>
<body>
<header class="text-center pt-6 relative">
    <div>
        <img class="absolute size-20 top-0" src="assets/images/logo/UGMA-LOGO-SUBTITLE.png"
             alt="logo de la Universidad Gran Mariscal de Ayacucho">
    </div>
    <div>
        <img class="border border-black absolute w-[150px] h-[200px] top-0 right-0 object-contain" src=""
             alt="foto del paciente">
    </div>
    <div>Universidad Gran Mariscal de Ayacucho</div>
    <div>Facultad de Odontología</div>
    <div>Clínica Integral de Adulto</div>
    <h1 class="text-xl font-bold uppercase">Historia Clínica</h1>
</header>

<section class="py-3">
    <div class="space-x-4">
        <div class="inline">
            <span class="font-bold">Historia N°</span>
            <span class="fillable">{{insert_field($historia->numero, 12)}}</span>
        </div>
        <div class="inline">
            <span class="font-bold">Fecha:</span>
            <span class="fillable">{{ insert_field(Carbon::make($historia->created_at)->format('d-m-Y'), 10) }}</span>
        </div>
    </div>
    <div class="space-x-4">
        <div class="inline">
            <span class="font-bold">Bachiller:</span>
            <span
                class="fillable">{{ insert_field($historia->autor->profile->nombres . ' ' .  $historia->autor->profile->apellidos, 30)}}</span>
        </div>
        <div class="inline">
            <span class="font-bold">Semestre:</span>
            <span class="fillable">{{ insert_field($historia->semestre) }}</span>
        </div>
    </div>

</section>

<section class="py-3">
    <header>
        <h3 class="font-bold text-xl">Datos Personales</h3>
    </header>

    <div>
        <p><span class="font-bold">Nombres y apellidos: </span> <span
                class="fillable">{{insert_field($historia->paciente->nombre . ' ' . $historia->paciente->apellido, 30)}}</span>
            <span class="font-bold">Cédula: </span> <span
                class="fillable">{{insert_field($historia->paciente->cedula, 10)}}</span>
        </p>
    </div>

    <div class="space-x-4">
        <div class="space-x-2 inline">
            <span class="font-bold">Edad:</span>
            <span class="fillable">{{ insert_field($historia->paciente->edad, 5) }}</span>
        </div>
        <div class="space-x-2 inline">
            <span class="font-bold">Sexo:</span>
            <span class="fillable">{{ insert_field($historia->paciente->sexo, 5) }}</span>
        </div>
        <div class="space-x-2 inline">
            <span class="font-bold">Peso:</span>
            <span class="fillable">{{ insert_field($historia->paciente->peso, 5) }}</span><span>Kg.</span>
        </div>
        <div class="space-x-2 inline">
            <span class="font-bold">Fecha de nacimiento:</span>
            <span
                class="fillable">{{ insert_field(Carbon::make($historia->paciente->fecha_nacimiento)->format('d-m-Y'), 10) }}</span>
        </div>
    </div>

    <div>
        <div class="space-x-2 inline">
            <span class="font-bold">Ocupación:</span>
            <span class="fillable">{{ insert_field($historia->paciente->ocupacion, 20) }}</span>
        </div>
        <div class="space-x-2 inline">
            <span class="font-bold">Teléfono:</span>
            <span class="fillable">{{ insert_field($historia->paciente->telefono, 10) }}</span>
        </div>
    </div>

    <div>
        <div class="space-x-2">
            <span class="font-bold">Dirección:</span>
            <span class="fillable">{{ insert_field($historia->paciente->direccion, 160) }}</span>
        </div>
    </div>

    <div>
        <div class="space-x-2 inline">
            <span class="font-bold">En caso de emergencia contactar a:</span>
            <span
                class="whitespace-pre fillable">{{ insert_field($historia->paciente->informacion_emergencia->contacto, 30) }}</span>
        </div>
        <div class="space-x-2 inline">
            <span class="font-bold">Teléfono:</span>
            <span
                class="break-words fillable">{{ insert_field($historia->paciente->informacion_emergencia->telefono, 20) }}</span>
        </div>
    </div>

    <div>
        <div class="font-bold">Motivo de consulta</div>
        <p class="fillable">
            {{ insert_field($historia->motivo_consulta, 160) }}
        </p>
    </div>

    <div>
        <div class="font-bold">Enfermedad actual</div>
        <p class="fillable">
            {{ insert_field($historia->enfermedad_actual, 160) }}
        </p>
    </div>
</section>


<h2 class="font-bold text-xl">Historia Médica</h2>
<section class="py-3">
    <header>
        <h3 class="font-bold text-lg">Antecedentes Médicos Familiares</h3>
    </header>

    <p>Madre: <span class="fillable">{{ insert_field($historia->antFamiliares->madre, 80 + 50) }}</span></p>
    <p>Padre: <span class="fillable">{{ insert_field($historia->antFamiliares->padre, 80 + 50) }}</span></p>
    <p>Hermanos: <span class="fillable">{{ insert_field($historia->antFamiliares->hermanos, 73 + 50) }}</span></p>
    <p>Abuelos maternos: <span
            class="fillable">{{ insert_field($historia->antFamiliares->abuelos_maternos, 62 + 50) }}</span></p>
    <p>Abuelos paternos: <span
            class="fillable">{{ insert_field($historia->antFamiliares->abuelos_paternos, 62 + 50) }}</span></p>
</section>

<section class="py-3 page-break-before">
    <header>
        <h3 class="font-bold text-lg">Antecedentes Médicos Personales</h3>
    </header>

    <section>
        <div class="p-6">

            @php

                $trastornos_list = collect(json_decode(file_get_contents(public_path() .  '/assets/trastornos.json'), true)['trastornos']);

                $trastornos_historia = collect($historia->trastornos)->except(['historia_id', 'descripcion'])->reject(fn($array) => collect($array)->isEmpty());
            @endphp

            @foreach($trastornos_historia->keys() as $key)
                <div>
                    <h4 class="font-bold">
                        {{$trastornos_list->first(fn($array) => $array['id'] === $key)['label']}}
                    </h4>
                    <div class="space-x-2">
                        @foreach($trastornos_historia[$key] as $trastorno)
                            <span>
                            {{collect($trastornos_list->first(fn($array) => $array['id'] === $key)['list'])->first(fn ($tras) => $tras['id'] === $trastorno )['label']}}
                            </span>
                        @endforeach
                    </div>
                </div>
            @endforeach
        </div>

        <div class="py-2">
            <p>En caso de ser positivo a alguna de las anteriores, especificar el tiempo, si ha sido controlado, si ha
                tenido complicaciones,
                si toma alguna medicación, etc.</p>
            <p class="fillable">
                {{ insert_field($historia->trastornos['descripcion'], 160)}}
            </p>
        </div>
    </section>

    <section>
        @php
            $medicamentos_list = collect(json_decode(file_get_contents(public_path() .  '/assets/medicamentos.json'), true)['medicamentos']);

            $medicamentos_historia = collect($historia->antPersonales->medicamentos->tipo);
        @endphp
        <header>
            <h4 class="font-bold">Medicamentos que toma actualmente (mg y dosis diaria)</h4>
        </header>

        <div class="space-x-2">
            @foreach($medicamentos_historia as $medicamento)
                <span>
                    {{$medicamentos_list->firstWhere('id', $medicamento)['label']}}
                </span>
            @endforeach
        </div>

        <div class="py-2">
            <p class="font-bold">Dosis</p>
            <p class="fillable">
                {{ insert_field($historia->antPersonales->medicamentos->dosis, 160) }}
            </p>
        </div>
    </section>


    <section>
        @php
            $alergias_list = collect(json_decode(file_get_contents(public_path() .  '/assets/alergias.json'), true)['alergias']);

            $alergias_historia = collect($historia->antPersonales->alergias->tipo);
        @endphp
        <header>
            <h4 class="font-bold">Alergias</h4>
        </header>

        <div class="space-x-2">
            @forelse($alergias_historia as $alergia)
                <span>
                    {{$alergias_list->firstWhere('id', $alergia)['label']}}
                </span>
            @empty
                <span>Sin alergias especificadas</span>
            @endforelse
        </div>

        <div class="py-2">
            <p class="font-bold">Especifique</p>
            <p class="fillable">
                {{ insert_field($historia->antPersonales->alergias->descripcion, 160) }}
            </p>
        </div>
    </section>
</section>

<section class="page-break-before">
    <header>
        <h2 class="font-bold text-xl">Historia Odontológica</h2>
    </header>

    <section class="py-2">
        <header>
            <h3 class="font-bold text-lg">Antecedentes Odontológicos Personales</h3>
            <p>Restauraciones, cirugías, prótesis, tratamientos periodontales, endodónticos, ortodónticos que ha
                recibido el paciente</p>
        </header>
        <p class="fillable">
            {{insert_field($historia->historiaOdontologica->ant_personales, 160)}}
        </p>
    </section>

    <section>
        @php
            $portador = $historia->historiaOdontologica->portador;
        @endphp
        <header>
            <p>Actualmente el paciente es portador de:</p>

        </header>

        <div class="space-x-2">
            <div class="space-x-2 inline">
                <span>Ortodoncia: </span><span>Sí: <span class="fillable">{{ $portador->ortodoncia ? 'X' : insert_ws() }}</span></span> <span>No: <span class="fillable">{{ $portador->ortodoncia ? insert_ws() : 'X' }}</span></span>
            </div>
            <div class="space-x-2 inline">
                <span>Prótesis: </span><span>Sí: <span class="fillable">{{ $portador->protesis ? 'X' : insert_ws() }}</span></span> <span>No: <span class="fillable">{{ $portador->protesis ? insert_ws() : 'X' }}</span></span>
            </div>
        </div>
    </section>

    <section>
        @php
            $habitos_historia = collect($historia->historiaOdontologica->habitos)->except(['descripcion'])->reject(fn($item) => $item === false)->keys();

            $habitos_list = collect(json_decode(file_get_contents(public_path() .  '/assets/habitos.json'), true)['habitos']);
        @endphp
        <header>
            <h3 class="font-bold text-lg">Hábitos</h3>
        </header>

        <div class="space-x-2">
            @forelse($habitos_historia as $habito)
                <span>
                    {{$habitos_list->firstWhere('id', $habito)['label']}}
                </span>
            @empty
                <span>Sin hábitos especificados</span>
            @endforelse
        </div>

        <div class="py-2">
            <p class="font-bold">En caso de presentar algún hábito explique desde cuándo y la frecuencia</p>
            <p class="fillable">
                {{ insert_field($historia->historiaOdontologica->habitos['descripcion'], 160) }}
            </p>
        </div>
    </section>

    <section>
        @php
            $consentimiento = $historia->historiaOdontologica->getMedia('consentimiento')->first();
            $consentimiento_path = $consentimiento?->getPath();


        @endphp
        <header>
            <h3 class="font-bold text-lg">Consentimiento</h3>
        </header>

        <div>
            @isset($consentimiento_path)
                @php
                    $type = pathinfo($consentimiento_path, PATHINFO_EXTENSION);
                    $data = file_get_contents($consentimiento_path);

                    $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
                @endphp
                <div class="">
                    <img class="w-full h-[700px] object-contain m-auto" src="{{$base64}}"
                         alt="Imagen del consentimiento">
                </div>
            @endisset
        </div>
    </section>
</section>

<section>
    <header>
        <h2 class="font-bold text-xl">Examen Físico</h2>
    </header>

    <section>
        @php
            $signos_vitales = collect($historia->historiaOdontologica->examen_fisico->signos_vitales);
        @endphp
        <header>
            <h3 class="font-bold text-lg">Signos Vitales:</h3>
        </header>
        <div>
            <div class="space-x-2 text-center">
                <span>Tension Arterial: </span> <span>Sistólica: <span
                        class="fillable">{{insert_field($signos_vitales['tension_arterial']['sistole'], 4)}}</span> </span>
                <span>Diastólica: <span
                        class="fillable">{{insert_field($signos_vitales['tension_arterial']['diastole'], 4)}}</span> </span>
            </div>
            <div class="space-x-2 text-center">
                <span>Pulso: <span
                        class="fillable">{{ insert_field($signos_vitales['pulso'], 4) }}</span> </span><span>Respiración: <span
                        class="fillable">{{insert_field($signos_vitales['respiracion'], 4)}}</span> </span><span>Temperatura: <span
                        class="fillable">{{ insert_field($signos_vitales['temperatura'], 4) }}</span> </span>
            </div>
        </div>
    </section>

    <section class="py-4">
        @php
            $extraoral = collect($historia->historiaOdontologica->examen_fisico->examen_extraoral);

        @endphp
        <header>
            <h3 class="font-bold text-lg">Examen Extraoral</h3>
        </header>

        <div>
            <p><span class="font-bold">Cabeza: </span><span class="fillable">{{ insert_field($extraoral['cabeza'], 80) }}</span></p>
            <p><span class="font-bold">Cara: </span><span class="fillable">{{ insert_field($extraoral['cara'], 80) }}</span></p>
            <p><span class="font-bold">Simetría facial: </span><span class="fillable">{{ insert_field($extraoral['simetria_facial'], 80) }}</span></p>
            <p><span class="font-bold">Piel: </span><span class="fillable">{{ insert_field($extraoral['piel'], 80) }}</span></p>
            <p><span
                    class="font-bold">Lesiones extraorales: </span><span class="fillable">{{ insert_field($extraoral['lesiones_extraorales'], 80) }}</span>
            </p>
            <p><span class="font-bold">Palpación de ganglios: </span><span class="fillable">{{ insert_field($extraoral['palpacion_ganglios'], 80) }}</span>
            </p>
            <p><span
                    class="font-bold">Articulación Temporomandibular: </span><span class="fillable">{{ insert_field($extraoral['articulacion_temporomandibular'], 80) }}</span>
            </p>
        </div>

    </section>

    <section class="py-4">
        @php
            $intraoral = collect($historia->historiaOdontologica->examen_fisico->examen_intraoral);

        @endphp
        <header>
            <h3 class="font-bold text-lg">Examen Intraoral</h3>
        </header>

        <div>
            <p><span class="font-bold">Dientes: </span><span class="fillable">{{ insert_field($intraoral['dientes'], 80) }}</span></p>
            <p><span class="font-bold">Discromías dentarias: </span><span class="fillable">{{ insert_field($intraoral['discromias'], 80) }}</span></p>
            <p><span class="font-bold">Encías: </span><span class="fillable">{{ insert_field($intraoral['encias'], 80) }}</span></p>
            <p><span class="font-bold">Frenillos: </span><span class="fillable">{{ insert_field($intraoral['frenillos'], 80) }}</span></p>
            <p><span class="font-bold">Labios: </span><span class="fillable">{{ insert_field($intraoral['labios'], 80) }}</span></p>
            <p><span class="font-bold">Lengua (tipo): </span><span class="fillable">{{ insert_field($intraoral['lengua_tipo'], 80) }}</span></p>
            <p><span class="font-bold">Maxilares: </span><span class="fillable">{{ insert_field($intraoral['maxilares'], 80) }}</span></p>
            <p><span class="font-bold">Mejillas: </span><span class="fillable">{{ insert_field($intraoral['mejillas'], 80) }}</span></p>
            <p><span
                    class="font-bold">Paladar duro y blando: </span><span class="fillable">{{ insert_field($intraoral['paladar_duro_blando'], 80) }}</span>
            </p>
            <p><span class="font-bold">Piso de la boca: </span><span class="fillable">{{ insert_field($intraoral['piso_boca'], 80) }}</span></p>
        </div>

    </section>

    <section class="py-4 page-break-before">
        @php
            $interpretacion = collect($historia->historiaOdontologica->examen_radiografico->interpretacion_panoramica)

        @endphp
        <header>
            <h3 class="font-bold text-lg">Examen Radiográfico</h3>
        </header>

        <div>
            <h4 class="font-bold">Interpretación Panorámica</h4>

            <table class="border border-black table-fixed mx-auto w-full">
                <thead>
                <tr>
                    <th class="border border-black px-4 w-1/5">Zona</th>
                    <th class="border border-black px-4 w-2/5">Imagen radiopaca compatible con:</th>
                    <th class="border border-black px-4 w-2/5">Imagen radiolucida compatible con:</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th class="border border-black py-8">Nasomaxilar</th>
                    <td class="border border-black">{{ $interpretacion['nasomaxilar'] }}</td>
                    <td class="border border-black"></td>
                </tr>
                <tr>
                    <th class="border border-black py-8">ATM</th>
                    <td class="border border-black">{{ $interpretacion['ATM'] }}</td>
                    <td class="border border-black"></td>
                </tr>
                <tr>
                    <th class="border border-black py-8">Mandibular</th>
                    <td class="border border-black">{{$interpretacion['mandibular']}}</td>
                    <td class="border border-black"></td>
                </tr>
                <tr>
                    <th class="border border-black py-8">Dento-Alveolar Superior</th>
                    <td class="border border-black">{{$interpretacion['dento_alveolar_sup']}}</td>
                    <td class="border border-black"></td>
                </tr>
                <tr>
                    <th class="border border-black py-8">Dento-Alveolar Inferior</th>
                    <td class="border border-black">{{$interpretacion['dento_alveolar_inf']}}</td>
                    <td class="border border-black"></td>
                </tr>

                </tbody>
            </table>
        </div>

        <div class="py-4">
            <h4 class="font-bold">Interpretación Radiográfica Periapicales: (Corona, Raíz, Hueso y Espacio Ligamento
                Periodontal)</h4>

            <p class="fillable">
                {{ insert_field($historia->historiaOdontologica->examen_radiografico->interpretacion_periapicales, 160) }}
            </p>
        </div>

        <div class="py-4">
            <h4 class="font-bold">Interpretación Radiográfica Coronales: (Corona, Cresta Alveolar, Espacio de la Cámara
                Pulpar)</h4>

            <p class="fillable">
                {{ insert_field($historia->historiaOdontologica->examen_radiografico->interpretacion_coronales, 160) }}
            </p>
        </div>
    </section>
</section>

<section class="page-break-before">
    @php
        $periodontodiagrama = $historia->historiaOdontologica->getMedia('periodontodiagrama')->first();
        $periodontodiagrama_path = $periodontodiagrama?->getPath();
    @endphp
    <header>
        <h2 class="font-bold text-xl">Periodontodiagrama</h2>
    </header>

    <div>
        @isset($periodontodiagrama_path)
            @php
                $type = pathinfo($periodontodiagrama_path, PATHINFO_EXTENSION);
                $data = file_get_contents($periodontodiagrama_path);

                $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
            @endphp
            <div class="mx-auto">
                <img class="w-full h-full object-contain m-auto" src="{{$base64}}"
                     alt="Imagen del periodontodiagrama">
            </div>
        @endisset
    </div>
</section>

<section class="page-break-before">
    @php
        $estudio_modelos = collect($historia->historiaOdontologica->estudio_modelos);
    @endphp
    <header>
        <h2 class="font-bold text-xl">Estudio de modelos</h2>
    </header>

    <div>
        <table class="border border-black table-fixed mx-auto w-full">
            <thead>
            <tr>
                <th class="border border-black px-4 w-1/3 font-bold text-lg">Maxilar Superior</th>
                <th class="border border-black px-4 w-1/3 font-bold text-lg">Maxilar Inferior (Mandíbula)</th>
                <th class="border border-black px-4 w-1/3 font-bold text-lg">Modelos de Oclusión</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Tipo de arco:</p>
                    <p>{{$estudio_modelos['maxilar_sup']['tipo_arco']}}</p></td>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Tipo de arco:</p>
                    <p>{{$estudio_modelos['maxilar_inf']['tipo_arco']}}</p></td>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Linea media:</p>
                    <p>{{$estudio_modelos['modelos_oclusion']['linea_media']}}</p></td>
            </tr>
            <tr>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Forma del
                        arco:</p>
                    <p>{{$estudio_modelos['maxilar_sup']['forma_arco']}}</p></td>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Forma del
                        arco:</p>
                    <p>{{$estudio_modelos['maxilar_inf']['forma_arco']}}</p></td>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Sobresalte
                        Overjet:</p>
                    <p>{{$estudio_modelos['modelos_oclusion']['sobresalte']}}</p></td>
            </tr>
            <tr>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Simetría del
                        arco:</p>
                    <p>{{$estudio_modelos['maxilar_sup']['simetria_arco']}}</p></td>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Simetría del
                        arco:</p>
                    <p>{{$estudio_modelos['maxilar_inf']['simetria_arco']}}</p></td>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Sobrepase
                        Overbite:</p>
                    <p>{{$estudio_modelos['modelos_oclusion']['sobrepase']}}</p></td>
            </tr>
            <tr>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Paladar:</p>
                    <p>{{$estudio_modelos['maxilar_sup']['paladar']}}</p></td>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Piso de boca:</p>
                    <p>{{$estudio_modelos['maxilar_inf']['piso_boca']}}</p></td>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Relación
                        canina:</p>
                    <p>{{$estudio_modelos['modelos_oclusion']['relacion_canina']}}</p></td>
            </tr>
            <tr>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Malposición
                        dentaria:</p>
                    <p>{{$estudio_modelos['maxilar_sup']['maloclusion']}}</p></td>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Malposición
                        dentaria:</p>
                    <p>{{$estudio_modelos['maxilar_inf']['maloclusion']}}</p></td>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Relación
                        molar:</p>
                    <p>{{$estudio_modelos['modelos_oclusion']['relacion_molar']}}</p></td>
            </tr>
            <tr>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Dientes
                        ausentes:</p>
                    <p>{{$estudio_modelos['maxilar_sup']['dientes_ausentes']}}</p></td>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Dientes
                        ausentes:</p>
                    <p>{{$estudio_modelos['maxilar_inf']['dientes_ausentes']}}</p></td>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Mordida
                        anterior:</p>
                    <p>{{$estudio_modelos['modelos_oclusion']['mordida_anterior']}}</p></td>
            </tr>
            <tr>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Facetas de
                        desgaste:</p>
                    <p>{{$estudio_modelos['maxilar_sup']['facetas_desgaste']}}</p></td>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Facetas de
                        desgaste:</p>
                    <p>{{$estudio_modelos['maxilar_inf']['facetas_desgaste']}}</p></td>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Mordida
                        posterior:</p>
                    <p>{{$estudio_modelos['modelos_oclusion']['mordida_posterior']}}</p></td>
            </tr>
            <tr>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Diastemas:</p>
                    <p>{{$estudio_modelos['maxilar_sup']['diastemas']}}</p></td>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Diastemas:</p>
                    <p>{{$estudio_modelos['maxilar_inf']['diastemas']}}</p></td>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Curva de
                        compensación:</p>
                    <p>{{$estudio_modelos['modelos_oclusion']['curva_compensacion']}}</p></td>
            </tr>
            <tr>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Anomalía de forma,
                        tamaño y número:</p>
                    <p>{{$estudio_modelos['maxilar_sup']['anomalia']}}</p></td>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Anomalía de forma,
                        tamaño y número:</p>
                    <p>{{$estudio_modelos['maxilar_inf']['anomalia']}}</p></td>
                <td style="vertical-align: top" class="border border-black py-2"><p class="font-bold">Plano oclusal:</p>
                    <p>{{$estudio_modelos['modelos_oclusion']['plano_oclusal']}}</p></td>
            </tr>
            </tbody>
        </table>
    </div>

    <div class="py-4">
        <h3 class="font-bold text-lg">Exámenes complementarios:</h3>
        <p class="fillable">
            {{ insert_field($estudio_modelos['examenes_comp'], 160) }}
        </p>
    </div>

    <div class="py-4">
        @php
            $interconsultas_list = collect(json_decode(file_get_contents(public_path() .  '/assets/interconsultas.json'), true)['interconsultas']);

            $interconsultas_historia = collect($estudio_modelos['interconsultas']['list']);
        @endphp

        <h3 class="font-bold text-lg">Interconsultas</h3>
        <p class="space-x-4">
            @foreach($interconsultas_list as $interconsultas)
                <span>
                    <span class="font-bold">{{$interconsultas['label']}}: </span>
                    <span
                        class="fillable">{{ $interconsultas_historia->contains($interconsultas['id']) ? 'X' : insert_ws(2) }}</span>
                </span>
            @endforeach
        </p>
        <p class="fillable">
            {{ insert_field($estudio_modelos['interconsultas']['descripcion'], 160) }}
        </p>
    </div>

    <div class="py-4">
        <h3 class="font-bold text-lg">Diagnóstico</h3>
        <p class="fillable">
            {{ insert_field($estudio_modelos['diagnostico'], 160)}}
        </p>
    </div>

    <div class="py-4">
        <h3 class="font-bold text-lg">Pronóstico (General/Específicos)</h3>
        <p class="fillable">
            {{ insert_field($estudio_modelos['pronostico'], 160) }}
        </p>
    </div>
</section>

<section class="page-break-before">
    @php
        $plan_tratamiento = collect($historia->historiaOdontologica->plan_tratamiento);
    @endphp
    <header>
        <h3 class="font-bold text-lg">Plan de Tratamiento (Fase Sistémica, Fase Preventiva y Educativa, Fase
            Periodontal, Fase Quirúrgica, Fase Endodóntica, Fase Operatoria, Fase Protésica, Fase de Control y
            Mantenimiento)</h3>
    </header>

    <div>
        <table class="border border-black table-fixed mx-auto w-full">
            <thead>
            <tr>
                <th class="border border-black px-4 w-1/6 font-bold text-lg">Diente</th>
                <th class="border border-black px-4 w-1/6 font-bold text-lg">Tipo de cavidad</th>
                <th class="border border-black px-4 w-4/6 font-bold text-lg">Tratamiento a realizar</th>
            </tr>
            </thead>
            <tbody>
            @forelse($plan_tratamiento as $plan)
                <tr>
                    <td class="border border-black p-2 text-center">{{$plan['diente']}}</td>
                    <td class="border border-black p-2 text-center">{{$plan['cavidad']}}</td>
                    <td class="border border-black p-2">{{$plan['tratamiento']}}</td>
                </tr>
            @empty
                <tr>
                    <th colspan="3" class="border border-black py-2">
                        Sin tratamientos
                    </th>
                </tr>
            @endforelse
            </tbody>
        </table>
    </div>
</section>

<section class="py-6">
    @php
        $modificaciones_plan_tratamiento = collect($historia->historiaOdontologica->modificaciones_plan_tratamiento);
    @endphp
    <header>
        <h2 class="font-bold text-xl text-center">Modificaciones del Plan de Tratamiento</h2>
    </header>

    <div>
        <table class="border border-black table-fixed mx-auto w-full">
            <thead>
            <tr>
                <th class="border border-black px-4 w-1/6 font-bold text-lg">Fecha</th>
                <th class="border border-black px-4 w-1/6 font-bold text-lg">Diente</th>
                <th class="border border-black px-4 w-2/6 font-bold text-lg">Tratamiento modificado</th>
                <th class="border border-black px-4 w-1/6 font-bold text-lg">Nombre del docente</th>
                <th class="border border-black px-4 w-1/6 font-bold text-lg">Firma</th>
            </tr>
            </thead>
            <tbody>
            @forelse($modificaciones_plan_tratamiento as $modificacion)
                <tr>
                    <td class="border border-black p-2 text-center">{{Carbon::make($modificacion['fecha'])->format('d-m-Y')}}</td>
                    <td class="border border-black p-2 text-center">{{$modificacion['diente']}}</td>
                    <td class="border border-black p-2">{{$modificacion['tratamiento']}}</td>
                    <td class="border border-black p-2">{{$modificacion['approver_id']}}</td>
                    <td class="border border-black p-2">{{$modificacion['approval']}}</td>
                </tr>
            @empty
                <tr>
                    <th colspan="5" class="border border-black py-2">
                        Sin modificaciones en los tratamientos
                    </th>
                </tr>
            @endforelse
            </tbody>
        </table>
    </div>
</section>

<section class="page-break-before">
    @php
        $secuencia_tratamiento = collect($historia->historiaOdontologica->secuencia_tratamiento);
    @endphp
    <header>
        <h2 class="font-bold text-xl text-center">Secuencia de Tratamiento</h2>
    </header>

    <div>
        <table class="border border-black table-fixed mx-auto w-full">
            <thead>
            <tr>
                <th class="border border-black px-4 w-1/6 font-bold text-lg">Fecha</th>
                <th class="border border-black px-4 w-1/6 font-bold text-lg">Diente</th>
                <th class="border border-black px-4 w-2/6 font-bold text-lg">Tratamientos realizado</th>
                <th class="border border-black px-4 w-1/6 font-bold text-lg">Nombre del docente</th>
                <th class="border border-black px-4 w-1/6 font-bold text-lg">Firma</th>
            </tr>
            </thead>
            <tbody>
            @forelse($secuencia_tratamiento as $tratamiento)
                <tr>
                    <td class="border border-black p-2 text-center">{{Carbon::make($tratamiento['fecha'])->format('d-m-Y')}}</td>
                    <td class="border border-black p-2 text-center">{{$tratamiento['diente']}}</td>
                    <td class="border border-black p-2">{{$tratamiento['tratamiento']}}</td>
                    <td class="border border-black p-2">{{$tratamiento['approver_id']}}</td>
                    <td class="border border-black p-2">{{$tratamiento['approval']}}</td>
                </tr>
            @empty
                <tr>
                    <th colspan="5" class="border border-black py-2">
                        Sin tratamientos realizados
                    </th>
                </tr>
            @endforelse
            </tbody>
        </table>
    </div>

    <div class="py-6">
        <h3 class="font-bold text-xl text-center">Radiografías finales</h3>

        <div>
            <table class="table-fixed mx-auto w-full">
                <tbody>
                <tr>
                    <td class="border-4 border-black p-2 h-48 w-2/5"></td>
                    <td></td>
                    <td class="border-4 border-black p-2 h-48 w-2/5"></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</section>

<section class="page-break-before">

    @php

        $higiene_list = collect(json_decode(file_get_contents(public_path() .  '/assets/higiene.json'), true)['higiene']);

        $higiene_historia = collect($historia->historiaOdontologica->historia_periodontal->higiene_bucal);
        $control_higiene_historia = collect($historia->historiaOdontologica->historia_periodontal->control_higiene_bucal);

    @endphp
    <header>
        <h2 class="font-bold text-xl text-center">Historia Periodontal</h2>
        <p><span
                class="font-bold">Nombre del paciente: </span><span>{{$historia->paciente->nombre . ' ' . $historia->paciente->apellido}}</span>
            <span class="float-right">
                <span class="font-bold">HCN° </span><span>{{$historia->numero ?? 'Sin asignar'}}</span>
            </span>
        </p>
    </header>

    <div>
        <table class="border border-black table-fixed mx-auto w-full">
            <thead>
            <tr>
                <th class="border border-black px-4 w-1/2 font-bold text-lg">Higiene Bucal del Paciente</th>
                <th class="border border-black px-4 w-1/2 font-bold text-lg">Control de Higiene Bucal</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td class="border border-black p-2" style="vertical-align: top">
                    <p class="font-bold text-lg">Tipo de cepillo</p>
                    <p class="space-x-2">
                        @php
                            $tipo_cepillo_historia = collect($higiene_historia['tipo_cepillo']);
                        @endphp
                        @foreach($higiene_list['tipo_cepillo'] as $tipo_cepillo)
                            <span>
                        <span class="font-bold">{{$tipo_cepillo['label']}}: </span><span
                                    class="fillable">{{$tipo_cepillo_historia->contains($tipo_cepillo['id']) ? 'X' : ''}}</span>

                            </span>

                        @endforeach
                    </p>

                    <p class="font-bold text-lg">Método de cepillado</p>
                    <p class="space-x-2">
                        @php
                            $metodo_cepillado_historia = collect($higiene_historia['metodo_cepillado']);
                        @endphp
                        @foreach($higiene_list['metodo_cepillado'] as $metodo_cepillado)
                            <span>
                        <span class="font-bold">{{$metodo_cepillado['label']}}: </span><span
                                    class="fillable">{{$metodo_cepillado_historia->contains($metodo_cepillado['id']) ? 'X' : ''}}</span>
                            </span>
                        @endforeach
                    </p>

                    <p class="font-bold text-lg">Método auxiliar de higiene</p>
                    <p class="space-x-2">
                        @php
                            $metodo_aux_historia = collect($higiene_historia['metodo_auxiliar']);
                        @endphp
                        @foreach($higiene_list['metodo_auxiliar'] as $metodo_aux)
                            <span>
                        <span class="font-bold">{{$metodo_aux['label']}}: </span><span
                                    class="fillable">{{$metodo_aux_historia->contains($metodo_aux['id']) ? 'X' : ''}}</span>
                            </span>
                        @endforeach
                    </p>
                    <div>
                        <p><span class="font-bold">Cepillado de la lengua: </span><span class="font-bold">Sí: </span><span>{{$higiene_historia['cepillado_lengua'] ? 'X' : ''}}</span><span class="font-bold">No: </span><span>{{!$higiene_historia['cepillado_lengua'] ? 'X' : ''}}</span></p>
                    </div>
                    <div>
                        <p><span class="font-bold">Presencia de hemorragia gingival: </span><span class="font-bold"></span><span>{{$higiene_historia['hemorragia_gingival'] ? 'X' : ''}}</span></p>
                        <p><span class="font-bold">Xerostomia: </span><span class="font-bold"></span><span>{{$higiene_historia['xerostomia'] ? 'X' : ''}}</span></p>
                        <p><span class="font-bold">Sialorrea: </span><span class="font-bold"></span><span>{{$higiene_historia['sialorrea'] ? 'X' : ''}}</span></p>
                    </div>
                </td>
                <td class="border border-black p-2" style="vertical-align: top">

                    <div>
                        <p class="font-bold text-lg">
                            Técnica de cepillado enseñada a el paciente:
                        </p>
                        <p>
                            {{$control_higiene_historia['tecnica_cepillado_ensenada']}}
                        </p>
                    </div>
                    <div>
                        <p class="font-bold text-lg">
                            Cepillo dental recomendado para su paciente:
                        </p>
                        <p>
                            {{$control_higiene_historia['cepillo_recomendado']}}
                        </p>
                    </div>
                    <div>
                        <p class="font-bold text-lg">
                            Métodos auxiliares requeridos:
                        </p>
                        <p>
                            {{$control_higiene_historia['metodos_auxiliares_requeridos']}}
                        </p>
                    </div>
                    <div>
                        <p class="font-bold text-lg">
                            Presencia de placa bacteriana en la lengua:
                        </p>
                        <p>
                            <span class="font-bold">Sí: </span><span>{{$control_higiene_historia['placa_bacteriana_lengua'] ? 'X' : ''}}</span>
                            <span class="font-bold ml-6">No: </span><span>{{!$control_higiene_historia['placa_bacteriana_lengua'] ? 'X' : ''}}</span>
                        </p>
                    </div>
                    <div>
                        <p class="font-bold text-lg">
                            Control de halitosis:
                        </p>
                        <p>
                            <span class="font-bold">Sí: </span><span>{{$control_higiene_historia['control_halitosis'] === 'S'? 'X' : ''}}</span>
                            <span class="font-bold ml-6">No: </span><span>{{$control_higiene_historia['control_halitosis'] === 'N' ? 'X' : ''}}</span>
                            <span class="font-bold ml-6">No requiere: </span><span>{{$control_higiene_historia['control_halitosis'] === 'NR' ? 'X' : ''}}</span>
                        </p>
                    </div>
                    <div>
                        <p class="font-bold text-lg">
                            Tratamiento:
                        </p>
                        <p class="fillable">
                            {{$control_higiene_historia['tratamiento']}}
                        </p>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</section>
</body>
</html>
