import Google from '../assets/login/google.png';
import LoginGov from '../assets/login/login.gov.png';
import NihItrust from '../assets/login/nih_itrust.png';
import { registrationRoute } from './siteWideConfig';

export const pageTitle = 'Login or Register';

export const loginProvidersData = {
  google: {
    key: 'google',
    icon: Google,
    loginButtonText: 'Sign in with Google',
    enabled: true,
  },
  loginGov: {
    key: 'loginGov',
    icon: LoginGov,
    loginButtonText: 'Sign in Login.gov',
    enabled: true,
  },
  'NIH Login': {
    key: 'NIH Login',
    icon: NihItrust,
    loginButtonText: 'Sign in NIH iTrust',
    enabled: true,
  },
};

export const registrationBoxData = {
  buttonText: 'REGISTER',
  redirectRoute: registrationRoute,
};

export const loginGovCreateAccountURL = 'https://www.login.gov/create-an-account/';

export const bentoHelpEmail = 'bento-help@nih.gov';

export default null;
