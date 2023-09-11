import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

export default ({
  index, data, classes, maxItems,
  onSectionClick, onItemClick,
  displayAllActiveFilters,
}) => {
  const { items, section } = data;
  const [expand, setExpand] = useState(false);
  const noOfItems = expand ? items.length : maxItems;

  useEffect(() => {
    if (items.length <= maxItems && expand) {
      setExpand(!expand);
    }
  }, [items]);

  return (
    <span>
      <span>
        {' '}
        {index !== 0 ? <span className={classes.operators}> AND </span> : ''}
        <span
          className={clsx(classes.filterName, classes[`facetSection${section}Background`])}
          onClick={() => onSectionClick(data)}
        >
          {data.label}
        </span>
        {' '}
      </span>
      <span>
        {' '}
        <span className={classes.operators}>
          {items.length === 1 ? 'IS ' : 'IN '}
        </span>
        {items.length > 1 && <span className={classes.bracketsOpen}>(</span>}
        {items.slice(0, noOfItems).map((d, idx) => (
          <>
            <span
              className={clsx(classes.filterCheckboxes, classes[`facetSection${section}`])}
              key={idx}
              onClick={() => onItemClick(data, d)}
            >
              {d}
            </span>
            {idx === (maxItems - 1) ? null : ' '}
          </>
        ))}
        {items.length > maxItems && (
          <>
            {
              displayAllActiveFilters
                ? (
                  <span
                    className={(classes.expandBtnclsx, 'expandBtn')}
                    onClick={() => setExpand(!expand)}
                  >
                    ...
                  </span>
                )
                : '...'
              }
          </>
        )}
        {(expand && items.length > maxItems) && (
          <span
            className={clsx(classes.collapseBtn, 'collapseBtn')}
            onClick={() => setExpand(!expand)}
          >
            {' LESS'}
          </span>
        )}
        {items.length > 1 && <span className={classes.bracketsClose}>)</span>}
      </span>
    </span>
  );
};
