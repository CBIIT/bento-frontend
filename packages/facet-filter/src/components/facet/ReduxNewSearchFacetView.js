import React from 'react';
import { connect } from 'react-redux';
import {
  clearFacetSection,
  clearSliderSection,
  searchTextChange,
  sortChange,
} from '../../store/actions/Actions';
// import FacetView from './FacetView';
import NewSearchFacetView from './NewSearchFacetView';

const ReduxNewSearchFacetView = ((props) => <NewSearchFacetView {...props} />);

const mapStateToProps = (state, ownProps) => ({
  searchText: state.statusReducer?.searchState[ownProps.facet.datafield] || '',
  sortBy: state.statusReducer.sortState[ownProps.facet.datafield] || null,
});

const mapDispatchToProps = (dispatch) => ({
  onClearFacetSection: (facet) => { dispatch(clearFacetSection(facet)); },
  onClearSliderSection: (facet) => { dispatch(clearSliderSection(facet)); },
  onSearchTextChange: (datafield, searchText) => {
    dispatch(searchTextChange(datafield, searchText));
  },
  onSortChange: (datafield, sortBy) => {
    dispatch(sortChange(datafield, sortBy));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxNewSearchFacetView);
