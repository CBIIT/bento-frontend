import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { InputTypes } from './components/inputs/Types';
import NewBentoFacetFilter from './NewFacetFilterView';

const NewFacetFilterController = (props) => {
  /**
   * update checkbox state
   * 1. checkbox state
   * 2. subject state
   */
  const {
    activeFilters,
    data,
    facetsConfig,
    facetSectionConfig,
    selectedSection,
    unknownAgesState,
    searchFacetClasses,
  } = props;

  // console.log(activeFilters);
  const filterState = Object.entries(activeFilters).reduce((acc, [key, value]) => {
    if (key !== 'participant_ids') {
      return { ...acc, [key]: value };
    }
    return acc;
  }, {});

  const updateFacetState = (filterSections) => {
    if (!_.isEmpty(filterState)) {
      return filterSections.map((sideBar) => {
        const filterValue = filterState[sideBar.datafield];

        if (!filterValue) {
          return sideBar;
        }

        if (sideBar.type === InputTypes.CHECKBOX) {
          return {
            ...sideBar,
            facetValues: sideBar.facetValues.map((item) => ({
              ...item,
              isChecked: filterValue.indexOf(item.name) > -1,
            })),
          };
        }

        if (sideBar.type === InputTypes.SLIDER) {
          return {
            ...sideBar,
            facetValues: filterValue,
          };
        }

        return sideBar;
      });
    }

    return filterSections.map((sideBar) => {
      if (sideBar.type === InputTypes.CHECKBOX) {
        return {
          ...sideBar,
          facetValues: sideBar.facetValues.map((item) => ({
            ...item,
            isChecked: false,
          })),
        };
      }
      /**
       * set default value for slider - on clear all filter
       */
      if (sideBar.type === InputTypes.SLIDER) {
        const { minLowerBound, maxUpperBound } = sideBar;
        return {
          ...sideBar,
          facetValues: [minLowerBound, maxUpperBound],
        };
      }
      return sideBar;
    });
  };

  const arrangeBySections = (arr) => {
    const sideBar = {};

    arr.forEach(({ section, ...item }) => {
      const { isExpanded } = facetSectionConfig[section];
      if (!sideBar[section]) {
        sideBar[section] = {
          name: section,
          sectionName: section,
          expandSection: isExpanded !== undefined && typeof isExpanded === 'boolean' ? isExpanded : true,
          items: [],
        };
      }
      sideBar[section] = {
        ...sideBar[section],
        items: [...sideBar[section].items, { section, ...item }],
      };
    });
    return Object.values(sideBar);
  };

  /**
   * Construct filter object
   * 1. add facet values to facets
   * 2. add 'name' key to each facet value
   */
  const addFacetValues = (facets) => {
    if (!facets) {
      return [];
    }

    return facets.map((facet) => {
      const updateFacet = { ...facet, facetValues: [] };
      const {
        field,
        ApiLowerBoundName,
        ApiUpperBoundName,
        apiForFiltering,
      } = updateFacet;

      if (!data[apiForFiltering]) {
        return updateFacet;
      }

      if (Array.isArray(data[apiForFiltering])) {
        const validValues = [];
        const updateField = data[apiForFiltering].map((item) => {
          const addField = {
            ...item,
            name: item[field],
          };
          validValues.push(addField.name);
          return addField;
        });
        /**
         * Check if there are orphan filter values and add them to the facet values
         */
        let finalUpdateField = updateField;
        if (filterState !== undefined) {
          const facetFilter = filterState[facet.datafield];
          if (facetFilter) {
            const orphanValues = facetFilter
              .filter((item) => validValues.indexOf(item) === -1)
              .map((item) => ({
                group: item,
                name: item,
                subjects: 0,
              }));
            finalUpdateField = [...updateField, ...orphanValues];
          }
        }
        return {
          ...updateFacet,
          facetValues: finalUpdateField,
        };
      }

      /**
      * add object to facet values
      */
      if (facet.type === InputTypes.SLIDER) {
        const lowerBound = data[apiForFiltering][ApiLowerBoundName];
        const upperBound = data[apiForFiltering][ApiUpperBoundName];
        const unknownAges = unknownAgesState?.[facet.datafield] || 'include';
        return {
          ...updateFacet,
          minLowerBound: lowerBound,
          maxUpperBound: upperBound,
          unknownAges,
          facetValues: [lowerBound, upperBound],
          style: facet.style,
        };
      }

      return updateFacet;
    });
  };

  /**
   * Generate facet sections state
   *
   */
  // const displayFacets = facetsConfig.filter((facet) => facet.show).slice(0, 16);
  const displayFacets = facetsConfig.filter((facet) => facet.show);
  const facetStates = addFacetValues(displayFacets);
  const updateState = updateFacetState(facetStates);
  const facetSections = arrangeBySections(updateState);
  const facetSection = facetSections[selectedSection];

  return (
    <>
      <NewBentoFacetFilter
        {...props}
        facetSection={facetSection}
        searchFacetClasses={searchFacetClasses}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  unknownAgesState: state?.statusReducer?.unknownAgesState || {},
});

export default connect(mapStateToProps, null)(NewFacetFilterController);
