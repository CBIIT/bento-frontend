import gql from 'graphql-tag';
import { accessLevelTypes, userRoles, membershipStatus } from '@bento-core/authentication';
import { deleteFromLocalStorage } from '../../utils/localStorage';
import {enableAuthentication, loginPath, requestAccessPath, adminPortalPath, userProfilePath, PUBLIC_ACCESS } from '../../bento/siteWideConfig';

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
export const AUTH_MIDDLEWARE_CONFIG = {
  // Misc. Configuration Options
  config: {
    enableAuthentication,
    loginPath,
    requestAccessPath,
    adminPortalPath,
    userProfilePath,
    PUBLIC_ACCESS,
    accessLevelTypes,
    userRoles,
    membershipStatus,
    GET_USER_DETAILS,
  },

  // Helper functions used by the component
  functions: {

    /**
     * A function that is called when value is needed to remove from Local Storage.
     *
     * @param {String} key key of object in Local Storage.
     * @param {Object} value Object or String that needes to be store in Local Storage.
     */
    deleteFromLocalStorage,
  },
};

export default AUTH_MIDDLEWARE_CONFIG;
