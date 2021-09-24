import React from 'react';
import { useSelector } from 'react-redux';
import {
  withStyles, List,
} from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import FacetFilter from './SideBarComponents/FacetFilters';
import AutoComplete from './SideBarComponents/searchComponet';
import ClearFilters from './SideBarComponents/clearFilters';

import {
  facetSearchData, resetIcon, searchEnabled, filterTabTitleText, searchTabTitleText,
} from '../../bento/dashboardData';
import { clearAllFilters, getAllIds } from '../../pages/dashboardTab/store/dashboardReducer';

const drawerWidth = 240;
if (resetIcon.src === '') {
  resetIcon.src = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg';
}

const SideBarContent = ({ classes, setActiveTabId }) => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    if (value !== newValue) {
      setValue(newValue);
      clearAllFilters();
    }
  };

  React.useEffect(() => {
    setActiveTabId(value);
  }, [value]);

  const activeFilters = useSelector((state) => (
    state.dashboardTab
      && state.dashboardTab.allActiveFilters
      ? state.dashboardTab.allActiveFilters : {}));

  const activeFiltersCount = Object.entries(activeFilters).reduce(
    (acc, [key, val]) => acc + (val.length), 0, // eslint-disable-line no-unused-vars
  );

  const countFilters = facetSearchData
    ? facetSearchData.reduce((n, facet) => n + (facet.show === true), 0) : 0;

  return (
    <div>
      { searchEnabled ? (
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label="sidebar tab"
            variant="fullWidth"
            TabIndicatorProps={{
              style: {
                display: 'none',
                // backgroundColor: '#B8CCDF',
              },
            }}
          >
            <Tab label={filterTabTitleText || 'Filter'} value="1" classes={{ root: classes.root }} style={{ backgroundColor: value === '1' ? '#B8CCDF' : '#EAEAEA' }} />
            <Tab label={searchTabTitleText || 'Search'} value="2" classes={{ root: classes.root }} style={{ backgroundColor: value === '2' ? '#B8CCDF' : '#EAEAEA' }} />
          </TabList>
          <TabPanel value="1" classes={{ root: classes.tabPanelRoot }}>
            <div>
              { countFilters > 0 && (
              <div>
                <div className={classes.clearFiltersBorder}>
                  <ClearFilters
                    disable={activeFiltersCount === 0}
                    onClick={() => clearAllFilters()}
                    resetText="Clear all filtered selections"
                  />
                </div>
                <List component="nav" aria-label="filter cases" classes={{ root: classes.listRoot, divider: classes.dividerRoot }}>
                  <FacetFilter />
                </List>
              </div>
              )}
            </div>
          </TabPanel>
          <TabPanel value="2" classes={{ root: classes.tabPanelRoot }}>
            <div>
              <AutoComplete data={getAllIds()} />
            </div>

          </TabPanel>
        </TabContext>
      ) : (
        <div>
          { countFilters > 0 && (
          <div>
            <div>
              <ClearFilters
                disable={activeFiltersCount === 0}
                onClick={() => clearAllFilters()}
                resetText="Clear all filtered selections"
              />
            </div>
            <List component="nav" aria-label="filter cases" classes={{ root: classes.listRoot, divider: classes.dividerRoot }}>
              <FacetFilter />
            </List>
          </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = (theme) => ({
  drawerPaperRoot: {
    backgroundColor: 'transparent',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: '250px',
    height: 'auto',
    zIndex: '90',
    position: 'relative',
    float: 'left',
    overflowX: 'hidden',
    overflowY: 'auto',
    border: 'none',
  },
  floatRight: {
    margin: '7px 0px 7px 6px',
  },
  floatLeft: {
    float: 'left',
  },
  filterTitle: {
    marginTop: '18px',
    marginLeft: '45px',
    color: '#218CD3',
    fontFamily: 'Lato',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  funnelLogoImg: {
    width: '20px',
    height: '20px',
  },
  clearAllButtonRoot: {
    margin: 'auto',
  },
  customButton: {
    borderRadius: '5px',
    maxWidth: '30px',
    maxHeight: '30px',
    minWidth: '30px',
    minHeight: '30px',
    marginTop: '0px',
    fontSize: 9,
    textTransform: 'none',
    color: '#3d4241',
    marginLeft: '0px',
    fontFamily: theme.custom.fontFamily,
    '&:hover': {
      backgroundColor: '#566672',
      color: 'white',
    },
  },
  resetText: {
    marginTop: '0px',
    marginLeft: '8px',
    color: '#638FB5',
    fontSize: 14,
  },
  listRoot: {
    paddingTop: 0,
    paddingBottom: 1,
    maxHeight: '1300px',
    maxWidth: '100%',
    overflowX: 'hidden',
    overflowY: 'overlay',
    borderBottom: 'thin solid #B1B1B1',
  },
  dividerRoot: {
    backgroundColor: '#B0CFE1',
    marginLeft: '45px',
    height: '1px',
  },
  tabPanelRoot: {
    padding: '0px',
  },
  root: {
    minWidth: '70px',
    height: '45px',
    minHeight: '40px',
    marginTop: '10px',
    marginRight: '3px',
    fontSize: '17px',
    fontFamily: 'Lato',
    fontWeight: '400',
    color: '#000000',
    lineHeight: '18px',
    paddingLeft: '5px',
    letterSpacing: '0.25px',
    borderTop: '1px solid black',
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
    textTransform: 'inherit',
    '&$selected': {
      fontWeight: 'bolder',
    },
  },
  clearFiltersBorder: {
    borderTop: '1px solid black',
  },
  labelContainer: {
  },
});

export default withStyles(styles)(SideBarContent);
