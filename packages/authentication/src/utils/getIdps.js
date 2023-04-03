import authProviders from '../data/authProviders';
import loginProvidersData from '../data/loginProvidersData';


const getIdps = (authenticationProviders = loginProvidersData) => {
  const defaultIdP = {
    google: {
      key: 'google',
      icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/png/google.png',
      loginButtonText: 'Sign in with Google',
    },
  };

  let idps = Object.fromEntries(
    Object.entries(authenticationProviders).filter(([key]) => authProviders.includes(key)),
  );

  if (typeof (idps) === 'undefined' || Object.values(idps).length === 0) {
    idps = defaultIdP;
  }

  return idps;
};

export default getIdps;
