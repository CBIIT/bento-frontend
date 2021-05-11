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
  ListItemText,
} from '@material-ui/core';
import _ from 'lodash';
import {
  CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxBlankIcon, ArrowDropDown
  as ArrowDropDownIcon, Replay as ReplayIcon,
} from '@material-ui/icons';
import {
  toggleCheckBox,
  setSideBarToLoading,
  setDashboardTableLoading,
  // eslint-disable-next-line no-unused-vars
  sortGroupCheckboxByAlphabet,
  sortGroupCheckboxByCount,
  resetGroupSelections,
} from '../../../pages/dashboardTab/store/dashboardReducer';
import { facetSectionVariables, facetSearchData } from '../../../bento/dashboardData';

let backgroundColorCode = '';
const alignment = 'flex-start';
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
  const tabDataLoading = useSelector((state) => (state.dashboardTab
    && state.dashboardTab.isDashboardTableLoading
    ? state.dashboardTab.isDashboardTableLoading
    : false));
  // redux use actions
  const dispatch = useDispatch();

  const [groupsExpanded, setGroupsExpanded] = React.useState([]);

  const [sectionExpanded, setSectionExpanded] = React.useState(['case']);

  const activeFilters = useSelector((state) => (
    state.dashboardTab
      && state.dashboardTab.allActiveFilters
      ? state.dashboardTab.allActiveFilters : {}));

  const sortByForGroups = useSelector((state) => (
    state.dashboardTab
      && state.dashboardTab.sortByList
      ? state.dashboardTab.sortByList : {}));

  Object.entries(activeFilters).map((filter) => {
    if ((filter[1].length >= 1) && (document.getElementById(`filterGroup_${filter[0]}`))) {
      const filterLabel = facetSearchData.filter((word) => word.datafield === filter[0]);
      document.getElementById(`filterGroup_${filter[0]}`).innerHTML = `${filterLabel[0].label}`;
      document.getElementById(`filterGroup_${filter[0]}`).style.color = facetSectionVariables[filterLabel[0].section].color;
    } else if (document.getElementById(`filterGroup_${filter[0]}`)) {
      const filterLabel = facetSearchData.filter((word) => word.datafield === filter[0]);
      document.getElementById(`filterGroup_${filter[0]}`).innerHTML = `${filterLabel[0].label}`;
      document.getElementById(`filterGroup_${filter[0]}`).style.color = 'black';
    }
    return '';
  });

  React.useEffect(() => {
    if (!groupsExpanded || !(groupsExpanded === `${sideBarContent.defaultPanel}false` || groupsExpanded !== false)) {
      setGroupsExpanded(sideBarContent.defaultPanel);
    }
  });

  const handleGroupsChange = (panel) => (event, isExpanded) => {
    const groups = _.cloneDeep(groupsExpanded);
    if (isExpanded) {
      groups.push(panel);
    } else {
      const index = groups.indexOf(panel);
      if (index > -1) {
        groups.splice(index, 1);
      }
    }

    setGroupsExpanded(groups);

    // set height of filters.
  };

  const handleSectionChange = (panel) => (event, isExpanded) => {
    const sections = _.cloneDeep(sectionExpanded);
    if (isExpanded) {
      sections.push(panel);
    } else {
      const index = sections.indexOf(panel);
      if (index > -1) {
        sections.splice(index, 1);
      }
    }

    setSectionExpanded(sections);
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

  const handleGroupReset = (value) => () => {
    setSideBarToLoading();
    setDashboardTableLoading();
    // dispatch toggleCheckBox action
    dispatch(resetGroupSelections(value));
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

  function getSortButtonColor(sideBarItem, sortType) {
    return (sortByForGroups[sideBarItem.groupName] === sortType
      ? '#B2C6D6' : '#4A4A4A');
  }
  function getCheckBoxColor(index, currentSection) {
    return index % 2 ? facetSectionVariables[currentSection.sectionName].checkBoxColorsTwo
      : facetSectionVariables[currentSection.sectionName].checkBoxColorsOne;
  }
  const getCheckBoxView = (checkboxItem, sideBarItem, currentSection, index) => {
    backgroundColorCode = getCheckBoxColor(index, currentSection);
    return (
      <>
        <ListItem
          width={1}
          button
          alignItems={alignment}
          selected={checkboxItem.isChecked}
          onClick={handleToggle(`${checkboxItem.name}$$${sideBarItem.groupName}$$${sideBarItem.datafield}$$${checkboxItem.isChecked}$$${sideBarItem.section}`)}
          className={classes.nested}
          style={{
            backgroundColor: checkboxItem.isChecked ? backgroundColorCode : null,
          }}
          classes={{ selected: classes.selected, gutters: classes.listItemGutters }}
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
            <span>
              {`${checkboxItem.name}`}
            </span>
          </div>
          <ListItemText />
          <div className={classes.panelSubjectText}>
            <span
              style={{ color: facetSectionVariables[sideBarItem.section].color ? facetSectionVariables[sideBarItem.section].color : '#137fbe' }}
              edge="end"
            >
              &nbsp;
              {`(${checkboxItem.subjects})`}
            </span>
          </div>
        </ListItem>
        <Divider
          variant="middle"
          style={{
            backgroundColor: '#FFFFFF',
            margin: '0px',
            height: '2px',
          }}
        />
      </>
    );
  };

  return (
    <>
      {sideBarSections.map((currentSection) => (
        <>
          <Divider
            variant="middle"
            style={{
              backgroundColor: facetSectionVariables[currentSection.sectionName]
                ? facetSectionVariables[currentSection.sectionName].color ? facetSectionVariables[currentSection.sectionName].color : '' : '#000000',
              margin: '0px',
              height: facetSectionVariables[currentSection.sectionName]
                ? facetSectionVariables[currentSection.sectionName].height ? facetSectionVariables[currentSection.sectionName].height : '' : '5px',
            }}
          />
          <ExpansionPanel
            expanded={sectionExpanded.includes(currentSection.sectionName)}
            onChange={handleSectionChange(currentSection.sectionName)}
                // className={classes.expansion}
            classes={{
              root: classes.expansionPanelRoot,
            }}
          >
            <CustomExpansionPanelSummary
              expandIcon={<ArrowDropDownIcon classes={{ root: classes.dropDownIconSection }} />}
              aria-controls={currentSection.sectionName}
            >
              {/* <ListItemText primary={sideBarItem.groupName} /> */}
              <div
                className={classes.sectionSummaryText}
                id={currentSection.sectionName}
              >
                {currentSection.sectionName}
              </div>

            </CustomExpansionPanelSummary>

            <ExpansionPanelDetails classes={{ root: classes.expansionPanelDetailsRoot }}>
              <List component="div" disablePadding dense>
                {currentSection.items.map((sideBarItem) => (
                  <>
                    <ExpansionPanel
                      expanded={groupsExpanded.includes(sideBarItem.groupName)}
                      onChange={handleGroupsChange(sideBarItem.groupName)}
                      classes={{
                        root: classes.expansionPanelsideBarItem,
                      }}
                    >
                      <CustomExpansionPanelSummary
                        expandIcon={(
                          <ArrowDropDownIcon
                            classes={{ root: classes.dropDownIconSubSection }}
                            style={{ fontSize: 36 }}
                          />
)}
                        aria-controls={sideBarItem.groupName}
                        id={sideBarItem.groupName}
                        className={classes.customExpansionPanelSummaryRoot}
                      >
                        {/* <ListItemText primary={sideBarItem.groupName} /> */}
                        <div id={`filterGroup_${sideBarItem.datafield}`} style={{ color: 'black' }} className={classes.subSectionSummaryText}>{sideBarItem.groupName}</div>
                      </CustomExpansionPanelSummary>

                      <ExpansionPanelDetails
                        classes={{ root: classes.expansionPanelDetailsRoot }}
                      >
                        <List component="div" disablePadding dense>
                          <div className={classes.sortGroup}>
                            <span
                              className={classes.sortGroupIcon}
                              style={{ color: '#4A4A4A' }}
                            >
                              <ReplayIcon
                                onClick={handleGroupReset(sideBarItem.datafield)}
                                style={{ fontSize: 18 }}
                              />
                            </span>
                            <span
                              className={classes.sortGroupItem}
                              style={{ color: getSortButtonColor(sideBarItem, 'alphabet') }}
                              onClick={() => {
                                sortGroupCheckboxByAlphabet(sideBarItem.groupName);
                              }}
                            >
                              {' '}
                              Sort alphabetically
                            </span>
                            <span
                              className={classes.sortGroupItem}
                              style={{ color: getSortButtonColor(sideBarItem, 'count') }}
                              onClick={() => {
                                sortGroupCheckboxByCount(sideBarItem.groupName);
                              }}
                            >
                              {' '}
                              Sort by count
                            </span>
                          </div>
                          {
                            sideBarItem.checkboxItems.map(
                              (item, index) => getCheckBoxView(
                                item,
                                sideBarItem,
                                currentSection,
                                index,
                              ),
                            )
          }
                        </List>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <div className={classes.selectedCheckboxDisplay}>
                      { !groupsExpanded.includes(sideBarItem.groupName)
                      && sideBarItem.checkboxItems
                        .filter((item) => (item.isChecked))
                        .map((item, index) => getCheckBoxView(
                          item,
                          sideBarItem,
                          currentSection,
                          index,
                        ))}
                    </div>
                  </>
                ))}
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <Backdrop className={classes.backdrop} open={isSidebarLoading || tabDataLoading}>
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
    borderLeft: '1px solid #D2D2D2',
    borderRight: '1px solid #D2D2D2',
    '&:last-child': {
      borderBottom: '1px solid #D2D2D2',
    },
    margin: 'auto',
    position: 'initial',
    '&:before': {
      position: 'initial',
    },
  },
  backdrop: {
    // position: 'absolute',
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
    marginLeft: '0px',
    fill: '#000000',
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
    marginLeft: '5px',
    color: '#000000',
    fontFamily: 'Lato',
    fontSize: '14px',
    textTransform: 'uppercase',
    lineHeight: 0,
    letterSpacing: 0,
    flexShrink: 0,
  },
  customExpansionPanelSummaryRoot: {
    flexDirection: 'row-reverse',
    paddingLeft: 0,
  },
  panelDetailText: {
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '14px',
    marginRight: '12px',
  },
  panelSubjectText: {
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '14px',
    marginRight: '12px',
  },
  checkboxRoot: {
    color: '#344B5A',
    marginLeft: '5px',
    height: 12,
  },
  listItemGutters: {
    padding: '8px 0px 0px 0px',
  },
  sortGroup: {
    textAlign: 'left',
  },
  sortGroupItem: {
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '12px',
    marginRight: '8px',
  },
  sortGroupIcon: {
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '12px',
    marginRight: '4px',
    marginLeft: '12px',
  },
  selected: {},
  selectedCheckboxDisplay: {
    maxHeight: '200px',
    overflow: 'auto',
  },
});
export default withStyles(styles)(FacetPanel);
