module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": ["function", "if", "else", "each", "include", "mixin"]
    }],
    "no-descending-specificity": null,
    "font-family-no-missing-generic-family-keyword": null
  },
}
