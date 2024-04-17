import React, { useState } from 'react';
import clsx from 'clsx';

export default ({
  index, data, classes, maxItems,
  onSectionClick, onItemClick,
}) => {
  const { items, section } = data;
  const [expand, setExpand] = useState(true);
  const noOfItems = expand ? items.length : maxItems;

  const clsName = (text = '', attr = '') => `facetSection${text.replace(/\s+/g, '')}${attr}`;

  return (
    <span>
      <span>
        {' '}
        {index !== 0 ? <span className={classes.operators}> AND </span> : ''}
        <span
          className={clsx(classes.filterName, classes[`${clsName(section, 'Background')}`])}
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
              className={clsx(classes.filterCheckboxes, classes[clsName(section)])}
              key={idx}
              onClick={() => onItemClick(data, d)}
            >
              {d}
            </span>
            {idx === (maxItems - 1) ? null : ' '}
          </>
        ))}
        {(items.length > maxItems && !expand) && (
          <>
            <span
              className={classes.expandBtn}
              onClick={() => setExpand(!expand)}
            >
              ...
            </span>
          </>
        )}
        {(expand && items.length > maxItems) && (
          <span
            className={classes.collapseBtn}
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
