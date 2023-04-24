import React from 'react';
import { withStyles, Button } from '@material-ui/core';
import { InputTypes } from '@bento-core/facet-filter';
import clsx from 'clsx';
import { Filter } from './components/FilterMap';
import DEFAULT_STYLES from './styles';

/**
 * TODO:
 * - Documentation (README and DESIGN)
 * - Convert to a component generator
 * - General refactor and split localfind into its own component
 * - When dispatching events, destroy the element first (it will make the UI more responsive)
 * - Convert filter.items.slice to a configuration option (e.g. maxItems)
 */

const ActiveFiltersQuery = ({
  statusReducer, localFind, classes,
  onClearAll, onClearUpload, onClearAutocomplete, onDeleteAutocomplete,
  onResetFacetSection, onResetFacetCheckbox, onResetSlider,
}) => {
  const { CHECKBOX } = InputTypes;
  const { autocomplete, upload } = localFind;

  // Remove any sections without checkboxes selected
  const mappedInputs = statusReducer.filter((facet) => facet.section && facet.type)
    .map((facet) => {
      if (facet.type !== CHECKBOX) { return facet; }

      const items = Object.keys(facet.items);
      items.sort((a, b) => a.localeCompare(b));

      return { ...facet, items };
    })
    .filter((facet) => facet.items.length > 0);

  if ((mappedInputs.length || autocomplete.length || upload.length) <= 0) {
    return null;
  }

  return (
    <div className={classes.queryWrapper}>
      <Button
        className={classes.clearQueryButton}
        color="primary"
        variant="outlined"
        onClick={onClearAll}
      >
        Clear Query
      </Button>
      <span className={classes.divider} />
      <span className={classes.queryContainer}>
        {/* Local Find Selections */}
        {(autocomplete.length || upload.length) ? (
          <span>
            {/* Standalone case set button */}
            {(upload.length && !autocomplete.length)
              ? (
                <span
                  className={clsx(classes.filterCheckboxes, classes.localFindBackground)}
                  onClick={onClearUpload}
                >
                  INPUT CASE SET
                </span>
              ) : null}

            {/* Local Find Search Selections */}
            {autocomplete.length
              ? (
                <span>
                  {' '}
                  <span
                    className={clsx(classes.filterName, classes.localFindBackground)}
                    onClick={onClearAutocomplete}
                  >
                    Case IDs
                  </span>
                  {' '}
                  {' '}
                  <span className={classes.operators}>
                    {(autocomplete.length === 1 && !upload.length) ? 'IS ' : 'IN '}
                  </span>
                </span>
              ) : null}
            <span>
              {(((upload.length > 0 ? 1 : 0) + autocomplete.length) > 1)
                ? <span className={classes.bracketsOpen}>(</span>
                : null}
              {upload.length && autocomplete.length ? (
                <>
                  {' '}
                  <span
                    className={clsx(classes.filterCheckboxes, classes.localFind)}
                    onClick={onClearUpload}
                  >
                    INPUT CASE SET
                  </span>
                  {' '}
                </>
              ) : null}
              {autocomplete.slice(0, 2).map((d, idx) => (
                <>
                  <span
                    className={clsx(classes.filterCheckboxes, classes.facetSectionCases)}
                    key={idx}
                    onClick={() => onDeleteAutocomplete(d.title)}
                  >
                    {d.title}
                  </span>
                  {idx === 1 ? null : ' '}
                </>
              ))}
              {autocomplete.length > 2 && '...'}
              {(((upload.length > 0 ? 1 : 0) + autocomplete.length) > 1)
                ? <span className={classes.bracketsClose}>)</span>
                : null}
            </span>
          </span>
        ) : null}

        {/* Facet Sidebar Selections */}
        {((autocomplete.length || upload.length) && mappedInputs.length)
          ? <span className={classes.operators}> AND </span>
          : null}
        {mappedInputs.map((filter, index) => (
          <Filter
            index={index}
            type={filter.type}
            data={filter}
            classes={classes}
            onSectionClick={filter.type === CHECKBOX
              ? onResetFacetSection
              : onResetSlider}
            onItemClick={filter.type === CHECKBOX
              ? onResetFacetCheckbox
              : onResetSlider}
          />
        ))}
      </span>
    </div>
  );
};

export default withStyles(DEFAULT_STYLES, { withTheme: true })(ActiveFiltersQuery);
