import { defineConfig } from '#q-app/wrappers';

export default defineConfig(() => {
    return {
        boot: [],

        css: ['app.css', 'variables.css'],

        extras: ['roboto-font', 'material-icons'],

        htmlVariables: {
            productName: "Zigzag's Workshop",
        },

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
                        vueTsc: false,
                        eslint: {
                            lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{ts,js,mjs,cjs,vue}"',
                            useFlatConfig: true,
                        },
                        overlay: false,
                    },
                    { server: false },
                ],
            ],
        },
        devServer: {
            open: false,
        },

        framework: {
            plugins: ['Notify'],
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
