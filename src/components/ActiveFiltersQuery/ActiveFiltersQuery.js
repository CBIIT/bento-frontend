import React from 'react';
import { withStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { clearAllFilters } from '../../pages/dashboardTab/store/dashboardReducer';

const ActiveFiltersQuery = ({ classes }) => {
  // get all filters information from state
  const allFiltersinfo = useSelector((state) => (
    state.dashboardTab
      && state.dashboardTab.checkbox
      ? state.dashboardTab.checkbox : {}));

  // activeFilters helps filtering only active Filters
  const activeFilters = [];

  // Loop all filters to find active ones only
  allFiltersinfo.data.map((currentFilter) => {
    // currentFilterCheckboxItems contains checkbox items for currentFilter
    const currentFilterCheckboxItems = currentFilter.checkboxItems;

    // loop currentFilterCheckboxItems
    currentFilterCheckboxItems.forEach((checkBox) => {
      // check if this checkBox is selected
      if (checkBox.isChecked === true) {
        // findIndex if the filter is already tracked by activeFilters
        const findIndex = activeFilters.findIndex((x) => x.filterName === currentFilter.groupName);
        if ((activeFilters.findIndex((x) => x.filterName === currentFilter.groupName) !== -1)) {
          activeFilters[findIndex].checkbox.push(checkBox.name);
        } else {
          activeFilters.push({
            filterName: currentFilter.groupName,
            checkbox: [checkBox.name],
          });
        }
      }
    });

    return '';
  });

  return (
    <div className={classes.queryWrapper}>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => clearAllFilters()}
        className={classes.clearQueryButton}
        disabled={activeFilters.length <= 0}
      >
        Clear Query
      </Button>
      <span className={classes.queryContainer}>
        {activeFilters.map((filter, index) => (
          <span>
            <span>
              {' '}
              {index !== 0 ? <span className={classes.operators}> AND </span> : ''}
              <span className={classes.filterName}>
                {filter.filterName}
              </span>
              {' '}
            </span>
            <span>
              {' '}
              <span className={classes.operators}>
                {filter.checkbox.length === 1 ? 'IS ' : 'IN '}
              </span>
              {filter.checkbox.length === 1
                ? (
                  <span className={classes.filterCheckboxes}>
                    {filter.checkbox[0]}
                  </span>
                ) : (
                  <>
                    (
                    <span className={classes.filterCheckboxes}>
                      {filter.checkbox.join()}
                    </span>
                    )
                  </>
                )}
            </span>
          </span>
        ))}
      </span>
    </div>
  );
};

const styles = () => ({
  queryWrapper: {
    height: '120px',
    backgroundColor: '#f1f1f1',
    padding: '8px 15px 0px 40px',
    overflowY: 'auto',
  },
  queryContainer: {
    marginLeft: '15px',
    position: 'relative',
    lineHeight: '1.5',
    letterSpacing: '0.5px',
    fontFamily: 'Nunito',
    fontSize: '14px',
    color: '#0e3151',
  },
  filterName: {
    textTransform: 'uppercase',
  },
  filterCheckboxes: {
    paddingBottom: '3px',
    width: 'fit-content',
    borderBottom: '2px solid #10A075',
  },
  operators: {
    fontWeight: 900,
    color: '#44afe7',
    marginLeft: '3px',
    marginRight: '3px',
    borderBottom: 'none',
    textDecoration: 'none',
  },
  clearQueryButton: {
    margin: '1px',
    fontWeight: 400,
    fontSize: '14px',
    color: '#638FB5',
    marginLeft: '-15px',
    borderRadius: '15px',
    fontFamily: 'Nunito',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    textTransform: 'capitalize',
    border: '1px solid #B4B4B4',
  },
});

export default withStyles(styles, { withTheme: true })(ActiveFiltersQuery);
