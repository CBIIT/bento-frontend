
import { clearAllAndSelectFacet } from '@bento-core/facet-filter';
import store from '../../../store';

export const getFacetValues = (facet, facetValue) => ({[facet]: { [facetValue]: true }});

/**
* set filter item from Arm/Program details page (NUMBER OF CASES: button)
*/
export const onClearAllAndSelectFacetValue = (facet, facetValue) => {
  const filterValue = getFacetValues(facet, facetValue );
  store.dispatch(clearAllAndSelectFacet(filterValue));
}
