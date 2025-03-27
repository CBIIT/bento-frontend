/* eslint-disable arrow-body-style */
/* eslint-disable padded-blocks */
import React from 'react';
import {
  Divider,
  List,
  withStyles,
} from '@material-ui/core';
import styles from './FacetFilterStyle';
import FacetSectionView from './components/section/FacetSectionView';
import FacetView from './components/facet/ReduxFacetView';
import FilterItems from './components/inputs/FilterItems';
import SearchFacetView from './components/facet/ReduxSearchFacetView';

const BentoFacetFilter = ({
  sideBarSections,
  CustomFacetSection,
  CustomFacetView,
}) => {
  return (
    <>
      {
        sideBarSections.map((section, index) => (
          <>
            <Divider
              variant="middle"
              className={`divider${index}`}
            />
            <FacetSectionView
              section={section}
              CustomSection={CustomFacetSection}
            >
              {section.items.map((facet) => {
                if (facet.search) {
                  return (
                    <SearchFacetView
                      facet={facet}
                      CustomView={CustomFacetView}
                    />
                  );
                }
                return (
                  <FacetView
                    facet={facet}
                    CustomView={CustomFacetView}
                  >
                    <List className={`List_${facet.label}`}>
                      <FilterItems
                        facet={facet}
                      />
                    </List>
                  </FacetView>
                );
              })}
            </FacetSectionView>
          </>
        ))
      }
    </>
  );
};

export default withStyles(styles)(BentoFacetFilter);
