import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'playwright-report/**',
    'test-results/**',
    'tests/e2e/.screenshots/**',
  ]),
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                'lucide-react',
                'react-icons',
                'react-icons/*',
                '@heroicons/*',
                '@tabler/icons*',
                '@phosphor-icons/*',
                '@radix-ui/react-icons',
                '@fortawesome/*',
                'feather-icons',
                'remixicon',
                '@iconify/*',
              ],
              message: 'Icons live in src/components/icons/icons.tsx only.',
            },
            {
              group: ['@/features/*/*'],
              message: 'Import a feature through its index.ts.',
            },
          ],
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['**/*.test.ts', '**/*.test.tsx', 'tests/**'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/(#[0-9a-fA-F]{3,8}\\b)/]',
          message: 'Use a colour token, not a hex value.',
        },
        {
          selector: 'TemplateElement[value.raw=/(#[0-9a-fA-F]{3,8}\\b)/]',
          message: 'Use a colour token, not a hex value.',
        },
      ],
    },
  },
  {
    files: ['tests/**'],
    rules: {
      'react-hooks/rules-of-hooks': 'off',
    },
  },
]);

export default eslintConfig;
