/* eslint-disable block-scoped-var */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable space-infix-ops */
/* eslint-disable prefer-template */
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { InputTypes } from './components/inputs/Types';
import BentoFacetFilter from './FacetFilterView';

const FacetFilterController = (props) => {
  /**
   * update checkbox state
   * 1. checkbox state
   * 2. subject state
   */
  const {
    filterState,
    data,
    facetsConfig,
    facetSectionConfig,
  } = props;

  const updateFacetState = (filterSections) => {
    const updateSections = [...filterSections];
    if (!_.isEmpty(filterState)) {
      for (const [key, value] of Object.entries(filterState)) {
        updateSections.forEach((sideBar) => {
          if (sideBar.type === InputTypes.CHECKBOX && sideBar.datafield === key) {
            sideBar.facetValues.forEach((item) => {
              item.isChecked = value[item.name] ? value[item.name] : false;
            });
          }
          if (sideBar.type === InputTypes.SLIDER && sideBar.datafield === key) {
            sideBar.facetValues = value;
          }
        });
      }
    } else {
      updateSections.forEach((sideBar) => {
        if (sideBar.type === InputTypes.CHECKBOX) {
          sideBar.facetValues.forEach((item) => {
            item.isChecked = false;
          });
        }
        /**
         * set default value for slider - on clear all filter
         */
        if (sideBar.type === InputTypes.SLIDER) {
          const { minLowerBound, maxUpperBound } = sideBar;
          sideBar.facetValues = [minLowerBound, maxUpperBound];
        }
      });
    }
    return updateSections;
  };

  const arrangeBySections = (arr) => {
    const sideBar = {};

    arr.forEach(({ section, ...item }) => {
      const { isExpanded } =facetSectionConfig[section];
      if (!sideBar[section]) {
        sideBar[section] = {
          name: section,
          sectionName: section,
          expandSection: isExpanded !== undefined && typeof isExpanded === 'boolean' ? isExpanded : true,
          items: [],
        };
      }
      sideBar[section].items.push({ section, ...item });
    });
    return Object.values(sideBar);
  };

  /**
   * Construct filter object
   * 1. add facet values to facets
   * 2. add 'name' key to each facet value
   */
  const addFacetValues = (facets) => {
    const updateFacets = [];
    if (facets) {
      facets.forEach((facet) => {
        const updateFacet = { ...facet, facetValues: [] };
        const {
          field,
          ApiLowerBoundName,
          ApiUpperBoundName,
          apiForFiltering,
        } = updateFacet;
        if (data[apiForFiltering]) {
          if (Array.isArray(data[apiForFiltering])) {
            const updateField = data[apiForFiltering].map((item) => {
              const addField = { ...item };
              addField.name = item[field];
              return addField;
            });
            updateFacet.facetValues = updateField;
          }
          /**
          * add object to facet values
          */
          if (facet.type === InputTypes.SLIDER) {
            const lowerBound = data[apiForFiltering][ApiLowerBoundName];
            const upperBound = data[apiForFiltering][ApiUpperBoundName];
            updateFacet.minLowerBound = lowerBound;
            updateFacet.maxUpperBound = upperBound;
            updateFacet.facetValues = [lowerBound, upperBound];
          }
        }
        updateFacets.push(updateFacet);
      });
    }
    return updateFacets;
  };

  /**
   * Generate facet sections state
   *
   */
  const displayFacets = facetsConfig.filter((facet) => facet.show).slice(0, 16);
  const facetStates = addFacetValues(displayFacets);
  const updateState = updateFacetState(facetStates);
  const facetSections = arrangeBySections(updateState);

  return (
    <>
      <BentoFacetFilter
        {...props}
        sideBarSections={facetSections}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  filterState: state.statusReducer.filterState,
});

export default connect(mapStateToProps, null)(FacetFilterController);
