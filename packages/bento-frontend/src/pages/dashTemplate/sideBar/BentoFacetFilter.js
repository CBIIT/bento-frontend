/* eslint-disable block-scoped-var */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import {
  AccordionSummary,
  Button,
  withStyles,
} from '@material-ui/core';
import {
  ArrowDropDown as ArrowDropDownIcon,
} from '@material-ui/icons';
import clsx from 'clsx';
import { resetAllData } from '@bento-core/local-find';
import store from '../../../store';
import styles from './BentoFacetFilterStyle';
import FacetFilter from '../../../bento-core/FacetFilter/FacetFilterController';
import { facetsConfig, facetSectionVariables } from '../../../bento/dashTemplate';
import { generateClearAllFilterBtn } from '../../../bento-core/FacetFilter/generator/component';
import { resetIcon } from '../../../bento/dashboardData';
// import FacetSectionView from '../FacetFilter/components/section/FacetSectionView';
import FacetFilterThemeProvider from './FilterThemeConfig';
import BentoCaseSearch from './BentoCaseSearch';

const CustomExpansionPanelSummary = withStyles({
  root: {
    marginBottom: -1,
    paddingTop: 6,
    paddingLeft: 14,
    paddingRight: 14,
    minHeight: 48,
    '&$expanded': {
      minHeight: 48,
    },
  },
  content: {
    display: 'block',
    '&$expanded': {
      margin: '4px 0px 15px 0px',
    },
  },
  expanded: {},
})(AccordionSummary);

const BentoFacetFilter = ({
  classes,
  searchData,
}) => {
  /**
  * Clear All Filter Button
  * Custom button component
  * bento core params
  * 1. onClearAllFilters - dispatch clear all filters
  * 2. disable - true/ false
  */
  const CustomClearAllFiltersBtn = ({ onClearAllFilters, disable }) => {
    return (
      <div className={classes.floatRight}>
        <Button
          id="button_sidebar_clear_all_filters"
          variant="outlined"
          disabled={disable}
          onClick={() => {
            onClearAllFilters();
            store.dispatch(resetAllData());
          }}
          className={classes.customButton}
          classes={{ root: classes.clearAllButtonRoot }}
        >
          <img
            src={resetIcon.src}
            height={resetIcon.size}
            width={resetIcon.size}
            alt={resetIcon.alt}
          />
        </Button>
        <span className={disable
          ? classes.resetTextDisabled : classes.resetText}
        >
          Clear all filtered selections
        </span>
      </div>
    );
  };
  const ClearAllFiltersButton = () => generateClearAllFilterBtn(CustomClearAllFiltersBtn);

  /** Note:
  * Generate Custom facet Section Component
  * 1. Config local search input for Case
  * 2. Facet Section Name
  */
  const CustomFacetSection = ({ section }) => {
    const { name, expandSection } = section;
    const { hasSearch = false } = facetSectionVariables[name];

    const [expanded, setExpanded] = useState(expandSection);
    const [showSearch, setShowSearch] = useState(true);

    const toggleSearch = (e) => {
      e.stopPropagation();
      setShowSearch(!showSearch);
    };

    const collapseHandler = () => {
      setExpanded(!expanded);
    };

    return (
      <>
        <CustomExpansionPanelSummary onClick={collapseHandler}>
          <div className={classes.sectionSummaryTextContainer}>
            {name}
            {hasSearch && (
              <div className={classes.findCaseButton} onClick={toggleSearch}>
                <img src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/FacetLocalFindSearchIcon.svg" className={classes.findCaseIcon} alt="search" />
              </div>
            )}
          </div>
          {hasSearch && (
            <BentoCaseSearch
              classes={classes}
              hidden={!expanded || !showSearch}
            />
          )}
        </CustomExpansionPanelSummary>
      </>
    );
  };

  /**
  * Generate Custom facet View Component
  * 1. Config local search input for Case
  * 2. Facet Section Name
  */
  const CustomFacetView = ({ facet, facetClasses }) => {
    return (
      <>
        <CustomExpansionPanelSummary
          expandIcon={(
            <ArrowDropDownIcon
              classes={{ root: classes.dropDownIconSubSection }}
              style={{ fontSize: 26 }}
            />
          )}
          className={classes.customExpansionPanelSummaryRoot}
        >
          <div className={
            clsx(classes.sectionSummaryText, classes[facetClasses])
            }
          >
            {facet.label}
          </div>
        </CustomExpansionPanelSummary>
      </>
    );
  };

  return (
    <div>
      <FacetFilterThemeProvider>
        <ClearAllFiltersButton />
        <FacetFilter
          data={searchData}
          facetSectionConfig={facetSectionVariables}
          facetsConfig={facetsConfig}
          CustomFacetSection={CustomFacetSection}
          CustomFacetView={CustomFacetView}
        />
      </FacetFilterThemeProvider>
    </div>
  );
};

export default withStyles(styles)(BentoFacetFilter);
