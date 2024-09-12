/* eslint-disable arrow-body-style */
/* eslint-disable padded-blocks */
import React from 'react';
import {
  Divider,
  withStyles,
} from '@material-ui/core';
import styles from './FacetFilterStyle';
import FacetSectionView from './components/section/FacetSectionView';
import FacetView from './components/facet/ReduxFacetView';

const BentoFacetFilter = ({
  sideBarSections,
  CustomFacetSection,
  CustomFacetView,
  clearIcon,
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
                  CustomView={CustomFacetView}
                  clearIcon={clearIcon}
                />
              ))}
            </FacetSectionView>
          </>
        ))
      }
    </>
  );
};

export default withStyles(styles)(BentoFacetFilter);
