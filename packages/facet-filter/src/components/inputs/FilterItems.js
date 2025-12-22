/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
import React,
{
  useEffect, useState, useRef, useCallback,
} from 'react';
import { withStyles } from '@material-ui/core';
import ReduxCheckbox from './checkbox/ReduxCheckbox';
import ReduxSlider from './slider/ReduxSlider';
import { InputTypes } from './Types';
import { sortBySection } from '../../utils/Sort';
import styles from './FilterItemStyle';

const INITIAL_ITEM_SIZE = 20;

const FilterItems = ({
  facet,
  sortBy = null,
  classes,
  queryParams,
  timeUnit,
}) => {
  const { type, datafield, section } = facet;
  const [displayCount, setDisplayCount] = useState(INITIAL_ITEM_SIZE);
  const scrollableRef = useRef(null);
  const sortFilters = sortBySection({ ...facet, sortBy });

  // Memoized scroll handler
  const handleScroll = useCallback((uncheckedCount) => (e) => {
    if (displayCount < uncheckedCount && uncheckedCount > INITIAL_ITEM_SIZE) {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      if (scrollHeight > clientHeight) {
        const position = Math.ceil((scrollTop / (scrollHeight - clientHeight)) * 100);
        if (position >= 90) {
          setDisplayCount((prevCount) => prevCount + INITIAL_ITEM_SIZE);
        }
      }
    }
  }, [displayCount]);

  const filterItems = () => {
    switch (type) {
      case InputTypes.CHECKBOX: {
        // Only use lazy loading if we have more items than the initial size
        const uncheckedCount = sortFilters.filter((item) => !item.isChecked).length;
        if (uncheckedCount <= INITIAL_ITEM_SIZE) {
          // Render all items normally if below threshold
          return sortFilters.map((item, index) => (
            <ReduxCheckbox
              key={`all-${item.name}-${index}`}
              checkboxItem={{ ...item, index, section }}
              datafield={datafield}
              facet={facet}
              queryParams={queryParams}
            />
          ));
        }

        // Single pass: separate checked and unchecked items with their indices - O(n) complexity
        const checkedItemsWithIndices = [];
        const uncheckedItemsWithIndices = [];

        sortFilters.forEach((item, originalIndex) => {
          if (item.isChecked) {
            checkedItemsWithIndices.push({ item, originalIndex });
          } else {
            uncheckedItemsWithIndices.push({ item, originalIndex });
          }
        });

        // Always show checked items first
        const checkedItems = checkedItemsWithIndices.map(({ item, originalIndex }) => (
          <ReduxCheckbox
            key={`checked-${item.name}-${originalIndex}`}
            checkboxItem={{ ...item, index: originalIndex, section }}
            datafield={datafield}
            facet={facet}
            queryParams={queryParams}
          />
        ));
        const uncheckedItems = uncheckedItemsWithIndices
          .slice(0, displayCount)
          .map(({ item, originalIndex }) => (
            <ReduxCheckbox
              key={`unchecked-${item.name}-${originalIndex}`}
              checkboxItem={{ ...item, index: originalIndex, section }}
              datafield={datafield}
              facet={facet}
              queryParams={queryParams}
            />
          ));

        return (
          <>
            <div>
              {checkedItems}
            </div>
            <div
              ref={scrollableRef}
              className={classes.itemsContainer}
              onScroll={handleScroll(uncheckedItemsWithIndices.length)}
            >
              {uncheckedItems}
            </div>
          </>
        );
      }
      case InputTypes.SLIDER:
        return (<ReduxSlider facet={facet} timeUnit={timeUnit} queryParams={queryParams} />);
      default:
        return (<></>);
    }
  };

  useEffect(() => {
    setDisplayCount(INITIAL_ITEM_SIZE);
    if (scrollableRef.current) {
      scrollableRef.current.scrollTo(0, 0);
    }
  }, [sortBy]);

  return (
    <>
      {filterItems()}
    </>
  );
};

export default withStyles(styles)(FilterItems);
