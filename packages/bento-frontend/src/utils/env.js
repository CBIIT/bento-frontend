const processEnv = typeof process !== 'undefined' ? process.env : {};
const injectedEnv = window && window.injectedEnv ? window.injectedEnv : {};

/**
 * Returns a boolean value based on the environment variable or a default value if the environment variable is undefined or not a boolean.
 *
 * @param {*} envVariable - The environment variable to evaluate.
 * @param {boolean} defaultValue - The default value to use if the environment variable is undefined or not a boolean.
 * @returns {boolean} - The boolean value of the environment variable or the default value.
 */
export const getEnvBoolean = (envVariable, defaultValue) => {

  //NOTE: Adding specific case if envVariable is in string format.
  if(envVariable === "false") return false;

  return envVariable !== undefined &&  typeof envVariable === 'boolean' ? envVariable : defaultValue;
}

const env = {
  ...injectedEnv,
  ...processEnv,
};

export default env;
