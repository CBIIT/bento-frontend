import React from 'react';
import { useModelContext } from '../../../state/NavContextProvider';
import FacetSection from './FacetSection';
import { facetSectionType } from '../../../controller/Filter';

import * as Styled from './FacetSection.styled';
import { onClearSection } from '../../../state/actions/Action';

const unCamelCase = (str) => {
  return str
    // insert a space before all caps
    .replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, function(str){ return str.toUpperCase(); })
};

const FacetController = () => {
  /**
  * use context access data model state
  */
  const { context } = useModelContext();
  const { filterSections, facetItemCount, activeFilters = {} } = context;

  if (!filterSections || !facetItemCount) {
    return (<> loading... </>)
  }

  const handleClearSection = (section, facet) => {
    const { dispatch } = context;
    dispatch(onClearSection({section, facet}));
  };

  return (
    <>
      {
        (Object.keys(facetSectionType))
          .map((section) => (
            <Styled.FacetSectionContainer section={section}>
              <Styled.SectionAccordian defaultExpanded={true}>
                <Styled.SectionAccordianSummary
                  expandIcon={<Styled.MuiArrowDrowdownIcon />}
                >
                  {unCamelCase(section)}
                </Styled.SectionAccordianSummary>
                <FacetSection
                  section={filterSections[section]}
                  facetItemCount={facetItemCount}
                  activeFacet={activeFilters[section]}
                  handleClearSection={(sectionName) => handleClearSection(section, sectionName)}
                />
              </Styled.SectionAccordian>
            </Styled.FacetSectionContainer>
        ))
      }
    </>
  );
};

export default FacetController;
