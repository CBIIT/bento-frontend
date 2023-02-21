/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { withStyles, Slider, Typography, Box } from '@material-ui/core';
import styles from './SliderStyle';
import { silderTypes } from '../Types';
import InputMinMaxView from './InputMinMaxView';

const SliderView = ({
  classes,
  facet,
  onSliderToggle,
  filterState,
}) => {
  const { minLowerBound, maxUpperBound, quantifier, datafield, facetValues } = facet;
  const lowerBoundValue = facetValues[0];
  const upperBoundValue = facetValues[1];

  const handleChangeCommittedSlider = (value) => {
    if (!value.includes('')) {
      onSliderToggle({ sliderValue: value, ...facet });
    }
  };
  const [sliderValue, setSliderValue] = useState([lowerBoundValue, upperBoundValue]);
  useEffect(() => {
    if (filterState && datafield && filterState[datafield]) {
      setSliderValue([...filterState[datafield]]);
    } else {
      setSliderValue([minLowerBound, maxUpperBound]);
    }
  }, [filterState]);

  const handleChangeSlider = (index, value) => {
    if (!value.includes('')) {
      setSliderValue([...value]);
    }
  };

  const valuetext = (value) => `${value}`;

  return (
    <>
      <div className={classes.sliderRoot}>
        <div className={classes.minMaxInputs}>
          <div className={classes.minValue}>
            <Typography className={classes.minInputLabel}>
              Min:
            </Typography>
            <InputMinMaxView
              lowerBoundVal={sliderValue[0]}
              upperBoundVal={sliderValue[1]}
              minLowerBound={minLowerBound}
              maxUpperBound={maxUpperBound}
              type={silderTypes.INPUT_MIN}
              onInputChange={handleChangeCommittedSlider}
            />
          </div>
          <div className={classes.maxValue}>
            <Typography className={classes.maxInputLabel}>
              Max:
            </Typography>
            <InputMinMaxView
              lowerBoundVal={sliderValue[0]}
              upperBoundVal={sliderValue[1]}
              minLowerBound={minLowerBound}
              maxUpperBound={maxUpperBound}
              type={silderTypes.INPUT_MAX}
              onInputChange={handleChangeCommittedSlider}
            />
          </div>
        </div>
        <div className={classes.slider}>
          <Slider
            value={[...sliderValue]}
            onChange={handleChangeSlider}
            onChangeCommitted={(event, value) => handleChangeCommittedSlider(value)}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            disableSwap
            min={minLowerBound}
            max={maxUpperBound}
            classes={{
              rail: classes.rail,
              thumb: classes.thumb,
              track: classes.track,
            }}
          />
        </div>
        <Box className={classes.lowerUpperBound}>
          <Typography className={classes.lowerBound}>
            {minLowerBound}
          </Typography>
          <Typography className={classes.upperBound}>
            {maxUpperBound}
          </Typography>
        </Box>
      </div>
      {
        (sliderValue[0] > minLowerBound || sliderValue[1] < maxUpperBound)
         && (
          <Typography className={classes.sliderText}>
            {sliderValue[0]}
            {' - '}
            {sliderValue[1]}
            &nbsp;
            {quantifier}
          </Typography>
         )
      }
    </>
  );
};

export default withStyles(styles)(SliderView);
