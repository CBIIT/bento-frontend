/**
 * Returns the value of the "redirect" parameter in the query string of the current URL,
 * or "/" if the "redirect" parameter is not present in the query string.
 *
 * @returns {string} The redirect path as a string.
 */
const getRedirectPath = (query) => {
  const path = query.get('redirect') || '/';
  return path;
};

export default getRedirectPath;
