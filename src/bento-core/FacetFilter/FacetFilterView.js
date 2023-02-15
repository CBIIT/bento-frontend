
import React, { useReducer } from 'react';
import {
  List,
  withStyles,
  Divider,
  Button,
} from '@material-ui/core';
import styles from './FacetFilterStyle';
import { facetFilterStateReducer } from './state/StateReducer';
import FacetSectionView from './components/section/FacetSectionView';
import FacetView from './components/facet/FacetView';
import FacetActionView from './components/facet/FacetActionView';
import FilterItems from './components/inputs/FilterItems';
import { updateState } from './state/StateAction';
import { InputTypes } from './components/inputs/Types';

const BentoFacetFilter = ({ 
  classes,
  sideBarSections,
  facetActionsConfig,
  onClearFacetSection,
  onClearSliderSection,
  ClearAllFiltersButton,
  FacetSectionDivider,
}) => {

  const [facetSections, dispatch] = useReducer(facetFilterStateReducer, sideBarSections);

  return (
    <>
      {ClearAllFiltersButton && (<ClearAllFiltersButton />)}
      {
        facetSections.map((currentSection, index) => (
          <>
            {FacetSectionDivider && (<FacetSectionDivider
              id={`divider_${currentSection.sectionName}_${index}`}
            />)}
            <FacetSectionView section={currentSection}>
              {currentSection.items.map((facet) => (
                <FacetView facet={facet}>
                  <FacetActionView
                    facetActionsConfig={facetActionsConfig}
                    facet={facet}
                    datafield={facet.datafield}
                    dispatchFacetAction={dispatch}
                    onClearFacetSection={facet?.type === InputTypes.CHECKBOX
                      ? onClearFacetSection: onClearSliderSection}
                  />
                  <br/>
                  <List>
                    <FilterItems
                      facet={facet}
                    />
                  </List>
                </FacetView>                    
              ))}
            </FacetSectionView>
          </>
        ))
      }
    </>
  )
}

export default withStyles(styles)(BentoFacetFilter);
