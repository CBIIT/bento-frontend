import React from 'react';
import {
  Grid,
  withStyles,
  Chip,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import { Link } from 'react-router-dom';
import CustomFooter from './customFooter';
import { toggleCheckBox } from '../dashboardState';
import { fetchCasesAndFiles } from '../../selectedCases/selectedCasesState';


const tableStyle = (ratio = 1) => ({
  width: (((document.documentElement.clientWidth * 0.6) / 10) * ratio),
  overflow: 'hidden',
  wordBreak: 'break-word',
  maxWidth: (((document.documentElement.clientWidth * 0.6) / 10) * ratio),
  minWidth: '160px',
}
);


const columns = (classes) => [
  {
    name: 'case_id',
    label: 'Case ID',
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => (
        <div className="mui_td" style={tableStyle(0.8)}>
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
      customBodyRender: (value) => (
        <div className="mui_td" style={tableStyle(0.6)}>

          <Link to={`/study/${value}`} className={classes.link}>{value}</Link>

        </div>
      ),
    },
  },
  {
    name: 'study_type',
    label: 'Study Type',
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => (
        <div className="mui_td" style={tableStyle(2.3)}>
          {' '}
          {value}
          {' '}
        </div>
      ),
    },
  },
  {
    name: 'breed',
    label: 'Breed',
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => (
        <div className="mui_td" style={tableStyle(1)}>
          {' '}
          {value}
          {' '}
        </div>
      ),
    },
  },
  {
    name: 'diagnosis',
    label: 'Diagnosis',
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => (
        <div className="mui_td" style={tableStyle(2)}>
          {' '}
          {value}
          {' '}
        </div>
      ),
    },
  },
  {
    name: 'stage_of_disease',
    label: 'Stage of Disease',
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => (
        <div className="mui_td" style={tableStyle(0.5)}>
          {' '}
          {value}
          {' '}
        </div>
      ),
    },
  },
  {
    name: 'age',
    label: 'Age',
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => (
        <div className="mui_td" style={tableStyle(0.5)}>
          {' '}
          {value}
          {' '}
        </div>
      ),
    },
  },
  {
    name: 'sex',
    label: 'Sex',
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => (
        <div className="mui_td" style={tableStyle(0.5)}>
          {' '}
          {value}
          {' '}
        </div>
      ),
    },
  },
  {
    name: 'neutered_status',
    label: 'Neutered Status',
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => (
        <div className="mui_td" style={tableStyle(0.8)}>
          {' '}
          {value}
          {' '}
        </div>
      ),
    },
  },
];


let selectedCaseIds = [];

function exportCases(dispatch) {
  dispatch(fetchCasesAndFiles(selectedCaseIds));
  selectedCaseIds = [];
}


const options = (classes, dispatch) => ({
  selectableRows: true,
  search: false,
  filter: false,
  searchable: false,
  print: false,
  download: false,
  viewColumns: false,
  pagination: true,
  customToolbarSelect: (selectedRows, displayData) => {
    const selectedKeys = Object.keys(selectedRows.data).map((keyVlaue) => (
      selectedRows.data[keyVlaue].index
    ));
    const selectedCaseId = selectedKeys.map((keyVlaue) => (
      displayData[keyVlaue].data[0].props.children[1].props.children
    ));
    selectedCaseIds = selectedCaseId;
    return '';
  },
  customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
    <CustomFooter
      text="SAVE TO MY CASES"
      onClick={() => exportCases(dispatch)}
      classes={classes}
      count={count}
      page={page}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={(event) => changeRowsPerPage(event.target.value)}
      // eslint-disable-next-line no-shadow
      onChangePage={(_, page) => changePage(page)}
    />
  ),

});

const Cases = ({ classes, data }) => {
  const dispatch = useDispatch();
  // data from store
  const chipData = useSelector((state) => (
    state.dashboard.datatable
    && state.dashboard.datatable.filters
      ? state.dashboard.datatable.filters : []));


  // The bubble below will shows in the dashboard and work as
  // When user select and filters
  // they will float above the case table on the dashboard .
  // Due to the design issue, disable bubble function for now

  let bubbles = (chipData.map((ckdata) => (
    <Chip
      key={ckdata.datafield + ckdata.name}
      label={ckdata.name}
      onDelete={() => {
        dispatch(toggleCheckBox([{
          groupName: ckdata.groupName,
          name: ckdata.name,
          datafield: ckdata.datafield,
          isChecked: false,
        }]));
      }}
      classes={{
        root: classes.chipRoot,
        deleteIcon: classes.chipDeleteIcon,
      }}
    />
  )));

  bubbles = '';

  return (
    <>
      <div className={classes.chips}>
        {bubbles}
      </div>

      <Grid container>
        <Grid item xs={12} className={classes.caseTitle}>
           Cases
        </Grid>
        <Grid item xs={12}>
          <MUIDataTable
            data={data}
            columns={columns(classes)}
            options={options(classes, dispatch)}
          />
        </Grid>
      </Grid>

    </>
  );
};

const styles = () => ({

  link: {
    color: '#DC762F',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  caseTitle: {
    color: '#194563',
    fontSize: '25.2pt',
    fontStyle: 'normal',
    fontFamily: 'Raleway',
    letterSpacing: '0.025em',
    backgroundColor: '#f5f5f5',
    padding: '10px 32px 8px 28px',
  },
  chips: {
    position: 'absolute',
    marginLeft: '250px',
    marginTop: '36px',
    zIndex: '999',
  },
  chipRoot: {
    color: '#ffffff',
    fontFamily: '"Open Sans", sans-serif',
    letterSpacing: '0.075em',
    marginLeft: '10px',
    backgroundColor: '#9b9b9b',
    fontSize: '9pt',
  },
  chipDeleteIcon: {
    color: '#ffffff',
    '&:hover': {
      color: '#ffffff',
    },
  },
  root: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '9pt',
    letterSpacing: '0.025em',
    color: '#000',
  },
  button: {
    borderRadius: '10px',
    width: '178px',
    height: '27px',
    lineHeight: '18px',
    fontSize: '10pt',
    color: '#fff',
    backgroundColor: '#ff7f15',
  },

});

export default withStyles(styles, { withTheme: true })(Cases);
