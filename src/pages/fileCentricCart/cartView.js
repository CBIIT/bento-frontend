import React from 'react';
import {
  Grid, withStyles, Dialog, DialogActions, DialogContent, DialogContentText, IconButton,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';

import { DeleteOutline as DeleteOutlineIcon, ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons';
import CartHeader from './components/cartHeader';
import CartBody from './components/cartBody';
import CartFooter from './components/cartFooter';
import Styles from './cartView.style';
import DialogThemeProvider from './components/dialogThemeConfig';
import client from '../../utils/graphqlClient';
import {
  myFilesPageData, table, manifestData, GET_MY_CART_DATA_QUERY,
} from '../../bento/fileCentricCartWorkflowData';
import { deleteFromCart } from './store/cart';
import { downloadJson } from './utils';
import Message from '../../components/Message';

const cartView = ({
  classes, data, fileIDs = [], defaultSortCoulmn, defaultSortDirection,
}) => {
  const [modalStatus, setModalStatus] = React.useState(false);
  const [TopMessageStatus, setTopMessageStatus] = React.useState(false);
  const [removeAllMessageStatus, setRemoveAllMessageStatus] = React.useState(false);
  const [userComments, setUserComments] = React.useState('');
  async function fetchData() {
    const fetchResult = await client
      .query({
        query: GET_MY_CART_DATA_QUERY,
        variables: {
          first: fileIDs.length, ...{ file_ids: fileIDs },
        },
      })
      .then((result) => result.data.filesInList);
    return fetchResult;
  }

  function toggleMessageStatus(status) {
    return status === 'close' ? setTopMessageStatus(false) : setTopMessageStatus(true);
  }

  function toggleRemoveAllMessageStatus(status) {
    return status === 'close' ? setRemoveAllMessageStatus(false) : setRemoveAllMessageStatus(true);
  }

  function closeModal() {
    setModalStatus(false);
  }

  function removeSubjects() {
    setModalStatus(true);
  }
  function deleteSubjectsAndCloseModal() {
    setModalStatus(false);
    deleteFromCart({ fileIds: fileIDs });
  }

  async function prepareDownload() {
    const data1 = await fetchData();
    return downloadJson(
      data1,
      userComments,
      myFilesPageData.manifestFileName,
      manifestData,
    );
  }

  const fileIdIndex = table.columns.map((d) => d.dataField).findIndex((e) => e === 'file_id');

  const deleteColumn = [{
    name: 'Remove',
    label: 'Remove',
    options: {
      sort: false,
      customBodyRender: (value, tableMeta) => (
        <div className={classes.tableDeleteButtonDiv}>
          <button
            type="button"
            className={classes.tableDeleteButton}
            onClick={() => deleteFromCart({ fileIds: tableMeta.rowData[fileIdIndex] })}
          >
            <DeleteOutlineIcon fontSize="small" />
          </button>
        </div>
      ),
      customHeadRender: () => (
        <th className={classes.removeThCell}>
          <span role="button">
            <div className={classes.removeHeadCell}>
              <div
                className={classes.removeHeadCellText}
              >
                Remove
              </div>
              <div className={classes.removeHeadCellIcon}>
                <IconButton aria-label="help" className={classes.removeHeadCellIconButton}>
                  <ArrowDropDownIcon onClick={() => removeSubjects()} onMouseEnter={() => toggleRemoveAllMessageStatus('open')} onMouseLeave={() => toggleRemoveAllMessageStatus('close')} />
                </IconButton>
                { removeAllMessageStatus ? (
                  <div className={classes.removeAllMessage}>
                    {' '}
                    Remove
                    {' '}
                    <b>All</b>
                    {' '}
                    items in cart.
                    {' '}
                  </div>
                ) : ''}
              </div>
            </div>
          </span>
        </th>
      ),
    },
  }];

  const messageData = (
    <span>
      {myFilesPageData.tooltipMessage}
      {' '}
    </span>
  );

  const numberOfFilesBeDeleted = myFilesPageData.popUpWindow.showNumberOfFileBeRemoved ? fileIDs.length : '';

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
            <Button variant="contained" disableElevation onClick={() => deleteSubjectsAndCloseModal()} className={classes.okButton}>
              {myFilesPageData.popUpWindow.okButtonText}
            </Button>
            <Button variant="contained" disableElevation onClick={() => closeModal()} className={classes.cancelButton}>
              {myFilesPageData.popUpWindow.cancelButtonText}
            </Button>
          </DialogActions>
        </Dialog>
      </DialogThemeProvider>
      <div className={classes.myFilesWrapper}>
        <Grid item xs={12}>
          <CartHeader
            headerIconSrc={myFilesPageData.headerIconSrc}
            headerIconAlt={myFilesPageData.headerIconAlt}
            mainTitle={myFilesPageData.mainTitle}
            subTitle={myFilesPageData.subTitle}
          />

          <div className={classes.topButtonGroup}>
            <button
              type="button"
              className={classes.downloadButton}
              onClick={() => prepareDownload()}
            >
              {myFilesPageData.downButtonText}
              {' '}
            </button>
            <IconButton aria-label="help" onFocus={() => toggleMessageStatus('top', 'open')} onMouseEnter={() => toggleMessageStatus('open')} onMouseOver={() => toggleMessageStatus('open')} onMouseLeave={() => toggleMessageStatus('close')}>
              <img
                onMouseEnter={() => toggleMessageStatus('open')}
                onMouseOver={() => toggleMessageStatus('open')}
                onFocus={() => toggleMessageStatus('top', 'open')}
                src={myFilesPageData.tooltipIcon}
                alt={myFilesPageData.tooltipAlt}
                className={classes.helpIcon}
              />
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
            {}
            <CartBody
              data={data}
              deleteColumn={deleteColumn}
              fileIDs={fileIDs}
              defaultSortCoulmn={defaultSortCoulmn}
              defaultSortDirection={defaultSortDirection}
            />
            <CartFooter
              placeholder={myFilesPageData.textareaPlaceholder}
              onChange={(e) => setUserComments(e.target.value)}
            />
          </div>
        </Grid>
      </div>
    </Grid>

  );
};

export default withStyles(Styles, { withTheme: true })(cartView);
