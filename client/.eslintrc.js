module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  parserOptions: {
    project: "tsconfig.base.json",
    sourceType: "module"
  },
  rules: {
    "@typescript-eslint/no-empty-function": ["error", { "allow": ["constructors"] }],
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/brace-style": "warn",
    "@typescript-eslint/semi": "error"
  }
}
