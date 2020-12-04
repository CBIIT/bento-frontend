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
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import _ from 'lodash';
import {
  CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxBlankIcon, ArrowDropDown
  as ArrowDropDownIcon,
} from '@material-ui/icons';
import { toggleCheckBox, setSideBarToLoading, setDashboardTableLoading } from '../../../pages/dashboardTab/store/dashboardReducer';
import { facetSectionStyling } from '../../../bento/dashboardData';

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
    state.dashboardTab
    && state.dashboardTab.checkbox
      ? state.dashboardTab.checkbox : {
        data: [],
        defaultPanel: false,
      }));
  // data from store for sidebar laoding
  const isSidebarLoading = useSelector((state) => (
    state.dashboardTab
  && state.dashboardTab.setSideBarLoading
      ? state.dashboardTab.setSideBarLoading : false));
  // redux use actions
  const dispatch = useDispatch();

  const [expanded, setExpanded] = React.useState(false);

  const [groupExpanded, setGroupExpanded] = React.useState(['case']);

  React.useEffect(() => {
    if (!expanded || !(expanded === `${sideBarContent.defaultPanel}false` || expanded !== false)) {
      setExpanded(sideBarContent.defaultPanel);
    }
  });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : `${panel}false`);

    // set height of filters.
  };

  const handleGroupChange = (panel) => (event, isExpanded) => {
    const groups = _.cloneDeep(groupExpanded);
    if (isExpanded) {
      groups.push(panel);
    } else {
      const index = groups.indexOf(panel);
      if (index > -1) {
        groups.splice(index, 1);
      }
    }

    setGroupExpanded(groups);
  };

  const handleToggle = (value) => () => {
    const valueList = value.split('$$');
    setSideBarToLoading();
    setDashboardTableLoading();
    // dispatch toggleCheckBox action
    dispatch(toggleCheckBox([{
      groupName: valueList[1],
      name: valueList[0],
      datafield: valueList[2],
      isChecked: !(valueList[3] === 'true'),
      section: valueList[4],
    }]));
  };

  const sideBarDisplay = sideBarContent.data.filter((sideBar) => sideBar.show === true)
    .slice(0, 15);

  const arrangeBySections = (arr) => {
    const sideBar = {};
    arr.forEach(({ section, ...item }) => {
      if (!sideBar[section]) {
        sideBar[section] = { sectionName: section, items: [] };
      }
      sideBar[section].items.push({ section, ...item });
    });
    return Object.values(sideBar);
  };
  const sideBarSections = arrangeBySections(sideBarDisplay);

  return (
    <>
      {sideBarSections.map((currentSection) => (
        <>
          <Divider
            variant="middle"
            style={{
              backgroundColor: facetSectionStyling[currentSection.sectionName]
                ? facetSectionStyling[currentSection.sectionName].color ? facetSectionStyling[currentSection.sectionName].color : '' : '#000000',
              margin: '0px',
              height: facetSectionStyling[currentSection.sectionName]
                ? facetSectionStyling[currentSection.sectionName].height ? facetSectionStyling[currentSection.sectionName].height : '' : '5px',
            }}
          />
          <ExpansionPanel
            expanded={groupExpanded.includes(currentSection.sectionName)}
            onChange={handleGroupChange(currentSection.sectionName)}
                // className={classes.expansion}
            classes={{
              root: classes.expansionPanelRoot,
            }}
          >
            <CustomExpansionPanelSummary
              expandIcon={<ArrowDropDownIcon classes={{ root: classes.dropDownIconSection }} />}
              aria-controls={currentSection.sectionName}
              id={currentSection.sectionName}
            >
              {/* <ListItemText primary={sideBarItem.groupName} /> */}
              <div className={classes.sectionSummaryText}>{currentSection.sectionName}</div>

            </CustomExpansionPanelSummary>

            <ExpansionPanelDetails classes={{ root: classes.expansionPanelDetailsRoot }}>
              <List component="div" disablePadding dense>
                {currentSection.items.map((sideBarItem) => (
                  <>
                    <ExpansionPanel
                      expanded={expanded === sideBarItem.groupName}
                      onChange={handleChange(sideBarItem.groupName)}
                      classes={{
                        root: classes.expansionPanelsideBarItem,
                      }}
                    >
                      <CustomExpansionPanelSummary
                        expandIcon={(
                          <ArrowDropDownIcon
                            classes={{ root: classes.dropDownIconSubSection }}
                          />
)}
                        aria-controls={sideBarItem.groupName}
                        id={sideBarItem.groupName}
                      >
                        {/* <ListItemText primary={sideBarItem.groupName} /> */}
                        <div className={classes.subSectionSummaryText}>{sideBarItem.groupName}</div>

                      </CustomExpansionPanelSummary>

                      <ExpansionPanelDetails
                        classes={{ root: classes.expansionPanelDetailsRoot }}
                      >
                        <List component="div" disablePadding dense>
                          {
            sideBarItem.checkboxItems.map((checkboxItem) => {
              if (checkboxItem.subjects === 0 && !checkboxItem.isChecked) {
                return '';
              }
              return (
                <ListItem
                  button
                  onClick={handleToggle(`${checkboxItem.name}$$${sideBarItem.groupName}$$${sideBarItem.datafield}$$${checkboxItem.isChecked}$$${sideBarItem.section}`)}
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
                  <div className={classes.panelDetailText}>
                    {`${checkboxItem.name}`}
                    <span style={{ color: facetSectionStyling[sideBarItem.section].color ? facetSectionStyling[sideBarItem.section].color : '#137fbe' }}>
                      &nbsp;
                      {`(${checkboxItem.subjects})`}
                    </span>
                  </div>
                </ListItem>
              );
            })
          }
                        </List>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </>
                ))}
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <Backdrop className={classes.backdrop} open={isSidebarLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      ))}
    </>
  );
};

const styles = () => ({
  expansionPanelRoot: {
    boxShadow: 'none',
    background: '#D2D2D2',
    margin: 'auto',
    position: 'initial',
    '&:before': {
      position: 'initial',
    },
  },
  expansionPanelsideBarItem: {
    boxShadow: 'none',
    borderTop: '1px solid #000000',
    margin: 'auto',
    position: 'initial',
    '&:before': {
      position: 'initial',
    },
  },
  backdrop: {
    position: 'absolute',
    zIndex: 99999,
    background: 'rgba(0, 0, 0, 0.1)',
  },
  expansionPanelDetailsRoot: {
    paddingBottom: '8px',
    display: 'unset',
  },
  dropDownIconSection: {
    fill: '#000000',
  },
  dropDownIconSubSection: {
    fill: '#3695A9',
  },
  sectionSummaryText: {
    marginLeft: '-6px',
    color: '#000000',
    fontFamily: 'Lato',
    fontSize: '20px',
    lineHeight: '26px',
    letterSpacing: 0,
  },
  subSectionSummaryText: {
    marginLeft: '24px',
    color: '#000000',
    fontFamily: 'Lato',
    fontSize: '14px',
    textTransform: 'uppercase',
    lineHeight: 0,
    letterSpacing: 0,
  },
  panelDetailText: {
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '14px',
    marginRight: '12px',
  },
  checkboxRoot: {
    color: '#344B5A',
    height: 12,
  },
  listItemGutters: {
    padding: '8px 0px 8px 24px',
  },
});

export default withStyles(styles)(FacetPanel);
