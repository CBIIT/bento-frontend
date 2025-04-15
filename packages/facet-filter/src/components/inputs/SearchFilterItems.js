/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useRef } from 'react';
import {
  withStyles,
} from '@material-ui/core';
import ReduxSearchCheckbox from './checkbox/ReduxSearchCheckbox';
import { sortBySection } from '../../utils/Sort';
import styles from './FilterItemStyle';

const searchItems = (items, searchText, facet) => {
  let matchedItems = [];
  const keyList = searchText.toUpperCase().split(',').filter((item) => item.trim() !== '');
  if (keyList.length === 0) {
    matchedItems = items;
  } else {
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      for (let j = 0; j < keyList.length; j += 1) {
        const key = keyList[j].trim();
        if (key === '' || item[facet.field].toUpperCase().includes(key)) {
          matchedItems.push(item);
          break;
        }
      }
    }
  }
  return matchedItems;
};

const SearchFilterItems = ({
  facet,
  sortBy,
  searchText,
  classes,
}) => {
  const {
    datafield, section,
  } = facet;
  const initialItemSize = 20;
  const [displayCount, setDisplayCount] = useState(initialItemSize);
  const scrollableRef = useRef(null);
  const sortFilters = sortBySection({ ...facet, sortBy });

  const checkedItems = sortFilters.filter((item) => item.isChecked)
    .map((item, index) => (<ReduxSearchCheckbox
      checkboxItem={{ ...item, index, section }}
      datafield={datafield}
      facet={facet}
    />));

  const newUncheckedFullList = searchItems(sortFilters.filter((item) => !item.isChecked),
    searchText, facet);

  const uncheckedItems = newUncheckedFullList.slice(0, displayCount)
    .map((item, index) => (<ReduxSearchCheckbox
      checkboxItem={{ ...item, index, section }}
      datafield={datafield}
      facet={facet}
    />));

  useEffect(() => {
    scrollableRef.current.scrollTo(0, 0);
    setDisplayCount(initialItemSize);
  }, [searchText]);

  const handleScroll = (e) => {
    if (displayCount < newUncheckedFullList.length) {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      const position = Math.ceil((scrollTop / (scrollHeight - clientHeight)) * 100);
      if (position >= 90) {
        setDisplayCount(displayCount + initialItemSize);
      }
    }
  };

  return (
    <>
      <div>
        <div>
          {checkedItems}
        </div>
        <div
          ref={scrollableRef}
          className={classes.itemsContainer}
          onScroll={handleScroll}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
        >
          {uncheckedItems}
        </div>
      </div>
    </>
  );
};

export default withStyles(styles)(SearchFilterItems);
