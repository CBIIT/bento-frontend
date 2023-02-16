import React from 'react';
import {
  Input,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './InputMinMaxStyle';
import { silderTypes } from '../Types';

function InputMinMaxView({
  lowerBoundVal,
  upperBoundVal,
  lowerBound,
  upperBound,
  onInputChange,
  type,
}) {
  const handleInputChange = (e) => {
    const minMaxRange = [lowerBoundVal, upperBoundVal];
    if (type === silderTypes.INPUT_MIN) {
      minMaxRange[0] = Number(e.target.value);
    } else {
      minMaxRange[1] = Number(e.target.value);
    }
    onInputChange(minMaxRange);
  };

  const vlaue = (type === silderTypes.INPUT_MIN) ? lowerBoundVal : upperBoundVal;

  return (
    <Input
      value={vlaue}
      style={{ width: '40px' }}
      onChange={(event) => handleInputChange(event)}
      inputProps={{
        step: 1,
        min: lowerBound,
        max: upperBound,
        type: 'number',
      }}
    />
  );
}

export default withStyles(styles)(InputMinMaxView);
