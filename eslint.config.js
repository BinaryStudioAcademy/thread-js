import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { resolve as tsResolver } from 'eslint-import-resolver-typescript';
import importPlugin from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import perfectionist from 'eslint-plugin-perfectionist';
import explicitGenerics from 'eslint-plugin-require-explicit-generics';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JS_MAX_PARAMS_ALLOWED = 3;

/** @typedef {import('eslint').Linter.Config} */
let Config;
/** @typedef {import('eslint').Linter.ParserModule} */
let ParserModule;

/** @type {Config} */
const filesConfig = {
  files: ['**/*.{js,ts,tsx}']
};

/** @type {Config} */
const ignoresConfig = {
  ignores: ['apps', 'packages', 'dangerfile.ts']
};

/** @type {Config} */
const jsConfig = {
  languageOptions: {
    globals: globals.node,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },
  rules: {
    ...js.configs.recommended.rules,
    curly: ['error', 'all'],
    eqeqeq: ['error', 'always'],
    'max-params': ['error', JS_MAX_PARAMS_ALLOWED],
    'no-console': ['error'],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1
      }
    ],
    'no-restricted-syntax': [
      'error',
      {
        message: 'Export/Import all (*) is forbidden.',
        selector: 'ExportAllDeclaration,ImportAllDeclaration'
      },
      {
        message: 'Exports should be at the end of the file.',
        selector: 'ExportNamedDeclaration[declaration!=null]'
      },
      {
        message: 'TS features are forbidden.',
        selector: 'TSEnumDeclaration,ClassDeclaration[abstract=true]'
      },
      {
        message:
          'TAvoid import/export type { Type } from "./module". Prefer import/export { type Type } from "./module".',
        selector:
          'ImportDeclaration[importKind=type],ExportNamedDeclaration[exportKind=type]'
      }
    ],
    'no-throw-literal': 'off',
    'object-shorthand': ['error'],
    'prefer-destructuring': ['error'],
    quotes: ['error', 'single']
  }
};

/** @type {Config} */
const importConfig = {
  plugins: {
    import: importPlugin
  },
  rules: {
    ...importPlugin.configs.recommended.rules,
    'import/exports-last': ['error'],
    'import/extensions': [
      'error',
      {
        js: 'always',
        json: 'always'
      }
    ],
    'import/newline-after-import': ['error'],
    'import/no-default-export': ['error'],
    'import/no-duplicates': ['error']
  },
  settings: {
    'import/parsers': {
      espree: ['.js', '.cjs']
    },
    'import/resolver': {
      typescript: tsResolver
    }
  }
};

/** @type {Config} */
const sonarConfig = {
  plugins: {
    sonarjs
  },
  rules: {
    ...sonarjs.configs.recommended.rules,
    'sonarjs/cognitive-complexity': ['error', 16],
    'sonarjs/function-return-type': ['off'],
    'sonarjs/in-operator-type-error': ['off'],
    'sonarjs/no-unused-vars': ['off'],
    'sonarjs/void-use': ['off']
  }
};

/** @type {Config} */
const unicornConfig = {
  plugins: {
    unicorn
  },
  rules: {
    ...unicorn.configs.recommended.rules,
    'unicorn/import-style': ['off'],
    'unicorn/no-null': ['off']
  }
};

/** @type {Config} */
const perfectionistConfig = {
  plugins: {
    perfectionist
  },
  rules: {
    ...perfectionist.configs['recommended-natural'].rules,
    'perfectionist/sort-classes': ['off']
  }
};

/** @type {Config} */
const typescriptConfig = {
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    parser: /** @type {ParserModule} */ (tsParser),
    parserOptions: {
      project: true,
      tsconfigRootDir: dirname(fileURLToPath(import.meta.url))
    }
  },
  plugins: {
    '@typescript-eslint': ts
  },
  rules: {
    ...ts.configs['strict-type-checked'].rules,
    '@typescript-eslint/consistent-type-exports': ['error'],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        fixStyle: 'inline-type-imports'
      }
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowTypedFunctionExpressions: true
      }
    ],
    '@typescript-eslint/explicit-member-accessibility': ['error'],
    '@typescript-eslint/no-magic-numbers': [
      'error',
      {
        ignoreEnums: true,
        ignoreReadonlyClassProperties: true
      }
    ],
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        'checksVoidReturn': false
      }
    ],
    '@typescript-eslint/no-unnecessary-type-parameters': ['off'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { 'argsIgnorePattern': '^_', 'ignoreRestSiblings': true }
    ],
    '@typescript-eslint/only-throw-error': 'error',
    '@typescript-eslint/restrict-plus-operands': ['off'],
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      { allowNumber: true }
    ],
    '@typescript-eslint/return-await': ['error', 'always']
  }
};

/** @type {Config} */
const jsdocConfig = {
  files: ['eslint.config.js', 'lint-staged.config.js'],
  plugins: {
    jsdoc
  },
  rules: {
    ...jsdoc.configs['flat/recommended-typescript-flavor-error'].rules,
    'jsdoc/no-undefined-types': ['error'],
    'jsdoc/require-returns-description': ['off']
  }
};

/** @type {Config} */
const explicitGenericsConfig = {
  plugins: {
    'require-explicit-generics': explicitGenerics
  }
};

/** @type {Config} */
const stylisticConfig = {
  plugins: {
    '@stylistic': stylistic
  },
  rules: {
    '@stylistic/padding-line-between-statements': [
      'error',
      {
        blankLine: 'never',
        next: 'export',
        prev: 'export'
      },
      {
        blankLine: 'always',
        next: '*',
        prev: ['block-like', 'throw', 'type']
      },
      {
        blankLine: 'always',
        next: ['return', 'block-like', 'throw', 'type'],
        prev: '*'
      }
    ]
  }
};

/** @type {Config[]} */
const overridesConfigs = [
  {
    files: [
      'commitlint.config.ts',
      'prettier.config.mjs',
      'stylelint.config.js',
      'knip.config.ts',
      'packages.d.ts',
      'lint-staged.config.js',
      'eslint.config.js'
    ],
    rules: {
      'import/no-default-export': ['off']
    }
  },
  {
    files: ['*.js'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': ['off']
    }
  },
  {
    files: ['commitlint.config.ts'],
    rules: {
      '@typescript-eslint/no-magic-numbers': ['off']
    }
  }
];

/** @type {Config[]} */
const config = [
  filesConfig,
  ignoresConfig,
  jsConfig,
  importConfig,
  sonarConfig,
  unicornConfig,
  perfectionistConfig,
  typescriptConfig,
  jsdocConfig,
  explicitGenericsConfig,
  stylisticConfig,
  ...overridesConfigs
];

export default config;
