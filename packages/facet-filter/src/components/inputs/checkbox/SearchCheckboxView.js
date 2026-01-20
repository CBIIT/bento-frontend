import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import BaseCheckBoxView from './BaseCheckboxView';
import styles from './CheckboxStyle';

const CheckBoxView = (props) => (
  <BaseCheckBoxView {...props} showDivider />
);

export default withStyles(styles)(CheckBoxView);
