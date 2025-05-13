// eslint.config.js (at repo root)
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
	js.configs.recommended,
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: './tsconfig.json',
				sourceType: 'module',
				ecmaVersion: 2020,
			},
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		plugins: {
			'@typescript-eslint': tseslint.plugin,
		},
		rules: {
			// Add your custom rules here
			'no-nested-ternary': 'off',
			'react/jsx-filename-extension': 'off',
			'import/extensions': ['error', 'ignorePackages', {
				ts: 'never',
				tsx: 'never',
				js: 'never',
				jsx: 'never'
			}]
		}
	}
];

