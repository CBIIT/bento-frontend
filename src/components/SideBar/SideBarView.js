import React from 'react';
import { useSelector } from 'react-redux';
import {
  withStyles, Drawer, List, Button,
} from '@material-ui/core';
import FacetFilter from './SideBarComponents/FacetFilters';
import { facetSearchData, resetIcon } from '../../bento/dashboardData';
import { clearAllFilters } from '../../pages/dashboardTab/store/dashboardReducer';

const drawerWidth = 240;
if (resetIcon.src === '') {
  resetIcon.src = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg';
}

const SideBarContent = ({ classes }) => {
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
    <Drawer
      variant="persistent"
      className={classes.drawer}
      anchor="left"
      PaperProps={{
        classes: {
          root: classes.drawerPaperRoot,
        },
      }}
      open={1}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      { countFilters > 0 && (
      <div>
        <div>
          <div className={classes.floatRight}>
            <Button
              id="button_sidebar_clear_all_filters"
              variant="outlined"
              disabled={activeFiltersCount === 0}
              className={classes.customButton}
              classes={{ root: classes.clearAllButtonRoot }}
              onClick={() => clearAllFilters()}
              disableRipple
            >
              <img
                src={resetIcon.src}
                height={resetIcon.size}
                width={resetIcon.size}
                alt={resetIcon.alt}
              />
            </Button>
            <span className={classes.resetText}>Clear all filtered selections</span>
          </div>
        </div>
        <List component="nav" aria-label="filter cases" classes={{ root: classes.listRoot, divider: classes.dividerRoot }}>
          <FacetFilter />
        </List>
      </div>
      )}
    </Drawer>
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
});

export default withStyles(styles)(SideBarContent);
