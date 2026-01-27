import React from 'react';
import {
  Input,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import defaultStyles from './InputMinMaxStyle';
import { silderTypes } from '../Types';

function InputMinMaxView({
  classes,
  lowerBoundVal,
  upperBoundVal,
  minLowerBound,
  maxUpperBound,
  onInputChange,
  type,
  disabled = false,
}) {
  const handleInputChange = (e) => {
    if (disabled) return;
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
      disabled={disabled}
      inputProps={{
        step: 1,
        min: minLowerBound,
        max: maxUpperBound,
        type: 'number',
        'aria-label': 'minMaxValue',
      }}
    />
  );
}

const styles = () => {
  const defaults = defaultStyles();

  return {
    slider_INPUT_MIN: (props) => ({
      ...defaults.slider_INPUT_MIN,
      ...(props.customStyles && props.customStyles.slider_INPUT_MIN
        ? props.customStyles.slider_INPUT_MIN
        : {}),
    }),
    slider_INPUT_MAX: (props) => ({
      ...defaults.slider_INPUT_MAX,
      ...(props.customStyles && props.customStyles.slider_INPUT_MAX
        ? props.customStyles.slider_INPUT_MAX
        : {}),
    }),
  };
};

export default withStyles(styles)(InputMinMaxView);
