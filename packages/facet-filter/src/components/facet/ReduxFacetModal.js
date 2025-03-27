import React from 'react';
import { connect } from 'react-redux';
import {
  clearFacetSection,
  searchTextChange,
  sortChange,
} from '../../store/actions/Actions';
// import FacetView from './FacetView';
import FacetModal from './FacetModal';

const ReduxFacetModal = ((props) => <FacetModal {...props} />);

const mapStateToProps = (state, ownProps) => ({
  searchText: state?.statusReducer?.searchState?.[ownProps.facet.datafield] || '',
  sortBy: state?.statusReducer?.sortState?.[ownProps.facet.datafield] || null,
});

const mapDispatchToProps = (dispatch) => ({
  onClearFacetSection: (facet) => { dispatch(clearFacetSection(facet)); },
  onSearchTextChange: (datafield, searchText) => {
    dispatch(searchTextChange(datafield, searchText));
  },
  onSortChange: (datafield, sortBy) => {
    dispatch(sortChange(datafield, sortBy));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxFacetModal);
