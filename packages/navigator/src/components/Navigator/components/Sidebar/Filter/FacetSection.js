import React from 'react';
import FacetView from './FacetView';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as Styled from './FacetSection.styled';
const FacetSection = ({
  section
}) => {

  return (
    <>
      {
        Object.keys(section || {}).map(
          (sectionName) => (
            <Styled.FacetAccordian defaultExpanded={true}>
              <Styled.FacetAccordianSummary
                expandIcon={<ExpandMoreIcon />}
              >
                {sectionName}
              </Styled.FacetAccordianSummary>
              <FacetView
                checkBoxItems={section[sectionName]}
              />
              <br />
            </Styled.FacetAccordian>
          )
        )
      }
    </>
  );
};
  
export default FacetSection;
