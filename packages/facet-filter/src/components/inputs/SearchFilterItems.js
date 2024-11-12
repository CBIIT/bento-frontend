/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useRef } from 'react';
import {
  withStyles,
  Button,
} from '@material-ui/core';
import ReduxSearchCheckbox from './checkbox/ReduxSearchCheckbox';
import { sortBySection } from '../../utils/Sort';
import styles from './FilterItemStyle';
import ReduxFacetModal from '../facet/ReduxFacetModal';

const SearchFilterItems = ({
  facet,
  queryParams,
  sortBy,
  searchText,
  classes,
}) => {
  const {
    datafield, section,
  } = facet;
  const initialItemSize = 15;
  const [total, setTotal] = useState(0);
  const [displayCount, setDisplayCount] = useState(initialItemSize);
  const [open, setOpen] = useState(false);
  const scrollableRef = useRef(null);
  const sortFilters = sortBySection({ ...facet, sortBy });

  const checkedItems = sortFilters.filter((item) => item.isChecked)
    .map((item, index) => (<ReduxSearchCheckbox
      checkboxItem={{ ...item, index, section }}
      datafield={datafield}
      facet={facet}
      queryParams={queryParams}
    />));

  const uncheckedItems = sortFilters.filter((item) => !item.isChecked)
    .filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
    .slice(0, displayCount).map((item, index) => (<ReduxSearchCheckbox
      checkboxItem={{ ...item, index, section }}
      datafield={datafield}
      facet={facet}
      queryParams={queryParams}
    />));

  useEffect(() => {
    scrollableRef.current.scrollTo(0, 0);
    const newUncheckedFullList = sortFilters.filter((item) => !item.isChecked)
      .filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));
    setDisplayCount(initialItemSize);
    setTotal(newUncheckedFullList.length);
  }, [searchText]);

  const handleScroll = (e) => {
    if (displayCount < total) {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      const position = Math.ceil((scrollTop / (scrollHeight - clientHeight)) * 100);
      if (position >= 90) {
        setDisplayCount(displayCount + initialItemSize);
      }
    }
  };

  return (
    <>
      <ReduxFacetModal
        facet={facet}
        queryParams={queryParams}
        open={open}
        onClose={() => setOpen(false)}
      />
      <div>
        <div>
          {checkedItems}
        </div>
        <div ref={scrollableRef} className={classes.itemsContainer} onScroll={handleScroll}>
          {uncheckedItems}
        </div>
      </div>
      <div className={classes.searchContainer}>
        <Button variant="text" className={classes.expandedDisplayButton} onClick={() => setOpen(!open)}>
          {`VIEW EXPANDED DISPLAY (${checkedItems.length + total})`}
        </Button>
      </div>
    </>
  );
};

export default withStyles(styles)(SearchFilterItems);
