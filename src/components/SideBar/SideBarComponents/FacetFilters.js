import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  withStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { toggleCheckBox } from '../../../pages/dashboard/dashboardState';


const FacetPanel = (classes) => {
  // data from store
  const sideBarContent = useSelector((state) => (
    state.dashboard
    && state.dashboard.checkbox
    && state.dashboard.checkbox.data
      ? state.dashboard.checkbox.data : []));
  // redux use actions
  const dispatch = useDispatch();

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleToggle = (value) => () => {
    const valueList = value.split('$$');
    // dispatch toggleCheckBox action
    dispatch(toggleCheckBox([{
      groupName: valueList[1],
      name: valueList[0],
      datafield: valueList[2],
      isChecked: !(valueList[3] === 'true'),
    }]));
  };

  return (
    <>
      {sideBarContent.map((sideBarItem) => {
        if (sideBarItem.show) {
          return (
            <>
              <ExpansionPanel
                expanded={expanded === sideBarItem.groupName}
                onChange={handleChange(sideBarItem.groupName)}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  classes={{ root: classes.expansionPanelSummaryRoot }}
                >
                  <ListItemText primary={sideBarItem.groupName} />
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                  <List component="div" disablePadding dense>
                    {
            sideBarItem.checkboxItems.map((checkboxItem) => {
              if (checkboxItem.cases === 0 && !checkboxItem.isChecked) {
                return '';
              }
              return (
                <ListItem button onClick={handleToggle(`${checkboxItem.name}$$${sideBarItem.groupName}$$${sideBarItem.datafield}$$${checkboxItem.isChecked}`)} className={classes.nested}>
                  <Checkbox checked={checkboxItem.isChecked} tabIndex={-1} disableRipple color="primary" />
                  <ListItemText primary={`${checkboxItem.name}  (${checkboxItem.cases})`} />
                </ListItem>
              );
            })
          }
                  </List>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </>
          );
        }
        return '';
      })}
    </>
  );
};


const styles = () => ({
  expansionPanelSummaryRoot: {
    padding: '0 24px 0 35px',
  },
});

export default withStyles(styles)(FacetPanel);
