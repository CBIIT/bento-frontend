/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useRef } from 'react';
import {
  withStyles,
} from '@material-ui/core';
import ReduxModalCheckbox from './checkbox/ReduxModalCheckbox';
import { sortBySection } from '../../utils/Sort';
import styles from './ModalFilterStyle';

const ModalFilterItems = ({
  facet,
  sortBy,
  searchText,
  classes,
}) => {
  const {
    datafield, section,
  } = facet;
  const initialItemSize = 27;
  const [uncheckedFullList, setUncheckedFullList] = useState([]);
  const [total, setTotal] = useState(0);
  const [displayList, setDisplayList] = useState([]);
  const scrollableRef = useRef(null);
  const sortFilters = sortBySection({ ...facet, sortBy });

  const checkedItems = sortFilters.filter((item) => item.isChecked)
    .map((item, index) => (<ReduxModalCheckbox
      checkboxItem={{ ...item, index, section }}
      datafield={datafield}
      facet={facet}
    />));

  const uncheckedItems = displayList.map((item, index) => (<ReduxModalCheckbox
    checkboxItem={{ ...item, index, section }}
    datafield={datafield}
    facet={facet}
  />));

  // console.log('displayList size:', displayList.length);

  useEffect(() => {
    // console.log('searchText:', searchText);
    scrollableRef.current.scrollTo(0, 0);
    const newUncheckedFullList = sortFilters.filter((item) => !item.isChecked)
      .filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));
    const uncheckedInitalList = newUncheckedFullList.slice(0, initialItemSize);
    setUncheckedFullList(newUncheckedFullList);
    setDisplayList(uncheckedInitalList);
    setTotal(newUncheckedFullList.length);
  }, [searchText]);

  const handleScroll = (e) => {
    if (displayList.length < total) {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      const position = Math.ceil((scrollTop / (scrollHeight - clientHeight)) * 100);
      // console.log('position:', position);
      if (position >= 90) {
        setDisplayList(uncheckedFullList.slice(0, displayList.length + initialItemSize));
      }
    }
  };

  return (
    <div>
      <div className={classes.checkedContainer}>
        {checkedItems}
      </div>
      <div ref={scrollableRef} className={classes.itemsContainer} onScroll={handleScroll}>
        {uncheckedItems}
      </div>
    </div>
  );
};

export default withStyles(styles)(ModalFilterItems);
