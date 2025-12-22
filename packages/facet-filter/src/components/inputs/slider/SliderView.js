/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
/*
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
*/
// import { generateQueryStr } from '@bento-core/util';
import clsx from 'clsx';
import {
  withStyles,
  Slider,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';
// import styles from './SliderStyle';
import { silderTypes } from '../Types';
import InputMinMaxView from './InputMinMaxView';

const SliderView = ({
  classes,
  facet,
  onSliderToggle,
  filterState,
  queryParams,
  timeUnit = 'days',
  unknownAgesState,
  onUnknownAgesChange,
}) => {
  const { minLowerBound, maxUpperBound, quantifier, datafield, facetValues } = facet;
  // Check if bounds are invalid (both are 0)
  const isBoundsInvalid = !facetValues
    || facetValues.length === 0
    || (facetValues[0] === 0 && facetValues[1] === 0);
  const lowerBoundValue = facetValues[0];
  const upperBoundValue = facetValues[1];
  // const query = new URLSearchParams(useLocation().search);
  // const navigate = useNavigate();

  const unknownAges = unknownAgesState?.[datafield] || 'include';
  const isOnlyUnknownAges = unknownAges === 'only';

  // Get the primary color from facet styling
  const primaryColor = facet?.style?.colorPrimary?.color || '#10A075';

  // Initialize unknownAges from URL parameters on component mount
  useEffect(() => {
    // const urlParams = new URLSearchParams(query);
    // const unknownAgesParam = urlParams.get(`${datafield}_unknownAges`);
    // if (unknownAgesParam && unknownAgesParam !== unknownAges) {
    //   onUnknownAgesChange(datafield, unknownAgesParam);
    // }
  }, []); // Run only once on mount

  const getUnknownAgesText = () => {
    switch (unknownAges) {
      case 'include':
        return 'Unknown ages included';
      case 'exclude':
        return 'Unknown ages excluded';
      case 'only':
        return 'Unknown ages only';
      default:
        return '';
    }
  };

  // Helper function to get display value (convert to years if needed)
  const getDisplayValue = (days) => {
    if (timeUnit === 'years') {
      return Number((days / 365.25).toFixed(2));
    }
    return days;
  };

  // Helper function to convert display value back to days
  const convertToDays = (displayValue) => {
    if (timeUnit === 'years') {
      return Math.round(displayValue * 365.25);
    }
    return displayValue;
  };

  // Determines whether the lower bound and upper bound values are valid
  const isValid = () => {
    if (isBoundsInvalid) return false;

    // Convert bounds to display units for proper validation
    const displayMinLowerBound = getDisplayValue(minLowerBound);
    const displayMaxUpperBound = getDisplayValue(maxUpperBound);
    const displayLowerBoundValue = getDisplayValue(lowerBoundValue);
    const displayUpperBoundValue = getDisplayValue(upperBoundValue);

    const checks = [
      displayLowerBoundValue <= displayUpperBoundValue,
      displayLowerBoundValue >= displayMinLowerBound,
      displayUpperBoundValue <= displayMaxUpperBound,
    ];

    return checks.every((condition) => condition === true);
  };
  const handleChangeCommittedSlider = (value) => {
    if (!value.includes('')) {
      // Convert back to days if in years mode, otherwise use value as-is
      const daysValue = [convertToDays(value[0]), convertToDays(value[1])];
      const paramValue = {};
      paramValue[datafield] = daysValue;
      // const queryStr = generateQueryStr(query, queryParams, paramValue);
      // navigate(`/explore${queryStr}`);
      onSliderToggle({ sliderValue: daysValue, ...facet });
    }
  };
  const [sliderValue, setSliderValue] = useState([
    getDisplayValue(lowerBoundValue),
    getDisplayValue(upperBoundValue),
  ]);
  useEffect(() => {
    // Don't reset slider values if "Only" is selected - preserve current values
    if (unknownAges === 'only') {
      return; // Keep current slider values
    }

    if (filterState && datafield && filterState[datafield]) {
      setSliderValue([
        getDisplayValue(filterState[datafield][0]),
        getDisplayValue(filterState[datafield][1]),
      ]);
    } else {
      setSliderValue([getDisplayValue(minLowerBound), getDisplayValue(maxUpperBound)]);
    }
  }, [facet, timeUnit, unknownAges]);

  const handleChangeSlider = (index, value) => {
    if (!value.includes('')) {
      setSliderValue([...value]);
    }
  };

  const valuetext = (value) => `${value}`;

  const handleUnknownAgesChange = (event) => {
    const newUnknownAges = event.target.value;
    onUnknownAgesChange(datafield, newUnknownAges);

    // When "only" is selected, clear the age filter from the query completely
    if (newUnknownAges === 'only') {
      // Clear the age range parameter from the URL
      const paramValue = {};
      paramValue[datafield] = ''; // Clear the age range filter
      // const queryStr = generateQueryStr(query, queryParams, paramValue);
      // navigate(`/explore${queryStr}`);

      // Keep the current slider values for display (don't reset to defaults)
      // The slider will be disabled but show the user's previous selection
      // setSliderValue remains unchanged - keep current values

      // Clear the slider state in the parent component (don't use age range in query)
      onSliderToggle({ sliderValue: [], ...facet });
    } else if (unknownAges === 'only' && newUnknownAges !== 'only') {
      // When switching away from "only", restore the slider values to the query
      const currentSliderValues = [convertToDays(sliderValue[0]), convertToDays(sliderValue[1])];
      const paramValue = {};
      paramValue[datafield] = currentSliderValues;
      // const queryStr = generateQueryStr(query, queryParams, paramValue);
      // navigate(`/explore${queryStr}`);

      // Restore the slider state in the parent component
      onSliderToggle({ sliderValue: currentSliderValues, ...facet });
    }
  };

  return (
    <>
      <div className={`${classes.sliderRoot} ${isOnlyUnknownAges ? classes.disabledSliderRoot : ''}`}>
        <div className={classes.minMaxInputs}>
          <div className={classes.minValue}>
            <Typography className={classes.minInputLabel}>
              Min:
            </Typography>
            <InputMinMaxView
              className={classes.minInputValue}
              lowerBoundVal={sliderValue[0]}
              upperBoundVal={sliderValue[1]}
              minLowerBound={getDisplayValue(minLowerBound)}
              maxUpperBound={getDisplayValue(maxUpperBound)}
              type={silderTypes.INPUT_MIN}
              onInputChange={handleChangeCommittedSlider}
              disabled={isBoundsInvalid || isOnlyUnknownAges}
              step={timeUnit === 'years' ? 0.01 : 1}
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
              minLowerBound={getDisplayValue(minLowerBound)}
              maxUpperBound={getDisplayValue(maxUpperBound)}
              type={silderTypes.INPUT_MAX}
              onInputChange={handleChangeCommittedSlider}
              disabled={isBoundsInvalid || isOnlyUnknownAges}
              step={timeUnit === 'years' ? 0.01 : 1}
            />
          </div>
        </div>
        <div className={classes.slider}>
          {/* Change to red if invalid range */}
          <Slider
            disableSwap
            disabled={isBoundsInvalid || isOnlyUnknownAges}
            getAriaValueText={valuetext}
            onChange={isBoundsInvalid ? undefined : handleChangeSlider}
            onChangeCommitted={
              isBoundsInvalid ? undefined : (event, value) => handleChangeCommittedSlider(value)
            }
            value={maxUpperBound === 0 ? [0, 0] : [...sliderValue]}
            valueLabelDisplay="auto"
            min={getDisplayValue(minLowerBound)}
            max={maxUpperBound === 0 ? undefined : getDisplayValue(maxUpperBound)}
            step={timeUnit === 'years' ? 0.01 : 1}
            classes={{
              colorPrimary: clsx(`colorPrimary${facet.section}`, classes.colorPrimary),
              rail: isBoundsInvalid || isOnlyUnknownAges ? classes.disabledRail : clsx(`rail${facet.section}`, classes.rail),
              thumb: isBoundsInvalid || isOnlyUnknownAges ? {
                ...classes.disabledThumb,
                background: primaryColor,
              } : clsx(`thumb${facet.section}`, {
                isThumbValid: isValid(),
                invalidThumb: !isValid(),
              }),
              track: isBoundsInvalid || isOnlyUnknownAges ? {
                ...classes.disabledTrack,
                background: primaryColor,
              } : isValid() ? classes.track : classes.invalidTrack,
            }}
          />
        </div>
        <Box className={classes.lowerUpperBound}>
          <Typography className={classes.lowerBound}>
          {getDisplayValue(minLowerBound).toLocaleString()}
          </Typography>
          <Typography className={classes.upperBound}>
            {(minLowerBound === 0 && maxUpperBound === 0) ? '-' : (maxUpperBound !== 0 ? getDisplayValue(maxUpperBound).toLocaleString() : '.')}
          </Typography>
        </Box>
      </div>
      {/* Unknown Ages Section */}
      <Box className={classes.unknownAgesSection}>
        <Typography className={classes.unknownAgesTitle}>
          UNKNOWN AGES:
        </Typography>
        <FormControl component="fieldset" className={classes.unknownAgesFormControl}>
          <RadioGroup
            aria-label="unknown-ages"
            name="unknown-ages"
            value={unknownAges}
            onChange={handleUnknownAgesChange}
            className={classes.unknownAgesRadioGroup}
          >
            <FormControlLabel
              value="include"
              control={<Radio classes={{ root: classes.radio, checked: classes.radioChecked }} />}
              label="Include"
              classes={{ root: classes.radioLabel, label: classes.radioLabelText }}
            />
            <FormControlLabel
              value="exclude"
              control={<Radio classes={{ root: classes.radio, checked: classes.radioChecked }} />}
              label="Exclude"
              classes={{ root: classes.radioLabel, label: classes.radioLabelText }}
            />
            <FormControlLabel
              value="only"
              control={<Radio classes={{ root: classes.radio, checked: classes.radioChecked }} />}
              label="Only"
              classes={{ root: classes.radioLabel, label: classes.radioLabelText }}
            />
          </RadioGroup>
        </FormControl>
      </Box>
      {/* Slider text with unknown ages status */}
      {
        (sliderValue[0] > getDisplayValue(minLowerBound)
          || sliderValue[1] < getDisplayValue(maxUpperBound))
        && (
          <Typography
            className={isValid() ? classes.sliderText : classes.invalidSliderText}
          >
            {sliderValue[0].toLocaleString()}
            {' - '}
            {sliderValue[1].toLocaleString()}
            &nbsp;
            {timeUnit === 'years' ? 'years' : quantifier}
            {', '}
            {getUnknownAgesText()}
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
  disabledSliderRoot: (props) => (props.facet.style && props.facet.style.disabledSliderRoot
    ? props.facet.style.disabledSliderRoot
    : {
      opacity: 0.5,
      pointerEvents: 'none',
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
  disabledRail: (props) => (props.facet.style && props.facet.style.disabledRail
    ? props.facet.style.disabledRail
    : {
      borderRadius: 4,
      height: 6,
      background: '#E8E8E8',
    }),
  disabledThumb: (props) => (props.facet.style && props.facet.style.disabledThumb
    ? props.facet.style.disabledThumb
    : {
      height: 16,
      width: 16,
      cursor: 'not-allowed',
      opacity: 0.4,
    }),
  disabledTrack: (props) => (props.facet.style && props.facet.style.disabledTrack
    ? props.facet.style.disabledTrack
    : {
      borderRadius: 4,
      height: 6,
      opacity: 0.4,
      '&~&': {
        background: '#E8E8E8',
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
      padding: '5px 15px 5px 15px',
      width: '100%',
      textAlign: 'right',
      background: '#f5fdee',
      marginTop: '8px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }),
  invalidSliderText: (props) => (props.facet.style && props.facet.style.invalidSliderText
    ? props.facet.style.invalidSliderText
    : {
      color: '#D32F2F',
      lineHeight: '120%',
      fontFamily: 'Nunito',
      fontSize: '14px',
      padding: '5px 15px 5px 15px',
      width: '100%',
      textAlign: 'right',
      background: '#E57373',
      marginTop: '8px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
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
  unknownAgesSection: (props) => (props.facet.style && props.facet.style.unknownAgesSection
    ? props.facet.style.unknownAgesSection
    : {
      marginTop: '10px',
      paddingTop: '10px',
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingBottom: '0px',
      borderTop: '1px solid #CCCCCC',
    }),
  unknownAgesTitle: (props) => (props.facet.style && props.facet.style.unknownAgesTitle
    ? props.facet.style.unknownAgesTitle
    : {
      fontFamily: 'Poppins',
      fontSize: '13px',
      fontWeight: '400',
      color: '#323232',
      marginBottom: '6px',
      letterSpacing: '0.25px',
    }),
  unknownAgesFormControl: {
    width: '100%',
  },
  unknownAgesRadioGroup: {
    flexDirection: 'row',
    gap: '10px',
  },
  radioLabel: (props) => (props.facet.style && props.facet.style.radioLabel
    ? props.facet.style.radioLabel
    : {
      marginRight: '10px',
      marginBottom: '0px',
      marginTop: '0px',
    }),
  radioLabelText: (props) => (props.facet.style && props.facet.style.radioLabelText
    ? props.facet.style.radioLabelText
    : {
      fontFamily: 'Poppins',
      fontSize: '14px',
      color: '#000000',
    }),
  radio: (props) => (props.facet.style && props.facet.style.radio
    ? props.facet.style.radio
    : {
      color: '#CCCCCC',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    }),
  radioChecked: (props) => {
    const primaryColor = (props.facet && props.facet.style && props.facet.style.colorPrimary)
      ? props.facet.style.colorPrimary.color
      : '#3f51b5';

    return props.facet.style && props.facet.style.radioChecked
      ? props.facet.style.radioChecked
      : {
        color: `${primaryColor} !important`,
      };
  },
});

export default withStyles(styles)(SliderView);
