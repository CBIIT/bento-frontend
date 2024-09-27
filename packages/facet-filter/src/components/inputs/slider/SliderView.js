/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { withStyles, Slider, Typography, Box } from '@material-ui/core';
import clsx from 'clsx';
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

  // Determines whether the lower bound and upper bound values are valid
  const isValid = () => {
    const checks = [
      lowerBoundValue <= upperBoundValue,
      lowerBoundValue >= minLowerBound,
      upperBoundValue <= maxUpperBound,
    ];

    return checks.every((condition) => condition === true);
  };
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
  }, [facet]);

  const handleChangeSlider = (index, value) => {
    if (!value.includes('')) {
      setSliderValue([...value]);
    }
  };

  const valuetext = (value) => `${value}`;

  return (
    <>
      <div className={classes.sliderRoot}>
        <div className={clsx(classes.minMaxInputs, 'minMaxInputs')}>
          <div className={clsx(classes.minValue, 'min_input_box')}>
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
          <div className={clsx(classes.maxValue, 'max_input_box')}>
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
        <div className={clsx(classes.slider, 'slider')}>
          {/* Change to red if invalid range */}
          <Slider
            disableSwap
            getAriaValueText={valuetext}
            getAriaLabel={(index) => (index === 0 ? 'Minimum Thumb' : 'Maximum Thumb')}
            onChange={handleChangeSlider}
            onChangeCommitted={(event, value) => handleChangeCommittedSlider(value)}
            value={[...sliderValue]}
            valueLabelDisplay="auto"
            min={minLowerBound}
            max={maxUpperBound}
            classes={{
              rail: classes.rail,
              thumb: isValid() ? classes.thumb : classes.invalidThumb,
              track: isValid() ? classes.track : classes.invalidTrack,
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
      {/* Change to red if invalid range */}
      {
        (sliderValue[0] > minLowerBound || sliderValue[1] < maxUpperBound)
        && (
          <Typography
            className={isValid()
              ? classes.sliderText
              : classes.invalidSliderText}
          >
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
