import env from '../utils/env';

export const coreRequirements = {
  frontend: env.REACT_APP_FE_VERSION || '0.1.0',
  backend: env.REACT_APP_BE_VERSION || '4.6.0',
  'bento-tools': '0.1.105',
};

export const microServiceRequirements = {
  file: 'main-68',
  auth: 'accept-redirect-url-in-google-65',
  user: 'develop-10',
};

export const dependencyRequirements = {
  node: '15.13.0',
  npm: '7.7.6',
};
