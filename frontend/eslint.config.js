import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import eslintReact from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  globalIgnores(["dist", "node_modules/**", "coverage/**", "build/**", ".husky/**", "*.min.js"]),

  // Main config
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      eslintReact.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
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

        // Before and after return
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: "return", next: "*" },

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

  // Config files run in Node
  {
    files: ["vite.config.js", "eslint.config.js", "*.config.js"],

    languageOptions: {
      globals: globals.node,
    },
  },

  // Test file overrides
  {
    files: ["test/**/*.{js,jsx}", "**/*.{test,spec}.{js,jsx}"],

    languageOptions: {
      globals: globals.vitest,
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
