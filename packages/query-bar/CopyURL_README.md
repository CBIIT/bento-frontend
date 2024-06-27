# DQB copy URL button Configuration

```
DashTemplateController.js

export const setActiveFilterByPathQuery = (match) => {
  const query = decodeURI(match.params.filterQuery || '');
  const filterObject = JSON.parse(query);
  const { autocomplete = [], upload = [], uploadMetadata } = filterObject;

  const activeFilterValues = Object.keys(filterObject).reduce((curr, key) => {
    if (Array.isArray(filterObject[key])) {
      const activeFilters = filterObject[key].reduce((value, item) => ({
        ...value,
        [item]: true,
      }), {});
      return {
        ...curr,
        [key]: activeFilters,
      };
    }
    return curr;
  }, {});
  store.dispatch(clearAllAndSelectFacet(activeFilterValues));
  store.dispatch(updateAutocompleteData(autocomplete));
  store.dispatch(updateUploadData(upload));
  store.dispatch(updateUploadMetadata(uploadMetadata));
};


// redirect 
if (match.params.filterQuery) {
  setActiveFilterByPathQuery(match);
  const redirectUrl = '/explore';
  history.push(redirectUrl);
}

```

# DQB copy URL button theme style

``` https://github.com/CBIIT/bento-icdc-frontend/tree/v4.0.1/src/pages/dashboard/filterQueryBar```