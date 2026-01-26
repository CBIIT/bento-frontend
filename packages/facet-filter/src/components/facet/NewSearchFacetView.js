import React, { useState } from 'react';
/*
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
 */
// import { generateQueryStr } from '@bento-core/util';
import {
  Accordion,
  List,
  withStyles,
  Icon,
  IconButton,
  Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import CustomAccordionSummary from '../summary/AccordionSummaryView';
import { InputTypes } from '../inputs/Types';
import styles from './NewFacetStyle';
import FilterItems from '../inputs/FilterItems';
import SearchFilterItems from '../inputs/SearchFilterItems';
import { sortType, sortBySection } from '../../utils/Sort';
import clearIcon from './assets/clearIcon.svg';
import ReduxSearchCheckbox from '../inputs/checkbox/ReduxSearchCheckbox';
import ReduxFacetModal from './ReduxFacetModal';

const searchItems = (items, searchText) => {
  let matchedItems = [];
  const keyList = searchText.toUpperCase().split(',').filter((item) => item.trim() !== '');
  if (keyList.length === 0) {
    matchedItems = items;
  } else {
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      for (let j = 0; j < keyList.length; j += 1) {
        const key = keyList[j].trim();
        if (key === '' || item.group.toUpperCase().includes(key)) {
          matchedItems.push(item);
          break;
        }
      }
    }
  }
  return matchedItems;
};

const SearchFacetView = ({
  classes,
  facet,
  searchText,
  sortBy,
  onClearFacetSection,
  onUnknownAgesChange,
  onSearchTextChange,
  onSortChange,
  CustomView,
  queryParams,
  unknownAgesState,
  onUrlUpdate,
}) => {
  const [expand, setExpand] = useState(facet.expanded !== undefined && typeof facet.expanded === 'boolean' ? facet.expanded : false);
  const [open, setOpen] = useState(false);
  const onExpandFacet = () => setExpand(!expand);
  // const query = new URLSearchParams(useLocation().search);
  // const navigate = useNavigate();

  const onClearSection = () => {
    const field = facet.datafield;
    const paramValue = {};
    paramValue[field] = '';

    // Also clear the corresponding unknownAges parameter if it exists
    const unknownAgesField = `${field}_unknownAges`;
    if (queryParams.includes(unknownAgesField)) {
      paramValue[unknownAgesField] = '';
    }

    // const queryStr = generateQueryStr(query, queryParams, paramValue);
    // navigate(`/explore${queryStr}`, { replace: true });
    onSortChange(facet.datafield, null);

    // Reset the corresponding unknownAges parameter in Redux state
    if (queryParams.includes(unknownAgesField) && onUnknownAgesChange) {
      onUnknownAgesChange(field, 'include');
    }
    onClearFacetSection(facet);
  };

  /**
   * display checked items on facet collapse
   */
  const {
    type, facetValues, datafield, section,
  } = facet;
  const selectedItems = facetValues && facetValues.filter((item) => item.isChecked);
  const displayFacet = { ...facet };
  displayFacet.facetValues = selectedItems;

  // Check if facet is active based on selected items or unknown ages selection
  const hasSelectedItems = [...selectedItems].length > 0;
  const unknownAges = unknownAgesState?.[facet.datafield] || 'include';
  const hasUnknownAgesSelection = unknownAges !== 'include';
  const isActiveFacet = hasSelectedItems || (type === InputTypes.SLIDER && hasUnknownAgesSelection);
  const limitCheckBoxCount = facet?.showCheckboxCount || 5;

  const sortFilters = sortBySection({ ...facet, sortBy });

  const checkedItems = sortFilters.filter((item) => item.isChecked)
    .map((item, index) => (
      <ReduxSearchCheckbox
        checkboxItem={{ ...item, index, section }}
        datafield={datafield}
        facet={facet}
        queryParams={queryParams}
      />
    ));

  const newUncheckedFullList = searchItems(sortFilters.filter((item) => !item.isChecked),
    searchText);

  return (
    <>
      <ReduxFacetModal
        facet={facet}
        queryParams={queryParams}
        open={open}
        onClose={() => setOpen(false)}
        onUrlUpdate={onUrlUpdate}
      />
      <Accordion
        square
        expanded={expand}
        onChange={onExpandFacet}
        classes={{
          root: classes.expansionPanelsideBarItem,
        }}
        id={facet.section}
      >
        { CustomView ? (
          <CustomView
            facet={facet}
            facetClasses={
              isActiveFacet ? `activeFacet${facet.section}`
                : `inactiveFacet${facet.section}`
            }
            expanded={expand}
          />
        ) : (
          <CustomAccordionSummary>
            <div
              id={
                `filterGroup_ ${facet.datafield}
                ${facet.label}`
              }
              className={clsx(classes.subSectionSummaryText, {
                [`activeFacet${facet.section}`]: isActiveFacet,
              })}
            >
              {facet.label}
            </div>
          </CustomAccordionSummary>
        )}
        {
          (facetValues.length === 0)
          && (
            <div className={classes.NonSortGroup}>
              <span
                className={classes.NonSortGroupItem}
              >
                No data for this field
              </span>
            </div>
          )
        }
        {
          (facetValues.length > 0)
          && (
            <>
              <div className={classes.searchContainer}>
                <input
                  className={searchText && searchText.trim() !== '' ? classes.searchBoxWithText : classes.searchBox}
                  value={searchText}
                  type="text"
                  placeholder={facet.searchPlaceholder ? facet.searchPlaceholder : 'e.g. Sarcoma, Neoplasm'}
                  onChange={(e) => onSearchTextChange(facet.datafield, e.target.value)}
                  aria-label={`Search within ${facet.section} facet`}
                />
                {
                  searchText
                  && searchText.trim() !== ''
                  && (
                  <IconButton
                    aria-label="close"
                    onClick={() => onSearchTextChange(facet.datafield, '')}
                    className={classes.clearTextButton}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                  )
                }
              </div>
              {
                !facet.disableSearchModal && (
                <div className={classes.searchContainer}>
                  <Button variant="text" className={clsx(classes.expandedDisplayButton, classes[`expandedDisplayButton${facet.section}`])} onClick={() => setOpen(!open)}>
                    {`VIEW EXPANDED DISPLAY (${checkedItems.length + newUncheckedFullList.length})`}
                  </Button>
                </div>
                )
              }
            </>
          )
        }
        {
          (facetValues.length > 0)
            && (
              <>
                <div className={classes.sortGroupSearchFacet}>
                  <span className={classes.sortGroupIconSearchFacet}>
                    <Icon
                      style={{ fontSize: 10 }}
                      onClick={onClearSection}
                    >
                      <img
                        src={clearIcon}
                        height={12}
                        width={12}
                        alt="clear-icon"
                      />
                    </Icon>
                  </span>
                  <span
                    className={
                          clsx(classes.sortGroupItem, {
                            [classes.highlight]: sortBy === sortType.ALPHABET,
                          })
                        }
                    onClick={() => {
                      onSortChange(facet.datafield, sortType.ALPHABET);
                    }}
                  >
                    Sort Alphabetically
                  </span>
                  <span
                    className={
                          clsx(classes.sortGroupItemCounts, {
                            [classes.highlight]: sortBy === sortType.NUMERIC,
                          })
                        }
                    onClick={() => {
                      onSortChange(facet.datafield, sortType.NUMERIC);
                    }}
                  >
                    Sort by Count
                  </span>
                </div>
                <SearchFilterItems
                  searchText={searchText}
                  facet={facet}
                  queryParams={queryParams}
                  sortBy={sortBy}
                  onUrlUpdate={onUrlUpdate}
                />
              </>
            )
        }
      </Accordion>
      {
        (!expand && type === InputTypes.CHECKBOX) && (
          <>
            <List id="filter_Items">
              <FilterItems
                facet={displayFacet}
                queryParams={queryParams}
                onUrlUpdate={onUrlUpdate}
              />
            </List>
          </>
        )
      }
      {
        (!expand && selectedItems.length > limitCheckBoxCount) && (
          <div
            className={classes.showMore}
            onClick={onExpandFacet}
          >
            ...expand to see all selections
          </div>
        )
      }
    </>
  );
};

export default withStyles(styles)(SearchFacetView);
