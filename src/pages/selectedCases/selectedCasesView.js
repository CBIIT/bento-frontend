import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import MUIDataTable from 'mui-custom-datatables';
import Snackbar from '@material-ui/core/Snackbar';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SuccessOutlinedIcon from '../../utils/SuccessOutlined';
import wizardIcon from '../../assets/icons/MyCases-Wizard-Step2.svg';
import icon from '../../assets/icons/Icon-MyCases.svg';
import CustomFooter from './customFooter';
import { deleteCasesAction } from './selectedCasesState';

const columns = (classes) => [

  {
    name: 'case_id',
    label: 'Case ID',
    sortDirection: 'asc',
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => (
        <div className={classes.tableCell1}>
          {' '}
          <Link to={`/case/${value}`} className={classes.link}>{value}</Link>
          {' '}
        </div>
      ),
    },
  },
  {
    name: 'clinical_trial_code',
    label: 'Trial Code',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta) => (
        <div className={classes.tableCell2}>
          {' '}
          <Link to={`/trial/${tableMeta.rowData[8]}`} className={classes.link}>{value}</Link>
          {' '}
        </div>
      ),
    },
  },
  {
    name: 'arm_id',
    label: 'Arm',
    options: {
      customBodyRender: (value) => (
        <div className={classes.tableCell3}>
          {' '}
          {value}
          {' '}
        </div>
      ),
    },
  },
  {
    name: 'arm_drug',
    label: 'Arm Treatment',
    options: {
      customBodyRender: (value) => (
        <div className={classes.tableCell4}>
          {' '}
          {value}
          {' '}
        </div>
      ),
    },
  },
  {
    name: 'disease',
    label: 'Diagnosis',
    options: {
      customBodyRender: (value) => (
        <div className={classes.tableCell5}>
          {' '}
          {value}
          {' '}
        </div>
      ),
    },
  },
  {
    name: 'gender',
    label: 'Gender',
    options: {
      customBodyRender: (value) => (
        <div className={classes.tableCell6}>
          {' '}
          {value}
          {' '}
        </div>
      ),
    },
  },
  {
    name: 'race',
    label: 'Race',
    options: {
      customBodyRender: (value) => (
        <div className={classes.tableCell7}>
          {' '}
          {value}
          {' '}
        </div>
      ),
    },
  },
  {
    name: 'ethnicity',
    label: 'Ethnicity',
    options: {
      customBodyRender: (value) => (
        <div className={classes.tableCell8}>
          {' '}
          {value}
          {' '}
        </div>
      ),
    },
  },
  {
    name: 'clinical_trial_id',
    label: 'Trial ID',
    options: {
      display: false,
    },
  },
  {
    name: 'remove_label',
    options: {
      filter: false,
      sort: false,
      customHeadRender: () => (
        <th className={classes.tableCell9}>
          <span
            role="button"
            className={classes.removeLabel}
          >
            REMOVE
          </span>
        </th>
      ),
    },
  },
];


const SelectedCasesView = ({ data, classes }) => {
  const dispatch = useDispatch();

  const [snackbarState, setsnackbarState] = React.useState({
    open: false,
    value: 0,
    rowsDeleted: null,
    cases: null,
  });
  function openSnackBar(value, rowsDeleted, cases) {
    setsnackbarState({
      open: true, value, rowsDeleted, cases,
    });
  }
  function closeSnackBar() {
    setsnackbarState({ open: false });
    if (snackbarState.rowsDeleted
        && snackbarState.rowsDeleted !== null
        && snackbarState.rowsDeleted.data
          && snackbarState.cases
            && snackbarState.cases !== null) {
      dispatch(deleteCasesAction(
        snackbarState.rowsDeleted.data.map((row) => snackbarState.cases[row.dataIndex].case_id),
      ));
    }
  }
  const options = (cases) => ({
    selectableRows: 'multiple',
    responsive: 'stacked',
    search: false,
    filter: false,
    searchable: false,
    print: false,
    download: false,
    viewColumns: false,
    pagination: true,
    selectedRows: {
      text: 'row(s) selected',
      delete: 'Delete',
      deleteAria: 'Delete Selected Rows',
    },

    onRowsDelete: (rowsDeleted) => {
      if (rowsDeleted.data.length > 0) {
        openSnackBar(rowsDeleted.data.length, rowsDeleted, cases);
      }
      return true;
    },
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
      <CustomFooter
        text="GO TO FILES"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={(event) => changeRowsPerPage(event.target.value)}
          // eslint-disable-next-line no-shadow
        onChangePage={(_, page) => changePage(page)}
      />
    ),
  });
  return (
    <>
      <Grid>
        <div className={classes.myCasesWrapper}>
          <Grid item xs={12}>
            <div className={classes.header}>
              <div className={classes.logo}>
                <img
                  src={icon}
                  alt="ICDC case detail header logo"
                />

              </div>
              <div className={classes.headerTitle}>
                <div className={classes.headerMainTitle}>
                My Cases :
                  <span className={classes.headerMainTitleTwo}>
                    {' '}
                    {' '}
                Cases
                  </span>
                </div>
              </div>
              <div className={classes.tableTitleWizard}>
                <img
                  src={wizardIcon}
                  alt="CTDC MyCases Wizard"
                />
              </div>
            </div>
            <div />
            <div id="table_selected_cases" className={classes.tableWrapper}>
              <MUIDataTable
                data={data}
                columns={columns(classes)}
                options={options(data)}
                className={classes.tableStyle}
              />
            </div>
          </Grid>
        </div>
      </Grid>
      <Snackbar
        className={classes.snackBar}
        open={snackbarState.open}
        onClose={closeSnackBar}
        autoHideDuration={1500}
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
              Case(s) successfully removed from the My Cases list
            </span>
          </div>
)}
      />
    </>
  );
};

const styles = (theme) => ({
  link: {
    color: '#DC762F',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  logo: {
    position: 'absolute',
    float: 'left',
    marginTop: '-8.9px',
    width: '82px',
    filter: 'drop-shadow( 2px 2px 2px rgba(0, 0, 0, 0.2))',
  },
  tableWrapper: {
    margin: 'auto 3% auto 3%',
    maxWidth: '100%',
  },
  tableStyle: {
    maxWidth: '100%',
  },
  customFooterStyle: {
    background: '#f3f3f4',
  },
  headerMainTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontWeight: '300',
    letterSpacing: '0.017em',
    color: '#DE5227',
    fontSize: '18pt',
    lineHeight: '75px',
    '& $headerMainTitleTwo': {
      fontWeight: 'bold',
      letterSpacing: '0.025em',
    },
  },
  headerMainTitleTwo: {

  },
  headerTitle: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    float: 'left',
    marginLeft: '85px',
    paddingLeft: '3px',
    marginBottom: '-30px',
    position: 'absolute',
  },
  tableTitleWizard: {
    width: '400px',
    float: 'right',
    paddingTop: '8px',
  },
  header: {
    borderBottom: '#4B619A 10px solid',
    height: '77px',
    maxWidth: '100%',
    marginLeft: '3%',
    marginRight: '3%',
  },
  myCasesWrapper: {
    border: '#DE5227 4px solid',
    borderRadius: '35px',
    margin: '80px',
    marginLeft: '3%',
    marginRight: '3%',
    paddingBottom: '20px',
    background: 'white',
  },
  removeLabel: {
    cursor: 'text',
  },
  tableCell9: {
    cursor: 'text',
    top: '0px',
    left: '0px',
    zIndex: 100,
    position: 'sticky',
    fontSize: '9pt',
    borderTop: '#4B619A 3px solid',
    fontStyle: 'normal',
    fontFamily: theme.custom.fontFamily,
    color: '#0296C9',
    borderBottom: '#4B619A 3px solid',
    letterSpacing: '0.014em',
    backgroundColor: '#ffffff',
  },
  snackBar: {
    '& > div': {
      backgroundColor: '#4CAF50',
      padding: '6px 80px 0px',
    },
  },
  snackBarMessage: {
    display: 'flex',
  },
  snackBarText: {
    paddingLeft: '10px',
  },
  tableCell1: {
    width: '110px',
    paddingLeft: '20px',
    hyphens: 'auto',
  },
  tableCell2: {
    width: '105px',
    hyphens: 'auto',
  },
  tableCell3: {
    width: '60px',
    hyphens: 'auto',
  },
  tableCell4: {
    width: '150px',
    hyphens: 'auto',
  },
  tableCell5: {
    width: '220px',
    hyphens: 'auto',
  },
  tableCell6: {
    width: '90px',
    hyphens: 'auto',
  },
  tableCell7: {
    width: '120px',
    hyphens: 'auto',
    overflowWrap: 'break-word',
    wordBreak: 'break-all',

  },
  tableCell8: {
    width: '100px',
    hyphens: 'auto',
    overflowWrap: 'break-word',
    wordBreak: 'break-all',
  },

});

export default withStyles(styles, { withTheme: true })(SelectedCasesView);
