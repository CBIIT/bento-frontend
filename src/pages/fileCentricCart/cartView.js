import React, { useRef, useEffect } from 'react';
import { Grid, withStyles, Link } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { CustomDataTable } from 'bento-components';
import _ from 'lodash';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import SkeletonTable from './components/skeletonTable';
import { myFilesPageData } from '../../bento/fileCentricCartWorkflowData';
import CustomFooter from './customFooter';
import { deleteFromCart } from './store/cart';
import { downloadJson } from './utils';
import formatBytes from '../../utils/formatBytes';
import externalIcon from '../../assets/icons/ExternalLinkIcon.svg';
import Message from './components/message';

const cartView = ({ classes, data, isLoading }) => {
  const deleteButtonTop = useRef(null);
  const downloadButtonTop = useRef(null);
  const downloadButtonBottom = useRef(null);
  const deleteButtonBottom = useRef(null);

  const [modalStatus, setModalStatus] = React.useState({ open: false, selectedSubjectIds: [] });
  const [TopMessageStatus, setTopMessageStatus] = React.useState(false);
  const [BottomMessageStatus, setBottomMessageStatus] = React.useState(false);

  function openMessage(location) {
    return location === 'top' ? setTopMessageStatus(true) : setBottomMessageStatus(true);
  }

  function closeMessage(location) {
    return location === 'top' ? setTopMessageStatus(false) : setBottomMessageStatus(false);
  }

  function toggleMessageStatus(location, status) {
    return status === 'close' ? closeMessage(location) : openMessage(location);
  }

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
    deleteFromCart({ subjectIds: modalStatus.selectedSubjectIds });
    selectedSubjectIds = [];
  }

  /* eslint-disable no-return-assign, no-param-reassign */
  function toggleButtonStyle(button, disabled) {
    button.current.disabled = disabled;
    button.current.style.color = '#FFFF';
    button.current.style.backgroundColor = '#03A383';
    if (disabled) {
      button.current.style.opacity = '0.3';
    } else {
      button.current.style.opacity = '1';
    }
    button.current.style.fontWeight = '600';
    button.current.style.cursor = 'auto';
    button.current.style.cursor = 'pointer';
  }
  /* eslint-enable no-return-assign, no-param-reassign */

  function disableDeleteButton(disabled) {
    toggleButtonStyle(deleteButtonTop, disabled);
    toggleButtonStyle(deleteButtonBottom, disabled);
  }

  useEffect(() => {
    toggleButtonStyle(downloadButtonTop, false);
    toggleButtonStyle(downloadButtonBottom, false);
    disableDeleteButton(true);
  });

  function onRowsSelect(curr, allRowsSelected) {
    globalData = [];
    selectedSubjectIds = [];
    allRowsSelected.forEach((row) => {
      const subject = data[row.dataIndex];
      selectedSubjectIds.push(subject.file_id);
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
      disableDeleteButton(true);
    } else {
      disableDeleteButton(false);
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
    const css = {};
    if (isLoading === false) {
      css.display = 'inherit';
    } else {
      css.display = 'none';
    }
    return css;
  }

  const messageData = (
    <span>
      To access and analyze files: select and remove unwanted files,
      click the “Download Manifest” button, and upload the resulting
      Manifest file to your
      {' '}
      <Link target="_blank" className={classes.link} href="http://www.cancergenomicscloud.org/">
        Seven Bridges Genomics
      </Link>
      <img
        src={externalIcon}
        alt="outbounnd web site icon"
        className={classes.linkIcon}
      />
      {' '}
      account.
    </span>
  );

  const btnStyle = {
    color: '#fff',
    boxShadow: 'none',
    backgroundColor: '#03A383',
    padding: '6px 16px',
    fontSize: '0.875rem',
    minWidth: '64px',
    boxSizing: 'border-box',
    transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    lineHeight: '1.75',
    fontWeight: '500',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    borderRadius: '10px',
    textTransform: 'uppercase',
    border: 'none',
    verticalAlign: 'top',
    marginTop: '6px',
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

          <div className={classes.topButtonGroup} style={divStyle(isLoading)}>
            <button
              type="button"
              style={btnStyle}
              ref={downloadButtonTop}
              onClick={() => downloadJson(globalData, comments)}
            >
              {myFilesPageData.downButtonText}
              {' '}
            </button>
            {' '}
            <button
              type="button"
              style={btnStyle}
              ref={deleteButtonTop}
              onClick={removeSubjects}
            >
              {myFilesPageData.deleteButtonText}
            </button>
            <IconButton aria-label="help" className={classes.helpIconButton}>
              <HelpIcon className={classes.helpIcon} fontSize="small" onMouseEnter={() => toggleMessageStatus('top', 'open')} onMouseLeave={() => toggleMessageStatus('top', 'close')} />
            </IconButton>
            { TopMessageStatus ? (
              <div className={classes.messageTop}>
                {' '}
                <Message data={messageData} />
                {' '}
              </div>
            ) : ''}
          </div>
          <div id="table_selected_files" className={classes.tableWrapper}>
            {dataTable}
            <div className={classes.bottomButtonGroup} style={divStyle(isLoading)}>
              <div>

                <div className={classes.manifestButtonGroup}>
                  <button
                    type="button"
                    style={btnStyle}
                    ref={downloadButtonBottom}
                    onClick={() => downloadJson(globalData, comments)}
                  >
                    {myFilesPageData.downButtonText}
                    {' '}
                  </button>
                  {' '}
                  <button
                    type="button"
                    style={btnStyle}
                    ref={deleteButtonBottom}
                    onClick={removeSubjects}
                  >
                    {myFilesPageData.deleteButtonText}
                  </button>
                  <IconButton aria-label="help">
                    <HelpIcon className={classes.helpIcon} fontSize="small" onMouseEnter={() => toggleMessageStatus('bottom', 'open')} onMouseLeave={() => toggleMessageStatus('bottom', 'close')} />
                  </IconButton>
                  { BottomMessageStatus ? (
                    <div className={classes.messageBottom}>
                      {' '}
                      <Message data={messageData} />
                      {' '}
                    </div>
                  ) : ''}

                </div>
                <div className={classes.manifestTextarea}>
                  <textarea
                    id="multiline-user-coments"
                    className={classes.textField}
                    placeholder="Please add a description for the XML file you are about to download."
                  />
                </div>
              </div>
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
  linkIcon: {
    color: '#dc762f',
    width: '20px',
    verticalAlign: 'sub',
    margin: '0px 0px 0px 2px',
  },
  textField: {
    minWidth: '438px',
    marginRight: '10px',
    resize: 'none',
    borderRadius: '10px',
    border: '2px solid #bbb',
    background: '#efefef',
    height: '250px',
    padding: '15px',
  },
  helpIcon: {
    verticalAlign: 'top',
    zIndex: '600',
  },
  bottomButtonGroup: {
    textAlign: 'right',
    padding: '0px',
    position: 'relative',
    minHeight: '275px',
  },
  topButtonGroup: {
    textAlign: 'right',
    padding: '10px 39px 0px 0px',
    position: 'relative',
  },
  messageBottom: {
    position: 'absolute',
    right: '-24px',
    bottom: '253px',
    zIndex: '400',
  },
  messageTop: {
    position: 'absolute',
    right: '16px',
    top: '-140px',
    zIndex: '400',
  },
  manifestButtonGroup: {
    marginTop: '10px',
    float: 'right',
  },
  manifestTextarea: {
    marginTop: '18px',
    float: 'left',
  },
  helpIconButton: {
    verticalAlign: 'top',
  },
});
export default withStyles(styles, { withTheme: true })(cartView);
