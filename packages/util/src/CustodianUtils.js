/* eslint-disable import/prefer-default-export */
export const custodianUtils = {
  getNodeLevelLabel: (nodeLabel, nodeLevelAccess) => {
    const limit = 30;

    return nodeLevelAccess ? nodeLabel.substring(0, limit) : nodeLabel;
  },
  /**
   * Gets the display format for the authenticator.
   * @param {string} idpValue - The IDP used to login.
   * */
  getAuthenticatorName: (idpValue) => {
    const loginMap = {
      google: 'Google',
      nih: 'NIH',
      'login.gov': 'Login.gov',
    };

    if (Object.prototype.hasOwnProperty.call(loginMap, idpValue)) {
      return loginMap[idpValue];
    }

    return idpValue;
  },
  // Capitalize first letter of each word
  capitalizeFirstLetter: (str) => {
    if (str.toLowerCase() === 'non-member') {
      return 'Non-Member';
    }
    if (str.toLowerCase() === 'nih') {
      return 'NIH';
    }
    if (str.toLowerCase() === 'esi') {
      return 'ESI';
    }
    if (str.toLowerCase() === 'google') {
      return 'Google';
    }
    const words = str.split(' ');
    return words.map((word) => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
  },
};
