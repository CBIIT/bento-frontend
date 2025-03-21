/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
import React from 'react';
import ReduxSearchCheckbox from './checkbox/ReduxSearchCheckbox';
import { sortBySection } from '../../utils/Sort';

const SearchFilterItems = ({
  facet,
  sortBy,
  searchText,
}) => {
  const { datafield, section } = facet;
  const sortFilters = sortBySection({ ...facet, sortBy });

  const checkedItems = sortFilters.filter((item) => item.isChecked)
    .map((item, index) => (<ReduxSearchCheckbox
      checkboxItem={{ ...item, index, section }}
      datafield={datafield}
      facet={facet}
    />));
  const uncheckedFullList = sortFilters.filter((item) => !item.isChecked)
    .filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));

  // current page, page_size, apply scrolling and loading
  const uncheckedItems = uncheckedFullList.map((item, index) => (<ReduxSearchCheckbox
    checkboxItem={{ ...item, index, section }}
    datafield={datafield}
    facet={facet}
  />));

  return (
    <div>
      <div>
        {checkedItems}
      </div>
      <div>
        {uncheckedItems}
      </div>
    </div>
  );
};

export default SearchFilterItems;
