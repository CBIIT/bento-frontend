import React, { useRef, useEffect } from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { CustomDataTable } from 'bento-components';
import CustomFooter from './customFooter';
// import { addFiles } from '../../pages/fileCentricCart/store/cartAction';
import { addFiles } from '../../pages/fileCentricCart/store/cartLocalStore';

const FileGridView = ({
  classes, data, columns, customOnRowsSelect, openSnack, disableRowSelection, bottonText, options,
}) => {
  // const dispatch = useDispatch();
  // Get the existing files ids from  cart state
  const fileIDs = useSelector((state) => state.cart.subjectIds);

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
    // Find the newly added files by comparing
    const newFileIDS = fileIDs !== null ? selectedFileIDs.filter(
      (e) => !fileIDs.find((a) => e === a),
    ).length : selectedFileIDs.length;
    openSnack(newFileIDS);
    addFiles(selectedFileIDs);
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

  // const Columns = columns(classes);

  const defaultOptions = () => ({
    selectableRows: true,
    responsive: 'stacked',
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

  const x = { ...defaultOptions(), ...options };

  function saveButtonDiv(flag) {
    const css = {
      position: 'absolute',
      margin: '-35px 0 0 0',
      paddingLeft: '25px',
      display: 'none',
    };
    if (flag) {
      css.display = 'block';
    }
    return css;
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={12} id="table_file">
          <CustomDataTable
            data={_.cloneDeep(data)}
            columns={columns}
            options={x}
          />
        </Grid>

      </Grid>
      <Grid item xs={12} style={saveButtonDiv(data.length > 0)}>
        <button
          type="button"
          ref={saveButton}
          onClick={exportFiles}
          className={classes.button}
        >
          { bottonText }
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
    width: '260px',
    height: '27px',
    lineHeight: '18px',
    fontSize: '10pt',
    color: '#fff',
    backgroundColor: '#ff7f15',
  },
});

export default withStyles(styles, { withTheme: true })(FileGridView);
