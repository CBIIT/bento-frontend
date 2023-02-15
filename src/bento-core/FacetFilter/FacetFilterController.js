import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { facetSearchData, facetSectionVariables, facetActionsConfig } from './bento/filterCofig';
import { InputTypes } from './components/inputs/Types';
import { clearFacetSection, clearSliderSection } from './store/actions/SideBar';
import BentoFacetFilter from './FacetFilterView';

const FacetFilterController = (props) => {
  /**
   * update checkbox state
   * 1. checkbox state
   * 2. subject state
   */
  const { filterState } = props;
  const updateSibarState = (filterSections) => {
    const updateSections = [...filterSections];
    if(!_.isEmpty(filterState)) {
      for (const[key, value] of Object.entries(filterState)) {
        updateSections.forEach((sideBar) => {
          if (sideBar.type === InputTypes.CHECKBOX && sideBar.datafield == key) {
            sideBar.facetValues.forEach((item) => {
              item.isChecked = value[item.name] ? true : false;
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
  }

  /**
   * Generate facet sections state
   * 
   */ 
  const sideBarDisplay = facetSearchData.filter((sideBar) => sideBar.show).slice(0, 16);
  const updateSections = updateSibarState(sideBarDisplay);

  const arrangeBySections = (arr) => {
    const sideBar = {};
    arr.forEach(({ section, ...item }) => {
      if (!sideBar[section]) {
        sideBar[section] = { sectionName: section, expandSection: true, items: [] };
      }
      sideBar[section].items.push({ section, ...item });
    });
    return Object.values(sideBar);
  };
  const sideBarSections = arrangeBySections(updateSections);
  return (  
    <>
      <BentoFacetFilter
        {...props}
        sideBarSections={sideBarSections}
        facetSectionVariables={facetSectionVariables}
        facetActionsConfig={facetActionsConfig}
      />
    </>
  )
}

const mapStateToProps = (state) => ({
  filterState: state.statusReducer?.filterState,
});

const mapDispatchToProps = (dispatch) => ({
  onClearFacetSection: (section) => {dispatch(clearFacetSection(section))},
  onClearSliderSection: (section) => {dispatch(clearSliderSection(section))}
});

export default connect(mapStateToProps, mapDispatchToProps)(FacetFilterController);
