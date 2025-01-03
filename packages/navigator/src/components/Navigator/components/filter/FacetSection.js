import React from 'react';
import FacetView from './FacetView';

const FacetSection = ({
  section
}) => {
  console.log()
  return (
    <>
      {
        Object.keys(section || {}).map(
          (sectionName) => (
            <div>
              {sectionName}
              <FacetView
                checkBoxItems={section[sectionName]}
              />
              <br />
            </div>
          )
        )
      }
    </>
  );
};
  
export default FacetSection;
