import React from 'react';
import {
  Input,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/FacetFiltersStyles';

function InputViewMax(props) {
  const {
    sideBarIndex, sideBarItem, sliderValue, setSliderValue, toggleSlider,
  } = props;
  const handleInputChangeMax = (defaultValue, index, event) => {
    const valueList = [...sliderValue];
    if (typeof valueList[index] === 'undefined') {
      valueList[index] = defaultValue;
      setSliderValue(valueList);
    }
    valueList[index][1] = event.target.value;
    setSliderValue(valueList);
    toggleSlider(valueList[index], sideBarItem);
  };
  const handleBlurMax = (defaultValue, index, min, max, event) => {
    const valueList = [...sliderValue];
    if (typeof valueList[index] === 'undefined') {
      valueList[index] = defaultValue;
      setSliderValue(valueList);
    }
    if (event.target.value < min) {
      valueList[index][1] = max;
    } else if (event.target.value > max) {
      valueList[index][1] = max;
    } else if (event.target.value === '') {
      valueList[index][1] = max;
    }
    setSliderValue(valueList);
    toggleSlider(valueList[index], sideBarItem);
  };
  return (
    <Input
      value={typeof sliderValue[sideBarIndex] !== 'undefined' ? sliderValue[sideBarIndex][1].toString()
        : sideBarItem.checkboxItems.upperBound}
      onChange={(event) => handleInputChangeMax(
        [
          sideBarItem.checkboxItems.lowerBound,
          sideBarItem.checkboxItems.upperBound,
        ],
        sideBarIndex,
        event,
      )}
      onBlur={(event) => handleBlurMax(
        [
          sideBarItem.checkboxItems.lowerBound,
          sideBarItem.checkboxItems.upperBound,
        ],
        sideBarIndex,
        typeof sliderValue[sideBarIndex] !== 'undefined' ? sliderValue[sideBarIndex][0]
          : sideBarItem.checkboxItems.lowerBound,
        sideBarItem.checkboxItems.upperBound,
        event,
      )}
      style={{ width: '40px' }}
      inputProps={{
        step: 1,
        min: typeof sliderValue[sideBarIndex] !== 'undefined' ? sliderValue[sideBarIndex][0]
          : sideBarItem.checkboxItems.lowerBound,
        max: sideBarItem.checkboxItems.upperBound,
        type: 'number',
      }}
    />
  );
}

export default withStyles(styles)(InputViewMax);
