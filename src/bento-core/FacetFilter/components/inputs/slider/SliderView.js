/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { withStyles, Slider, ListItem } from '@material-ui/core';
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
        <div className={classes.minValue}>
            <span>
              Min:
              &nbsp;
            </span>
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
          <span>
            Max:
            &nbsp;
          </span>
          <InputMinMaxView
            lowerBoundVal={sliderValue[0]}
            upperBoundVal={sliderValue[1]}
            minLowerBound={minLowerBound}
            maxUpperBound={maxUpperBound}
            type={silderTypes.INPUT_MAX}
            onInputChange={handleChangeCommittedSlider}
          />
        </div>
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
        <span className={classes.lowerBound}>
          {minLowerBound}
        </span>
        <span className={classes.upperBound}>
          {maxUpperBound}
        </span>
      </div>
      <div>
        {
          (sliderValue[0] > minLowerBound || sliderValue[1] < maxUpperBound)
           && (
            <div>
              <ListItem
                width={1}
                button
                className={classes.nested}
                classes={{
                  selected: classes.selected,
                  gutters: classes.listItemGutters,
                }}
              >
                <div className={classes.sliderListItem}>
                  <span className={classes.sliderText}>
                    {quantifier}
                  </span>
                  <span className={classes.sliderText}>
                    {sliderValue[1]}
                    &nbsp;
                  </span>
                  <span className={classes.sliderText}>
                    -
                  </span>
                  <span className={classes.sliderText}>
                    {sliderValue[0]}
                  </span>
                </div>
              </ListItem>
            </div>
           )
        }
      </div>
    </>
  );
};

export default withStyles(styles)(SliderView);
