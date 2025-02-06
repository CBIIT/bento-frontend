import React from 'react';
import { useModelContext } from '../../../state/NavContextProvider';
import FacetSection from './FacetSection';
import { facetSectionType } from '../../../controller/Filter';

import * as Styled from './FacetSection.styled';

const FacetController = () => {
  /**
  * use context access data model state
  */
  const { context } = useModelContext();
  const { filterSections } = context;

  if (!filterSections) {
    return (<> loading... </>)
  }

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
                  {section}
                </Styled.SectionAccordianSummary>
                <FacetSection
                  section={filterSections[section]}
                />
              </Styled.SectionAccordian>
            </Styled.FacetSectionContainer>
        ))
      }
    </>
  );
};

export default FacetController;
