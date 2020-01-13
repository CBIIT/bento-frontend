import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import FacetFilter from './SideBarComponents/FacetFilters';

const styles = (theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const SideBarContent = () => (
  <List component="nav" aria-label="main mailbox folders">
    <FacetFilter />
  </List>
);

export default withStyles(styles)(SideBarContent);
