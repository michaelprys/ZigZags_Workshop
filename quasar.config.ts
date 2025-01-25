import { defineConfig } from '#q-app/wrappers';

export default defineConfig(() => {
    return {
        boot: [],

        css: ['app.css', 'variables.css'],

        extras: ['roboto-font', 'material-icons'],

        build: {
            target: {
                browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
                node: 'node20',
            },

            typescript: {
                strict: true,
                vueShim: true,
            },

            vueRouterMode: 'hash',

            vitePlugins: [
                [
                    'vite-plugin-checker',
                    {
                        vueTsc: true,
                        eslint: {
                            lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{ts,js,mjs,cjs,vue}"',
                            useFlatConfig: true,
                        },
                    },
                    { server: false },
                ],
            ],
        },
        devServer: {
            open: true,
        },

        framework: {
            plugins: [],
        },

        animations: [],

        ssr: {
            prodPort: 3000,

            middlewares: ['render'],

            pwa: false,
        },
        pwa: {
            workboxMode: 'GenerateSW',
        },

        cordova: {},

        capacitor: {
            hideSplashscreen: true,
        },

        electron: {
            preloadScripts: ['electron-preload'],

            inspectPort: 5858,

            bundler: 'packager',

            packager: {},

            builder: {
                appId: 'zigzags-workshop',
            },
        },
        bex: {
            extraScripts: [],
        },
    };
});
