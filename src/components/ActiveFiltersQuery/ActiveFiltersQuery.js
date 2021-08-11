import React from 'react';
import { useSelector } from 'react-redux';

const ActiveFiltersQuery = () => {
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
    for (let i = 0; i < currentFilterCheckboxItems.length; i += 1) {
      // check if this checkBox is selected
      if (currentFilterCheckboxItems[i].isChecked === true) {
        // findIndex if the filter is already tracked by activeFilters
        const findIndex = activeFilters.findIndex((x) => x.filterName === currentFilter.groupName);
        if ((activeFilters.findIndex((x) => x.filterName === currentFilter.groupName) !== -1)) {
          activeFilters[findIndex].checkbox.push(currentFilterCheckboxItems[i].name);
        } else {
          activeFilters.push({
            filterName: currentFilter.groupName,
            checkbox: [currentFilterCheckboxItems[i].name],
          });
        }
      }
    }
    return '';
  });

  return (
    <div>
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
  );
};

export default ActiveFiltersQuery;
