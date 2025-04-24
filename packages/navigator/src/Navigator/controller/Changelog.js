/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { useEffect, useState } from 'react';

/**
* Retrieves the changelog (Markdown) from the specified URL.
*
* @param {string} url - The URL to fetch the changelog from
* @returns {Promise<string | null>} - The retrieved Markdown string, or null if invalid
*/
export const getChangelog = async (url) => {
  if (typeof url !== 'string' || !url?.trim()?.length) {
    console.error('Invalid or empty changelog URL provided.');
    return null;
  }
  try {
    const response = await axios.get(url);
    if (typeof response?.data !== 'string' || !response?.data?.trim()?.length) {
      console.error('Changelog response is empty or not in the expected format.');
      return null;
    }
    return response.data;
  } catch (error) {
    console.error('Failed to fetch changelog:', error);
    return null;
  }
};

export const getChangeLogInfo = async (url) => {
  console.log('get change log info');
  const [data, setData] = useState();
  useEffect(() => {
    getChangelog(url).then((res) => {
      setData(res);
    });
  }, []);

  console.log(data);
  return data;
};
