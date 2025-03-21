import React, { useState } from 'react';
import {
  Accordion,
  List,
  withStyles,
  Icon,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import CustomAccordionSummary from '../summary/AccordionSummaryView';
import { InputTypes } from '../inputs/Types';
import styles from './FacetStyle';
import FilterItems from '../inputs/FilterItems';
import SearchFilterItems from '../inputs/SearchFilterItems';
import { sortType } from '../../utils/Sort';
import clearIcon from './assets/clearIcon.svg';

const SearchFacetView = ({
  classes,
  facet,
  searchText,
  sortBy,
  onClearFacetSection,
  onSearchTextChange,
  onSortChange,
  CustomView,
}) => {
  const [expand, setExpand] = useState(facet.expanded !== undefined && typeof facet.expanded === 'boolean' ? facet.expanded : false);
  const onExpandFacet = () => setExpand(!expand);

  const onClearSection = () => {
    onSortChange(facet.datafield, null);
    onClearFacetSection(facet);
  };

  /**
   * display checked items on facet collapse
   */
  const { type, facetValues } = facet;
  const selectedItems = facetValues && facetValues.filter((item) => item && item.isChecked);
  const displayFacet = { ...facet };
  displayFacet.facetValues = selectedItems;
  const isActiveFacet = [...selectedItems].length > 0;
  const limitCheckBoxCount = facet?.showCheckboxCount || 5;
  return (
    <>
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
          (facet.type !== InputTypes.SLIDER && facetValues.length === 0)
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
        <div className={classes.searchContainer}>
          <input
            className={searchText && searchText.trim() !== '' ? classes.searchBoxWithText : classes.searchBox}
            value={searchText}
            type="text"
            placeholder={facet.searchPlaceholder ? facet.searchPlaceholder : 'e.g. Sarcoma, Neoplasm'}
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
          { (facet.type === InputTypes.CHECKBOX && facetValues.length > 0)
          && (
          <>
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
          </>
          )}
        </div>

        {(expand)
          && (
            <>
              <SearchFilterItems
                searchText={searchText}
                facet={facet}
                sortBy={sortBy}
              />
            </>
          )}
      </Accordion>
      {
        (!expand && type === InputTypes.CHECKBOX && selectedItems.length > 0) && (
          <>
            <List id="filter_Items">
              <FilterItems
                searchText={searchText}
                facet={displayFacet}
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
