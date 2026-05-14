import React from 'react';
import { withStyles, Button } from '@material-ui/core';
import { InputTypes } from '@bento-core/facet-filter';
import clsx from 'clsx';
import { Filter } from '../components/FilterMap';
import DEFAULT_STYLES from './styles';
import DEFAULT_CONFIG from './config';
import QueryUrl from '../components/QueryUrl';

/**
 * Generate a pre-configured Explore Query Bar component
 *
 * @param {object} uiConfig the component configuration object
 * @returns {object} { QueryBar }
 */
export const QueryBarGenerator = (uiConfig = DEFAULT_CONFIG) => {
  const { config, functions } = uiConfig;
  const { CHECKBOX } = InputTypes;

  const maxItems = config && typeof config.maxItems === 'number'
    ? config.maxItems
    : DEFAULT_CONFIG.config.maxItems;

  const clearAll = functions && typeof functions.clearAll === 'function'
    ? functions.clearAll
    : DEFAULT_CONFIG.functions.clearAll;

  const clearImportFrom = functions && typeof functions.clearImportFrom === 'function'
    ? functions.clearImportFrom
    : DEFAULT_CONFIG.functions.clearImportFrom;

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

  const viewQueryURL = config && typeof config.viewQueryURL === 'boolean'
    ? config.viewQueryURL
    : DEFAULT_CONFIG.config.viewQueryURL;

  const queryUrlCharacterLimit = config && typeof config.queryUrlCharacterLimit === 'number'
    ? config.queryUrlCharacterLimit
    : DEFAULT_CONFIG.config.queryUrlCharacterLimit;

  return {
    QueryBar: withStyles(DEFAULT_STYLES, { withTheme: true })((props) => {
      const {
        hasImportFrom, statusReducer, localFind, classes,
      } = props;
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
        .filter((facet) => facet.items.length > 0 || (facet.unknownAges && facet.unknownAges !== 'include'));

      if (!hasImportFrom && (mappedInputs.length || autocomplete.length || upload.length) <= 0) {
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
            {
              hasImportFrom
              && (
                <span
                  className={clsx(classes.filterCheckboxes, classes.localFindBackground)}
                  onClick={clearImportFrom}
                >
                  IMPORTED PARTICIPANT SET
                </span>
              )
            }

            {hasImportFrom && (mappedInputs.length || autocomplete.length || upload.length)
              ? <span className={classes.operators}> AND </span>
              : null}
            {/* Section: Localfind Results */}
            {(autocomplete.length || upload.length) > 0 && (
              <span>
                {/* Participant ID Section
                  * Treats any autocomplete item that is not explicitly an
                  * associated/synonym ID as a participant ID, so legacy items
                  * (e.g. type === 'subjectIds') keep working alongside the new
                  * synonym section. */}
                {(() => {
                  const participantItems = autocomplete.filter((i) => i.type !== 'associatedIds');
                  const participantCount = upload.length + participantItems.length;

                  if (upload.length > 0 && participantItems.length === 0) {
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
                          <span
                            className={clsx(classes.filterCheckboxes, classes.localFind)}
                            onClick={clearUpload}
                          >
                            INPUT PARTICIPANT SET
                          </span>
                        )}

                        {participantItems.slice(0, maxItems).map((d, idx, arr) => (
                          <React.Fragment key={`pid-${idx}`}>
                            <span
                              className={clsx(classes.filterCheckboxes, classes.facetSectionCases)}
                              onClick={() => deleteAutocompleteItem(d)}
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

                {/* OR connector between Participant IDs (or upload) and Synonyms */}
                {(upload.length > 0 || autocomplete.some((i) => i.type !== 'associatedIds'))
                  && autocomplete.some((i) => i.type === 'associatedIds')
                  && (<span className={classes.operators}>OR</span>)}

                {/* Associated ID (Synonym) Section */}
                {(() => {
                  const associatedItems = autocomplete.filter((i) => i.type === 'associatedIds');
                  if (associatedItems.length === 0) return null;

                  const operator = associatedItems.length === 1 ? 'IS' : 'IN';

                  return (
                    <>
                      <span
                        className={clsx(
                          classes.filterName,
                          classes.localFindAssociatedIdsBackground,
                        )}
                        onClick={clearAutocomplete}
                      >
                        Synonym
                      </span>
                      <span className={classes.operators}>{operator}</span>
                      {operator === 'IN' && <span className={classes.bracketsOpen}>(</span>}

                      {associatedItems.slice(0, maxItems).map((d, idx, arr) => (
                        <React.Fragment key={`aid-${idx}`}>
                          <span
                            className={clsx(
                              classes.filterCheckboxes,
                              classes.localFindAssociatedIdsText,
                            )}
                            onClick={() => deleteAutocompleteItem(d)}
                          >
                            {d.synonym}
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
            viewQueryURL && (
              <QueryUrl
                classes={classes}
                localFind={localFind}
                filterItems={mappedInputs}
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
