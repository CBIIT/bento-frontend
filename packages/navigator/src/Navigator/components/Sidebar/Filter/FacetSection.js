import React from 'react';
import FacetView from './FacetView';
import * as Styled from './FacetSection.styled';

const defaultExpansion = true;

const FacetSection = ({
  section,
  facetItemCount,
  handleClearSection,
  activeFacet = {},
}) => (
  <>
    {
      Object.keys(section || {}).map(
        (sectionName) => (
          <>
            <Styled.FacetAccordian defaultExpanded={defaultExpansion}>
              <FacetView
                activeFacet={activeFacet}
                sectionName={sectionName}
                handleClearSection={handleClearSection}
                checkBoxItems={section[sectionName]}
                facetItemCount={facetItemCount}
              />
            </Styled.FacetAccordian>
          </>
        ),
      )
    }
  </>
);

export default FacetSection;
