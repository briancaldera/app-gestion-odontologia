/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
    stories: [
        "../stories/**/*.mdx",
        "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-onboarding",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@chromatic-com/storybook",
        "@storybook/addon-interactions",
        "@storybook/addon-themes"
    ],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    async viteFinal(config) {
        // Merge custom configuration into the default config
        const {mergeConfig} = await import('vite');

        return mergeConfig(config, {
            // Add dependencies to pre-optimization
            server: {
                origin: ''
            },
        });
    },
};
export default config;
