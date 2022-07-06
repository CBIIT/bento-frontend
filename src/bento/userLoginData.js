import { registrationRoute } from './siteWideConfig';

export const pageTitle = 'Login or Register';

export const loginProvidersData = {
  google: {
    key: 'google',
    icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/png/google.png',
    loginButtonText: 'Sign in with Google',
    enabled: true,
  },
  loginGov: {
    key: 'loginGov',
    icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/png/login.gov.png',
    loginButtonText: 'Sign in Login.gov',
    enabled: true,
  },
  NIH: {
    key: 'NIH',
    icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/png/nih_itrust.png',
    loginButtonText: 'Sign in NIH iTrust',
    enabled: true,
  },
};

// TODO: Remove registration all custodian settings from below. We are no longer using it.

export const registrationBoxData = {
  buttonText: 'REGISTER',
  redirectRoute: registrationRoute,
};

export const loginGovCreateAccountURL = 'https://www.login.gov/create-an-account/';

export const bentoHelpEmail = 'bento-help@nih.gov';

export default null;
