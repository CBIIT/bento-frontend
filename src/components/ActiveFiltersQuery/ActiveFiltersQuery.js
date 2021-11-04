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
  // Loop all filters except range filter to find active ones only
  const rangeData = allFiltersinfo.data.filter((sideBar) => sideBar.slider === true);
  allFiltersinfo.data = allFiltersinfo.data.filter((sideBar) => sideBar.slider !== true);
  allFiltersinfo.data.map((currentFilter) => {
    // currentFilterCheckboxItems contains checkbox items for currentFilter
    const currentFilterCheckboxItems = currentFilter.checkboxItems;

    // loop currentFilterCheckboxItems
    currentFilterCheckboxItems.forEach((checkBox) => {
      // check if this checkBox is selected
      if (checkBox.isChecked === true) {
        // findIndex if the filter is already tracked by activeFilters
        const findIndex = activeFilters.findIndex(
          (x) => x.filterName === currentFilter.groupName,
        );
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
  allFiltersinfo.data = allFiltersinfo.data.concat(rangeData);

  return (
    <div className={classes.queryWrapper}>
      <div>
        <div className={classes.clearQuery}>
          <Button
            color="primary"
            variant="outlined"
            className={classes.clearQueryButton}
            onClick={() => clearAllFilters()}
            disabled={activeFilters.length <= 0}
          >
            Clear Query
          </Button>
        </div>
        <div className={classes.clearQueryResult}>
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
                        { filter.checkbox.join() }
                      </span>
                      )
                    </>
                  )}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = (theme) => ({
  clearQueryButton: {
    borderRadius: '15px',
    border: '1px solid #B4B4B4',
    backgroundColor: '#fff',
    margin: '6px',
    color: '#638FB5',
    fontSize: '14px',
    boxSizing: 'border-box',
    fontFamily: 'Nunito',
    textTransform: 'capitalize',
    fontWeight: 400,
  },
  queryWrapper: {
    padding: '10px 15px 0px 15px',
    backgroundColor: '#f1f1f1',
    height: '120px',
  },
  clearQuery: {
    float: 'left',
    paddingTop: '15px',
  },
  filterCheckboxes: {
    paddingBottom: '3px',
    width: 'fit-content',
    borderBottom: '0.10625em solid #10A075',
  },
  operators: {
    color: '#64ACD5',
    marginLeft: '3px',
    fontSize: '16px',
    fontWeight: 'bold',
    marginRight: '3px',
    borderBottom: 'none',
    fontFamily: 'Nunito',
    fontWigth: 800,
    textDecoration: 'none',
  },
  clearQueryResult: {
    fontFamily: 'Nunito',
    fontWigth: 800,
    fontSize: '18px',
    letterSpacing: '0.5px',
    margin: '-12px 65px 0px 142px',
    lineHeight: 1.65,
    height: '120px',
    overflowY: 'auto',
    paddingTop: '17px',
    paddingRight: '10px',
    color: theme.palette.clearQueryResultColor.color,
  },
  filterName: {
    textTransform: 'uppercase',
  },
});

export default withStyles(styles, { withTheme: true })(ActiveFiltersQuery);
