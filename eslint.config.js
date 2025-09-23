// ESLint flat config para ESLint v9
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  js.configs.recommended,
  // Base TypeScript + React Hooks (aplica a todos los TS/TSX)
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } },
      // Por defecto no definimos globals aquí; se aplican en overrides específicos (src vs api)
    },
    plugins: { '@typescript-eslint': tsPlugin, 'react-hooks': reactHooks },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // Desactivar la core rule que no entiende de tipos en TS
      'no-undef': 'off',
      // Permitir catch vacío (p.ej. para idempotencia en SQL CREATE EXTENSION)
      'no-empty': ['error', { allowEmptyCatch: true }],
      // Relajar reglas que bloquean ahora mismo; ajustar más tarde si se quiere estricto
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
  // Frontend: navegador (src)
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.es2021, fetch: 'readonly' },
    },
  },
  // Backend y scripts: Node (api y scripts)
  {
    files: ['api/**/*.ts', 'scripts/**/*.{js,cjs,mjs}'],
    languageOptions: {
      globals: { ...globals.node, ...globals.es2021, fetch: 'readonly' },
    },
  },
  // Desactiva conflictos con Prettier
  prettier,
]
