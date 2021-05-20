import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  List,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  withStyles,
  Divider,
  Backdrop,
  CircularProgress,
  Icon,
} from '@material-ui/core';
import _ from 'lodash';
import {
  ArrowDropDown as ArrowDropDownIcon,
  // Replay as ReplayIcon,
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
import {
  facetSectionVariables, sortLabels, showCheckboxCount, resetIcon,
} from '../../../bento/dashboardData';
import CheckBoxView from './CheckBoxView';

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

  const [sectionExpanded, setSectionExpanded] = React.useState(
    Object.keys(facetSectionVariables).reduce((acc, filterKey) => {
      const { isExpanded } = facetSectionVariables[filterKey];
      if (isExpanded) {
        acc.push(filterKey);
      }
      return acc;
    }, []),
  );

  const sortByForGroups = useSelector((state) => (
    state.dashboardTab
      && state.dashboardTab.sortByList
      ? state.dashboardTab.sortByList : {}));

  let groupNameColor = '';
  function getGroupNameColor(sideBarItem, currentSection) {
    groupNameColor = 'black';
    sideBarItem.checkboxItems.map(
      (item) => {
        if (item.isChecked) {
          groupNameColor = facetSectionVariables[currentSection.sectionName].color;
        }
        return '';
      },
    );
    return groupNameColor;
  }
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

  const showSelectedChecbox = (sideBarItem, currentSection) => {
    const selectedItems = sideBarItem.checkboxItems.filter((item) => (item.isChecked));
    const selectedCheckbox = selectedItems.slice(0, showCheckboxCount)
      .map((item, index) => (
        <CheckBoxView
          checkboxItem={item}
          sideBarItem={sideBarItem}
          currentSection={currentSection}
          handleToggle={handleToggle}
          facetSectionVariables={facetSectionVariables}
          backgroundColor={getCheckBoxColor(index, currentSection)}
          classes={classes}
        />
      ));

    return (
      <div>
        {selectedCheckbox}
        {selectedItems.length > showCheckboxCount && (
          <div className={classes.clearfix}>
            <div
              className={classes.showMore}
              onClick={(e) => (handleGroupsChange(sideBarItem.groupName)(e, true))}
            >
              {sortLabels.showMore}
            </div>
          </div>
        )}
      </div>
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
                        <div
                          id={sideBarItem.groupName}
                          style={{ color: getGroupNameColor(sideBarItem, currentSection) }}
                          className={classes.subSectionSummaryText}
                        >
                          {sideBarItem.groupName}
                        </div>

                      </CustomExpansionPanelSummary>

                      <ExpansionPanelDetails
                        classes={{ root: classes.expansionPanelDetailsRoot }}
                      >
                        <List component="div" disablePadding dense>
                          <div
                            className={classes.sortGroup}
                          >
                            <span
                              className={classes.sortGroupIcon}
                            >
                              <Icon
                                onClick={handleGroupReset(sideBarItem.datafield)}
                              >
                                <img
                                  src={resetIcon.src}
                                  height={resetIcon.size}
                                  width={resetIcon.size}
                                  alt={resetIcon.alt}
                                />
                              </Icon>
                            </span>
                            <span
                              className={classes.sortGroupItem}
                              style={{ color: getSortButtonColor(sideBarItem, 'alphabet') }}
                              onClick={() => {
                                sortGroupCheckboxByAlphabet(sideBarItem.groupName);
                              }}
                            >
                              {sortLabels.sortAlphabetically}
                            </span>
                            <span
                              className={classes.sortGroupItem}
                              style={{ color: getSortButtonColor(sideBarItem, 'count') }}
                              onClick={() => {
                                sortGroupCheckboxByCount(sideBarItem.groupName);
                              }}
                            >
                              {sortLabels.sortByCount}
                            </span>
                          </div>
                          {
                            sideBarItem.checkboxItems.map(
                              (item, index) => (
                                <CheckBoxView
                                  checkboxItem={item}
                                  sideBarItem={sideBarItem}
                                  currentSection={currentSection}
                                  handleToggle={handleToggle}
                                  facetSectionVariables={facetSectionVariables}
                                  backgroundColor={getCheckBoxColor(index, currentSection)}
                                  classes={classes}
                                />
                              ),
                            )
          }
                        </List>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <div className={classes.selectedCheckboxDisplay}>
                      { !groupsExpanded.includes(sideBarItem.groupName)
                      && showSelectedChecbox(sideBarItem, currentSection)}
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
    margin: 'auto',
    position: 'initial',
  },
  expansionPanelsideBarItem: {
    boxShadow: 'none',
    borderTop: '1px solid #B0CFE1',
    borderLeft: '1px solid #D2D2D2',
    borderRight: '1px solid #D2D2D2',
    '&:last-child': {
      borderBottom: '1px solid #B0CFE1',
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
    fontWeight: '100',
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
    marginLeft: '16px',
  },
  selected: {},
  selectedCheckboxDisplay: {
    maxHeight: '200px',
    overflow: 'auto',
  },
  showMore: {
    float: 'right',
    paddingRight: '5px',
    cursor: 'pointer',
    fontSize: '10px',
  },
});
export default withStyles(styles)(FacetPanel);
