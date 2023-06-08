/**
 * Parse a number of seconds into a string of the format mm:ss
 *
 * @param {number} seconds
 * @returns {string} mm:ss
 */
export const secondsToMinuteString = (seconds) => new Date(seconds * 1000)
  .toISOString().substring(14, 19);

/**
 * Perform a POST session extension request
 *
 * @param {string} url
 * @returns Promise<boolean> true if successful, false otherwise
 */
export const extendSession = async (url) => {
  try {
    const { status } = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json()).catch(() => {});

    return typeof status === 'boolean' && status;
  } catch (e) {
    return false;
  }
};

/**
 * Performs a GET request to the session ttl endpoint
 *
 * @param {string} url
 * @returns Promise<number> the number of seconds until the session expires
 */
export const getSessionTTL = async (url) => {
  try {
    const { ttl } = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json()).catch(() => {});

    return typeof ttl === 'number' ? ttl : 0;
  } catch (e) {
    return 0;
  }
};
