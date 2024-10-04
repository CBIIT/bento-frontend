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

const BentoFacetFilter = ({
  sideBarSections,
  CustomFacetSection,
  CustomFacetView,
  queryParams,
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
              {section.items.map((facet) => (
                <FacetView
                  facet={facet}
                  queryParams={queryParams}
                  CustomView={CustomFacetView}
                >
                  <List className={`List_${facet.label}`}>
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
  );
};

export default withStyles(styles)(BentoFacetFilter);
