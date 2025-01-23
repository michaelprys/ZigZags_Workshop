import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import pluginQuasar from '@quasar/app-vite/eslint';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import prettierSkipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default [
    {},

    ...pluginQuasar.configs.recommended(),
    js.configs.recommended,
    ...pluginVue.configs['flat/essential'],

    {
        files: ['**/*.ts', '**/*.vue'],
        rules: {
            '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
        },
    },
    ...vueTsEslintConfig({
        extends: ['recommendedTypeChecked'],
    }),

    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',

            globals: {
                ...globals.browser,
                ...globals.node,
                process: 'readonly',
                ga: 'readonly',
                cordova: 'readonly',
                Capacitor: 'readonly',
                chrome: 'readonly',
                browser: 'readonly',
            },
        },

        rules: {
            'prefer-promise-reject-errors': 'off',

            'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        },
    },

    {
        files: ['src-pwa/custom-service-worker.ts'],
        languageOptions: {
            globals: {
                ...globals.serviceworker,
            },
        },
    },

    {
        rules: {
            'vue/component-tags-order': [
                'error',
                {
                    order: ['script', 'template', 'style'],
                },
            ],
        },
    },

    prettierSkipFormatting,
];
