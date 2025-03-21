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

const ModalFilterItems = ({
  facet,
  searchText,
  sortBy,
  onClearSection,
  onSortChange,
  classes,
}) => {
  const {
    datafield, section,
  } = facet;
  const initialItemSize = 40;
  const [total, setTotal] = useState(0);
  const [displayCount, setDisplayCount] = useState(initialItemSize);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  const scrollableRef = useRef(null);
  let sortFilters = sortBySection({ ...facet, sortBy });

  const checkedItems = sortFilters.filter((item) => item.isChecked)
    .map((item, index) => (<ReduxModalCheckbox
      checkboxItem={{ ...item, index, section }}
      datafield={datafield}
      facet={facet}
    />));
  const makeupItemsLen = 3 - (checkedItems.length % 3);
  const makeupItems = [];
  if (makeupItemsLen < 3) {
    for (let i = 0; i < makeupItemsLen; i += 1) {
      makeupItems.push(<div className={classes.emptyItem} />);
    }
  }

  const uncheckedItems = searchItems(sortFilters.filter((item) => !item.isChecked),
    searchText, facet)
    .slice(0, displayCount).map((item, index) => (<ReduxModalCheckbox
      checkboxItem={{ ...item, index, section }}
      datafield={datafield}
      facet={facet}
    />));
  const makeupUncheckedItemsLen = 3 - (uncheckedItems.length % 3);
  const makeupUncheckedItems = [];
  if (makeupUncheckedItemsLen < 3) {
    for (let i = 0; i < makeupUncheckedItemsLen; i += 1) {
      makeupUncheckedItems.push(<div className={classes.emptyItem} />);
    }
  }

  useEffect(() => {
    if (contentRef.current) {
      setHeight(528 - contentRef.current.getBoundingClientRect().height);
    }
  }, [checkedItems.length]);

  useEffect(() => {
    scrollableRef.current.scrollTo(0, 0);
    sortFilters = sortBySection({ ...facet, sortBy });
    const newUncheckedFullList = searchItems(sortFilters.filter((item) => !item.isChecked),
      searchText, facet);
    setDisplayCount(initialItemSize);
    setTotal(newUncheckedFullList.length);
  }, [searchText, sortBy]);

  const handleScroll = (e) => {
    if (displayCount < total) {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      const position = Math.ceil((scrollTop / (scrollHeight - clientHeight)) * 100);
      // console.log('position:', position);
      if (position >= 90) {
        setDisplayCount(displayCount + initialItemSize);
      }
    }
  };

  return (
    <>
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
          onSortChange(facet.datafield, sortType.ALPHABET);
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
          onSortChange(facet.datafield, sortType.NUMERIC);
        }}
      >
        Sort by count
      </span>
    </div>
    <div className={classes.checkboxContainer}>
        <div ref={contentRef} className={classes.checkedContainer}>
          {checkedItems}
          {makeupItems}
        </div>
        <div ref={scrollableRef} className={classes.itemsContainer} onScroll={handleScroll} style={{ maxHeight: `${height}px` }}>
          {uncheckedItems}
          {makeupUncheckedItems}
        </div>
    </div>
    </>
  );
};

export default withStyles(styles)(ModalFilterItems);
