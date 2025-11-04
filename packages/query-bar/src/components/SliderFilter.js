import React from 'react';
import clsx from 'clsx';

export default ({
  index, data, classes,
  onSectionClick, onItemClick,
}) => {
  const { items, section, unknownAges } = data;

  // Determine the display logic based on unknownAges selection
  const getDisplayContent = () => {
    const baseLabel = data.label;

    if (unknownAges === 'only') {
      // Only: Show base label with unknown ages only, no range
      return {
        label: `${baseLabel} (Unknown Ages Only)`,
        showRange: false,
        rangeText: '',
      };
    }

    if (unknownAges === 'exclude') {
      // Exclude: Show base label with unknown ages excluded, with range only if items exist
      const hasRange = items && items.length >= 2;
      return {
        label: `${baseLabel} (Unknown Ages Excluded)`,
        showRange: hasRange,
        rangeText: hasRange ? `${items[0]} – ${items[1]}` : '',
      };
    }

    // Include: Normal display (base label with range)
    return {
      label: baseLabel,
      showRange: true,
      rangeText: items && items.length >= 2 ? `${items[0]} – ${items[1]}` : '',
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
