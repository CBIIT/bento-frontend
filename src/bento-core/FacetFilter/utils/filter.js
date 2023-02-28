/* eslint-disable import/prefer-default-export */
/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
/* eslint-disable quotes */

import _ from "lodash";

/* eslint-disable react/jsx-indent */
export const getFilters = (activeFilters) => {
  if (!_.isEmpty(activeFilters)) {
    const filters = Object.keys(activeFilters).reduce((acc, key) => {
      if (Array.isArray(activeFilters[key])) {
        acc[key] = activeFilters[key];
      } else {
        const arr = Object.keys(activeFilters[key]);
        acc[key] = arr;
      }
      return acc;
    },
    {});
    return filters;
  }
  return {};
};
