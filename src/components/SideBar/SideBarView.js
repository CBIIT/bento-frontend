import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  withStyles, Divider, Drawer, List, Button,
} from '@material-ui/core';
import FacetFilter from './SideBarComponents/FacetFilters';
import { facetSearchData } from '../../bento/dashboardData';
import { toggleCheckBox } from '../../pages/dashboardTab/store/dashboardReducer';
import { unselectFilters } from '../../utils/dashboardUtilFunctions';

const drawerWidth = 240;

const SideBarContent = ({ classes }) => {
  const dispatch = useDispatch();
  const activeFilters = useSelector((state) => (
    state.dashboardTab.datatable
      && state.dashboardTab.datatable.filters
      ? state.dashboardTab.datatable.filters : []));
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
              disabled={activeFilters.length === 0}
              onCl
              className={classes.customButton}
              classes={{ root: classes.clearAllButtonRoot }}
              onClick={() => dispatch(toggleCheckBox(unselectFilters(activeFilters)))}
              disableRipple
            >
              CLEAR ALL
            </Button>
          </div>
        </div>
        <Divider variant="middle" classes={{ root: classes.dividerRoot }} />
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
    overflowY: 'auto',
    border: 'none',
  },
  floatRight: {
    margin: '18px 0px 18px 9px',
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
    borderRadius: '100px',
    marginTop: '4px',
    minHeight: '20px',
    fontSize: 9,
    textTransform: 'none',
    color: '#3d4241',
    marginLeft: '16px',
    fontFamily: theme.custom.fontFamily,
    '&:hover': {
      backgroundColor: '#566672',
      color: 'white',
    },
  },
  listRoot: {
    paddingTop: 0,
    paddingBottom: 1,
  },
  dividerRoot: {
    backgroundColor: '#B0CFE1',
    marginLeft: '45px',
    height: '1px',
  },
});

export default withStyles(styles)(SideBarContent);
