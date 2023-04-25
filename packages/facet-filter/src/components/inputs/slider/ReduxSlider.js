import React from 'react';
import { connect } from 'react-redux';
import { toggleSilder } from '../../../store/actions/Actions';
import SliderView from './SliderView';

const ReduxSlider = ((props) => <SliderView {...props} />);

const mapStateToProps = (state) => ({
  filterState: state.statusReducer.filterState,
});

const mapDispatchToProps = (dispatch) => ({
  onSliderToggle: (slider) => dispatch(toggleSilder(slider)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxSlider);
