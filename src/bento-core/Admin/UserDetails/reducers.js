/**
 * Updates the state of the user's info
 * @param {object} userInfo Incoming user state
 * @param {string} userRole The user's new role
 *
 * @returns {object} User's new state
 */
export default function userRoleReducer(userInfo, userRole) {
  const newUserInfo = {
    ...userInfo,
    role: userRole,
  };

  return newUserInfo;
}
