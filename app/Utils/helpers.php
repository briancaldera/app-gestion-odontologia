<?php

if (!function_exists('message')) {

    /*
     * Variants for the message. See https://notistack.com/features/customization
     */
    enum Type: string
    {
        case Default = 'default';
        case Success = 'success';
        case Error = 'error';
        case Warning = 'warning';
        case Info = 'info';
    }

    /**
     * Set a message in the 'messages' session key. This key is ensured to be an array in frontend.
     * @param string $content the message to be displayed
     * @param Type $type the variant to use
     * @return void
     */
    function message(string $content, Type $type = Type::Default): void
    {
        $message = [
            'content' => $content,
            'type' => $type->value
        ];

        session()->push('messages', $message);
    }
}
