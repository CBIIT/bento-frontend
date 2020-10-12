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
import Message from './message';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: '5px,5px,5px,5px' }}>
      {children}
    </Typography>
  );
}


const caseSaveButtonDefaultStyle = {
  color : '#fff',
  backgroundColor:'#09A175',
  opacity: '1',
  border: '0px',
  cursor:  'pointer',
}

const sampleSaveButtonDefaultStyle={
    color : '#fff',
    backgroundColor:'#00AEEF',
    opacity: '1',
    border: '0px',
    cursor:  'pointer',
}


const fileSaveButtonDefaultStyle={
    color : '#fff',
    backgroundColor:'#DC2FDA',
    opacity: '1',
    border: '0px',
    cursor:  'pointer',
}

const caseActiveSaveButtonDefaultStyle = {
      disabled: 'true',
      opacity: '0.3',
      cursor:'auto',
}

const sampleActiveSaveButtonDefaultStyle={
      opacity: '0.3',
      cursor:'auto',
}


const fileActiveSaveButtonDefaultStyle={
      opacity: '0.3',
      cursor:'auto',
}

const caseDeactiveSaveButtonDefaultStyle = {
     cursor :'pointer',
     opacity : 'unset',
     border :'unset',
}

const sampleDeactiveSaveButtonDefaultStyle={
     cursor :'pointer',
     opacity : 'unset',
     border :'unset',
}

const fileDeactiveSaveButtonDefaultStyle={
     cursor :'pointer',
     opacity : 'unset',
     border :'unset',
}





const tabController = (classes) => {
  // tab settings
  const [currentTab, setCurrentTab] = React.useState(0);

  // data from store
  const dashboard = useSelector((state) => (state.dashboardTab
&& state.dashboardTab.datatable
    ? state.dashboardTab.datatable : {}));

   const tooltipContent ={
    0:"Click button to add selected files associated with selected cases(s)",
    1:"Click button to add selected files associated with selected Sample(s)",
    2:"Click button to add selected files to Cart",
  }

  const [TopMessageStatus, setTopMessageStatus] = React.useState({
    text: tooltipContent[currentTab],
    isActive: false,
    currentTab:currentTab,
  });
  const [BottomMessageStatus, setBottomMessageStatus] = React.useState({
    text: tooltipContent[currentTab],
    isActive: false,
    currentTab:currentTab,
  });



  function setTooltip(status, tabInfo = ""){
    return {
        text:tabInfo,
        isActive:status,
        currentTab:currentTab,
    }
  }
 
  const tooltipConfig ={
    location:{
         top:{
      open: ()=>setTopMessageStatus(setTooltip(true,tooltipContent[currentTab])),
      close: ()=>setTopMessageStatus(setTooltip(false,tooltipContent[currentTab])),
      },
      bottom:{
        open: ()=>setBottomMessageStatus(setTooltip(true,tooltipContent[currentTab])),
        close: ()=>setBottomMessageStatus(setTooltip(false,tooltipContent[currentTab])),
      },
    }
   
  }

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

  const tabIndex = {
    0: {
      title: 'Cases',
      primaryColor: '#D6F2EA',
      secondaryColor: '#FFDFB8',
      selectedColor: '#10A075',
    },
    1: {
      title: 'Samples',
      primaryColor: '#CFEDF9',
      secondaryColor: '#C9F1F1',
      selectedColor:'#0DAFEC',
    },
    2: {
      title: 'Files',
      primaryColor: '#F7D7F7',
      secondaryColor: '#86D6F0',
      selectedColor:'#C92EC7',
    },
  };

  function getBorderStyle() {
    const style = '2px solid #898989' ;
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
{ TopMessageStatus.isActive ? (
              <div className={classes.classes.messageTop}>
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
          style={{'overflow-x':'hidden'}}
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
              saveButtonDefaultStyle={caseSaveButtonDefaultStyle}
              ActiveSaveButtonDefaultStyle={caseActiveSaveButtonDefaultStyle}
              DeactiveSaveButtonDefaultStyle={caseDeactiveSaveButtonDefaultStyle}
              toggleMessageStatus={toggleMessageStatus}
              BottomMessageStatus= {BottomMessageStatus}
              tabIndex ={0}
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
              saveButtonDefaultStyle={sampleSaveButtonDefaultStyle}
              ActiveSaveButtonDefaultStyle={sampleActiveSaveButtonDefaultStyle}
              DeactiveSaveButtonDefaultStyle={sampleDeactiveSaveButtonDefaultStyle}
              toggleMessageStatus={toggleMessageStatus}
              BottomMessageStatus= {BottomMessageStatus}
              tabIndex ={1}
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
              saveButtonDefaultStyle={fileSaveButtonDefaultStyle}
              ActiveSaveButtonDefaultStyle={fileActiveSaveButtonDefaultStyle}
              DeactiveSaveButtonDefaultStyle={fileDeactiveSaveButtonDefaultStyle}
              toggleMessageStatus={toggleMessageStatus}
              BottomMessageStatus= {BottomMessageStatus}
              tabIndex ={2}
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
  messageTop: {
    position: 'absolute',
    right: '18px',
    zIndex: '300',
    marginTop: '-12px',
  },
});
export default withStyles(styles, { withTheme: true })(tabController);
