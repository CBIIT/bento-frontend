import { NODE_LABEL, NODE_LEVEL_ACCESS } from '../bento/siteWideConfig';

const custodianUtils = {
  getNodeLevelLabel: () => {
    const limit = 30;

    return NODE_LEVEL_ACCESS ? NODE_LABEL.substring(0, limit) : NODE_LABEL;
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

export default custodianUtils;
