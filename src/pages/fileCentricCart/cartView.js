import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { CustomDataTable } from 'bento-components';
import _ from 'lodash';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import SkeletonTable from './components/skeletonTable';
import { myFilesPageData } from '../../bento/fileCentricCartWorkflowData';
import CustomFooter from './customFooter';
import { deleteSubjects } from './store/cartAction';
import { downloadJson } from './utils';
import formatBytes from '../../utils/formatBytes';

const cartView = ({ classes, data, isLoading }) => {
  const dispatch = useDispatch();
  const deleteButton = useRef(null);
  const downloadButton = useRef(null);

  const [modalStatus, setModalStatus] = React.useState({ open: false, selectedSubjectIds: [] });

  let globalData = [];
  let selectedSubjectIds = [];

  function closeModal() {
    const status = { ...modalStatus };
    status.open = false;
    setModalStatus(status);
  }

  function removeSubjects() {
    selectedSubjectIds = [...new Set(selectedSubjectIds)];
    setModalStatus({ open: true, selectedSubjectIds });
  }
  function deleteSubjectsAndCloseModal() {
    closeModal();
    dispatch(deleteSubjects({ subjectIds: modalStatus.selectedSubjectIds }));
    selectedSubjectIds = [];
  }

  useEffect(() => {
    deleteButton.current.disabled = true;
    deleteButton.current.style.color = '#FFFF';
    deleteButton.current.style.backgroundColor = '#C53B27';
    deleteButton.current.style.opacity = '0.3';
    deleteButton.current.style.border = '3px solid grey';
    deleteButton.current.style.fontWeight = '600';
    deleteButton.current.style.cursor = 'auto';

    downloadButton.current.disabled = false;
    downloadButton.current.style.color = '#FFFFFF';
    downloadButton.current.style.backgroundColor = '#3890c5';
    downloadButton.current.style.cursor = 'pointer';
    downloadButton.current.style.opacity = 'unset';
    downloadButton.current.style.border = 'unset';
  });

  function onRowsSelect(curr, allRowsSelected) {
    globalData = [];
    selectedSubjectIds = [];
    allRowsSelected.forEach((row) => {
      const subject = data[row.dataIndex];
      selectedSubjectIds.push(subject.subject_id);
      globalData.push({
        caseId: subject.subject_id,
        fileName: subject.file_name,
        uuid: subject.uuid,
        md5Sum: subject.md5sum,
      });
    });
    // filter out the duplicate file ids.
    selectedSubjectIds = [...new Set(selectedSubjectIds)];
    if (allRowsSelected.length === 0) {
      deleteButton.current.disabled = true;
      deleteButton.current.style.color = '#FFFFFF';
      deleteButton.current.style.backgroundColor = '#C53B27';
      deleteButton.current.style.opacity = '0.3';
      deleteButton.current.style.border = '3px solid grey';
      deleteButton.current.style.fontWeight = '600';
      deleteButton.current.style.cursor = 'auto';
    } else {
      deleteButton.current.disabled = false;
      deleteButton.current.style.color = '#FFFFFF';
      deleteButton.current.style.backgroundColor = '#C53B27';
      deleteButton.current.style.cursor = 'pointer';
      deleteButton.current.style.opacity = 'unset';
      deleteButton.current.style.border = 'unset';
    }
  }

  const comments = '';

  const columns = [
    {
      name: 'subject_id',
      label: 'Case ID',
      sortDirection: 'asc',
      options: {
        customBodyRender: (value) => (
          <div className={classes.tableCell1}>
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'file_name',
      label: 'File Name',
      sortDirection: 'asc',
      options: {
        customBodyRender: (value) => (
          <div className={classes.tableCell2}>
            {' '}
            {value}
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'file_type',
      label: 'File Type',
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
      name: 'association',
      label: 'Association',
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
      name: 'file_description',
      label: 'Description',
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
      name: 'file_format',
      label: 'Format',
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
      name: 'file_size',
      label: 'Size',
      options: {
        customBodyRender(bytes) {
          return (
            <div className={classes.tableCell7}>
              {' '}
              {formatBytes(bytes)}
              {' '}
            </div>
          );
        },
      },
    },
    {
      name: 'file_id',
      label: 'UUID',
      options: {
        display: false,

      },
    },
    {
      name: 'md5sum',
      label: 'Md5Sum',
      options: {
        display: false,
      },
    },
  ];

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
    onRowsSelect: (curr, allRowsSelected) => onRowsSelect(curr, allRowsSelected),
    // eslint-disable-next-line no-unused-vars
    customToolbarSelect: (selectedRows, displayData) => '',
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
      <CustomFooter
        className={classes.customFooterStyle}
        text="DOWNLOAD MANIFEST"
        label="User Comments"
        onClick={() => downloadJson(globalData, comments)}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={(event) => changeRowsPerPage(event.target.value)}
        // eslint-disable-next-line no-shadow
        onChangePage={(_, page) => changePage(page)}
      />
    ),
  });

  function divStyle() {
    const css = {
      position: 'absolute',
      marginTop: '-31px',
      marginLeft: '0px',
      display: 'none',
      padding: '0',
    };
    if (isLoading === false) {
      css.display = 'block';
    }
    return css;
  }

  const btnStyle = {
    color: 'rgba(0, 0, 0,0.26)',
    boxShadow: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    padding: '6px 16px',
    fontSize: '0.875rem',
    minWidth: '64px',
    boxSizing: 'border-box',
    transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    lineHeight: '1.75',
    fontWeight: '500',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    borderRadius: '4px',
    textTransform: 'uppercase',
  };

  const dataTable = isLoading ? <SkeletonTable />
    : (
      <CustomDataTable
        data={_.cloneDeep(data)}
        columns={columns}
        options={options()}
        className={classes.tableStyle}
      />
    );
  return (
    <Grid>
      <Dialog
        open={modalStatus.open}
        onClose={() => closeModal()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { modalStatus.selectedSubjectIds.length }
            {' '}
            File(s) will be removed from your Files
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deleteSubjectsAndCloseModal()} color="primary">
            Ok
          </Button>
          <Button onClick={() => closeModal()} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <div className={classes.myFilesWrapper}>
        <Grid item xs={12}>
          <div className={classes.header}>
            <div className={classes.logo}>
              <img
                src={myFilesPageData.headerIconSrc}
                alt={myFilesPageData.headerIconAlt}
              />

            </div>
            <div className={classes.headerTitle}>
              <div className={classes.headerMainTitle}>
                {myFilesPageData.mainTitle}
                <span className={classes.headerMainTitleTwo}>
                  {' '}
                  {' '}
                  {myFilesPageData.subTitle}
                </span>
              </div>
            </div>
          </div>

          <div id="table_selected_files" className={classes.tableWrapper}>
            {dataTable}
            <div style={divStyle(isLoading)}>
              <button
                type="button"
                style={btnStyle}
                ref={downloadButton}
                onClick={() => downloadJson(globalData, comments)}
              >
                {myFilesPageData.downButtonText}
                {' '}
                download manifest
              </button>
              {' '}
              <button
                type="button"
                style={btnStyle}
                ref={deleteButton}
                onClick={removeSubjects}
              >
                {myFilesPageData.deleteButtonText}
              </button>
            </div>
          </div>
        </Grid>
      </div>
    </Grid>

  );
};

const styles = (theme) => ({
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
  myFilesWrapper: {
    border: '#03A383 4px solid',
    borderRadius: '35px',
    marginTop: '200px',
    marginBottom: '80px',
    marginLeft: '3%',
    marginRight: '3%',
    paddingBottom: '36px',
    background: 'white',
  },
  tableCell1: {
    width: '130px',
  },
  tableCell2: {
    width: '300px',
  },
  tableCell3: {
    width: '190px',
  },
  tableCell4: {
    width: '170px',
  },
  tableCell5: {
    width: '120px',
  },
  tableCell6: {
    width: '80px',
  },
  tableCell7: {
    width: '80px',
  },
});
export default withStyles(styles, { withTheme: true })(cartView);
