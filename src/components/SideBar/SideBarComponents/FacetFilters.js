import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Slider,
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
  IconButton,
  ListItem,
} from '@material-ui/core';

// import createMuiTheme from '@material-ui/styles';
import _ from 'lodash';
import {
  ArrowDropDown as ArrowDropDownIcon, Close as CloseIcon,
  // Replay as ReplayIcon,
} from '@material-ui/icons';
import {
  toggleCheckBox,
  toggleSlider,
  setSideBarToLoading,
  setDashboardTableLoading,
  // eslint-disable-next-line no-unused-vars
  sortSection,
  getAllIds,
  resetGroupSelections,
  uploadBulkModalSearch,
} from '../../../pages/dashboardTab/store/dashboardReducer';
import {
  facetSectionVariables,
  facetSearchData,
  defaultFacetSectionVariables,
  sortLabels, showCheckboxCount,
  resetIconFilter,
  facetSectionFindApi,
} from '../../../bento/dashboardData';
import CheckBoxView from './CheckBoxView';
import InputViewMin from './InputViewMin';
import InputViewMax from './InputViewMax';
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
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 6,
    '&$expanded': {
      minHeight: 48,
    },
  },
  content: {
    '&$expanded': {
      margin: '4px 0px 15px 0px',
    },
  },
  expanded: {},
})(ExpansionPanelSummary);

export const FacetPanelComponent = ({ classes }, ref) => {
  // data from store
  const sideBarContent = useSelector((state) => (
    state.dashboardTab
      && state.dashboardTab.checkbox
      ? state.dashboardTab.checkbox : {
        data: [],
        defaultPanel: false,
      }));
  const [sliderValue, setSliderValue] = React.useState([]);
  function valuetext(value) {
    return `${value}`;
  }
  const handleChangeSlider = (index, value) => {
    const valueList = [...sliderValue];
    valueList[index] = value;
    if (!valueList[index].includes('')) {
      setSliderValue(valueList);
    }
  };
  const handleChangeCommittedSlider = (sideBarItem, value) => {
    if (!value.includes('')) {
      toggleSlider(value, sideBarItem);
    }
  };
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

  const [showSearch, toggleSearch] = React.useState(false);

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

  const clearFilters = () => {
    searchRef.current.clear();
  };

  const sortByForGroups = useSelector((state) => (
    state.dashboardTab
      && state.dashboardTab.sortByList
      ? state.dashboardTab.sortByList : {}));

  const bulkUpload = useSelector((state) => (
    state.dashboardTab
      && state.dashboardTab.bulkUpload
      ? state.dashboardTab.bulkUpload : {
        subject_ids: [],
        sample_ids: [],
        file_ids: [],
      }));

  const autoCompleteSelection = useSelector((state) => (
    state.dashboardTab
          && state.dashboardTab.autoCompleteSelection
      ? state.dashboardTab.autoCompleteSelection : {
        subject_ids: [],
        sample_ids: [],
        file_ids: [],
      }));

  let groupNameColor = '';
  function getGroupNameColor(sideBarItem, currentSection, sideBarIndex) {
    groupNameColor = 'black';
    if (sideBarItem.slider !== true) {
      sideBarItem.checkboxItems.map(
        (item) => {
          if (item.isChecked) {
            groupNameColor = facetSectionVariables[currentSection.sectionName] ? facetSectionVariables[currentSection.sectionName].color ? facetSectionVariables[currentSection.sectionName].color : '' : defaultFacetSectionVariables.color;
          }
          return '';
        },
      );
    }
    if (typeof sliderValue[sideBarIndex] !== 'undefined') {
      if (sliderValue[sideBarIndex][0] > sideBarItem.checkboxItems.lowerBound
        || sliderValue[sideBarIndex][1] < sideBarItem.checkboxItems.upperBound) {
        groupNameColor = facetSectionVariables[currentSection.sectionName] ? facetSectionVariables[currentSection.sectionName].color ? facetSectionVariables[currentSection.sectionName].color : '' : defaultFacetSectionVariables.color;
      }
    }
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

  React.useEffect(() => {
    // Open toggle chnages
    if (sectionExpanded.includes('Cases')) {
      toggleSearch(true);
    } else {
      toggleSearch(false);
    }
  }, [sectionExpanded]);

  React.useEffect(() => {
    // Open all sections and groups when user selected auto complete
    if (bulkUpload.subject_ids.length > 0 || autoCompleteSelection.subject_ids.length > 0) {
      const allSectionLabels = Object.keys(facetSectionVariables);
      const allCheckBoxLabels = facetSearchData.reduce((acc, facet) => (
        [...acc, facet.label]
      ), []);

      setSectionExpanded(allSectionLabels);
      setGroupsExpanded(allCheckBoxLabels);
    }
  }, [bulkUpload, autoCompleteSelection]);

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

  const handleGroupReset = (sideBarItem, sideBarIndex) => () => {
    const dataField = sideBarItem.datafield;
    const { groupName } = sideBarItem;
    setSideBarToLoading();
    setDashboardTableLoading();
    // dispatch toggleCheckBox action
    dispatch(resetGroupSelections({ dataField, groupName }));
    if (sideBarItem.slider === true) {
      handleChangeSlider(sideBarIndex, [
        sideBarItem.checkboxItems.lowerBound,
        sideBarItem.checkboxItems.upperBound,
      ]);
    }
  };
  // slice 16
  const sideBarDisplay = sideBarContent.data.filter((sideBar) => sideBar.show === true)
    .slice(0, 16);

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

  const showSelectedChecbox = (sideBarItem, currentSection, sideBarIndex) => {
    const selectedItems = sideBarItem.slider !== true
      ? sideBarItem.checkboxItems.filter((item) => (item.isChecked)) : [];
    let selectedSliderCheckbox = '';
    if (sideBarItem.slider !== true) {
      selectedSliderCheckbox = selectedItems.slice(0, showCheckboxCount)
        .map((item, index) => (
          <CheckBoxView
            checkboxItem={item}
            sideBarItem={sideBarItem}
            currentSection={currentSection}
            handleToggle={handleToggle}
            facetSectionVariables={facetSectionVariables}
            defaultFacetSectionVariables={defaultFacetSectionVariables}
            backgroundColor={getCheckBoxColor(index, currentSection)}
            checkColor={getGroupNameColor(sideBarItem, currentSection, sideBarIndex)}
          />
        ));
    } else {
      selectedSliderCheckbox = typeof sliderValue[sideBarIndex] !== 'undefined'
        ? (sliderValue[sideBarIndex][0]
          > sideBarItem.checkboxItems.lowerBound
          || sliderValue[sideBarIndex][1]
          < sideBarItem.checkboxItems.upperBound)
        && (
          <div>
            <ListItem
              width={1}
              button
              className={classes.nested}
              style={{
                backgroundColor: getCheckBoxColor(0, currentSection),
                justifyContent: 'end',
              }}
              classes={{
                selected: classes.selected,
                gutters: classes.listItemGutters,
              }}
            >
              <div className={classes.sliderListItem}>
                <span className={classes.sliderText}>
                  {sideBarItem.quantifier}
                </span>
                <span className={classes.sliderText}>
                  {sliderValue[sideBarIndex][1]}
                  &nbsp;
                </span>
                <span className={classes.sliderText}>
                  -
                </span>
                <span className={classes.sliderText}>
                  {sliderValue[sideBarIndex][0]}
                </span>
              </div>
            </ListItem>
            <Divider
              style={{
                backgroundColor: '#FFFFFF',
                height: '2px',
              }}
            />
          </div>
        ) : (
          <span />
        );
    }
    return (
      <div>
        {selectedSliderCheckbox}
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

  // This ref is used to clear case upload modal
  const modelRef = React.useRef();

  function InputSetListItem() {
    return (
      <List classes={{ padding: classes.listPadding }}>
        <>
          <Divider
            style={{
              backgroundColor: '#B1B1B1',
              height: '2px',
            }}
          />
          <ListItem
            classes={{ gutters: classes.listItemGutter }}
          >
            <div className={classes.searchResultDetailText}>
              <span>
                INPUT SET
              </span>
            </div>
            <IconButton
              disableRipple
              style={{ backgroundColor: 'transparent' }}
              onClick={() => {
                modelRef.current.clear();
                uploadBulkModalSearch([], 'subject');
              }}
            >
              <CloseIcon
                classes={{ root: classes.closeRoot }}
                style={{
                  color: '#000',
                }}
              />
            </IconButton>

          </ListItem>
        </>
      </List>
    );
  }

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
            type="subjectIds"
            ref={modelRef}
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
                      <div className={classes.findCaseButton} onClick={toggleAutocomplete}>
                        <img src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/FacetLocalFindSearchIcon.svg" className={classes.findCaseIcon} alt="search" />
                      </div>
                    </div>
                    {
                      showSearch && (
                        <div className={classes.searchContainer} onClick={handleCaseFacetClick}>
                          {bulkUpload.subject_ids.length !== 0 ? <InputSetListItem /> : ''}
                          <AutoComplete
                            ref={searchRef}
                            type={facetSectionFindApi[currentSection.sectionName].api}
                            data={getAllIds(facetSectionFindApi[currentSection.sectionName].api)}
                          />
                          <Button
                            variant="contained"
                            disableElevation
                            onClick={() => setShowCasesModal(true)}
                            className={classes.uploadButton}
                            id="localFindUploadCaseSetButton"
                          >
                            { bulkUpload.subject_ids.length !== 0 ? 'View Case Set' : 'Upload Case Set' }
                            <span className={classes.iconSpan}>
                              <img
                                className={classes.uploadIcon}
                                src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/localfindUplwardArrow.svg"
                                alt="upload button icon"
                              />

                            </span>
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
                {currentSection.items.map((sideBarItem, sideBarIndex) => (
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
                            classes={{ root: classes.dropDownIconSubSection }}
                            style={{ fontSize: 26 }}
                          />
                        )}
                        aria-controls={sideBarItem.groupName}
                        id={sideBarItem.groupName}
                        className={classes.customExpansionPanelSummaryRoot}
                      >
                        {/* <ListItemText primary={sideBarItem.groupName} /> */}
                        <div
                          id={sideBarItem.groupName}
                          style={{
                            color: getGroupNameColor(
                              sideBarItem,
                              currentSection,
                              sideBarIndex,
                            ),
                          }}
                          className={classes.subSectionSummaryText}
                        >
                          {sideBarItem.groupName}
                        </div>

                      </CustomExpansionPanelSummary>

                      <ExpansionPanelDetails
                        classes={{ root: classes.expansionPanelDetailsRoot }}
                      >
                        <List component="div" disablePadding dense>
                          {(sideBarItem.slider !== true && sideBarItem.checkboxItems
                            && sideBarItem.checkboxItems.length)
                            ? (
                              <div
                                className={classes.sortGroup}
                              >
                                <span
                                  className={classes.sortGroupIcon}
                                >
                                  <Icon
                                    onClick={handleGroupReset(
                                      sideBarItem,
                                      sideBarIndex,
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
                            ) : (
                              <div className={classes.sortGroup}>
                                <span
                                  className={classes.sortGroupItem}
                                  style={{ color: getSortButtonColor(sideBarItem, 'alphabet'), paddingLeft: 20 }}
                                >
                                  No data for this field
                                </span>
                              </div>
                            )}
                          {sideBarItem.slider === true
                            && (
                              <div
                                className={
                                  classes.sortGroup
                                }
                              >
                                <span
                                  className={classes.sortGroupIcon}
                                >
                                  <Icon
                                    onClick={handleGroupReset(
                                      sideBarItem,
                                      sideBarIndex,
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
                              </div>
                            )}
                          {
                            sideBarItem.slider !== true ? (
                              sideBarItem.checkboxItems.map(
                                (item, index) => (
                                  <CheckBoxView
                                    key={index}
                                    checkboxItem={item}
                                    sideBarItem={sideBarItem}
                                    currentSection={currentSection}
                                    handleToggle={handleToggle}
                                    facetSectionVariables={facetSectionVariables}
                                    defaultFacetSectionVariables={defaultFacetSectionVariables}
                                    backgroundColor={getCheckBoxColor(index, currentSection)}
                                    checkColor={getGroupNameColor(
                                      sideBarItem,
                                      currentSection,
                                      sideBarIndex,
                                    )}
                                    lineColor={getLineColor(
                                      index,
                                      sideBarItem.checkboxItems.length,
                                    )}
                                  />
                                ),
                              )) : (
                                <div>
                                  <div className={classes.sliderRoot}>
                                    <div className={classes.minValue}>
                                      <span>
                                        Min:
                                        &nbsp;
                                      </span>
                                      <InputViewMin
                                        sideBarIndex={sideBarIndex}
                                        sideBarItem={sideBarItem}
                                        sliderValue={sliderValue}
                                        setSliderValue={setSliderValue}
                                        toggleSlider={toggleSlider}
                                      />
                                    </div>
                                    <div className={classes.maxValue}>
                                      <span>
                                        Max:
                                        &nbsp;
                                      </span>
                                      <InputViewMax
                                        sideBarIndex={sideBarIndex}
                                        sideBarItem={sideBarItem}
                                        sliderValue={sliderValue}
                                        setSliderValue={setSliderValue}
                                        toggleSlider={toggleSlider}
                                      />
                                    </div>
                                    <Slider
                                      value={typeof sliderValue[sideBarIndex] !== 'undefined' ? sliderValue[sideBarIndex]
                                        : [
                                          sideBarItem.checkboxItems.lowerBound,
                                          sideBarItem.checkboxItems.upperBound,
                                        ]}
                                      defaultValue={[
                                        sideBarItem.checkboxItems.lowerBound,
                                        sideBarItem.checkboxItems.upperBound,
                                      ]}
                                      onChange={(event, value) => handleChangeSlider(
                                        sideBarIndex,
                                        value,
                                      )}
                                      onChangeCommitted={
                                      (event, value) => handleChangeCommittedSlider(
                                        sideBarItem,
                                        value,
                                      )
                                    }
                                      valueLabelDisplay="auto"
                                      getAriaValueText={valuetext}
                                      disableSwap
                                      min={sideBarItem.checkboxItems.lowerBound}
                                      max={sideBarItem.checkboxItems.upperBound}
                                      classes={{
                                        rail: classes.rail,
                                        thumb: classes.thumb,
                                        track: classes.track,
                                      }}
                                    />
                                    <span className={classes.lowerBound}>
                                      {sideBarItem.checkboxItems.lowerBound}
                                    </span>
                                    <span className={classes.upperBound}>
                                      {sideBarItem.checkboxItems.upperBound}
                                    </span>
                                  </div>
                                  <div>
                                    {typeof sliderValue[sideBarIndex] !== 'undefined'
                                      ? (sliderValue[sideBarIndex][0]
                                      > sideBarItem.checkboxItems.lowerBound
                                      || sliderValue[sideBarIndex][1]
                                      < sideBarItem.checkboxItems.upperBound)
                                    && (
                                      <div>
                                        <ListItem
                                          width={1}
                                          button
                                          className={classes.nested}
                                          style={{
                                            backgroundColor: getCheckBoxColor(0, currentSection),
                                            justifyContent: 'end',
                                          }}
                                          classes={{
                                            selected: classes.selected,
                                            gutters: classes.listItemGutters,
                                          }}
                                        >
                                          <div className={classes.sliderListItem}>
                                            <span className={classes.sliderText}>
                                              {sideBarItem.quantifier}
                                            </span>
                                            <span className={classes.sliderText}>
                                              {sliderValue[sideBarIndex][1]}
                                              &nbsp;
                                            </span>
                                            <span className={classes.sliderText}>
                                              -
                                            </span>
                                            <span className={classes.sliderText}>
                                              {sliderValue[sideBarIndex][0]}
                                            </span>
                                          </div>
                                        </ListItem>
                                        <Divider
                                          style={{
                                            backgroundColor: '#FFFFFF',
                                            height: '2px',
                                          }}
                                        />
                                      </div>
                                    ) : (
                                      <span />
                                      )}
                                  </div>
                                </div>
                            )
                          }
                        </List>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <div className={classes.selectedCheckboxDisplay}>
                      {!groupsExpanded.includes(sideBarItem.groupName)
                        // && sideBarItem.slider !== true
                        && showSelectedChecbox(sideBarItem, currentSection, sideBarIndex)}
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
