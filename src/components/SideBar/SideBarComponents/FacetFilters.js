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
  Button,
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
  sortSection,
  getAllIds,
  resetGroupSelections,
} from '../../../pages/dashboardTab/store/dashboardReducer';
import {
  resetIconFilter,
  facetSectionFindApi,
  facetSectionVariables,
  defaultFacetSectionVariables,
  sortLabels, showCheckboxCount,
} from '../../../bento/dashboardData';
import CheckBoxView from './CheckBoxView';
import AutoComplete from './searchComponet';
import FacetModal from './CasesModal';
import styles from './styles/FacetFiltersStyles';

const size = '10px';
if (resetIconFilter.src === '') {
  resetIconFilter.src = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg';
}
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

const FacetPanelComponent = ({ classes }, ref) => {
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

  const searchRef = React.useRef();
  const [showSearch, toggleSearch] = React.useState(false);

  const clearFilters = () => {
    searchRef.current.clear();
  };

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
          groupNameColor = facetSectionVariables[currentSection.sectionName] ? facetSectionVariables[currentSection.sectionName].color ? facetSectionVariables[currentSection.sectionName].color : '' : defaultFacetSectionVariables.color;
        }
        return '';
      },
    );
    return groupNameColor;
  }
  function getLineColor(index, length) {
    if (index === length - 1) {
      return '#FFFFFF';
    }
    return '#B1B1B1';
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

  const handleGroupReset = (dataField, groupName) => () => {
    setSideBarToLoading();
    setDashboardTableLoading();
    // dispatch toggleCheckBox action
    dispatch(resetGroupSelections({ dataField, groupName }));
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
    return index % 2 ? facetSectionVariables[currentSection.sectionName] ? facetSectionVariables[currentSection.sectionName].checkBoxColorsTwo ? facetSectionVariables[currentSection.sectionName].checkBoxColorsTwo : '' : defaultFacetSectionVariables.checkBoxColorsTwo
      : facetSectionVariables[currentSection.sectionName] ? facetSectionVariables[currentSection.sectionName].checkBoxColorsOne ? facetSectionVariables[currentSection.sectionName].checkBoxColorsOne : '' : defaultFacetSectionVariables.checkBoxColorsOne;
  }

  const showSelectedChecbox = (sideBarItem, currentSection) => {
    const selectedItems = sideBarItem.checkboxItems.filter((item) => (item.isChecked));
    const selectedCheckbox = selectedItems.slice(0, showCheckboxCount)
      .map((item, index) => (
        <CheckBoxView
          checkboxItem={item}
          sideBarItem={sideBarItem}
          handleToggle={handleToggle}
          currentSection={currentSection}
          facetSectionVariables={facetSectionVariables}
          backgroundColor={getCheckBoxColor(index, currentSection)}
          defaultFacetSectionVariables={defaultFacetSectionVariables}
          checkColor={getGroupNameColor(sideBarItem, currentSection)}
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

  const toggleAutocomplete = (e) => {
    e.stopPropagation();
    if (showSearch) {
      clearFilters();
    }
    toggleSearch(!showSearch);
  };

  const handleCaseFacetClick = (e) => e.stopPropagation();

  const [showCasesModal, setShowCasesModal] = React.useState(false);

  const closeCasesModal = () => {
    setShowCasesModal(false);
  };

  React.useImperativeHandle(ref, () => ({
    clear() {
      if (showSearch) {
        searchRef.current.clear();
      }
    },
  }));

  return (
    <>
      {sideBarSections.map((currentSection) => (
        <>
          <Divider
            variant="middle"
            style={{
              backgroundColor: facetSectionVariables[currentSection.sectionName]
                ? facetSectionVariables[currentSection.sectionName].color ? facetSectionVariables[currentSection.sectionName].color : '' : defaultFacetSectionVariables.color,
              margin: '0px',
              height: facetSectionVariables[currentSection.sectionName]
                ? facetSectionVariables[currentSection.sectionName].height ? facetSectionVariables[currentSection.sectionName].height : '' : defaultFacetSectionVariables.height,
            }}
          />
          <FacetModal
            open={showCasesModal}
            closeModal={closeCasesModal}
            handleClose={closeCasesModal}
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
              {
                currentSection.sectionName === 'Cases' ? (
                  <div
                    id={currentSection.sectionName}
                    className={classes.sectionSummaryTextCase}
                  >
                    <div className={classes.sectionSummaryTextContainer}>
                      {currentSection.sectionName}
                      <Button variant="contained" className={classes.findCaseButton} onClick={toggleAutocomplete}>Find</Button>
                    </div>
                    {
                      showSearch && (
                        <div className={classes.searchContainer} onClick={handleCaseFacetClick}>
                          <AutoComplete
                            ref={searchRef}
                            type={facetSectionFindApi[currentSection.sectionName].api}
                            data={getAllIds(facetSectionFindApi[currentSection.sectionName].api)}
                          />
                          <Button
                            variant="contained"
                            onClick={() => setShowCasesModal(true)}
                          >
                            Upload Case Set
                          </Button>
                        </div>
                      )
                    }
                  </div>
                ) : (
                  <div
                    className={classes.sectionSummaryText}
                    id={currentSection.sectionName}
                  >
                    {currentSection.sectionName}
                  </div>
                )
              }
            </CustomExpansionPanelSummary>

            <ExpansionPanelDetails classes={{ root: classes.expansionPanelDetailsRoot }}>
              <List component="div" disablePadding dense>
                {currentSection.items.map((sideBarItem) => (
                  <>
                    <ExpansionPanel
                      square
                      expanded={groupsExpanded.includes(sideBarItem.groupName)}
                      onChange={handleGroupsChange(sideBarItem.groupName)}
                      classes={{
                        root: classes.expansionPanelsideBarItem,
                      }}
                    >
                      <CustomExpansionPanelSummary
                        expandIcon={(
                          <ArrowDropDownIcon
                            style={{ fontSize: 26 }}
                            classes={{ root: classes.dropDownIconSubSection }}
                          />
                        )}
                        id={sideBarItem.groupName}
                        aria-controls={sideBarItem.groupName}
                        className={classes.customExpansionPanelSummaryRoot}
                      >
                        {/* <ListItemText primary={sideBarItem.groupName} /> */}
                        <div
                          id={sideBarItem.groupName}
                          className={classes.subSectionSummaryText}
                          style={{ color: getGroupNameColor(sideBarItem, currentSection) }}
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
                                onClick={handleGroupReset(
                                  sideBarItem.datafield, sideBarItem.groupName,
                                )}
                                style={{ fontSize: 15 }}
                              >
                                <img
                                  src={resetIconFilter.src}
                                  height={size}
                                  width={size}
                                  alt={resetIconFilter.alt}
                                />
                              </Icon>
                            </span>
                            <span
                              className={classes.sortGroupItem}
                              style={{ color: getSortButtonColor(sideBarItem, 'alphabet') }}
                              onClick={() => {
                                sortSection(sideBarItem.groupName, 'alphabet');
                              }}
                            >
                              {sortLabels.sortAlphabetically}
                            </span>
                            <span
                              className={classes.sortGroupItemCounts}
                              style={{ color: getSortButtonColor(sideBarItem, 'count') }}
                              onClick={() => {
                                sortSection(sideBarItem.groupName, 'count');
                              }}
                            >
                              {sortLabels.sortByCount}
                            </span>
                          </div>
                          {
                            sideBarItem.checkboxItems.map(
                              (item, index) => (
                                <CheckBoxView
                                  key={index}
                                  checkboxItem={item}
                                  sideBarItem={sideBarItem}
                                  handleToggle={handleToggle}
                                  currentSection={currentSection}
                                  facetSectionVariables={facetSectionVariables}
                                  backgroundColor={getCheckBoxColor(index, currentSection)}
                                  checkColor={getGroupNameColor(sideBarItem, currentSection)}
                                  defaultFacetSectionVariables={defaultFacetSectionVariables}
                                  lineColor={getLineColor(index, sideBarItem.checkboxItems.length)}
                                />
                              ),
                            )
                          }
                        </List>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <div className={classes.selectedCheckboxDisplay}>
                      {!groupsExpanded.includes(sideBarItem.groupName)
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

const FacetPanel = React.forwardRef(FacetPanelComponent);

export default withStyles(styles)(FacetPanel);
