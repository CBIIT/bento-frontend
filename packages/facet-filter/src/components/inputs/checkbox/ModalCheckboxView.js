import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import BaseCheckBoxView from './BaseCheckboxView';
import styles from './ModalCheckboxStyle';

const CheckBoxView = (props) => (
  <BaseCheckBoxView {...props} showDivider={false} />
);

export default withStyles(styles)(CheckBoxView);
