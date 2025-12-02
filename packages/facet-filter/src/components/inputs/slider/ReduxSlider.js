import React from 'react';
import { connect } from 'react-redux';
import { toggleSilder, unknownAgesChange } from '../../../store/actions/Actions';
import SliderView from './SliderView';

const ReduxSlider = ((props) => <SliderView {...props} />);

const mapStateToProps = (state) => ({
  filterState: state.statusReducer.filterState,
  unknownAgesState: state?.statusReducer?.unknownAgesState || {},
});

const mapDispatchToProps = (dispatch) => ({
  onSliderToggle: (slider) => dispatch(toggleSilder(slider)),
  onUnknownAgesChange: (datafield, unknownAges) => (
    dispatch(unknownAgesChange(datafield, unknownAges))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxSlider);
