import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Extra ignores:
    "node_modules/**",
    "coverage/**",
    "dist/**",
    ".husky/**",
    "*.min.js",
  ]),

  // Main config
  {
    files: ["**/*.{js,jsx,mjs,ts,tsx}"],

    languageOptions: {
      ecmaVersion: 2026,
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        global: "readonly",
        URL: "readonly",
        fetch: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
      },
    },

    plugins: {
      prettier: eslintPluginPrettier,
    },

    rules: {
      // Errors
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-undef": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-const-assign": "error",
      "no-unreachable": "error",
      "no-unexpected-multiline": "error",

      // Blank line rules
      "padding-line-between-statements": [
        "error",

        // After the import block
        { blankLine: "always", prev: "import", next: "*" },
        { blankLine: "any", prev: "import", next: "import" },

        // Before return
        { blankLine: "always", prev: "*", next: "return" },

        // Around control-flow blocks
        {
          blankLine: "always",
          prev: "*",
          next: ["if", "for", "while", "switch", "try"],
        },
        {
          blankLine: "always",
          prev: ["if", "for", "while", "switch", "try"],
          next: "*",
        },

        // After a block of declarations, but not between them
        { blankLine: "always", prev: ["const", "let"], next: "*" },
        { blankLine: "any", prev: ["const", "let"], next: ["const", "let"] },

        // Between top-level functions and exports
        { blankLine: "always", prev: "*", next: ["function", "export"] },
      ],

      // Imports
      "no-duplicate-imports": "error",
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["/media/*", "/home/*", "/tmp/*"],
              message: "Use relative paths.",
            },
          ],
        },
      ],

      // Function spacing (disabled by eslint-config-prettier — kept as intent)
      "space-before-function-paren": [
        "error",
        { anonymous: "always", named: "always", asyncArrow: "always" },
      ],
      "space-before-blocks": "error",
      "arrow-spacing": ["error", { before: true, after: true }],
      "space-in-parens": ["error", "never"],
      "rest-spread-spacing": ["error", "never"],
      "comma-spacing": ["error", { before: false, after: true }],
      "keyword-spacing": ["error", { before: true, after: true }],
      "space-infix-ops": "error",

      // Warnings
      "no-debugger": "warn",
      "no-var": "warn",
      "prefer-const": "warn",
      "prefer-template": "warn",
      "prefer-arrow-callback": "warn",

      // Disables
      "no-console": "off",
      quotes: "off",
      semi: "off",
      indent: "off",

      // Prettier
      "prettier/prettier": "error",
    },
  },

  // Test file overrides
  {
    files: ["test/**/*.{js,jsx,ts,tsx}", "**/*.{test,spec}.{js,jsx,ts,tsx}"],

    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        before: "readonly",
        after: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },

    rules: {
      "no-unused-vars": "off",
      "no-unused-expressions": "off",
    },
  },

  // Prettier compat (must be last)
  eslintConfigPrettier,
]);

export default eslintConfig;
