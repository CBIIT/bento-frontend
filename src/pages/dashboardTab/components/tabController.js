import React from 'react';
import { useSelector } from 'react-redux';
import {
  Tabs, Tab, withStyles,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import Snackbar from '@material-ui/core/Snackbar';
import { getOptions } from 'bento-components';
import TabView from './tabView';
import SuccessOutlinedIcon from '../../../utils/SuccessOutlined';
import TabThemeProvider from './tabThemeConfig';
import TabLabel from './tabLabel';
import {
  tabs, tooltipContent, tabContainers, tabIndex, externalLinkIcon,
} from '../../../bento/dashboardTabData';
import {
  fetchDataForDashboardTab,
  getTableRowSelectionEvent,
  tableHasSelections,
  clearTableSelections,
  fetchAllFileIDs,
  getFilesCount,
} from '../store/dashboardReducer';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: '5px,5px,5px,5px' }}>
      {children}
    </Typography>
  );
}

const tabController = (classes) => {
  const currentActiveTabTitle = useSelector((state) => (state.dashboardTab
    && state.dashboardTab.currentActiveTab
    ? state.dashboardTab.currentActiveTab
    : tabIndex[0].title));
  const tabVlaue = tabIndex.map((el) => el.title).indexOf(currentActiveTabTitle) || 0;
  // tab settings
  const [currentTab, setCurrentTab] = React.useState(tabVlaue);

  const tableRowSelectionData = [
    useSelector((state) => (state.dashboardTab.dataCaseSelected)),
    useSelector((state) => (state.dashboardTab.dataSampleSelected)),
    useSelector((state) => (state.dashboardTab.dataFileSelected))];

  // data from store
  const dashboard = useSelector((state) => (state.dashboardTab
&& state.dashboardTab.datatable
    ? state.dashboardTab.datatable : {}));
    // get stats data from store
  const dashboardStats = useSelector((state) => (state.dashboardTab
    && state.dashboardTab.stats ? state.dashboardTab.stats : {}));

  const filteredSubjectIds = useSelector((state) => (state.dashboardTab
      && state.dashboardTab.filteredSubjectIds ? state.dashboardTab.filteredSubjectIds : null));
  const filteredSampleIds = useSelector((state) => (state.dashboardTab
    && state.dashboardTab.filteredSampleIds ? state.dashboardTab.filteredSampleIds : null));
  const filteredFileIds = useSelector((state) => (state.dashboardTab
    && state.dashboardTab.filteredFileIds ? state.dashboardTab.filteredFileIds : null));

  const handleTabChange = (event, value) => {
    setCurrentTab(value);
    fetchDataForDashboardTab(tabIndex[value].title,
      filteredSubjectIds,
      filteredSampleIds,
      filteredFileIds);
  };

  const [snackbarState, setsnackbarState] = React.useState({
    open: false,
    value: 0,
  });
  function openSnack(value1) {
    setsnackbarState({ open: true, value: value1 });
  }

  // eslint-disable-next-line no-unused-vars
  function closeSnack() {
    setsnackbarState({ open: false });
  }

  function getBorderStyle() {
    const style = '3px solid #42779a';
    return `${style}`;
  }

  function getTableColor() {
    return `${tabIndex[currentTab].primaryColor}`;
  }

  function getTabLalbel(title, count) {
    const tabObj = tabIndex[currentTab];
    // NOTE: refactor white color to theme's white color.
    const primaryColor = (tabObj.title === title) ? tabIndex[currentTab].selectedColor : undefined;
    const secondaryColor = (tabObj.title === title) ? tabObj.secondaryColor : undefined;

    return (
      <TabLabel
        title={title}
        count={count}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    );
  }

  /* on row select event
    @param  data  data for initial the table  sample -> [files]
    @param  allRowsSelected : selected rows
    @output [f.uuid]
  */
  function Type1OnRowsSelect(data, allRowsSelected) {
  // use reduce to combine all the files' id into single array
    return allRowsSelected.reduce((accumulator, currentValue) => {
      if (data[currentValue.dataIndex]) {
        const { files } = data[currentValue.dataIndex];
        // check if file exists
        if (files && files.length > 0) {
          return accumulator.concat(files.map((f) => f.file_id));
        }
      }
      return accumulator;
    }, []);
  }

  /* on row select event
    @param  data  data for initial the table  sample -> [files]
    @param  allRowsSelected : selected rows
    @output [f.uuid]
  */
  function Type2OnRowsSelect(data, allRowsSelected) {
    return allRowsSelected.map((row) => data[row.dataIndex].file_id);
  }

  /* on row select event
    @param  data  data for initial the table  sample -> [files]
    @param  allRowsSelected : selected rows
    @output [f.uuid]
  */
  function Type3OnRowsSelect(data, allRowsSelected) {
  // use reduce to combine all the files' id into single array
    return allRowsSelected.reduce((accumulator, currentValue) => {
      const { files } = data[currentValue.dataIndex];
      // check if file
      if (files && files.length > 0) {
        return accumulator.concat(files);
      }
      return accumulator;
    }, []);
  }

  // onRowsSelectFunction contains all the onRowsSelection functions
  // user can pick one for use.
  const onRowsSelectFunction = {
    type1: Type1OnRowsSelect,
    type2: Type2OnRowsSelect,
    type3: Type3OnRowsSelect,
  };

  // This function for future use
  /*  To check if this row is selectable or not.
    I want the system to visually communicate ("flag") which of
    the samples being displayed have already had all of their files added to the cart.
    @param  data  row of data from sample tab
    @param  cartData, list of fileIDs
    @output  boolean true-> selectable
*/
  // eslint-disable-next-line no-unused-vars
  function disableRowSelection(data, cartData) {
    return true;
  }

  // disableRowSelectionFunction contains all the disableRowSelection functions
  // user can pick one for use.
  const disableRowSelectionFunction = {
    type1: disableRowSelection,
    type2: disableRowSelection,
    type3: disableRowSelection,
  };

  // Tab Header Generator
  const TABs = tabs.map((tab, index) => (
    <Tab
      key={index}
      id={tab.id}
      label={
        getTabLalbel(tab.title, dashboardStats[tab.count] ? dashboardStats[tab.count] : 0)
      }
    />
  ));

  // Tab table Generator
  const TABContainers = tabContainers.map((container) => (
    <TabContainer id={container.id}>
      <TabView
        options={getOptions(container, classes)}
        data={dashboard[container.dataField] ? dashboard[container.dataField] : 'undefined'}
        customColumn={container}
        customOnRowsSelect={onRowsSelectFunction[container.onRowsSelect]}
        openSnack={openSnack}
        closeSnack={closeSnack}
        disableRowSelection={disableRowSelectionFunction[container.disableRowSelection]}
        buttonText={container.buttonText}
        tableID={container.tableID}
        saveButtonDefaultStyle={container.saveButtonDefaultStyle}
        ActiveSaveButtonDefaultStyle={container.ActiveSaveButtonDefaultStyle}
        DeactiveSaveButtonDefaultStyle={container.DeactiveSaveButtonDefaultStyle}
        // eslint-disable-next-line jsx-a11y/tabindex-no-positive
        tabIndex={container.tabIndex}
        externalLinkIcon={externalLinkIcon}
        count={dashboardStats[container.count] ? dashboardStats[container.count] : 0}
        api={container.api}
        paginationAPIField={container.paginationAPIField}
        paginationAPIFieldDesc={container.paginationAPIFieldDesc}
        defaultSortCoulmn={container.defaultSortField || ''}
        defaultSortDirection={container.defaultSortDirection || 'asc'}
        dataKey={container.dataKey}
        filteredSubjectIds={filteredSubjectIds}
        filteredSampleIds={filteredSampleIds}
        filteredFileIds={filteredFileIds}
        tableHasSelections={tableHasSelections}
        setRowSelection={getTableRowSelectionEvent()}
        selectedRowInfo={tableRowSelectionData[container.tabIndex].selectedRowInfo}
        selectedRowIndex={tableRowSelectionData[container.tabIndex].selectedRowIndex}
        clearTableSelections={clearTableSelections}
        fetchAllFileIDs={fetchAllFileIDs}
        tableDownloadCSV={container.tableDownloadCSV || false}
        getFilesCount={getFilesCount}
        tooltipMessage={tooltipContent[currentTab]}
        tooltipIcon={tooltipContent.icon}
        tooltipAlt={tooltipContent.alt}
      />
    </TabContainer>
  ));

  return (
    <>
      <Snackbar
        className={classes.snackBar}
        open={snackbarState.open}
        onClose={closeSnack}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        message={(
          <div className={classes.snackBarMessage}>
            <span className={classes.snackBarMessageIcon}>
              <SuccessOutlinedIcon />
              {' '}
            </span>
            <span className={classes.snackBarText}>
              {snackbarState.value}
              {' '}
              File(s) successfully added to your cart
            </span>
          </div>
)}
      />
      <TabThemeProvider tableBorder={getBorderStyle()} tablecolor={getTableColor()}>
        <Tabs
          classes
          value={currentTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          textColorPrimary
        >
          {TABs}
        </Tabs>
        <SwipeableViews
          index={currentTab}
          onChangeIndex={handleTabChange}
          animateTransitions={false}
          style={{ overflowX: 'hidden' }}
        >
          {TABContainers}
        </SwipeableViews>
      </TabThemeProvider>
    </>
  );
};

const styles = () => ({
  button: {
    borderRadius: '10px',
    width: '330px',
    height: '27px',
    lineHeight: '18px',
    fontSize: '10pt',
    color: '#fff',
    backgroundColor: '#ff7f15',
  },
  snackBarMessageIcon: {
    verticalAlign: 'middle',
  },
  messageTop: {
    position: 'absolute',
    right: '20px',
    zIndex: '300',
  },
});
export default withStyles(styles, { withTheme: true })(tabController);
