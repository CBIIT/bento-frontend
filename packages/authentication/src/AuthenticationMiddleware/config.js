/* eslint-disable no-unused-vars */
import gql from 'graphql-tag';
import redirect from '../utils/redirect';
import { accessLevelTypes, userRoles, membershipStatus } from '../utils/enums';

const GET_USER_DETAILS = gql`
query getMyUser {
  getMyUser {
    firstName
    lastName
    organization
    userID
    userStatus
    email
    IDP
    role
    creationDate
    editDate
    acl {
      armID
      armName
      accessStatus
      requestDate
      reviewAdminName
      reviewDate
      comment
    }
  }
}
`;

/**
 * Default configuration for Local Find Upload Modal
 */
export const DEFAULT_CONFIG_AUTH_MIDDLEWARE = {
  // Misc. Configuration Options
  config: {
    enableAuthentication: true,
    loginPath: '/login',
    requestAccessPath: '/request',
    adminPortalPath: '/admin',
    userProfilePath: '/profile',
    PUBLIC_ACCESS: '',
    accessLevelTypes,
    userRoles,
    membershipStatus,
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
    redirect,

    /**
     * A function that is called when value is needed to remove from Local Storage.
     *
     * @param {String} key key of object in Local Storage.
     * @param {Object} value Object or String that needes to be store in Local Storage.
     */
    deleteFromLocalStorage: (key) => {},
  },
};

export default DEFAULT_CONFIG_AUTH_MIDDLEWARE;
