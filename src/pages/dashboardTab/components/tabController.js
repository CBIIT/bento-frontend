import React from 'react';
import { useSelector } from 'react-redux';
import {
  Tabs, Tab, withStyles,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import Snackbar from '@material-ui/core/Snackbar';
import TabView from './tabView';
import SuccessOutlinedIcon from '../../../utils/SuccessOutlined';
import TabThemeProvider from './tabThemeConfig';
import TabLabel from './tabLabel';
import Message from '../../../components/Message';
import {
  tabs, tooltipContent, tabContainers, tabIndex, externalLinkIcon,
} from '../../../bento/dashboardTabData';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: '5px,5px,5px,5px' }}>
      {children}
    </Typography>
  );
}

const tabController = (classes) => {
  // tab settings
  const [currentTab, setCurrentTab] = React.useState(0);

  // data from store
  const dashboard = useSelector((state) => (state.dashboardTab
&& state.dashboardTab.datatable
    ? state.dashboardTab.datatable : {}));

  const [TopMessageStatus, setTopMessageStatus] = React.useState({
    text: tooltipContent[currentTab],
    isActive: false,
    currentTab,
  });
  const [BottomMessageStatus, setBottomMessageStatus] = React.useState({
    text: tooltipContent[currentTab],
    isActive: false,
    currentTab,
  });

  function setTooltip(status, tabInfo = '') {
    return {
      text: tabInfo,
      isActive: status,
      currentTab,
    };
  }

  const tooltipConfig = {
    location: {
      top: {
        open: () => setTopMessageStatus(setTooltip(true, tooltipContent[currentTab])),
        close: () => setTopMessageStatus(setTooltip(false, tooltipContent[currentTab])),
      },
      bottom: {
        open: () => setBottomMessageStatus(setTooltip(true, tooltipContent[currentTab])),
        close: () => setBottomMessageStatus(setTooltip(false, tooltipContent[currentTab])),
      },
    },

  };

  function toggleMessageStatus(location, status) {
    return tooltipConfig.location[location][status]();
  }

  const handleTabChange = (event, value) => {
    setCurrentTab(value);
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
    const style = '2px solid #898989';
    return `${tabIndex[currentTab].primaryColor} ${style}`;
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
      const { files } = data[currentValue.dataIndex];
      // check if file
      if (files && files.length > 0) {
        return accumulator.concat(files.map((f) => f.file_id));
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
  const TABs = tabs.map((tab) => (
    <Tab
      id={tab.id}
      label={getTabLalbel(tab.name, dashboard[tab.dataField] ? dashboard[tab.dataField].length : 0)}
    />
  ));

  // Calculate the properate marginTop value for the tooltip on the top
  const tooltipStyle = (text) => {
    const marginTopValue = text.length > 40 ? '-25px' : '-3px';
    return { marginTop: marginTopValue };
  };

  // Tab table Generator
  const TABContainers = tabContainers.map((container) => (
    <TabContainer id={container.id}>
      <TabView
        data={dashboard[container.dataField] ? dashboard[container.dataField] : []}
        customColumn={container.columns}
        customOnRowsSelect={onRowsSelectFunction[container.onRowsSelect]}
        openSnack={openSnack}
        closeSnack={closeSnack}
        disableRowSelection={disableRowSelectionFunction[container.disableRowSelection]}
        buttonTitle={container.buttonTitle}
        tableID={container.tableID}
        saveButtonDefaultStyle={container.saveButtonDefaultStyle}
        ActiveSaveButtonDefaultStyle={container.ActiveSaveButtonDefaultStyle}
        DeactiveSaveButtonDefaultStyle={container.DeactiveSaveButtonDefaultStyle}
        toggleMessageStatus={toggleMessageStatus}
        BottomMessageStatus={BottomMessageStatus}
         // eslint-disable-next-line jsx-a11y/tabindex-no-positive
        tabIndex={container.tabIndex}
        downloadFileName={container.downloadFileName}
        externalLinkIcon={externalLinkIcon}
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
      { TopMessageStatus.isActive ? (
        <div className={classes.classes.messageTop} style={tooltipStyle(TopMessageStatus.text)}>
          {' '}
          <Message data={TopMessageStatus.text} />
          {' '}
        </div>
      ) : ' '}
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
    right: '12px',
    zIndex: '300',
  },
});
export default withStyles(styles, { withTheme: true })(tabController);
