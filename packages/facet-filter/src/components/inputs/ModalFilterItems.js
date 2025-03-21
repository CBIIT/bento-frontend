/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useRef } from 'react';
import {
  withStyles,
  Icon,
} from '@material-ui/core';
import clsx from 'clsx';
import ReduxModalCheckbox from './checkbox/ReduxModalCheckbox';
import { sortBySection, sortType } from '../../utils/Sort';
import styles from './ModalFilterStyle';
import clearIcon from '../facet/assets/clearIcon.svg';

const ModalFilterItems = ({
  facet,
  searchText,
  classes,
  onClearFacetSection,
}) => {
  const { datafield, section } = facet;
  const initialItemSize = 27;
  const [uncheckedFullList, setUncheckedFullList] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const onSortFacet = (type) => {
    setSortBy(type);
  };

  const onClearSection = () => {
    console.log('hi');
    setSortBy(null);
    onClearFacetSection(facet);
  };

  const [total, setTotal] = useState(0);
  const [displayList, setDisplayList] = useState([]);
  const scrollableRef = useRef(null);
  let sortFilters = sortBySection({ ...facet, sortBy });

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

  useEffect(() => {
    // console.log('searchText:', searchText);
    scrollableRef.current.scrollTo(0, 0);
    sortFilters = sortBySection({ ...facet, sortBy });
    const newUncheckedFullList = sortFilters.filter((item) => !item.isChecked)
      .filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));
    const uncheckedInitalList = newUncheckedFullList.slice(0, initialItemSize);
    setUncheckedFullList(newUncheckedFullList);
    setDisplayList(uncheckedInitalList);
    setTotal(newUncheckedFullList.length);
  }, [searchText, sortBy]);

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
    <div className={classes.sortingContainer}>
      <div>
        <span className={classes.selectionText}>{`${checkedItems.length} selections `}</span>
        <span className={classes.totalText}>{`of ${total} search results`}</span>
      </div>
      <span className={classes.sortGroupIcon}>
        <Icon
          style={{ fontSize: 10 }}
          onClick={onClearSection}
        >
          <img
            src={clearIcon}
            height={12}
            width={12}
            alt="clear-icon"
          />
        </Icon>
      </span>
      <span
        className={
          clsx(classes.sortGroupItem, {
            [classes.highlight]: sortBy === sortType.ALPHABET,
          })
        }
        onClick={() => {
          onSortFacet(sortType.ALPHABET);
        }}
      >
        Sort alphabetically
      </span>
      <span
        className={
          clsx(classes.sortGroupItemCounts, {
            [classes.highlight]: sortBy === sortType.NUMERIC,
          })
        }
        onClick={() => {
          onSortFacet(sortType.NUMERIC);
        }}
      >
        Sort by count
      </span>
    </div>
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
