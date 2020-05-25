module.exports = {
  env: {
    es6: true,
    node: true,
    jasmine: true,
    mocha: true
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': ['error'],
    camelcase: 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'func-names': 'off'
  }
};
