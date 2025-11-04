import React from 'react';
import { connect } from 'react-redux';
import {
  clearFacetSection,
  clearSliderSection,
  timeUnitChange,
  unknownAgesChange,
} from '../../store/actions/Actions';
import NewFacetView from './NewFacetView';

const ReduxNewFacetView = ((props) => <NewFacetView {...props} />);

const mapStateToProps = (state) => ({
  timeUnitState: state?.statusReducer?.timeUnitState || {},
  unknownAgesState: state?.statusReducer?.unknownAgesState || {},
});

const mapDispatchToProps = (dispatch) => ({
  onClearFacetSection: (facet) => { dispatch(clearFacetSection(facet)); },
  onClearSliderSection: (facet) => { dispatch(clearSliderSection(facet)); },
  onTimeUnitChange: (datafield, timeUnit) => { dispatch(timeUnitChange(datafield, timeUnit)); },
  onUnknownAgesChange: (datafield, unknownAges) => {
    dispatch(unknownAgesChange(datafield, unknownAges));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxNewFacetView);
