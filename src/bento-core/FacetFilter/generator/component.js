
import React from 'react';
// import FacetSectionView from './components/section/FacetSectionView';
// import FacetView from './components/facet/FacetView';
// import FacetActionView from './components/facet/FacetActionView';
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
}


// export const generateFacetSectionView = (props) => {
//     return (
//         <FacetSectionView {...props} />
//     )
// }

// export const generateFacetView = (props) => {
//     return (
//         <FacetView {...props} />
//     )
// }

// export const generateFacetActionView = (props) => {
//     return (
//         <FacetActionView {...props} />
//     )
// }

// export const generateFilterComponent = (filterConfig) => {
//   const { facetSearchData } = filterConfig;
//   return (
//     <>
//     </>
//   )
// }