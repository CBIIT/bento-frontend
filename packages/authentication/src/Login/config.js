import { useAuth } from '../AuthenticationProvider/AuthProviderGenerator';
import redirect from '../utils/redirect';
import useQuery from './hooks/useQuery';
import getRedirectPath from './utils/getRedirectPath';
import getIdps from './utils/getIdps';

/**
 * Default configuration for Login
 */
export const DEFAULT_CONFIG_LOGIN = {
  // Misc. Configuration Options
  config: {},

  // Helper functions used by the component
  functions: {
    /**
     * A function that is called on page load and returns the available sign-in options,
     * including signInWithGoogle and signInWithNIH.
     *
     * @returns {Array} An array of available sign-in options
     */
    useAuth,
    /**
     *
     * Redirects the user to the specified path.
     * @param {any} historyObject
     * @param {string} path - The path to redirect the user to.
     * @returns {any}
     */
    redirect,
    /**
     * Custom hook that uses `useLocation` from `react-router-dom`
     * to get the current location object and `React.useMemo` to memoize
     * the `URLSearchParams` object from the `search` property
     * of the location object.
     *
     *  The `URLSearchParams` object can be used to read URL query parameters.
     *
     * @returns {URLSearchParams} The `URLSearchParams` object containing the query parameters.
     */
    useQuery,
    /**
     * Returns the value of the "redirect" parameter in the query string of the current URL,
     * or "/" if the "redirect" parameter is not present in the query string.
     *
     * @returns {string} The redirect path as a string.
     */
    getRedirectPath,
    /**
     * Returns an object containing the enabled identity providers
     * @param {Array} enabledAuthProviders - List of enabled identity providers
     * @param {Object} authenticationProviders - List of available identity providers
     * @returns {Object} - Object containing enabled identity providers
     */
    getIdps,
  },
};

export default DEFAULT_CONFIG_LOGIN;
