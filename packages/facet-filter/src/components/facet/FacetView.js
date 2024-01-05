import React, { useEffect, useState } from 'react';
import {
  Accordion, List, withStyles, Icon,
} from '@material-ui/core';
import clsx from 'clsx';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import CustomAccordionSummary from '../summary/AccordionSummaryView';
import { InputTypes } from '../inputs/Types';
import styles from './FacetStyle';
import FilterItems from '../inputs/FilterItems';
import { sortType } from '../../utils/Sort';
import clearIcon from './assets/clearIcon.svg';

const FacetView = ({
  classes,
  facet,
  enableClearSection,
  onClearFacetSection,
  onClearSliderSection,
  CustomView,
  autoComplete,
  upload,
  onToggle,
}) => {
  const [expand, setExpand] = useState(false);
  const onExpandFacet = () => setExpand(!expand);

  /**
   * expand section incase of active local search
   */
  useEffect(() => {
    if (
      (autoComplete && autoComplete.length > 0)
      || (upload && upload.length > 0)
    ) {
      setExpand(true);
    }
  }, [autoComplete, upload]);

  const [sortBy, setSortBy] = useState(null);
  const onSortFacet = (type) => {
    setSortBy(type);
  };

  const onClearSection = () => {
    setSortBy(null);
    if (facet.type === InputTypes.SLIDER) {
      onClearSliderSection(facet);
    } else {
      onClearFacetSection(facet);
    }
  };
  /**
   * display checked items on facet collapse
   */
  const { type, facetValues, datafield } = facet;
  const selectedItems = facetValues && facetValues.filter((item) => item.isChecked);
  const displayFacet = { ...facet };
  displayFacet.facetValues = selectedItems;
  const isActiveFacet = [...selectedItems].length > 0;
  const limitCheckBoxCount = facet?.showCheckboxCount || 5;

  const clearFacetSectionValues = () => {
    facetValues.forEach((item) => {
      const toggleCheckBoxItem = {
        name: item.group,
        datafield,
        isChecked: false,
      };

      onToggle(toggleCheckBoxItem);
    });
  };
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
        {CustomView ? (
          <CustomView
            clearFacetSectionValues={clearFacetSectionValues}
            hasSelections={selectedItems.length}
            facet={facet}
            facetClasses={
              isActiveFacet
                ? `activeFacet${facet.section}`
                : `inactiveFacet${facet.section}`
            }
          />
        ) : (
          <CustomAccordionSummary>
            {!enableClearSection ? (
              <div
                id={`filterGroup_ ${facet.datafield}
                ${facet.label}`}
                className={clsx(classes.subSectionSummaryText, {
                  [`activeFacet${facet.section}`]: isActiveFacet,
                })}
              >
                {facet.label}
              </div>
            ) : (
              <div className={classes.subSectionSummaryTextWrapper}>
                <div
                  id={`filterGroup_ ${facet.datafield}
                ${facet.label}`}
                  className={clsx(classes.subSectionSummaryText, {
                    [`activeFacet${facet.section}`]: isActiveFacet,
                  })}
                >
                  {facet.label}
                </div>
                {selectedItems.length ? (
                  <IconButton onClick={clearFacetSectionValues}>
                    <RefreshIcon />
                  </IconButton>
                ) : null}
              </div>
            )}
          </CustomAccordionSummary>
        )}
        {(facet.type === InputTypes.SLIDER || facetValues.length === 0) && (
          <div className={classes.NonSortGroup}>
            <span className={classes.NonSortGroupItem}>
              No data for this field
            </span>
          </div>
        )}
        {(facet.type === InputTypes.SLIDER || facetValues.length > 0) && (
          <div className={classes.sortGroup}>
            <span className={classes.sortGroupIcon}>
              <Icon style={{ fontSize: 10 }} onClick={onClearSection}>
                <img src={clearIcon} height={12} width={12} alt="clear-icon" />
              </Icon>
            </span>
            {facet.type === InputTypes.CHECKBOX && facetValues.length > 0 && (
              <>
                <span
                  className={clsx(classes.sortGroupItem, {
                    [classes.highlight]: sortBy === sortType.ALPHABET,
                  })}
                  onClick={() => {
                    onSortFacet(sortType.ALPHABET);
                  }}
                >
                  Sort alphabetically
                </span>
                <span
                  className={clsx(classes.sortGroupItemCounts, {
                    [classes.highlight]: sortBy === sortType.NUMERIC,
                  })}
                  onClick={() => {
                    onSortFacet(sortType.NUMERIC);
                  }}
                >
                  Sort by count
                </span>
              </>
            )}
          </div>
        )}
        {expand && <FilterItems facet={facet} sortBy={sortBy} />}
      </Accordion>
      {!expand && type === InputTypes.CHECKBOX && selectedItems.length > 0 && (
        <>
          <List id="filter_Items">
            <FilterItems facet={displayFacet} />
          </List>
        </>
      )}
      {!expand && selectedItems.length > limitCheckBoxCount && (
        <div className={classes.showMore} onClick={onExpandFacet}>
          ...expand to see all selections
        </div>
      )}
    </>
  );
};

export default withStyles(styles)(FacetView);
