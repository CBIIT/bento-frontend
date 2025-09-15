/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useRef } from 'react';
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

  const handleScroll = (e) => {
    const uncheckedItemsCount = sortFilters.filter((item) => !item.isChecked).length;
    if (displayCount < uncheckedItemsCount && uncheckedItemsCount > initialItemSize) {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      const position = Math.ceil((scrollTop / (scrollHeight - clientHeight)) * 100);
      if (position >= 90) {
        setDisplayCount(displayCount + initialItemSize);
      }
    }
  };

  const filterItems = () => {
    switch (type) {
      case InputTypes.CHECKBOX: {
        const allUncheckedItems = sortFilters.filter((item) => !item.isChecked);

        // Only use lazy loading if we have more items than the initial size
        if (allUncheckedItems.length <= initialItemSize) {
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

        // Always show checked items first
        const checkedItems = sortFilters.filter((item) => item.isChecked)
          .map((item, index) => (
            <ReduxCheckbox
              key={`checked-${item.name}-${index}`}
              checkboxItem={{ ...item, index, section }}
              datafield={datafield}
              facet={facet}
            />
          ));

        // Lazy load unchecked items
        const uncheckedItems = allUncheckedItems
          .slice(0, displayCount)
          .map((item, index) => (
            <ReduxCheckbox
              key={`unchecked-${item.name}-${index}`}
              checkboxItem={{ ...item, index, section }}
              datafield={datafield}
              facet={facet}
            />
          ));

        return (
          <>
            <div>
              {checkedItems}
            </div>
            <div ref={scrollableRef} className={classes.itemsContainer} onScroll={handleScroll}>
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
