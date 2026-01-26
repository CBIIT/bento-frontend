/* eslint-disable arrow-body-style */
/* eslint-disable padded-blocks */
import React from 'react';
import {
  List,
  withStyles,
} from '@material-ui/core';
import styles from './FacetFilterStyle';
import NewFacetView from './components/facet/ReduxNewFacetView';
import FilterItems from './components/inputs/FilterItems';
import NewSearchFacetView from './components/facet/ReduxNewSearchFacetView';

const BentoFacetFilter = ({
  facetSection,
  CustomFacetSection,
  CustomFacetView,
  queryParams,
  searchFacetClasses,
  onUrlUpdate,
}) => {
  return (
    <>
      { CustomFacetSection && (
        <>
          <CustomFacetSection section={facetSection} expanded />
        </>
      )}
      {facetSection.items.map((facet) => {
        if (facet.search) {
          return (
            <NewSearchFacetView
              facet={facet}
              queryParams={queryParams}
              CustomView={CustomFacetView}
              classes={searchFacetClasses}
              onUrlUpdate={onUrlUpdate}
            />
          );
        }
        return (
          <NewFacetView
            facet={facet}
            queryParams={queryParams}
            CustomView={CustomFacetView}
            onUrlUpdate={onUrlUpdate}
          >
            <List className={`List_${facet.label}`}>
              <FilterItems
                facet={facet}
              />
            </List>
          </NewFacetView>
        );
      })}
    </>
  );
};

export default withStyles(styles)(BentoFacetFilter);
