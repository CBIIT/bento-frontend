/* eslint-disable block-scoped-var */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
/* eslint-disable arrow-body-style */
import React from 'react';
import {
  AccordionSummary,
  Button,
  Checkbox,
  Divider,
  ListItem,
  ListItemText,
  withStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import {
  ArrowDropDown as ArrowDropDownIcon,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxBlankIcon,
} from '@material-ui/icons';
import styles from './BentoFacetFilterStyle';
import FacetFilter from '../FacetFilter/FacetFilterController';
import { facetsConfig } from './FacetConfig';
import { generateClearAllFilterBtn } from '../FacetFilter/generator/component';
import { resetIcon } from '../../bento/dashboardData';
// import FacetSectionView from '../FacetFilter/components/section/FacetSectionView';
import FacetFilterThemeProvider from './FilterThemeConfig';

const CustomExpansionPanelSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 48,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 6,
    '&$expanded': {
      minHeight: 48,
    },
  },
  content: {
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
          onClick={onClearAllFilters}
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

  /**
  * Custom Facet Section Divider Component
  * Bento core param id/name to apply style
  */
  const SectionDivider = ({ id, name }) => (
    <Divider
      variant="middle"
      className={classes[name]}
    />
  );

  /** Note:
  * Generate Custom facet Section Component
  * 1. Config local search input for Case
  * 2. Facet Section Name
  */
  const CustomFacetSection = ({ section }) => {
    return (
      <>
        <CustomExpansionPanelSummary>
          <div className={classes.sectionSummaryTextContainer}>
            {section.name}
          </div>
        </CustomExpansionPanelSummary>
      </>
    );
  };

  /**
  * Generate Custom facet View Component
  * 1. Config local search input for Case
  * 2. Facet Section Name
  */
  const CustomFacetView = ({ facet }) => {
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
          <div className={classes.sectionSummaryText}>
            {facet.label}
          </div>
        </CustomExpansionPanelSummary>
      </>
    );
  };

  /**
  * Custom Checkbox Item
  */
  const CustomCheckboxItem = ({
    toggleCheckbox,
    facetValue,
  }) => {
    const {
      name,
      subjects,
      isChecked,
      index,
      section,
    } = facetValue;
    const indexType = index % 2 === 0 ? 'Even' : 'Odd';
    return (
      <>
        <ListItem
          width={1}
          button
          alignItems="flex-start"
          onClick={toggleCheckbox}
          classes={{ gutters: classes.listItemGutters }}
          className={clsx({ [classes[`${section}Checked${indexType}`]]: isChecked })}
        >
          <Checkbox
            icon={<CheckBoxBlankIcon style={{ fontSize: 18 }} />}
            onClick={toggleCheckbox}
            checked={isChecked}
            checkedIcon={(
              <CheckBoxIcon
                style={{
                  fontSize: 18,
                }}
              />
            )}
            disableRipple
            color="secondary"
            classes={{ root: classes.checkboxRoot }}
            className={clsx({ [classes[`${section}CheckedIcon`]]: isChecked })}
          />
          <div className={classes.panelDetailText}>
            <span>{name}</span>
          </div>
          <ListItemText />
          <div className={classes.panelSubjectText}>
            <span>{`(${subjects})`}</span>
          </div>
        </ListItem>
        <Divider
          style={{
            backgroundColor: isChecked ? '#FFFFFF' : '#b1b1b1',
            margin: '0px',
            height: isChecked ? '2px' : '1px',
          }}
        />
      </>
    );
  };

  return (
    <div>
      <FacetFilterThemeProvider>
        <ClearAllFiltersButton />
        <FacetFilter
          data={searchData}
          facetsConfig={facetsConfig}
          FacetSectionDivider={SectionDivider}
          CustomFacetSection={CustomFacetSection}
          CustomFacetView={CustomFacetView}
          CustomCheckboxItem={CustomCheckboxItem}
        />
      </FacetFilterThemeProvider>
    </div>
  );
};

export default withStyles(styles)(BentoFacetFilter);
