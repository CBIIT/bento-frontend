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
import { clearAllFilters } from '../../store/actions/SideBar';

const ClearAllFiltersBtn = ({
  CustomClearAllBtn,
  onClearAllFilters,
  filterState,
}) => {
  const dispatchClearAllFilters = () => onClearAllFilters();

  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if (filterState) {
      const filters = Object.keys(filterState).reduce((count, key) => {
        if (Object.keys(filterState[key]).length > 0) { count += 1;}
        return count;
      }, 0);
      if (!disable && filters === 0) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }
  }, [filterState]);

  return (
    <>
      <CustomClearAllBtn
        onClearAllFilters={dispatchClearAllFilters}
        disable={disable}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  filterState: state.statusReducer.filterState,
});

const mapDispatchToProps = (dispatch) => ({
  onClearAllFilters: () => {dispatch(clearAllFilters());},
});

export default connect(mapStateToProps, mapDispatchToProps)(ClearAllFiltersBtn);
