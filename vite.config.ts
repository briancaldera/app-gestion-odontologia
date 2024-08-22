import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import {resolve} from "path";

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            'ziggy-js': resolve('vendor/tightenco/ziggy'),
        }
    },
    // TODO Remove server config when deploying.
    server: {
        cors: true,
        hmr: {
            host: '192.168.1.103',
        }
    }
});
