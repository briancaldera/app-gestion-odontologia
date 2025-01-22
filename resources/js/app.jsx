import '@fontsource-variable/inter';
import './bootstrap';
import '../css/app.css';
import {createRoot} from 'react-dom/client';
import {createInertiaApp} from '@inertiajs/react';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import BaseLayout from "@/Layouts/BaseLayout.tsx";
import {StrictMode} from 'react';

const appName = import.meta.env.VITE_APP_NAME || 'UGMA - Facultad de Odontología';

createInertiaApp({
    title: (title) => title ? `${title} - ${appName}` : `${appName}`,
    resolve: async (name) => {
        const page = await resolvePageComponent([`./Pages/${name}.jsx`, `./Pages/${name}.tsx`], import.meta.glob('./Pages/**/*.{jsx,tsx}'))
        page.default.layout = page.default.layout || (page => <BaseLayout children={page}/>)
        return page
    },
    setup({el, App, props}) {
        const root = createRoot(el);

        if (import.meta.env.PROD) {
            root.render(<App {...props} />)
        } else {
            root.render(
                <StrictMode>
                    <App {...props} />
                </StrictMode>
            )
        }
    },
    progress: {
        color: '#6366f1',
    },
});
