import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { clearAllFilters } from '../../store/actions/SideBar';

const ClearAllFiltersBtn = ({
  CustomClearAllBtn,
  clearAllFilters,
  filterState
}) => {
  const dispatchClearAllFilters = () => clearAllFilters();

  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if (filterState) {
      const filters = Object.keys(filterState).reduce((count, key) => {
        if (Object.keys(filterState[key]).length > 0) { count += 1;}
        return count;
      }, 0);
      if (!disable && filters === 0) {
        setDisable(true);
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
}

const mapStateToProps = (state) => ({
  filterState: state.statusReducer.filterState,
});

const mapDispatchToProps = (dispatch) => ({
  clearAllFilters : () => {dispatch(clearAllFilters())},
});

export default connect(mapStateToProps, mapDispatchToProps)(ClearAllFiltersBtn);
