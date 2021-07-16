module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  rules: {
    "array-element-newline": ["error", "consistent"],
    "comma-style": ["error", "last"],
    "comma-dangle": ["error", "only-multiline"],
    indent: [
      "error",
      2,
      {
        ignoredNodes: ["TemplateLiteral"],
      },
    ],
    "no-console": "error",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-trailing-spaces": ["error"],
    semi: ["error", "never"],
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2021,
    sourceType: "module",
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
