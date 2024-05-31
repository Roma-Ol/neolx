import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' }, rules: {
      'no-unused-vars': 'warn',
      'no-multiple-empty-lines': ['warn', { 'max': 1, 'maxEOF': 1 }],
      'no-console': ['warn', { 'allow': ['warn', 'error'] }],
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
];