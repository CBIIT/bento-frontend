import React from 'react';
import {
  Grid, withStyles, IconButton,
} from '@material-ui/core';
import { ToolTip } from 'bento-components';

import { DeleteOutline as DeleteOutlineIcon, ArrowDropDown as ArrowDropDownIcon, Help as HelpIcon } from '@material-ui/icons';
import CartHeader from './components/header/cartHeader';
import CartBody from './components/body/cartBody';
import CartFooter from './components/footer/cartFooter';
import DialogBox from './components/dialogBox/dialogBox';
import Styles from './cartView.style';
import client from '../../utils/graphqlClient';
import {
  myFilesPageData, table, manifestData, GET_MY_CART_DATA_QUERY,
} from '../../bento/fileCentricCartWorkflowData';
import { deleteFromCart } from './store/cart';
import { downloadJson } from './utils';

const cartView = ({
  classes, data, fileIDs = [], defaultSortCoulmn, defaultSortDirection, updateSortOrder,
}) => {
  const [modalStatus, setModalStatus] = React.useState(false);
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

  function toggleRemoveAllMessageStatus(status) {
    return status === 'close' ? setRemoveAllMessageStatus(false) : setRemoveAllMessageStatus(true);
  }

  // ================= Dialogbox Functions =================
  const openDialogBox = () => setModalStatus(true);
  const closeDialogBox = () => setModalStatus(false);
  function deleteSubjectsAndCloseModal() {
    closeDialogBox();
    deleteFromCart({ fileIds: fileIDs });
  }
  const numberOfFilesBeDeleted = myFilesPageData.popUpWindow.showNumberOfFileBeRemoved
    ? fileIDs.length : '';

  // =========== Downlaod Manifest Functions ===========
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
                id="cart_remove_button_text"
              >
                Remove
              </div>
              <div className={classes.removeHeadCellIcon}>
                <IconButton aria-label="help" className={classes.removeHeadCellIconButton}>
                  <ArrowDropDownIcon onClick={() => openDialogBox()} onMouseEnter={() => toggleRemoveAllMessageStatus('open')} onMouseLeave={() => toggleRemoveAllMessageStatus('close')} />
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

  const tooltipMessageData = (
    <span>
      {myFilesPageData.tooltipMessage}
      {' '}
    </span>
  );

  return (
    <Grid>
      <DialogBox
        isOpen={modalStatus}
        acceptAction={deleteSubjectsAndCloseModal}
        closeModal={closeDialogBox}
        messageData={myFilesPageData.popUpWindow}
        numberOfFilesBeDeleted={numberOfFilesBeDeleted}
      />
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
              id={`button_${myFilesPageData.downButtonText}`}
            >
              {myFilesPageData.downButtonText}
              {' '}
            </button>
            <ToolTip classes={{ tooltip: classes.customTooltip, arrow: classes.customArrow }} title={tooltipMessageData} arrow placement="bottom">
              <IconButton
                aria-label="help"
                className={classes.helpIconButton}
              >
                {myFilesPageData.tooltipIcon ? (
                  <img
                    src={myFilesPageData.tooltipIcon}
                    alt={myFilesPageData.tooltipAlt}
                    className={classes.helpIcon}
                  />
                ) : (
                  <HelpIcon
                    className={classes.helpIcon}
                    fontSize="small"
                  />
                )}
              </IconButton>
            </ToolTip>

          </div>
          <div id="table_selected_files" className={classes.tableWrapper}>
            <CartBody
              updateSortOrder={updateSortOrder}
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
