import React from 'react';
import { connect } from 'react-redux';
import { toggleCheckBox } from '../../../store/actions/Actions';
import CheckboxView from './CheckboxView';

const ReduxCheckbox = ((props) => <CheckboxView {...props} />);

const mapDispatchToProps = (dispatch) => ({
  onToggle: (view) => dispatch(toggleCheckBox(view)),
});

export default connect(null, mapDispatchToProps)(ReduxCheckbox);
