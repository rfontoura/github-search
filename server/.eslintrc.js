const path = require('path');

module.exports = {
    root: true,
    env: {
        node: true,
        jest: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: path.resolve(__dirname, './tsconfig.build.json'),
        sourceType: 'module',
    },
    ignorePatterns: [
        '**/dist/**',
        '**/node_modules/**',
        '.eslintrc.js',
    ],
    plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-import', 'import', 'prettier'],
    extends: [
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/dot-notation': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-loop-func': 'off',
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'import/prefer-default-export': 'off',
        'no-underscore-dangle': 'off',
        'no-console': 'off',
        'no-plusplus': 'off',
        'no-await-in-loop': 'off',
        'class-methods-use-this': 'off',
        'no-restricted-syntax': 'off',
    },
};
