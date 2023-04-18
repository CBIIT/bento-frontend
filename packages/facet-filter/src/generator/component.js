/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable space-in-parens */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable eol-last */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable semi */

import React from 'react';
import FacetSectionView from '../components/section/FacetSectionView';
import ClearAllFiltersBtn from '../components/reset/ReduxClearAllBtn';

/**
 * accepts button as component
 * @param {*} CustomBtn
 * 
 */
export const generateClearAllFilterBtn = (CustomBtn) => {
  return ( <ClearAllFiltersBtn
    CustomClearAllBtn={(props) => (<CustomBtn {...props} />)}
  />);
};

export const generateFacetSectionView = (props) => {
  return (
    <FacetSectionView {...props} />
  );
}
