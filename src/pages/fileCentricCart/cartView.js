import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { CustomDataTable } from 'bento-components';
import _ from 'lodash';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import SkeletonTable from './components/skeletonTable';
import { myFilesPageData, table, manifestData } from '../../bento/fileCentricCartWorkflowData';
import { deleteFromCart } from './store/cart';
import { downloadJson } from './utils';
import {
  getColumns, getOptions, getDefaultCustomFooter,
} from '../../utils/tables';
import Message from './components/message';
import { dateTimeStamp } from '../../utils/helpers';
import DialogThemeProvider from './dialogThemeConfig';

const cartView = ({ classes, data, isLoading }) => {
  const [modalStatus, setModalStatus] = React.useState(false);
  const [TopMessageStatus, setTopMessageStatus] = React.useState(false);
  const [userComments, setUserComments] = React.useState('');

  function toggleMessageStatus(status) {
    return status === 'close' ? setTopMessageStatus(false) : setTopMessageStatus(true);
  }

  function closeModal() {
    setModalStatus(false);
  }

  function removeSubjects() {
    setModalStatus(true);
  }
  function deleteSubjectsAndCloseModal() {
    setModalStatus(false);
    deleteFromCart({ fileIds: data.map((d) => d.file_id) });
  }

  function onRowSelectionChange(curr, allRowsSelected) {
    return (curr, allRowsSelected);
  }

  const fileIdIndex = table.columns.map((d) => d.dataField).findIndex((e) => e === 'file_id');

  const deleteColumn = [{
    name: 'Remove',
    label: 'Remove',
    options: {
      sort: false,
      customBodyRender: (value, tableMeta) => (
        <div>
          <Button
            className={classes.tableDeleteButton}
            onClick={() => deleteFromCart({ fileIds: tableMeta.rowData[fileIdIndex] })}
          >
            <DeleteOutlineIcon fontSize="small" />
          </Button>
        </div>
      ),
    },
  }];
  const columns = getColumns(table, classes).concat(deleteColumn);
  const options = getOptions(table, classes, getDefaultCustomFooter, onRowSelectionChange);

  const messageData = (
    <span>
      {myFilesPageData.tooltipMessage}
      {' '}
    </span>
  );

  const numberOfFilesBeDeleted = myFilesPageData.popUpWindow.showNumberOfFileBeRemoved ? data.length : '';

  const dataTable = isLoading ? <SkeletonTable />
    : (
      <CustomDataTable
        data={_.cloneDeep(data)}
        columns={columns}
        options={options}
        className={classes.tableStyle}
      />
    );
  return (
    <Grid>
      <DialogThemeProvider>
        <Dialog
          open={modalStatus}
          onClose={() => closeModal()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.popUpWindow}
        >
          <DialogContent className={classes.popUpWindowContent}>
            <DialogContentText id="alert-dialog-description">
              { myFilesPageData.popUpWindow.messagePart1 }
              <b>
                { myFilesPageData.popUpWindow.messagePart2 }
                { numberOfFilesBeDeleted }
                { myFilesPageData.popUpWindow.messagePart3 }
              </b>
              { myFilesPageData.popUpWindow.messagePart4 }
              {' '}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => deleteSubjectsAndCloseModal()} className={classes.okButton}>
              {myFilesPageData.popUpWindow.okButtonText}
            </Button>
            <Button onClick={() => closeModal()} className={classes.cancelButton}>
              {myFilesPageData.popUpWindow.cancelButtonText}
            </Button>
          </DialogActions>
        </Dialog>
      </DialogThemeProvider>
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

          <div className={classes.topButtonGroup}>
            <button
              type="button"
              className={classes.downloadButton}
              onClick={() => downloadJson(data, userComments, myFilesPageData.manifestFileName.concat(dateTimeStamp()).concat('.csv'), manifestData)}
            >
              {myFilesPageData.downButtonText}
              {' '}
            </button>
            <IconButton aria-label="help">
              <HelpIcon fontSize="small" className={classes.helpIcon} onMouseEnter={() => toggleMessageStatus('open')} onMouseLeave={() => toggleMessageStatus('close')} />
            </IconButton>
            { TopMessageStatus ? (
              <div className={classes.messageTop}>
                {' '}
                <Message data={messageData} />
                {' '}
              </div>
            ) : ''}
            <button
              type="button"
              className={classes.deleteButton}
              onClick={removeSubjects}
            >
              {myFilesPageData.deleteButtonText}
            </button>

          </div>
          <div id="table_selected_files" className={classes.tableWrapper}>
            {}
            {dataTable}
            <div className={classes.manifestTextarea}>
              <textarea
                id="multiline-user-coments"
                className={classes.textField}
                placeholder={myFilesPageData.textAresPlaceholder}
                onChange={(e) => setUserComments(e.target.value)}
              />
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
  linkIcon: {
    color: '#dc762f',
    width: '20px',
    verticalAlign: 'sub',
    margin: '0px 0px 0px 2px',
  },
  textField: {
    minWidth: '412px',
    marginRight: '10px',
    resize: 'none',
    borderRadius: '10px',
    border: '1.5px solid #707070',
    background: '#EBEBEB',
    color: '#000',
    fontFamily: 'Open Sans',
    height: '170px',
    padding: '15px',
    fontSize: '10px',
  },
  helpIcon: {
    verticalAlign: 'top',
    zIndex: '600',
  },
  topButtonGroup: {
    textAlign: 'right',
    padding: '10px 39px 15px 0px',
    position: 'relative',
  },
  messageTop: {
    position: 'absolute',
    right: '33px',
    top: '-120px',
    zIndex: '400',
  },
  manifestButtonGroup: {
    marginTop: '10px',
    float: 'right',
  },
  manifestTextarea: {
    marginTop: '10px',
  },
  downloadButton: {
    height: '45px',
    minWidth: '191px',
    color: '#fff',
    boxShadow: 'none',
    backgroundColor: '#03A383',
    padding: '6px 16px',
    fontSize: '0.875rem',
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
  },
  deleteButton: {
    height: '45px',
    minWidth: '191px',
    color: '#fff',
    boxShadow: 'none',
    backgroundColor: '#A61401',
    padding: '6px 16px',
    fontSize: '0.875rem',
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
  },
  popUpWindowText: {
    fontFamily: 'Lato',
    size: '16px',
  },
  okButton: {
    background: '#98A19E',
    color: '#fff',
    cursor: 'pointer',
  },
  cancelButton: {
    background: '#42779A',
    color: '#fff',
    cursor: 'pointer',
  },
  tableDeleteButton: {
    background: '#fff',
    border: '1px solid #ccc',
    minWidth: '31px',
    cursor: 'pointer',
  },
});
export default withStyles(styles, { withTheme: true })(cartView);
