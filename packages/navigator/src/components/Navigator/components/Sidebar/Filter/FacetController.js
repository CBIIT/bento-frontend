import React from 'react';
import { useModelContext } from '../../../state/NavContextProvider';
import FacetSection from './FacetSection';
import { facetSectionType } from '../../../controller/Filter';

import * as Styled from './FacetSection.styled';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
                  expandIcon={<ExpandMoreIcon />}
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
