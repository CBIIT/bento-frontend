
import { clearAllAndSelectFacet } from '@bento-core/facet-filter';
import {
  GET_IDS_BY_TYPE, GET_SUBJECT_IDS,
} from '../../../bento/localSearchData';
import store from '../../../store';
import client from '../../../utils/graphqlClient';

export const getFacetValues = (facet, facetValue) => ({[facet]: { [facetValue]: true }});

/**
* set filter item from Arm/Program details page (NUMBER OF CASES: button)
*/
export const onClearAllAndSelectFacetValue = (facet, facetValue) => {
  const filterValue = getFacetValues(facet, facetValue );
  store.dispatch(clearAllAndSelectFacet(filterValue));
}

/**
 * Get list of all available ids for a search field
 *
 * @async
 * @param {string} type search field
 * @returns {Promise<string[]>} all ids for the search field
 */
export async function getAllIds(type) {
  const allids = await client
    .query({
      query: GET_IDS_BY_TYPE(type),
      variables: {},
    })
    .then((result) => result.data.idsLists)
    .catch(() => []);
  return allids;
}

/**
 * Get list of matching ids for a list of ids
 *
 * @param {string[]} subjectIdsArray
 * @returns {Promise<string[]>}
 */
export async function getAllSubjectIds(subjectIdsArray) {
  const allids = await client
    .query({
      query: GET_SUBJECT_IDS,
      variables: {
        subject_ids: subjectIdsArray,
      },
    })
    .then((result) => result.data.findSubjectIdsInList)
    .catch(() => []);
  return allids;
}
