// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],


			/*
			 * User-set project styles
			 */
			"indent": ["error", "tab"]
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
			/*
 			 * Angular style overrides
 			 */
			// I don't want to be a dick, but if you're blind then photography sites are probably not for you :(
			"@angular-eslint/template/click-events-have-key-events": ["off"],
			"@angular-eslint/template/interactive-supports-focus": ["off"],
		},
  }
);
