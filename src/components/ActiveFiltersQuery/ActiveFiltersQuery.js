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

  const queryRenderer = () => {
    let query = `<p class="${classes.query}">`;
    activeFilters.forEach((filter, index) => {
      query = `${query + (index !== 0 ? ' AND ' : '')}<span class="${classes.line}">${filter.filterName.toUpperCase()}</span>`;
      query += (filter.checkbox.length === 1 ? ` IS <span class="${classes.line}">${filter.checkbox[0]}</span>` : ` IN (<span class="${classes.line}">${filter.checkbox.join(', ')}</span>)`);
    });
    query += '</p>';
    [' AND ', ' IS ', ' IN ', ' FOR ', ' SELECT ', ' OR '].forEach((opr) => {
      query = query.replaceAll(opr, `<span class="${classes.operators}">${opr}</span>`);
    });
    return query;
  };

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
          <div dangerouslySetInnerHTML={{ __html: queryRenderer() }} />
        </div>
      </div>
    </div>
  );
};

const styles = (theme) => ({
  clearQueryButton: {
    borderRadius: '15px',
    backgroundColor: '#fff',
    margin: '6px',
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
  query: {
    fontFamily: 'Nunito Sans Black',
    fontSize: '18px',
    letterSpacing: '1px',
    marginRight: '100px',
    lineHeight: 1.65,
  },
  line: {
    paddingBottom: '3px',
    borderBottomStyle: 'solid',
    borderBottomWidth: '2px',
    borderBottomColor: '#10A075',
    width: 'fit-content',
  },
  operators: {
    color: '#64ACD5',
    marginLeft: '3px',
    fontSize: '16px',
    fontWeight: 'bold',
    marginRight: '3px',
    borderBottom: 'none',
    fontFamily: 'Nunito Sans Black',
    textDecoration: 'none',
  },
  clearQueryResult: {
    height: '120px',
    overflowY: 'auto',
    marginTop: '-20px',
    marginLeft: '164px',
    color: theme.palette.clearQueryResultColor.color,
  },
});

export default withStyles(styles, { withTheme: true })(ActiveFiltersQuery);
