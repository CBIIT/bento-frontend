/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
import React, { useState } from 'react';
import {
  Accordion,
  List,
  withStyles,
  Icon,
} from '@material-ui/core';
import clsx from 'clsx';
import CustomAccordionSummary from '../summary/AccordionSummaryView';
import { InputTypes } from '../inputs/Types';
import styles from './FacetStyle';
import FilterItems from '../inputs/FilterItems';
import { sortType } from '../../utils/Sort';
import clearIcon from './assets/clearIcon.svg';

const FacetView = ({
  classes,
  facet,
  onClearFacetSection,
  onClearSliderSection,
  CustomView,
}) => {
  const [expand, setExpand] = useState(false);
  const onExpandFacet = () => setExpand(!expand);

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
  const { type, facetValues } = facet;
  const selectedItems = facetValues && facetValues.filter((item) => item.isChecked);
  const displayFacet = { ...facet };
  displayFacet.facetValues = selectedItems;

  return (
    <>
      <Accordion
        square
        expanded={expand}
        onChange={onExpandFacet}
        classes={{
          root: classes.expansionPanelsideBarItem,
        }}
      >
        { CustomView ? (
          <CustomView facet={facet} />
        ) : (
          <CustomAccordionSummary>
            <div
              id={`filterGroup_${facet.datafield}`}
              className={classes.subSectionSummaryText}
            >
              {facet.label}
            </div>
          </CustomAccordionSummary>
        )}
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
          { facet.type === InputTypes.CHECKBOX
            && (<>
                  <span
                    className={
                      clsx(classes.sortGroupItem, {
                        [classes.highlight]: sortBy === sortType.ALPHABET,
                      })
                    }
                    onClick={() => {
                      onSortFacet(sortType.ALPHABET);
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
                      onSortFacet(sortType.NUMERIC);
                    }}
                  >
                    Sort by count
                  </span>
              </>)}
        </div>
        <FilterItems
          facet={facet}
          sortBy={sortBy}
        />
      </Accordion>
      {
        (!expand && type === InputTypes.CHECKBOX) && (
          <>
            <List>
              <FilterItems
                facet={displayFacet}
              />
            </List>
          </>
        )
      }
    </>
  );
};

export default withStyles(styles)(FacetView);
