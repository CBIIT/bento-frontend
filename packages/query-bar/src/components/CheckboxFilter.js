import React from 'react';
import clsx from 'clsx';

export default ({
  index, data, classes, maxItems,
  onSectionClick, onItemClick,
}) => {
  const { items, section } = data;

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
        {items.slice(0, maxItems).map((d, idx) => (
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
        {items.length > maxItems && '...'}
        {items.length > 1 && <span className={classes.bracketsClose}>)</span>}
      </span>
    </span>
  );
};
