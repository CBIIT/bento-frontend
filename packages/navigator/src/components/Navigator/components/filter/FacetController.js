import React from 'react';
import { useModelContext } from '../../state/NavContextProvider';
import FacetSection from './FacetSection';
import { facetSectionType } from '../../controller/Filter';

const FacetSections = () => {
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
            <div>
              <p>{section}</p>
              <FacetSection
                section={filterSections[section]}
              />
            </div>
        ))
      }
    </>
  );
};

export default FacetSections;
