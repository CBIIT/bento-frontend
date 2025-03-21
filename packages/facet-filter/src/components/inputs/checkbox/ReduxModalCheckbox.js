import React from 'react';
import { connect } from 'react-redux';
import { toggleCheckBox } from '../../../store/actions/Actions';
import ModalCheckBoxView from './ModalCheckboxView';

const ReduxCheckbox = ((props) => <ModalCheckBoxView {...props} />);

const mapStateToProps = (state) => ({
  filterState: state.statusReducer.filterState,
});

const mapDispatchToProps = (dispatch) => ({
  onToggle: (view) => dispatch(toggleCheckBox(view)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxCheckbox);
