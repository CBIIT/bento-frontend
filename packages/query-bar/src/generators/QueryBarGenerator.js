import React from 'react';
import { withStyles, Button } from '@material-ui/core';
import { InputTypes } from '@bento-core/facet-filter';
import clsx from 'clsx';
import { Filter } from '../components/FilterMap';
import QueryUrl from '../components/QueryUrl';
import DEFAULT_STYLES from './styles';
import DEFAULT_CONFIG from './config';

/**
 * Generate a pre-configured Explore Query Bar component
 *
 * @param {object} uiConfig the component configuration object
 * @returns {object} { QueryBar }
 */
export const QueryBarGenerator = (uiConfig = DEFAULT_CONFIG) => {
  const { config, functions, customStyles } = uiConfig;
  const { CHECKBOX } = InputTypes;

  const maxItems = config && typeof config.maxItems === 'number'
    ? config.maxItems
    : DEFAULT_CONFIG.config.maxItems;

  const queryURLRootPath = config && typeof config.rootPath === 'string'
    ? config.rootPath
    : DEFAULT_CONFIG.config.rootPath;

  const viewQueryURL = config && typeof config.viewQueryURL === 'boolean'
    ? config.viewQueryURL
    : DEFAULT_CONFIG.config.viewQueryURL;

  const queryUrlCharacterLimit = config && typeof config.queryUrlCharacterLimit === 'number'
    ? config.queryUrlCharacterLimit
    : DEFAULT_CONFIG.config.queryUrlCharacterLimit;

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

  return {
    QueryBar: withStyles(customStyles || DEFAULT_STYLES,
      { withTheme: true })((props) => {
      const { statusReducer, localFind, classes } = props;

      const { autocomplete, upload } = localFind;

      // Remove any sections without checkboxes selected
      const mappedInputs = statusReducer.filter((facet) => facet.section && facet.type)
        .map((facet) => {
          if (facet.type !== CHECKBOX) { return facet; }

          const { items } = facet;
          const itemKeys = Object.keys(items);
          itemKeys.sort((a, b) => a.localeCompare(b));

          /* Find any SELECTED CHECKBOXES that do NOT have any data
           * and remove them from the list of selected checkboxes artificially */
          // itemKeys.forEach((item) => {
          //   if (data.findIndex((d) => d.group === item) < 0) {
          //     itemKeys.splice(itemKeys.indexOf(item), 1);
          //   }
          // });

          return { ...facet, items: itemKeys };
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
            {/* Section: Localfind Results */}
            {(autocomplete.length || upload.length) > 0 && (
            <span>
              {/* Participant ID Section */}
              {(() => {
                const participantItems = autocomplete.filter((i) => i.type === 'participantIds');
                const participantCount = upload.length + participantItems.length;

                if (upload.length > 0 && participantItems.length === 0) {
                  // Only upload, no participant autocomplete
                  return (
                    <span
                      className={clsx(classes.filterCheckboxes, classes.localFindBackground)}
                      onClick={clearUpload}
                    >
                      INPUT PARTICIPANT SET
                    </span>
                  );
                }

                if (participantCount > 0) {
                  const operator = participantCount === 1 ? 'IS' : 'IN';

                  return (
                    <>
                      <span
                        className={clsx(classes.filterName, classes.localFindBackground)}
                        onClick={clearAutocomplete}
                      >
                        Participant ID
                      </span>
                      <span className={classes.operators}>{operator}</span>

                      {operator === 'IN' && <span className={classes.bracketsOpen}>(</span>}

                      {upload.length > 0 && (
                      <>
                        <span
                          className={clsx(classes.filterCheckboxes, classes.localFind)}
                          onClick={clearUpload}
                        >
                          INPUT PARTICIPANT SET
                        </span>
                      </>
                      )}

                      {participantItems.slice(0, maxItems).map((d, idx, arr) => (
                        <React.Fragment key={`pid-${idx}`}>
                          <span
                            className={clsx(classes.filterCheckboxes, classes.facetSectionCases)}
                            onClick={() => deleteAutocompleteItem(d.title)}
                          >
                            {d.title}
                          </span>
                          {idx < arr.length - 1 && ' '}
                        </React.Fragment>
                      ))}
                      {participantItems.length > maxItems && '...'}
                      {operator === 'IN' && <span className={classes.bracketsClose}>)</span>}
                    </>
                  );
                }

                return null;
              })()}

              {/* 'or' logic */}
              {(upload.length > 0 || autocomplete.some((i) => i.type === 'participantIds'))
              && autocomplete.some((i) => i.type === 'associatedIds')
              && (<span className={classes.operators}>OR</span>)}

              {/* Associated ID Section */}
              {(() => {
                const associatedItems = autocomplete.filter((i) => i.type === 'associatedIds');
                if (associatedItems.length === 0) return null;

                const operator = associatedItems.length === 1 ? 'IS' : 'IN';

                return (
                  <>
                    <span
                      className={clsx(classes.filterName, classes.localFindAssociatedIdsBackground)}
                      onClick={clearAutocomplete}
                    >
                      Synonym
                    </span>
                    <span className={classes.operators}>{operator}</span>
                    {operator === 'IN' && <span className={classes.bracketsOpen}>(</span>}

                    {associatedItems.slice(0, maxItems).map((d, idx, arr) => (
                      <React.Fragment key={`aid-${idx}`}>
                        <span
                          className={
                            clsx(classes.filterCheckboxes, classes.localFindAssociatedIdsText)
                          }
                          onClick={() => deleteAutocompleteItem(d.title)}
                        >
                          {d.title}
                        </span>
                        {idx < arr.length - 1 && ' '}
                      </React.Fragment>
                    ))}
                    {associatedItems.length > maxItems && '...'}
                    {operator === 'IN' && <span className={classes.bracketsClose}>)</span>}
                  </>
                );
              })()}
            </span>
            )}

            {/* --------------------- */}

            {/* Facet Sidebar Selections */}
            {((autocomplete.length || upload.length) && mappedInputs.length)
              ? <span className={classes.operators}> AND </span>
              : null}
            {mappedInputs.map((filter, index) => (
              <Filter
                index={index}
                type={filter.type}
                data={filter}
                maxItems={maxItems}
                classes={classes}
                onSectionClick={filter.type === CHECKBOX
                  ? resetFacetSection
                  : resetFacetSlider}
                onItemClick={filter.type === CHECKBOX
                  ? resetFacetCheckbox
                  : resetFacetSlider}
              />
            ))}
          </span>
          {
            (viewQueryURL && queryURLRootPath) && (
              <QueryUrl
                classes={classes}
                localFind={localFind}
                filterItems={mappedInputs}
                rootPath={queryURLRootPath}
                queryUrlCharacterLimit={queryUrlCharacterLimit}
              />
            )
          }
        </div>
      );
    }),
  };
};

export default QueryBarGenerator;
