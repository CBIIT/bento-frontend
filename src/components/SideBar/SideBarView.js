import React from 'react';
import {
  List,
  withStyles,
} from '@material-ui/core';
import FacetFilter from './SideBarComponents/FacetFilters';
import ClearFilters from './SideBarComponents/clearFilters';
import {
  resetIcon,
  facetSearchData,
} from '../../bento/dashboardData';
import {
  clearAllFilters,
} from '../../pages/dashboardTab/store/dashboardReducer';
import styles from './styles/SideBarViewStyle';

if (resetIcon.src === '') {
  resetIcon.src = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg';
}

const SideBarContent = ({
  classes: {
    listRoot,
    dividerRoot,
  },
}) => {
  const searchRef = React.useRef();

  const clearFilters = () => {
    clearAllFilters();
    if (typeof searchRef.current !== 'undefined') {
      searchRef.current.clear();
    }
  };

  const countFilters = facetSearchData
    ? facetSearchData.reduce((n, facet) => n + (facet.show === true), 0) : 0;

  return (
    <div>
      <div>
        {countFilters > 0 && (
          <div>
            <div>
              <ClearFilters
                onClick={clearFilters}
                resetText="Clear all filtered selections"
              />
            </div>
            <List
              component="nav"
              aria-label="filter cases"
              classes={{
                root: listRoot,
                divider: dividerRoot,
              }}
            >
              <FacetFilter ref={searchRef} />
            </List>
          </div>
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(SideBarContent);
