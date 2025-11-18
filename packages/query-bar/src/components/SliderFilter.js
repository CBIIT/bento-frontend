import React from 'react';
import clsx from 'clsx';

export default ({
  index, data, classes,
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
          IS BETWEEN
          {' '}
        </span>
        <span
          className={clsx(classes.filterCheckboxes, classes[`facetSection${section}`])}
          onClick={() => onItemClick(data, items[0])}
        >
          {`${Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(items[0] || 0)} – ${Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(items[1] || 0)}`}
        </span>
      </span>
    </span>
  );
};
