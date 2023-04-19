const defaultIdP = {
  google: {
    key: 'google',
    icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/png/google.png',
    loginButtonText: 'Sign in with Google',
  },
};

/**
 * Returns an object containing the enabled identity providers
 * @param {Array} enabledAuthProviders - List of enabled identity providers
 * @param {Object} authenticationProviders - List of available identity providers with their details
 * @returns {Object} - Object containing enabled identity providers
 */
const getIdps = (enabledAuthProviders, authenticationProviders = defaultIdP) => {
  let idps = Object.fromEntries(
    Object.entries(authenticationProviders).filter(([key]) => enabledAuthProviders.includes(key)),
  );

  if (typeof (idps) === 'undefined' || Object.values(idps).length === 0) {
    idps = defaultIdP;
  }

  return idps;
};

export default getIdps;
