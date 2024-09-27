import React from 'react';
import {
  Input,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './InputMinMaxStyle';
import { silderTypes } from '../Types';

function InputMinMaxView({
  classes,
  lowerBoundVal,
  upperBoundVal,
  minLowerBound,
  maxUpperBound,
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
      id={`slider_${type}`}
      className={classes[`slider_${type}`]}
      onChange={(event) => handleInputChange(event)}
      inputProps={{
        step: 1,
        min: minLowerBound,
        max: maxUpperBound,
        type: 'number',
        'aria-label': type === silderTypes.INPUT_MIN ? 'Slider Minimum' : 'Slider Maximum',
      }}
    />
  );
}

export default withStyles(styles)(InputMinMaxView);
