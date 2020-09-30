import React, { useRef, useEffect } from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import CustomFooter from './tabFooter';
import { addSubjects } from '../../fileCentricCart/store/cartAction';
import { FileData } from '../utils/dashboardUtilFunctions';

const TabView = ({
  classes, data, Columns, customOnRowsSelect, openSnack, disableRowSelection, buttonTitle, tableID,
}) => {
  const dispatch = useDispatch();
  // Get the existing files ids from  cart state
  const fileIDs = useSelector((state) => state.cart.files);

  const dashboard = useSelector((state) => (state.dashboard
&& state.dashboard.datatable
    ? state.dashboard.datatable : {}));

  const saveButton = useRef(null);

  useEffect(() => {
    saveButton.current.disabled = true;
    saveButton.current.style.color = '#FFFF';
    saveButton.current.style.backgroundColor = '#C53B27';
    saveButton.current.style.opacity = '0.3';
    saveButton.current.style.border = '3px solid grey';
    saveButton.current.style.fontWeight = '600';
    saveButton.current.style.cursor = 'auto';
  });

  let selectedFileIDs = [];

  function exportFiles() {
    // filter out the ones  which are not int the file tab.
    const files = FileData(dashboard).map((f) => f.uuid);

    if (files && files.length > 0) {
      selectedFileIDs = selectedFileIDs.filter((uuid) => files.includes(uuid));
    }
    // Find the newly added files by comparing
    const newFileIDS = fileIDs !== null ? selectedFileIDs.filter(
      (e) => !fileIDs.find((a) => e === a),
    ).length : selectedFileIDs.length;
    openSnack(newFileIDS);
    dispatch(addSubjects({ files: selectedFileIDs }));
    selectedFileIDs = [];
  }

  function onRowsSelect(curr, allRowsSelected) {
    selectedFileIDs = [...new Set(selectedFileIDs.concat(
      customOnRowsSelect(data, allRowsSelected),
    ))];

    if (allRowsSelected.length === 0) {
      saveButton.current.disabled = true;
      saveButton.current.style.color = '#FFFFFF';
      saveButton.current.style.backgroundColor = '#C53B27';
      saveButton.current.style.opacity = '0.3';
      saveButton.current.style.border = '3px solid grey';
      saveButton.current.style.fontWeight = '600';
      saveButton.current.style.cursor = 'auto';
    } else {
      saveButton.current.disabled = false;
      saveButton.current.style.color = '#FFFFFF';
      saveButton.current.style.backgroundColor = '#C53B27';
      saveButton.current.style.cursor = 'pointer';
      saveButton.current.style.opacity = 'unset';
      saveButton.current.style.border = 'unset';
    }
  }

  const columns = Columns(classes);

  const options = () => ({
    selectableRows: true,
    search: false,
    filter: false,
    searchable: false,
    print: false,
    download: true,
    downloadOptions: {
      filename: 'tableDownload.csv',
      filterOptions: {
        useDisplayedColumnsOnly: true,
      },
    },
    viewColumns: true,
    pagination: true,
    isRowSelectable: (dataIndex) => disableRowSelection(data[dataIndex], fileIDs),
    onRowsSelect: (curr, allRowsSelected) => onRowsSelect(curr, allRowsSelected),
    // eslint-disable-next-line no-unused-vars
    customToolbarSelect: () => '',
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
      <CustomFooter
        text="SAVE TO MY CASES"
        onClick={() => exportFiles(dispatch)}
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

  return (
    <div>
      <Grid container>
        <Grid item xs={12} id={tableID}>
          <MUIDataTable
            data={data}
            columns={columns}
            options={options()}
          />
        </Grid>

      </Grid>
      <Grid item xs={12} className={classes.saveButtonDiv}>
        <button
          type="button"
          ref={saveButton}
          onClick={exportFiles}
          className={classes.button}
        >
          { buttonTitle }
        </button>
      </Grid>
    </div>
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
  saveButtonDiv: {
    position: 'absolute',
    margin: '-50px 0 0 0',
    paddingLeft: '25px',
  },
  button: {
    borderRadius: '10px',
    width: '230px',
    lineHeight: '18px',
    fontSize: '10pt',
    color: '#fff',
    backgroundColor: '#ff7f15',
  },
  caseTableBorder: {
    borderTopColor: '#F48439',
  },
  fileTableBorder: {
    borderTopColor: '#2446C6',
  },
  sampleTableBorder: {
    borderTopColor: '#05C5CC',
  },
});

export default withStyles(styles, { withTheme: true })(TabView);
