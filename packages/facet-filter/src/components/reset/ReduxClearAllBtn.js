/* eslint-disable block-scoped-var */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable block-spacing */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { clearAllFilters } from '../../store/actions/Actions';

const ClearAllFiltersBtn = ({
  Component,
  onClearAllFilters,
  activeFilters = {},
}) => {
  const dispatchClearAllFilters = () => onClearAllFilters();

  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if (activeFilters) {
      const filters = Object.keys(activeFilters).reduce((count, key) => {
        if (activeFilters[key].length > 0) { count += 1;}
        return count;
      }, 0);
      if (filters === 0) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }
  }, [activeFilters]);

  return (
    <>
      <Component
        onClearAllFilters={dispatchClearAllFilters}
        disable={disable}
      />
    </>
  );
};


const mapDispatchToProps = (dispatch) => ({
  onClearAllFilters: () => {dispatch(clearAllFilters());},
});

export default connect(null, mapDispatchToProps)(ClearAllFiltersBtn);
