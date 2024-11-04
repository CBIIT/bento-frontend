import React from 'react';
import { connect } from 'react-redux';
import { clearFacetSection, clearSliderSection } from '../../store/actions/Actions';
// import FacetView from './FacetView';
import SearchFacetView from './SearchFacetView';

const ReduxSearchFacetView = ((props) => <SearchFacetView {...props} />);

// const mapStateToProps = (state) => ({
//   autoComplete: state?.localFind?.autocomplete || [],
//   upload: state?.localFind?.upload || [],
// });

const mapDispatchToProps = (dispatch) => ({
  onClearFacetSection: (facet) => { dispatch(clearFacetSection(facet)); },
  onClearSliderSection: (facet) => { dispatch(clearSliderSection(facet)); },
});

export default connect(null, mapDispatchToProps)(ReduxSearchFacetView);
