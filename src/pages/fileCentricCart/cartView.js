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

const CustomHeaderRemove = ({
  openDialogBox,
  classes: {
    removeThCell,
    removeHeadCell,
    removeAllMessage,
    removeHeadCellText,
    removeHeadCellIcon,
    removeHeadCellIconButton,
  },
}) => {
  const [popUpStatus, setPopUpStatus] = React.useState(false);
  const showPopUp = (status) => setPopUpStatus(status === 'open');

  return (
    <th className={removeThCell}>
      <span role="button">
        <div className={removeHeadCell}>
          <div
            id="cart_remove_button_text"
            className={removeHeadCellText}
          >
            Remove
          </div>
          <div className={removeHeadCellIcon}>
            <IconButton aria-label="help" className={removeHeadCellIconButton}>
              <ArrowDropDownIcon
                onClick={openDialogBox}
                onMouseEnter={() => showPopUp('open')}
                onMouseLeave={() => showPopUp('close')}
              />
            </IconButton>
            { popUpStatus ? (
              <div className={removeAllMessage}>
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
  );
};

const cartView = ({
  classes,
  data, fileIDs = [],
  defaultSortCoulmn,
  defaultSortDirection,
  updateSortOrder,
  paginationAPIField,
  localPage,
  localRowsPerPage,
  isLoading,
}) => {
  const [modalStatus, setModalStatus] = React.useState(false);
  const commentRef = React.useRef();

  let dataCartView = data;
  let localPageCartView = localPage;
  let localRowsPerPageCartView = localRowsPerPage;
  async function fetchData() {
    const fetchResult = await client
      .query({
        query: GET_MY_CART_DATA_QUERY,
        variables: {
          sort_direction: defaultSortDirection,
          first: fileIDs.length,
          ...{ file_ids: fileIDs },
        },
      })
      .then((result) => result.data.filesInList);
    return fetchResult;
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
    // get the user Comments value from the footer,
    const userComments = commentRef.current.getValue();
    const data1 = await fetchData();
    return downloadJson(
      data1,
      userComments,
      myFilesPageData.manifestFileName,
      manifestData,
    );
  }

  const fileIdIndex = table.columns.map((d) => d.dataField).findIndex((e) => e === 'file_id');

  if (localStorage.getItem('data')) {
    if (localStorage.getItem('data') !== 'undefined' && localStorage.getItem('data').length > 0 && (localStorage.getItem('page') !== localPage || localStorage.getItem('rowsPerPage') !== localRowsPerPage || localStorage.getItem('sortColumn') !== defaultSortCoulmn || localStorage.getItem('sortDirection') !== defaultSortDirection)) {
      const dataLocal = JSON.parse(localStorage.getItem('data'));
      dataCartView = dataLocal;
      localPageCartView = localStorage.getItem('page');
      localRowsPerPageCartView = localStorage.getItem('rowsPerPage');
    }
  }

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
        <CustomHeaderRemove
          classes={classes}
          openDialogBox={openDialogBox}
        />
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
        closeModal={closeDialogBox}
        messageData={myFilesPageData.popUpWindow}
        acceptAction={deleteSubjectsAndCloseModal}
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
              data={dataCartView}
              deleteColumn={deleteColumn}
              fileIDs={fileIDs}
              defaultSortCoulmn={defaultSortCoulmn}
              defaultSortDirection={defaultSortDirection}
              paginationAPIField={paginationAPIField}
              localPage={localPageCartView}
              localRowsPerPage={localRowsPerPageCartView}
              isLoading={isLoading}
            />
            <CartFooter
              placeholder={myFilesPageData.textareaPlaceholder}
              ref={commentRef}
            />
          </div>
        </Grid>
      </div>
    </Grid>

  );
};

export default withStyles(Styles, { withTheme: true })(cartView);
