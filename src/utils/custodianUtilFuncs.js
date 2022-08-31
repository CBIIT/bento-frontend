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
};

export default custodianUtils;
