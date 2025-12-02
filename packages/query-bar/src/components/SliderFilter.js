import React from 'react';
import clsx from 'clsx';

export default ({
  index, data, classes,
  onSectionClick, onItemClick,
}) => {
  const { items, section, unknownAges } = data;

  const getDisplayContent = () => {
    const baseLabel = data.label;
    const hasRange = items && items.length >= 2;

    // If unknownAges is 'only', we're showing only unknown ages
    if (unknownAges === 'only') {
      return {
        label: `${baseLabel} (Unknown Ages Only)`,
        showRange: false,
        rangeText: '',
      };
    }

    // If unknownAges is 'exclude', we're excluding unknown ages from the range
    if (unknownAges === 'exclude') {
      return {
        label: `${baseLabel} (Unknown Ages Excluded)`,
        showRange: hasRange,
        rangeText: hasRange ? `${items[0]} – ${items[1]}` : '',
      };
    }

    // Default: unknownAges is 'include' or not set
    return {
      label: baseLabel,
      showRange: hasRange,
      rangeText: hasRange ? `${items[0]} – ${items[1]}` : '',
    };
  };

  const displayContent = getDisplayContent();

  return (
    <span>
      <span>
        {' '}
        {index !== 0 ? <span className={classes.operators}> AND </span> : ''}
        <span
          className={clsx(classes.filterName, classes[`facetSection${section}Background`])}
          onClick={() => onSectionClick(data)}
        >
          {displayContent.label}
        </span>
        {' '}
      </span>
      {displayContent.showRange && (
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
            {displayContent.rangeText}
          </span>
        </span>
      )}
    </span>
  );
};
