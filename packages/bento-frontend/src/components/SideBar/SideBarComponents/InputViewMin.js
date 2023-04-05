import React from 'react';
import {
  Input,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/FacetFiltersStyles';

function InputViewMin(props) {
  const {
    sideBarIndex, sideBarItem, sliderValue, setSliderValue, toggleSlider,
  } = props;
  const handleInputChangeMin = (defaultValue, index, event) => {
    const valueList = [...sliderValue];
    if (typeof valueList[index] === 'undefined') {
      valueList[index] = defaultValue;
      setSliderValue(valueList);
    }
    valueList[index][0] = event.target.value;
    setSliderValue(valueList);
    toggleSlider(valueList[index], sideBarItem);
  };
  const handleBlurMin = (defaultValue, index, min, max, event) => {
    const valueList = [...sliderValue];
    if (typeof valueList[index] === 'undefined') {
      valueList[index] = defaultValue;
      setSliderValue(valueList);
    }
    if (event.target.value < min) {
      valueList[index][0] = min;
    } else if (event.target.value > max) {
      valueList[index][0] = min;
    } else if (event.target.value === '') {
      valueList[index][0] = min;
    }
    setSliderValue(valueList);
    toggleSlider(valueList[index], sideBarItem);
  };
  return (
    <Input
      value={typeof sliderValue[sideBarIndex] !== 'undefined' ? sliderValue[sideBarIndex][0].toString()
        : sideBarItem.checkboxItems.lowerBound}
      onChange={(event) => handleInputChangeMin(
        [
          sideBarItem.checkboxItems.lowerBound,
          sideBarItem.checkboxItems.upperBound,
        ],
        sideBarIndex,
        event,
      )}
      onBlur={(event) => handleBlurMin(
        [
          sideBarItem.checkboxItems.lowerBound,
          sideBarItem.checkboxItems.upperBound,
        ],
        sideBarIndex,
        sideBarItem.checkboxItems.lowerBound,
        typeof sliderValue[sideBarIndex] !== 'undefined' ? sliderValue[sideBarIndex][1]
          : sideBarItem.checkboxItems.upperBound,
        event,
      )}
      style={{ width: '40px' }}
      inputProps={{
        step: 1,
        min: sideBarItem.checkboxItems.lowerBound,
        max: typeof sliderValue[sideBarIndex] !== 'undefined' ? sliderValue[sideBarIndex][1]
          : sideBarItem.checkboxItems.upperBound,
        type: 'number',
      }}
    />
  );
}

export default withStyles(styles)(InputViewMin);
