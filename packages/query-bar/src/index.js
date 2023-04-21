import React from 'react';
import { withStyles, Button } from '@material-ui/core';
import { InputTypes } from '@bento-core/facet-filter';
import clsx from 'clsx';
import DEFAULT_STYLES from './styles';

/**
 * TODO:
 * - Documentation (README and DESIGN)
 * - Convert to a component generator
 * - General refactor and split into smaller components (slider, checkbox, localfind)
 * - When dispatching events, destroy the element first (it will make the UI more responsive)
 * - Convert filter.items.slice to a configuration option (e.g. maxItems)
 */

const ActiveFiltersQuery = ({
  statusReducer, localFind, classes,
  onClearAll, onClearUpload, onClearAutocomplete, onDeleteAutocomplete,
  onResetFacetSection, onResetFacetCheckbox, onResetSlider,
}) => {
  const { CHECKBOX, SLIDER } = InputTypes;
  const { autocomplete, upload } = localFind;

  const mappedCheckboxes = statusReducer.filter((facet) => facet.section && CHECKBOX === facet.type)
    .map((facet) => {
      const items = Object.keys(facet.items);
      items.sort((a, b) => a.localeCompare(b));

      return { ...facet, items };
    })
    .filter((facet) => facet.items.length > 0);

  const mappedSliders = statusReducer.filter((facet) => facet.section && SLIDER === facet.type);

  const getInputSet = () => {
    if (upload.length && autocomplete.length) {
      return (
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
      );
    }
    return null;
  };

  // Builds the inner section of a query array (e.g. "(ABC 123 DDD)")
  const getFilterJoin = (data, idx, isLastIndex, onClick, section) => (
    <>
      <span
        className={clsx(
          classes.filterCheckboxes,
          classes[section && section.section ? `facetSection${section.section}` : 'facetSectionCases'],
        )}
        key={idx}
        onClick={onClick}
      >
        {data}
      </span>
      {isLastIndex ? null : ' '}
    </>
  );

  if ((mappedCheckboxes.length || mappedSliders.length
      || autocomplete.length || upload.length) <= 0) {
    return '';
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

            {/* Local Find Selections */}
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
              {(upload.length || autocomplete.length > 1)
                && <span className={classes.bracketsOpen}>(</span>}
              {getInputSet()}
              {autocomplete.slice(0, 2).map((data, idx) => (
                getFilterJoin(
                  data.title,
                  idx,
                  autocomplete.length - 1 === idx,
                  () => onDeleteAutocomplete(data.title),
                )
              ))}
              {autocomplete.length > 2 && '...'}
              {(upload.length || autocomplete.length > 1)
                && <span className={classes.bracketsClose}>)</span>}
            </span>
          </span>
        ) : null}

        {/* Facet Checkbox Selections */}
        {((autocomplete.length || upload.length) && mappedCheckboxes.length)
          ? <span className={classes.operators}> AND </span>
          : null}
        {mappedCheckboxes.map((filter, index) => (
          <span>
            <span>
              {' '}
              {index !== 0 ? <span className={classes.operators}> AND </span> : ''}
              <span
                className={clsx(classes.filterName, classes[`facetSection${filter.section}Background`])}
                onClick={() => onResetFacetSection(filter)}
              >
                {filter.label}
              </span>
              {' '}
            </span>
            <span>
              {' '}
              <span className={classes.operators}>
                {filter.items.length === 1 ? 'IS ' : 'IN '}
              </span>
              {filter.items.length > 1 && <span className={classes.bracketsOpen}>(</span>}
              {filter.items.slice(0, 2).map((data, idx) => (
                getFilterJoin(data, idx, filter.items.length - 1 === idx, () => {
                  onResetFacetCheckbox(filter, data);
                }, filter)
              ))}
              {filter.items.length > 2 && '...'}
              {filter.items.length > 1 && <span className={classes.bracketsClose}>)</span>}
            </span>
          </span>
        ))}

        {/* Facet Slider Selections */}
        {((autocomplete.length || upload.length || mappedCheckboxes.length) && mappedSliders.length)
          ? <span className={classes.operators}> AND </span>
          : null}
        {mappedSliders.map((filter, index) => (
          <span>
            <span>
              {' '}
              {index !== 0 ? <span className={classes.operators}> AND </span> : ''}
              <span
                className={clsx(classes.filterName, classes[`facetSection${filter.section}Background`])}
                onClick={() => onResetSlider(filter)}
              >
                {filter.label}
              </span>
              {' '}
            </span>
            <span>
              {' '}
              <span className={classes.operators}>
                IS BETWEEN
              </span>
              (
              {' '}
              {getFilterJoin(filter.items[0], 0, false, () => onResetSlider(filter), filter)}
              {' '}
              AND
              {' '}
              {getFilterJoin(filter.items[1], 1, true, () => onResetSlider(filter), filter)}
              {' '}
              )
            </span>
          </span>
        ))}
      </span>
    </div>
  );
};

export default withStyles(DEFAULT_STYLES, { withTheme: true })(ActiveFiltersQuery);
