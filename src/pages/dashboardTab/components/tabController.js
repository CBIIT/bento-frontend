/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Tabs, Tab, withStyles,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import Snackbar from '@material-ui/core/Snackbar';
import { caseOnRowsSelect, caseDisableRowSelection, caseColumns } from './tabConfigs/caseConfig';
import { fileOnRowsSelect, fileDisableRowSelection, fileColumns } from './tabConfigs/fileConfig';
import { sampleOnRowsSelect, sampleDisableRowSelection, sampleColumns } from './tabConfigs/sampleConfig';
import TabView from './tabView';
import SuccessOutlinedIcon from '../../../utils/SuccessOutlined';
import TabThemeProvider from './tabThemeConfig';
import TabLabel from './tabLabel';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: '5px,5px,5px,5px' }}>
      {children}
    </Typography>
  );
}


const caseMessageData= "Click button to add selected files associated with selected cases(s)";

const fileMessageData= "Click button to add selected files to Cart";

const sampleMessageData= "Click button to add selected files associated with selected Sample(s)";


const tabController = (classes) => {
  // tab settings
  const [currentTab, setCurrentTab] = React.useState(0);

  // data from store
  const dashboard = useSelector((state) => (state.dashboardTab
&& state.dashboardTab.datatable
    ? state.dashboardTab.datatable : {}));

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

  const tabIndex = {
    0: {
      title: 'Cases',
      primaryColor: '#D7F3EA',
      secondaryColor: '#FFDFB8',
      selectedColor: '#45B492',
    },
    1: {
      title: 'Samples',
      primaryColor: '#D0EDF9',
      secondaryColor: '#C9F1F1',
      selectedColor:'#06B1EC',
    },
    2: {
      title: 'Files',
      primaryColor: '#F7D8F7',
      secondaryColor: '#86D6F0',
      selectedColor:'#CA2AC8',
    },
  };

  function getBorderStyle() {
    const style = '3px solid #000' ;
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

  const caseData = dashboard.dataCase ? dashboard.dataCase : [];
  const sampleData = dashboard.dataSample ? dashboard.dataSample : [];
  const fileData = dashboard.dataFile ? dashboard.dataFile : [];

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
          <Tab
            id="case_tab"
            label={getTabLalbel('Cases', caseData.length)}
          />
          <Tab
            id="sample_tab"
            label={getTabLalbel('Samples', sampleData.length)}
          />
          <Tab
            id="file_tab"
            label={getTabLalbel('Files', fileData.length)}

          />
        </Tabs>
        <SwipeableViews
          index={currentTab}
          onChangeIndex={handleTabChange}
          animateTransitions={false}
          style={{'overflow-x':'visible','overflow-y':'visible'}}
        >
          <TabContainer id="case_tab_view">
            <TabView
              data={caseData}
              Columns={caseColumns}
              customOnRowsSelect={caseOnRowsSelect}
              openSnack={openSnack}
              closeSnack={closeSnack}
              disableRowSelection={caseDisableRowSelection}
              buttonTitle="Add  Selected Files"
              tableID="case_tab_table"
              messageData={caseMessageData}
            />
          </TabContainer>
          <TabContainer id="sample_tab_view">
            <TabView
              data={sampleData}
              Columns={sampleColumns}
              customOnRowsSelect={sampleOnRowsSelect}
              openSnack={openSnack}
              closeSnack={closeSnack}
              disableRowSelection={sampleDisableRowSelection}
              buttonTitle="Add  Selected Files"
              tableID="sample_tab_table"
              messageData={sampleMessageData}
            />
          </TabContainer>
          <TabContainer id="file_tab_view">
            <TabView
              data={fileData}
              Columns={fileColumns}
              customOnRowsSelect={fileOnRowsSelect}
              openSnack={openSnack}
              closeSnack={closeSnack}
              disableRowSelection={fileDisableRowSelection}
              buttonTitle="Add  Selected Files"
              tableID="file_tab_table"
              messageData={fileMessageData}
            />
          </TabContainer>
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
});
export default withStyles(styles, { withTheme: true })(tabController);
