import React from 'react';
import clsx from 'clsx';

export default ({
  index, data, classes,
  onSectionClick, onItemClick,
}) => {
  const { items, section } = data;

  /**
   * TODO: Implement this component per the design specifications
   *
   * See: [TBD – Pending JIRA ticket]
   */
  return null;

  // eslint-disable-next-line no-unreachable
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
        </span>
        {'( '}
        <span
          className={clsx(classes.filterCheckboxes, classes[`facetSection${section}`])}
          onClick={() => onItemClick(data, items[0])}
        >
          {items[0]}
        </span>
        {' '}
        AND
        {' '}
        <span
          className={clsx(classes.filterCheckboxes, classes[`facetSection${section}`])}
          onClick={() => onItemClick(data, items[1])}
        >
          {items[1]}
        </span>
        {' )'}
      </span>
    </span>
  );
};
