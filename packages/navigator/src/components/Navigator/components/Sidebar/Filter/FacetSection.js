import React from 'react';
import FacetView from './FacetView';

import * as Styled from './FacetSection.styled';
const FacetSection = ({
  section
}) => {

  return (
    <>
      {
        Object.keys(section || {}).map(
          (sectionName) => (
            <Styled.FacetAccordian
              defaultExpanded={true}
            >
              <Styled.FacetAccordianSummary
                expandIcon={<Styled.MuiExpandMoreIcon />}
              >
                {sectionName}
              </Styled.FacetAccordianSummary>
              <FacetView
                checkBoxItems={section[sectionName]}
              />
            </Styled.FacetAccordian>
          )
        )
      }
    </>
  );
};
  
export default FacetSection;
