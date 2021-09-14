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
    <div>
      {activeFilters.length > 0 ? (
        <div className={classes.clearQuery}>
          <Button
            variant="contained"
            color="primary"
            className={classes.clearQueryButton}
            onClick={() => clearAllFilters()}
          >
            Clear Query
          </Button>
        </div>
      ) : ''}
      <div className={classes.clearQueryResult}>
        {activeFilters.map((filter, index) => (
          <span>
            <span>
              {' '}
              {index !== 0 ? 'AND ' : ''}
              {filter.filterName}
              {' '}
            </span>
            <span>
              {' '}
              {filter.checkbox.length === 1 ? `IS ${filter.checkbox[0]}` : `IN (${filter.checkbox.join()}) `}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

const styles = (theme) => ({
  clearQueryButton: {
    borderRadius: '8px',
    margin: '6px',
  },
  clearQuery: {
    float: 'left',
    paddingTop: '15px',
  },
  clearQueryResult: {
    padding: '20px 20px 0px 15px',
    height: '80px',
    overflowY: 'auto',
    marginRight: '250px',
    color: theme.palette.clearQueryResultColor.color,
  },
});

export default withStyles(styles, { withTheme: true })(ActiveFiltersQuery);
