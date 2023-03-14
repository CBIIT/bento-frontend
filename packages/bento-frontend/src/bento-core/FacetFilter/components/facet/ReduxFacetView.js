import React from 'react';
import { connect } from 'react-redux';
import { clearFacetSection, clearSliderSection } from '../../store/actions/SideBar';
import FacetView from './FacetView';

const ReduxFacetView = ((props) => <FacetView {...props} />);

const mapStateToProps = (state) => ({
  filterState: state.statusReducer.filterState,
});

const mapDispatchToProps = (dispatch) => ({
  onClearFacetSection: (facet) => { dispatch(clearFacetSection(facet)); },
  onClearSliderSection: (facet) => { dispatch(clearSliderSection(facet)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxFacetView);
