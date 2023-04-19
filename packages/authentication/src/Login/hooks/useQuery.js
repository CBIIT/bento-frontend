import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook that uses `useLocation` from `react-router-dom` to get the current location object
 * and `React.useMemo` to memoize the `URLSearchParams` object from the `search` property
 * of the location object.
 *
 *  The `URLSearchParams` object can be used to read URL query parameters.
 *
 * @returns {URLSearchParams} The `URLSearchParams` object containing the query parameters.
 */
const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

export default useQuery;
