import React, { useState, useEffect } from 'react';
import { withStyles, Button } from '@material-ui/core';
import { InputTypes } from '@bento-core/facet-filter';
import clsx from 'clsx';
import { Filter } from '../components/FilterMap';
import DEFAULT_STYLES from './styles';
import DEFAULT_CONFIG from './config';

/**
 * Generate a pre-configured Explore Query Bar component
 *
 * @param {object} uiConfig the component configuration object
 * @returns {object} { QueryBar }
 */
export const QueryBarGenerator = (uiConfig = DEFAULT_CONFIG) => {
  const { config, functions, customStyles = {} } = uiConfig;
  const { CHECKBOX } = InputTypes;
  const styles = () => (
    { ...DEFAULT_STYLES(), ...customStyles }
  );

  const maxItems = config && typeof config.maxItems === 'number'
    ? config.maxItems
    : DEFAULT_CONFIG.config.maxItems;

  const displayAllActiveFilters = config && typeof config.displayAllActiveFilters === 'boolean'
    ? config.displayAllActiveFilters
    : DEFAULT_CONFIG.config.displayAllActiveFilters;

  const group = config && typeof config.group === 'string'
    ? config.group : DEFAULT_CONFIG.config.group;

  const count = config && typeof config.count === 'string'
    ? config.count : DEFAULT_CONFIG.config.count;

  const clearAll = functions && typeof functions.clearAll === 'function'
    ? functions.clearAll
    : DEFAULT_CONFIG.functions.clearAll;

  const clearUpload = functions && typeof functions.clearUpload === 'function'
    ? functions.clearUpload
    : DEFAULT_CONFIG.functions.clearUpload;

  const clearAutocomplete = functions && typeof functions.clearAutocomplete === 'function'
    ? functions.clearAutocomplete
    : DEFAULT_CONFIG.functions.clearAutocomplete;

  const deleteAutocompleteItem = functions && typeof functions.deleteAutocompleteItem === 'function'
    ? functions.deleteAutocompleteItem
    : DEFAULT_CONFIG.functions.deleteAutocompleteItem;

  const resetFacetSection = functions && typeof functions.resetFacetSection === 'function'
    ? functions.resetFacetSection
    : DEFAULT_CONFIG.functions.resetFacetSection;

  const resetFacetCheckbox = functions && typeof functions.resetFacetCheckbox === 'function'
    ? functions.resetFacetCheckbox
    : DEFAULT_CONFIG.functions.resetFacetCheckbox;

  const resetFacetSlider = functions && typeof functions.resetFacetSlider === 'function'
    ? functions.resetFacetSlider
    : DEFAULT_CONFIG.functions.resetFacetSlider;

  const clsName = (text = 'filter-section') => text.replace(/\s+/g, '-').toLowerCase();

  return {
    QueryBar: withStyles(styles, { withTheme: true })((props) => {
      const { statusReducer, localFind, classes } = props;

      const { autocomplete, upload } = localFind;

      const [expand, setExpand] = useState(false);
      const noOfItems = expand ? autocomplete.length : maxItems;

      useEffect(() => {
        if (autocomplete.length <= maxItems && expand) {
          setExpand(!expand);
        }
      }, [autocomplete]);

      // Remove any sections without checkboxes selected
      const mappedInputs = statusReducer.filter((facet) => facet.section && facet.type)
        .map((facet) => {
          if (facet.type !== CHECKBOX) { return facet; }

          const { data, items } = facet;
          const itemKeys = Object.keys(items);
          itemKeys.sort((a, b) => a.localeCompare(b));

          /* Find any SELECTED CHECKBOXES that do NOT have any data
           * and remove them from the list of selected checkboxes artificially */
          itemKeys.forEach((item) => {
            if (data.findIndex((d) => d.group === item) < 0) {
              itemKeys.splice(itemKeys.indexOf(item), 1);
            }
          });
          // return { ...facet, items: itemKeys };
          /**
          * Maintain consistant behavior with facet filter component
          * Display the active filter items based on the count value
          * Display active filter items in query bar only if count is greater than 0
          * behavior similar to filter component
          */
          // const { group, count } = config;
          const displayItems = itemKeys.reduce((accumulator, item) => {
            const itemList = data.filter((d) => (d[group] === item && d[count] > 0)) || [];
            if (itemList.length > 0) {
              const labels = itemList.map((filter) => filter[group]);
              accumulator.push(labels);
            }
            return accumulator;
          }, []);

          return { ...facet, items: displayItems };
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
            onClick={clearAll}
          >
            Clear Query
          </Button>
          <span className={classes.divider} />
          <span className={classes.queryContainer}>
            {/* Local Find Selections */}
            {/* TODO: Refactor this into a separate component */}
            {(autocomplete.length || upload.length) ? (
              <span>
                {/* Standalone case set button */}
                {(upload.length && !autocomplete.length)
                  ? (
                    <span
                      className={clsx(classes.filterCheckboxes, classes.localFindBackground)}
                      onClick={clearUpload}
                    >
                      INPUT CASE SET
                    </span>
                  ) : null}
                {autocomplete.length
                  ? (
                    <span>
                      {' '}
                      <span
                        className={clsx(classes.filterName, classes.localFindBackground)}
                        onClick={clearAutocomplete}
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
                        onClick={clearUpload}
                      >
                        INPUT CASE SET
                      </span>
                      {' '}
                    </>
                  ) : null}
                  {autocomplete.slice(0, noOfItems).map((d, idx) => (
                    <>
                      <span
                        className={clsx(classes.filterCheckboxes, classes.facetSectionCases)}
                        key={idx}
                        onClick={() => deleteAutocompleteItem(d.title)}
                      >
                        {d.title}
                      </span>
                      {idx === (noOfItems - 1) ? null : ' '}
                    </>
                  ))}
                  {autocomplete.length > maxItems && (
                    <>
                      {
                        displayAllActiveFilters
                          ? (
                            <span
                              className={classes.expandBtn}
                              onClick={() => setExpand(!expand)}
                            >
                              ...
                            </span>
                          )
                          : '...'
                        }
                    </>
                  )}
                  {(expand && autocomplete.length > maxItems) && (
                    <span
                      className={classes.collapseBtn}
                      onClick={() => setExpand(!expand)}
                    >
                      {' LESS'}
                    </span>
                  )}
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
              <span className={clsName(filter.section)}>
                <Filter
                  index={index}
                  type={filter.type}
                  data={filter}
                  maxItems={maxItems}
                  displayAllActiveFilters={displayAllActiveFilters}
                  classes={classes}
                  onSectionClick={filter.type === CHECKBOX
                    ? resetFacetSection
                    : resetFacetSlider}
                  onItemClick={filter.type === CHECKBOX
                    ? resetFacetCheckbox
                    : resetFacetSlider}
                />
              </span>
            ))}
          </span>
        </div>
      );
    }),
  };
};

export default QueryBarGenerator;
