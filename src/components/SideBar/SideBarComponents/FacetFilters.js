import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Checkbox,
  List,
  ListItem,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  withStyles,
  Divider,
} from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { toggleCheckBox } from '../../../pages/dashboard/dashboardState';

const CustomExpansionPanelSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 48,
    '&$expanded': {
      minHeight: 48,
    },
  },
  content: {
    '&$expanded': {
      margin: '16px 0',
    },
  },
  expanded: {},
})(ExpansionPanelSummary);

const FacetPanel = ({ classes }) => {
  // data from store
  const sideBarContent = useSelector((state) => (
    state.dashboard
    && state.dashboard.checkbox
      ? state.dashboard.checkbox : {
        data: [],
        defaultPanel: false,
      }));

  // redux use actions
  const dispatch = useDispatch();

  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    if (!expanded || !(expanded === `${sideBarContent.defaultPanel}false` || expanded !== false)) {
      setExpanded(sideBarContent.defaultPanel);
    }
  });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : `${panel}false`);

    // set height of filters.
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

  const sideBarDisplay = sideBarContent.data.filter((sideBar) => sideBar.show === true)
    .slice(0, 12);

  return (
    <>
      {sideBarDisplay.map((sideBarItem) => {
        if (sideBarItem.show) {
          return (
            <>
              <ExpansionPanel
                expanded={expanded === sideBarItem.groupName}
                onChange={handleChange(sideBarItem.groupName)}
                // className={classes.expansion}
                classes={{ root: classes.expansionPanelRoot }}
              >
                <CustomExpansionPanelSummary
                  expandIcon={<ArrowDropDownIcon style={{ fill: '#8DCAFF' }} />}
                  aria-controls={sideBarItem.groupName}
                  id={sideBarItem.groupName}
                >
                  {/* <ListItemText primary={sideBarItem.groupName} /> */}
                  <div className={classes.panelSummaryText}>{sideBarItem.groupName}</div>

                </CustomExpansionPanelSummary>

                <ExpansionPanelDetails classes={{ root: classes.expansionPanelDetailsRoot }}>
                  <List component="div" disablePadding dense>
                    {
            sideBarItem.checkboxItems.map((checkboxItem) => {
              if (checkboxItem.subjects === 0 && !checkboxItem.isChecked) {
                return '';
              }
              return (
                <ListItem
                  button
                  onClick={handleToggle(`${checkboxItem.name}$$${sideBarItem.groupName}$$${sideBarItem.datafield}$$${checkboxItem.isChecked}`)}
                  className={classes.nested}
                  classes={{ gutters: classes.listItemGutters }}
                >
                  <Checkbox
                    id={`checkbox_${sideBarItem.groupName}_${checkboxItem.name}`}
                    icon={<CheckBoxBlankIcon style={{ fontSize: 18 }} />}
                    checkedIcon={<CheckBoxIcon style={{ fontSize: 18 }} />}
                    checked={checkboxItem.isChecked}
                    tabIndex={-1}
                    disableRipple
                    color="secondary"
                    classes={{ root: classes.checkboxRoot }}
                  />
                  <div className={classes.panelDetailText}>{`${checkboxItem.name}  (${checkboxItem.subjects})`}</div>
                </ListItem>
              );
            })
          }
                  </List>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <Divider variant="middle" classes={{ root: classes.dividerRoot }} />
            </>
          );
        }
        return '';
      })}
    </>
  );
};

const styles = () => ({
  expansionPanelRoot: {
    boxShadow: 'none',
    background: 'transparent',
    margin: 'auto',
    position: 'initial',
    '&:before': {
      position: 'initial',
    },
  },
  dividerRoot: {
    backgroundColor: '#B0CFE1',
    marginLeft: '39px',
    height: '1px',
  },
  panelSummaryText: {
    marginLeft: '24px',
    color: '#3F799A',
    fontFamily: 'Lato',
    fontSize: '14px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  panelDetailText: {
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '14px',
    marginRight: '12px',
  },
  checkboxRoot: {
    color: '#000000',
    height: 12,
  },
  listItemGutters: {
    padding: '8px 0px 8px 30px',
  },
  expansionPanelDetailsRoot: {
    paddingBottom: '8px',
  },
});

export default withStyles(styles)(FacetPanel);
