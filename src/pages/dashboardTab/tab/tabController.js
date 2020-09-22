import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Tabs, Tab,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import Snackbar from '@material-ui/core/Snackbar';
import TabView from './tabView';
import { dashboardTable, externalLinkIcon } from '../../../bento/dashboardTabData';
import { cartSelectionMessages } from '../../../bento/cartWorkflowData';
import { receiveCases } from '../../selectedCases/selectedCasesState';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: '5px,5px,5px,5px' }}>
      {children}
    </Typography>
  );
}

const TabController = () => {
  // data from store
  const tableData = useSelector((state) => (state.dashboard
        && state.dashboard.datatable
        && state.dashboard.datatable.data
    ? state.dashboard.datatable.data : {}));

  // tab settings
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event, value) => {
    setCurrentTab(value);
  };

  const buttonText = 'save to my cart';

  const [snackbarState, setsnackbarState] = React.useState({
    open: false,
    value: 0,
  });
  function openSnack(value1) {
    setsnackbarState({ open: true, value: value1 });
  }
  function closeSnack() {
    setsnackbarState({ open: false });
  }

  // Get the existing caseIds from MyCases cart state
  const caseIds = useSelector((state) => state.cart.cases);

  function exportCases(selectedCaseIds) {
    // Find the newly added cases by comparing
    // existing caseIds and selectedCaseIds
    const uniqueCases = caseIds !== null ? selectedCaseIds.filter(
      (e) => !caseIds.find((a) => e === a),
    ).length : selectedCaseIds.length;
    if (uniqueCases > 0) {
      openSnack(uniqueCases);
    }
    dispatch(receiveCases(selectedCaseIds));
  }

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
            <span>
              <SuccessOutlinedIcon />
              {' '}
            </span>
            <span className={classes.snackBarText}>
              {snackbarState.value}
              {' '}
              {cartSelectionMessages.selectionsAddedMessage}
            </span>
          </div>
)}
      />
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        { dashboardTable.map((table) => (
          <Tab
            id={`${table.tableTitle}_tab`}
            label={table.tableTitle}
          />
        ))}
      </Tabs>
      <SwipeableViews
        index={currentTab}
        onChangeIndex={handleTabChange}
        animateTransitions={false}
      >
        { dashboardTable.map((table) => (
          <TabContainer id={`${table.tableTitle}_tab_view`}>
            <TabView
              data={tableData}
              dashboardTable={table}
              externalLinkIcon={externalLinkIcon}
              buttonText={buttonText}
              exportCases={exportCases}

            />
          </TabContainer>
        ))}
      </SwipeableViews>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(TabController);
