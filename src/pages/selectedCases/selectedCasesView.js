import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import MUIDataTable from 'mui-custom-datatables';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
        <div>
          {' '}
          <Link to={`/case/${value}`} className={classes.link}>{value}</Link>
          {' '}
        </div>
      ),
    },
  },
  {
    name: 'study_code',
    label: 'Study Code',
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => (
        <div>
          {' '}
          <Link to={`/study/${value}`} className={classes.link}>{value}</Link>
          {' '}
        </div>
      ),
    },
  },
  { name: 'study_type', label: 'Study Type' },
  { name: 'breed', label: 'Breed' },
  { name: 'diagnosis', label: 'Diagnosis' },
  { name: 'stage_of_disease', label: 'Stage of Disease' },
  { name: 'age', label: 'Age' },
  { name: 'sex', label: 'Sex' },
  { name: 'neutered_status', label: 'Neutered Status' },
];

const options = (dispatch, cases) => ({
  selectableRows: true,
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
    // dispatch(rowsDeleted.map(e=>(cases.)))
    if (rowsDeleted.data.length > 0) {
      return dispatch(deleteCasesAction(
        rowsDeleted.data.map((row) => cases[row.dataIndex].case_id),
      ));
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

const SelectedCasesView = ({ data, classes }) => (
  <Grid>
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
            <span>
              <span>My Cases: Cases</span>
            </span>
          </div>
        </div>
      </div>
    </Grid>
    <Grid item xs={12}>
      <div className={classes.tableWrapper}>
        <MUIDataTable
          data={data}
          columns={columns(classes)}
          options={options(useDispatch(), data)}
          className={classes.tableStyle}
        />
      </div>
    </Grid>
  </Grid>
);

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
    marginTop: '14px',
    width: '100px',
  },
  tableWrapper: {
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    paddingTop: '30px',
    margin: '30px auto 30px auto',
    maxWidth: '1440px',
    background: '#f3f3f4',
    paddingBottom: '30px',
  },
  tableStyle: {
    maxWidth: '1440px',
    margin: '0 30px',
  },
  customFooterStyle: {
    background: '#f3f3f4',
  },
  headerMainTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontWeight: 'bold',
    letterSpacing: '0.017em',
    color: '#ff8a00',
    fontSize: '25px',
    lineHeight: '125px',
    paddingLeft: '5px',
  },
  headerTitle: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    float: 'left',
    marginLeft: '110px',
    paddingLeft: '3px',
  },
  header: {
    paddingLeft: '32px',
    paddingRight: '32px',
    borderBottom: '#81a6b9 4px solid',
    height: '100px',
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
  },
});

export default withStyles(styles, { withTheme: true })(SelectedCasesView);
