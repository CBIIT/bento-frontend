const processEnv = typeof process !== 'undefined' ? process.env : {};
const injectedEnv = window && window.injectedEnv ? window.injectedEnv : {};

const env = {
  ...injectedEnv,
  ...processEnv,
};

export default env;
