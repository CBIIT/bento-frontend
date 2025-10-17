import React from 'react';
import { connect } from 'react-redux';
import { clearFacetSection, clearSliderSection } from '../../store/actions/Actions';
import NewFacetView from './NewFacetView';

const ReduxNewFacetView = ((props) => <NewFacetView {...props} />);

// const mapStateToProps = (state) => ({
//   autoComplete: state?.localFind?.autocomplete || [],
//   upload: state?.localFind?.upload || [],
// });

const mapDispatchToProps = (dispatch) => ({
  onClearFacetSection: (facet) => { dispatch(clearFacetSection(facet)); },
  onClearSliderSection: (facet) => { dispatch(clearSliderSection(facet)); },
});

export default connect(null, mapDispatchToProps)(ReduxNewFacetView);
