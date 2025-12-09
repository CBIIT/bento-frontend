/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import clsx from 'clsx';
import { debounce } from 'lodash';
import { withStyles, Slider, Typography, Box } from '@material-ui/core';
// import styles from './SliderStyle';
import { silderTypes } from '../Types';
import InputMinMaxView from './InputMinMaxView';

const SliderView = ({
  classes,
  facet,
  onSliderToggle,
  filterState,
}) => {
  const { minLowerBound, maxUpperBound, quantifier, datafield, facetValues } = facet;
  // Check if bounds are invalid (both are 0)
  const isBoundsInvalid = !facetValues
    || facetValues.length === 0
    || (facetValues[0] === 0 && facetValues[1] === 0);
  const lowerBoundValue = facetValues[0];
  const upperBoundValue = facetValues[1];

  // Determines whether the lower bound and upper bound values are valid
  const isValid = () => {
    if (isBoundsInvalid) return false;
    const checks = [
      lowerBoundValue <= upperBoundValue,
      lowerBoundValue >= minLowerBound,
      upperBoundValue <= maxUpperBound,
    ];

    return checks.every((condition) => condition === true);
  };
  const [sliderValue, setSliderValue] = useState([lowerBoundValue, upperBoundValue]);

  // Use ref to maintain stable debounced function
  const debouncedHandleChangeCommittedSlider = useRef(
    debounce((value) => {
      if (!value.includes('')) {
        onSliderToggle({ sliderValue: value, ...facet });
      }
    }, 300),
  ).current;

  // Update debounced function when dependencies change
  useEffect(() => {
    debouncedHandleChangeCommittedSlider.cancel();
    // Note: We keep the same debounced instance but facet is captured in closure
  }, [facet, onSliderToggle, debouncedHandleChangeCommittedSlider]);

  // Handler for input changes: updates local state immediately, debounces commit
  const handleInputChange = useCallback((value) => {
    // Update local state immediately for visual feedback
    if (!value.includes('')) {
      setSliderValue([...value]);
    }
    // Debounce the commit to parent
    debouncedHandleChangeCommittedSlider(value);
  }, [debouncedHandleChangeCommittedSlider]);

  // Cleanup debounced function on unmount
  useEffect(
    () => () => debouncedHandleChangeCommittedSlider.cancel(),
    [debouncedHandleChangeCommittedSlider],
  );
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
        <div className={classes.minMaxInputs}>
          <div className={classes.minValue}>
            <Typography className={classes.minInputLabel}>
              Min:
            </Typography>
            <InputMinMaxView
              className={classes.minInputValue}
              lowerBoundVal={sliderValue[0]}
              upperBoundVal={sliderValue[1]}
              minLowerBound={minLowerBound}
              maxUpperBound={maxUpperBound}
              type={silderTypes.INPUT_MIN}
              onInputChange={handleInputChange}
              disabled={isBoundsInvalid}
            />
          </div>
          <div className={classes.maxValue}>
            <Typography className={classes.maxInputLabel}>
              Max:
            </Typography>
            <InputMinMaxView
              className={classes.maxInputValue}
              lowerBoundVal={sliderValue[0]}
              upperBoundVal={sliderValue[1]}
              minLowerBound={minLowerBound}
              maxUpperBound={maxUpperBound}
              type={silderTypes.INPUT_MAX}
              onInputChange={handleInputChange}
              disabled={isBoundsInvalid}
            />
          </div>
        </div>
        <div className={classes.slider}>
          {/* Change to red if invalid range */}
          <Slider
            disableSwap
            disabled={isBoundsInvalid}
            getAriaValueText={valuetext}
            onChange={isBoundsInvalid ? undefined : handleChangeSlider}
            onChangeCommitted={
              isBoundsInvalid
                ? undefined
                : (event, value) => debouncedHandleChangeCommittedSlider(value)
            }
            value={maxUpperBound === 0 ? [0, 0] : [...sliderValue]}
            valueLabelDisplay="auto"
            min={minLowerBound}
            max={maxUpperBound === 0 ? undefined : maxUpperBound}
            classes={{
              colorPrimary: clsx(`colorPrimary${facet.section}`, classes.colorPrimary),
              rail: clsx(`rail${facet.section}`, classes.rail),
              thumb: clsx(`thumb${facet.section}`, {
                isThumbValid: isValid(),
                invalidThumb: !isValid(),
              }),
              track: clsx(`track${facet.section}`, {
                isTrackValid: isValid(),
                invalidTrack: !isValid(),
              }),
            }}
          />
        </div>
        <Box className={classes.lowerUpperBound}>
          <Typography className={classes.lowerBound}>
            {minLowerBound.toLocaleString()}
          </Typography>
          <Typography className={classes.upperBound}>
            {(minLowerBound === 0 && maxUpperBound === 0) ? '-' : (maxUpperBound !== 0 ? maxUpperBound.toLocaleString() : '.')}
          </Typography>
        </Box>
      </div>
      {/* Change to red if invalid range */}
      {
        (sliderValue[0] > minLowerBound || sliderValue[1] < maxUpperBound)
        && (
          <Typography
            className={isValid() ? classes.sliderText : classes.invalidSliderText}
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

const styles = () => ({
  colorPrimary: (props) => (props.facet.style && props.facet.style.colorPrimary
    ? props.facet.style.colorPrimary
    : {
      color: '#3f51b5',
    }),
  sliderRoot: (props) => (props.facet.style && props.facet.style.sliderRoot
    ? props.facet.style.sliderRoot
    : {
      marginTop: '10px',
      marginLeft: '20px',
      marginRight: 'Auto',
      paddingRight: '20px',
    }),
  minValue: (props) => (props.facet.style && props.facet.style.minValue
    ? props.facet.style.minValue
    : {
      fontFamily: 'Nunito',
      fontSize: '15px',
      color: '#000000',
      marginBottom: '0px',
      float: 'left',
      width: '75px',
      display: 'flex',
    }),
  maxValue: (props) => (props.facet.style && props.facet.style.maxValue
    ? props.facet.style.maxValue
    : {
      fontFamily: 'Nunito',
      fontSize: '15px',
      color: '#000000',
      float: 'right',
      marginBottom: '0px',
      display: 'flex',
    }),
  rail: (props) => (props.facet.style && props.facet.style.rail
    ? props.facet.style.rail
    : {
      borderRadius: 4,
      height: 6,
      background: '#142D64',
    }),
  minInputLabel: (props) => (props.facet.style && props.facet.style.minInputLabel
    ? props.facet.style.minInputLabel
    : {
      float: 'left',
      lineHeight: '34px',
      marginRight: '5px',
    }),
  maxInputLabel: (props) => (props.facet.style && props.facet.style.maxInputLabel
    ? props.facet.style.maxInputLabel
    : {
      float: 'left',
      lineHeight: '34px',
      marginRight: '5px',
    }),
  minInputValue: (props) => (props.facet.style && props.facet.style.minInputValue
    ? props.facet.style.minInputValue
    : {
      fontFamily: 'Montserrat',
      fontSize: '13px',
      color: '#717171',
      background: '#F0F0F0',
      textAlign: 'center',
    }),
  maxInputValue: (props) => (props.facet.style && props.facet.style.maxInputValue
    ? props.facet.style.maxInputValue
    : {
      fontFamily: 'Montserrat',
      fontSize: '13px',
      color: '#717171',
      background: '#F0F0F0',
      textAlign: 'center',
    }),
  thumb: (props) => (props.facet.style && props.facet.style.thumb
    ? props.facet.style.thumb
    : {
      height: 16,
      width: 16,
      background: '#10A075',
    }),
  invalidThumb: (props) => (props.facet.style && props.facet.style.invalidThumb
    ? props.facet.style.invalidThumb
    : {
      height: 16,
      width: 16,
      background: '#F44336',
    }),
  track: (props) => (props.facet.style && props.facet.style.track
    ? props.facet.style.track
    : {
      borderRadius: 4,
      height: 6,
      background: '#10A075',
      '&~&': {
        background: '#142D64',
      },
    }),
  invalidTrack: (props) => (props.facet.style && props.facet.style.invalidTrack
    ? props.facet.style.invalidTrack
    : {
      borderRadius: 4,
      height: 6,
      background: '#F44336',
      '&~&': {
        background: '#142D64',
      },
    }),
  upperBound: (props) => (props.facet.style && props.facet.style.upperBound
    ? props.facet.style.upperBound
    : {
      fontFamily: 'Nunito',
      fontSize: '11px',
      color: '#000000',
      float: 'right',
      marginLeft: 'Auto',
      marginRight: 'Auto',
      marginBottom: '15px',
    }),
  lowerBound: (props) => (props.facet.style && props.facet.style.lowerBound
    ? props.facet.style.lowerBound
    : {
      fontFamily: 'Nunito',
      fontSize: '11px',
      color: '#000000',
      float: 'left',
      marginLeft: 'Auto',
      marginRight: 'Auto',
      marginBottom: '15px',
    }),
  sliderText: (props) => (props.facet.style && props.facet.style.sliderText
    ? props.facet.style.sliderText
    : {
      color: '#10a075',
      lineHeight: '120%',
      fontFamily: 'Nunito',
      fontSize: '14px',
      padding: '5px 15px 5px 0px',
      width: '100%',
      textAlign: 'right',
      background: '#f5fdee',
      marginTop: '10px',
    }),
  invalidSliderText: (props) => (props.facet.style && props.facet.style.invalidSliderText
    ? props.facet.style.invalidSliderText
    : {
      color: '#D32F2F',
      lineHeight: '120%',
      fontFamily: 'Nunito',
      fontSize: '14px',
      padding: '5px 15px 5px 0px',
      width: '100%',
      textAlign: 'right',
      background: '#E57373',
      marginTop: '10px',
    }),
  sliderListItem: (props) => (props.facet.style && props.facet.style.sliderListItem
    ? props.facet.style.sliderListItem
    : {
      height: '15px',
    }),
  listItemGutters: (props) => (props.facet.style && props.facet.style.listItemGutters
    ? props.facet.style.listItemGutters
    : {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '2px 5px 2px 8px',
    }),
  lowerUpperBound: (props) => (props.facet.style && props.facet.style.lowerUpperBound
    ? props.facet.style.lowerUpperBound
    : {
      height: '15px',
    }),
});

export default withStyles(styles)(SliderView);
