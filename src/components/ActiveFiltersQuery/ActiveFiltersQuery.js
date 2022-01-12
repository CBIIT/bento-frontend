import React from 'react';
import { withStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import {
  facetSectionVariables,
} from '../../bento/dashboardData';
import { clearAllFilters } from '../../pages/dashboardTab/store/dashboardReducer';

const ActiveFiltersQuery = ({ classes }) => {
  // get all filters information from state
  const allFiltersinfo = useSelector((state) => (
    state.dashboardTab
      && state.dashboardTab.checkbox
      ? state.dashboardTab.checkbox : {}));
  const autoCompleteSelection = useSelector((state) => (state.dashboardTab
    && state.dashboardTab.autoCompleteSelection
    ? state.dashboardTab.autoCompleteSelection.subject_ids : {}));
  const bulkUpload = useSelector((state) => (state.dashboardTab
    && state.dashboardTab.bulkUpload ? state.dashboardTab.bulkUpload.subject_ids : {}));

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
            section: currentFilter.section,
          });
        }
      }
    });
    return '';
  });
  allFiltersinfo.data = allFiltersinfo.data.concat(rangeData);

  const getInputSet = () => {
    if (bulkUpload.length && autoCompleteSelection.length) {
      return (
        <>
          {' '}
          <span
            className={classes.filterCheckboxes}
            style={{
              color: facetSectionVariables.Cases.color,
            }}
          >
            INPUT SET
          </span>
          {' '}
        </>
      );
    }
    return null;
  };

  const getFilterJoin = (data, idx, isLastIndex) => (
    <>
      <span
        className={classes.filterCheckboxes}
        key={idx}
        style={{
          color: facetSectionVariables.Cases.color,
        }}
      >
        {data}
      </span>
      {isLastIndex ? null : ' '}
    </>
  );

  return (
    <div>
      {(activeFilters.length || autoCompleteSelection.length || bulkUpload.length) > 0 ? (
        <div className={classes.queryWrapper}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => clearAllFilters()}
            className={classes.clearQueryButton}
            disabled={(activeFilters.length
              || autoCompleteSelection.length
              || bulkUpload.length) <= 0}
          >
            Clear Query
          </Button>
          <span className={classes.queryContainer}>
            {(autoCompleteSelection.length || bulkUpload.length) ? (
              <span>
                {(bulkUpload.length && !autoCompleteSelection.length)
                  ? (
                    <span
                      className={classes.filterCheckboxes}
                      style={{
                        backgroundColor: facetSectionVariables.Cases.backgroundColor,
                      }}
                    >
                      INPUT CASE SET
                    </span>
                  ) : null}
                {autoCompleteSelection.length
                  ? (
                    <span>
                      {' '}
                      <span
                        className={classes.filterName}
                        style={{
                          backgroundColor: facetSectionVariables.Cases.backgroundColor,
                        }}
                      >
                        Case IDs
                      </span>
                      {' '}
                      {' '}
                      <span className={classes.operators}>
                        {(autoCompleteSelection.length === 1 && !bulkUpload.length) ? 'IS ' : 'IN '}
                      </span>
                    </span>
                  ) : null}
                <span>
                  {autoCompleteSelection.length === 1
                    ? (
                      <>
                        {bulkUpload.length ? <span className={classes.brackets}>(</span> : null}
                        {getInputSet()}
                        <span
                          className={classes.filterCheckboxes}
                          style={{
                            color: facetSectionVariables.Cases.color,
                          }}
                        >
                          {autoCompleteSelection[0]}
                        </span>
                        {bulkUpload.length ? <span className={classes.brackets}>)</span> : null}
                      </>
                    ) : autoCompleteSelection.length >= 3 ? (
                      <>
                        <span className={classes.brackets}>(</span>
                        {getInputSet()}
                        <span
                          className={classes.filterCheckboxes}
                          style={{
                            color: facetSectionVariables.Cases.color,
                          }}
                        >
                          {autoCompleteSelection[0]}
                        </span>
                        {' '}
                        <span
                          className={classes.filterCheckboxes}
                          style={{
                            color: facetSectionVariables.Cases.color,
                          }}
                        >
                          {autoCompleteSelection[1]}
                        </span>
                        ...
                        <span className={classes.brackets}>)</span>
                      </>
                    ) : (
                      autoCompleteSelection.length
                        ? (
                          <>
                            <span className={classes.brackets}>(</span>
                            {getInputSet()}
                            {autoCompleteSelection.map((data, idx) => (
                              getFilterJoin(data, idx, autoCompleteSelection.length - 1 === idx)
                            ))}
                            <span className={classes.brackets}>)</span>
                          </>
                        )
                        : null
                    )}
                </span>
              </span>
            ) : null}
            {
              ((autoCompleteSelection.length || bulkUpload.length) && activeFilters.length)
                ? <span className={classes.operators}> AND </span>
                : null
            }
            {activeFilters.map((filter, index) => (
              <span>
                <span>
                  {' '}
                  {index !== 0 ? <span className={classes.operators}> AND </span> : ''}
                  <span
                    className={classes.filterName}
                    style={{
                      backgroundColor: facetSectionVariables[filter.section].backgroundColor,
                    }}
                  >
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
                      <span
                        className={classes.filterCheckboxes}
                        style={{
                          color: facetSectionVariables[filter.section].color,
                        }}
                      >
                        {filter.checkbox[0]}
                      </span>
                    ) : filter.checkbox.length >= 3 ? (
                      <>
                        <span className={classes.brackets}>(</span>
                        <span
                          className={classes.filterCheckboxes}
                          style={{
                            color: facetSectionVariables[filter.section].color,
                          }}
                        >
                          {filter.checkbox[0]}
                        </span>
                        {' '}
                        <span
                          className={classes.filterCheckboxes}
                          style={{
                            color: facetSectionVariables[filter.section].color,
                          }}
                        >
                          {filter.checkbox[1]}
                        </span>
                        ...
                        <span className={classes.brackets}>)</span>
                      </>
                    ) : (
                      <>
                        <span className={classes.brackets}>(</span>
                        {filter.checkbox.map((data, idx) => (
                          getFilterJoin(data, idx, filter.checkbox.length - 1 === idx)
                        ))}
                        <span className={classes.brackets}>)</span>
                      </>
                    )}
                </span>
              </span>
            ))}
          </span>
        </div>
      ) : ''}
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
    lineHeight: '2.5',
    letterSpacing: '0.5px',
    fontFamily: 'Nunito',
    fontSize: '14px',
    color: '#0e3151',
  },
  filterName: {
    textTransform: 'uppercase',
    padding: '5px 6px 5px 7px',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 600,
  },
  filterCheckboxes: {
    padding: '5px 7px 3px 6px',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 600,
    border: '0.75px solid #898989',
    width: 'fit-content',
    backgroundColor: '#fff',
    // borderBottom: '2px solid #10A075',
  },
  brackets: {
    fontSize: 18,
    fontWeight: 600,
  },
  operators: {
    color: '#646464',
    marginLeft: '3px',
    marginRight: '3px',
    borderBottom: 'none',
    textDecoration: 'none',
    fontSize: 10,
    fontWeight: 'bold',
  },
  clearQueryButton: {
    margin: '1px',
    fontWeight: 600,
    fontSize: '13px',
    color: '#fff',
    marginLeft: '-15px',
    borderRadius: '15px',
    fontFamily: 'Nunito',
    boxSizing: 'border-box',
    backgroundColor: '#969696',
    textTransform: 'capitalize',
    border: '1px solid #B4B4B4',
    padding: '1px 5px 0px 6px',
  },
});

export default withStyles(styles, { withTheme: true })(ActiveFiltersQuery);
