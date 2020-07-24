import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { CustomDataTable } from 'bento-components';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import { useDispatch } from 'react-redux';
import SuccessOutlinedIcon from '../../utils/SuccessOutlined';
import { myCasesPageData, cartSelectionMessages } from '../../bento/cartWorkflowData';
import { dashboardTable, externalLinkIcon } from '../../bento/dashboardData';
import manipultateLinks from '../../utils/helpers';
import CustomFooter from './customFooter';
import { deleteCasesAction } from './selectedCasesState';

const updatedTableWithLinks = manipultateLinks(dashboardTable.tableData);

const columns = updatedTableWithLinks.map((column) => ({
  name: column.field,
  label: column.label,
  options: {
    display: column.display ? column.display : false,
    filter: false,
    customBodyRender: (value, tableMeta) => (
      <div>
        {
        column.internalLink ? <Link to={`${column.actualLink}${tableMeta.rowData[column.actualLinkId]}`}>{value}</Link>
          : column.externalLink ? (
            <span>
              <a href={`${column.actualLink}${tableMeta.rowData[column.actualLinkId]}`} target="_blank" rel="noopener noreferrer">{value}</a>
              <img
                src={externalLinkIcon ? externalLinkIcon.src : ''}
                alt={externalLinkIcon.alt ? externalLinkIcon.alt : ''}
              />
            </span>
          )
            : `${value}`
}
      </div>
    ),
  },
}));

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
        snackbarState.rowsDeleted.data.map((row) => snackbarState.cases[row.dataIndex].subject_id),
      ));
    }
  }
  const options = (cases) => ({
    selectableRows: 'multiple',
    selectCellPostion: 'right',
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
        text={myCasesPageData.buttonText}
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
                  src={myCasesPageData.headerIconSrc}
                  alt={myCasesPageData.headerIconAlt}
                />

              </div>
              <div className={classes.headerTitle}>
                <div className={classes.headerMainTitle}>
                  {myCasesPageData.myCasesMainTitle}
                  <span className={classes.headerMainTitleTwo}>
                    {' '}
                    {' '}
                    {myCasesPageData.myCasesSubTitle}
                  </span>
                </div>
              </div>
              <div className={classes.tableTitleWizard}>
                <img
                  src={myCasesPageData.wizardIconSrc}
                  alt={myCasesPageData.wizardIconAlt}
                />
              </div>
            </div>
            <div />
            <div id="table_selected_cases" className={classes.tableWrapper}>
              <CustomDataTable
                data={data}
                columns={columns}
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
              {cartSelectionMessages.selectionsRemovedMessage}
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
    marginTop: '-17.9px',
    marginLeft: '-10px',
    width: '101px',
    filter: 'drop-shadow(-3px 2px 6px rgba(27,28,28,0.29))',
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
    color: '#03A383',
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
    borderBottom: '#42779A 10px solid',
    height: '77px',
    maxWidth: '100%',
    marginLeft: '3%',
    marginRight: '3.05%',
  },
  myCasesWrapper: {
    border: '#03A383 4px solid',
    borderRadius: '35px',
    marginTop: '200px',
    marginBottom: '80px',
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
