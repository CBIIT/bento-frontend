/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
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
          {/* Change to red if invalid range */}
          <Slider
            disableSwap
            getAriaValueText={valuetext}
            onChange={handleChangeSlider}
            onChangeCommitted={(event, value) => handleChangeCommittedSlider(value)}
            value={[...sliderValue]}
            valueLabelDisplay="auto"
            min={minLowerBound}
            max={maxUpperBound}
            classes={{
              colorPrimary: classes.colorPrimary,
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
      fontSize: '10px',
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
      fontSize: '10px',
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
