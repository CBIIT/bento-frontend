module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  parser: 'babel-eslint',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/no-unescaped-entities": "off", // To escape the html entotoes in static text
    "react/prop-types": "off", //Will add this back
    "react/jsx-filename-extension": "off",
    "react/no-array-index-key":"off", // This is for passing the array index in .map need to remove this soon
    "no-nested-ternary":"off",
    "jsx-a11y/no-static-element-interactions":"off",
    "jsx-a11y/click-events-have-key-events":"off",
    "react/jsx-props-no-spreading":"off",
    "linebreak-style":"off",
  },
};
