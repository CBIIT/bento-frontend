/* eslint-disable no-unused-vars */
import gql from 'graphql-tag';
import GET_USER_DETAILS from '../../bento/authProviderData';
import env from '../../utils/env';
import { redirect } from '@bento-core/authentication';
import { storeInLocalStorage, deleteFromLocalStorage } from '../../utils/localStorage';

/**
 * Default configuration for Local Find Upload Modal
 */
export const AUTHPROVIDER_CONFIG = {
  // Misc. Configuration Options
  config: {
    GOOGLE_CLIENT_ID: env.REACT_APP_GOOGLE_CLIENT_ID || 'Sample Id',
    NIH_CLIENT_ID: env.REACT_APP_NIH_CLIENT_ID || 'Sample Id',
    NIH_AUTH_URL: env.REACT_APP_NIH_AUTH_URL || 'https://stsstg.nih.gov/auth/oauth/v2/authorize',
    AUTH_API: env.REACT_APP_AUTH_SERVICE_API || '',
    GET_USER_DETAILS,
  },

  // Helper functions used by the component
  functions: {
    /**
     * A function that is called when the redirect is needed to be done.
     *
     * @param {object} history object of history.
     * @param {object} redirectPath reason for the change event
     */
    redirect: redirect,

    /**
     * A function that is called when value is needed to store in Local Storage.
     *
     * @param {String} key key of object in Local Storage.
     * @param {Object} value Object or String that needes to be store in Local Storage.
     */
    storeInLocalStorage: storeInLocalStorage,

    /**
     * A function that is called when value is needed to remove from Local Storage.
     *
     * @param {String} key key of object in Local Storage.
     * @param {Object} value Object or String that needes to be store in Local Storage.
     */
    deleteFromLocalStorage: deleteFromLocalStorage,
  },
};

export default AUTHPROVIDER_CONFIG;
