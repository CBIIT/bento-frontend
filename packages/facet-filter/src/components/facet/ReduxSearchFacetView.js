import React from 'react';
import { connect } from 'react-redux';
import { clearFacetSection, clearSliderSection } from '../../store/actions/Actions';
import SearchFacetView from './SearchFacetView';

const ReduxFacetView = ((props) => <SearchFacetView {...props} />);

const mapStateToProps = (state) => ({
  filterState: state.statusReducer.filterState,
  autoComplete: state?.localFind?.autocomplete || [],
  upload: state?.localFind?.upload || [],
});

const mapDispatchToProps = (dispatch) => ({
  onClearFacetSection: (facet) => { dispatch(clearFacetSection(facet)); },
  onClearSliderSection: (facet) => { dispatch(clearSliderSection(facet)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxFacetView);
