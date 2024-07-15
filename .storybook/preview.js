import '@fontsource-variable/inter';
import {withThemeFromJSXProvider, withThemeByClassName, withThemeByDataAttribute} from '@storybook/addon-themes';
import '../resources/css/app.css';
import StylesDecorator from "./styles-decorator.jsx";

/** @type { import('@storybook/react').Preview } */
const preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        StylesDecorator,
        // withThemeFromJSXProvider ({
        //     // themes: {
        //     //     light: defaultTheme,
        //     // },
        //     // defaultTheme: 'light',
        //     Provider: ThemeProvider,
        //     GlobalStyles: CssBaseline,
        // }),
        withThemeByClassName({
            themes: {
                light: 'light',
                dark: 'dark',
            },
            defaultTheme: 'light',
        }),
        // withThemeByDataAttribute({
        //     themes: {
        //         light: 'light',
        //         dark: 'dark',
        //     },
        //     defaultTheme: 'light',
        //     attributeName: 'data-mode',
        // }),
    ],
};

export default preview;
