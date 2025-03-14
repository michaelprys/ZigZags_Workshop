import js from '@eslint/js';
import pluginQuasar from '@quasar/app-vite/eslint';
import prettierSkipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';

export default defineConfigWithVueTs({
    extends: [
        ...pluginQuasar.configs.recommended(),
        js.configs.recommended,
        ...pluginVue.configs['flat/recommended'],
        vueTsConfigs.recommended
    ],
    languageOptions: {
        parserOptions: { ecmaVersion: 'latest' },
        globals: {
            ...globals.browser,
            ...globals.node,
            process: 'readonly',
            ga: 'readonly',
            cordova: 'readonly',
            Capacitor: 'readonly',
            chrome: 'readonly',
            browser: 'readonly'
        }
    },
    rules: {
        'spec-char-escape': 'off',
        'prefer-promise-reject-errors': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/component-tags-order': ['error', { order: ['script', 'template', 'style'] }],
        'vue/static-class-names-order': ['error'],
        'vue/attributes-order': ['error']
    },
    files: ['**/*.ts', '**/*.vue'],
    ...prettierSkipFormatting
});
