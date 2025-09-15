/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
import React,
{
  useEffect, useState, useRef,
} from 'react';
import { withStyles } from '@material-ui/core';
import ReduxCheckbox from './checkbox/ReduxCheckbox';
import ReduxSlider from './slider/ReduxSlider';
import { InputTypes } from './Types';
import { sortBySection } from '../../utils/Sort';
import styles from './FilterItemStyle';

const FilterItems = ({
  facet,
  sortBy = null,
  classes,
}) => {
  const { type, datafield, section } = facet;
  const initialItemSize = 20;
  const [displayCount, setDisplayCount] = useState(initialItemSize);
  const scrollableRef = useRef(null);
  const sortFilters = sortBySection({ ...facet, sortBy });

  const filterItems = () => {
    switch (type) {
      case InputTypes.CHECKBOX: {
        // Only use lazy loading if we have more items than the initial size
        const uncheckedCount = sortFilters.filter((item) => !item.isChecked).length;
        if (uncheckedCount <= initialItemSize) {
          // Render all items normally if below threshold
          return sortFilters.map((item, index) => (
            <ReduxCheckbox
              key={`all-${item.name}-${index}`}
              checkboxItem={{ ...item, index, section }}
              datafield={datafield}
              facet={facet}
            />
          ));
        }

        // Single pass: create checked and unchecked items with original indices - O(n) complexity
        const checkedItemsWithIndices = [];
        const uncheckedItemsWithIndices = [];

        sortFilters.forEach((item, originalIndex) => {
          const itemWithIndex = { ...item, originalIndex };
          if (item.isChecked) {
            checkedItemsWithIndices.push(itemWithIndex);
          } else {
            uncheckedItemsWithIndices.push(itemWithIndex);
          }
        });

        // Always show checked items first
        const checkedItems = checkedItemsWithIndices.map((item) => (
          <ReduxCheckbox
            key={`checked-${item.name}-${item.originalIndex}`}
            checkboxItem={{ ...item, index: item.originalIndex, section }}
            datafield={datafield}
            facet={facet}
          />
        ));
        const uncheckedItems = uncheckedItemsWithIndices
          .slice(0, displayCount)
          .map((item) => (
            <ReduxCheckbox
              key={`unchecked-${item.name}-${item.originalIndex}`}
              checkboxItem={{ ...item, index: item.originalIndex, section }}
              datafield={datafield}
              facet={facet}
            />
          ));

        const handleScrollLocal = (e) => {
          const totalUnchecked = uncheckedItemsWithIndices.length;
          if (displayCount < totalUnchecked && totalUnchecked > initialItemSize) {
            const { scrollTop, scrollHeight, clientHeight } = e.target;
            if (scrollHeight > clientHeight) {
              const position = Math.ceil((scrollTop / (scrollHeight - clientHeight)) * 100);
              if (position >= 90) {
                setDisplayCount(displayCount + initialItemSize);
              }
            }
          }
        };

        return (
          <>
            <div>
              {checkedItems}
            </div>
            <div
              ref={scrollableRef}
              className={classes.itemsContainer}
              onScroll={handleScrollLocal}
            >
              {uncheckedItems}
            </div>
          </>
        );
      }
      case InputTypes.SLIDER:
        return (<ReduxSlider facet={facet} />);
      default:
        return (<></>);
    }
  };

  useEffect(() => {
    setDisplayCount(initialItemSize);
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
