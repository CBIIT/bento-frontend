import React, { useState } from 'react';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { generateQueryStr } from '@bento-core/util';
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
        if (key === '' || item.name.toUpperCase().includes(key)) {
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
  onSearchTextChange,
  onSortChange,
  CustomView,
  queryParams,
}) => {
  const [expand, setExpand] = useState(facet.expanded !== undefined && typeof facet.expanded === 'boolean' ? facet.expanded : false);
  const [open, setOpen] = useState(false);
  const onExpandFacet = () => setExpand(!expand);
  const query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();

  const onClearSection = () => {
    const field = facet.datafield;
    const paramValue = {};
    paramValue[field] = '';
    const queryStr = generateQueryStr(query, queryParams, paramValue);
    navigate(`/explore${queryStr}`, { replace: true });
    onSortChange(facet.datafield, null);
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
  const isActiveFacet = [...selectedItems].length > 0;
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
        {CustomView ? (
          <CustomView
            facet={facet}
            facetClasses={
              isActiveFacet ? `activeFacet${facet.section}`
                : `inactiveFacet${facet.section}`
            }
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
                  placeholder="e.g. Sarcoma, Neoplasm"
                  onChange={(e) => onSearchTextChange(facet.datafield, e.target.value)}
                />
                {
                  searchText
                  && searchText.trim() !== ''
                  && (
                    <IconButton
                      aria-label="close"
                      onClick={() => onSearchTextChange(facet.datafield, '')}
                      className={classes.clearTextButton}
                      sx={(theme) => ({
                        position: 'absolute',
                        right: 7,
                        top: 7,
                        color: theme.palette.grey[500],
                      })}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  )
                }
              </div>
              <div className={classes.searchContainer}>
                <Button variant="text" className={classes.expandedDisplayButton} onClick={() => setOpen(!open)}>
                  {`VIEW EXPANDED DISPLAY (${checkedItems.length + newUncheckedFullList.length})`}
                </Button>
              </div>
            </>
          )
        }
        {
          (facetValues.length > 0)
          && (
            <>
              <div className={classes.sortGroup}>
                <span className={classes.sortGroupIcon}>
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
                  Sort alphabetically
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
                  Sort by count
                </span>
              </div>
              <SearchFilterItems
                searchText={searchText}
                facet={facet}
                queryParams={queryParams}
                sortBy={sortBy}
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
