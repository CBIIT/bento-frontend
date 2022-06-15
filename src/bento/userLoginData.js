import Google from '../assets/login/google.png';
import LoginGov from '../assets/login/login.gov.png';
import NihItrust from '../assets/login/nih_itrust.png';

// TODO: Convert this to URL in future.

export const loginProvidersData = {
  google: {
    icon: Google,
    loginButtonText: 'Sign in with Google',
    enabled: true,
  },
  loginGov: {
    icon: LoginGov,
    loginButtonText: 'Sign in Login.gov',
    enabled: true,
  },
  'NIH Login': {
    icon: NihItrust,
    loginButtonText: 'Sign in NIH iTrust',
    enabled: true,
  },
};

export const registrationBoxData = {
  buttonText: 'REGISTER',
  redirectRoute: '/register',
};

export const loginGovCreateAccountURL = 'https://www.login.gov/create-an-account/';

export const bentoHelpEmail = 'bento-help@nih.gov';

export default null;
