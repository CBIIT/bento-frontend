import React, { useRef, useEffect } from 'react';
import {
  Grid,
  IconButton,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import HelpIcon from '@material-ui/icons/Help';
import { getColumns, ToolTip } from 'bento-components';
import _ from 'lodash';
import SelectAllModal from './modal';
import {
  GET_FILES_OVERVIEW_QUERY,
  GET_SAMPLES_OVERVIEW_QUERY,
  GET_CASES_OVERVIEW_QUERY,
  GET_FILES_OVERVIEW_DESC_QUERY,
  GET_SAMPLES_OVERVIEW_DESC_QUERY,
  GET_CASES_OVERVIEW_DESC_QUERY,
} from '../../../bento/dashboardTabData';
import CustomDataTable from '../../../components/serverPaginatedTable/serverPaginatedTable';
import { addToCart, getCart, cartWillFull } from '../../fileCentricCart/store/cart';
import AddToCartAlertDialog from '../../../components/AddToCartDialog';
import DocumentDownload from '../../../components/DocumentDownload/DocumentDownloadView';

const getOverviewQuery = (api) => (api === 'GET_SAMPLES_OVERVIEW_QUERY' ? GET_SAMPLES_OVERVIEW_QUERY : api === 'GET_FILES_OVERVIEW_QUERY' ? GET_FILES_OVERVIEW_QUERY : GET_CASES_OVERVIEW_QUERY);

// Due to cypher limitation we have to send seperate query get descending list
const getOverviewDescQuery = (api) => (api === 'GET_SAMPLES_OVERVIEW_QUERY' ? GET_SAMPLES_OVERVIEW_DESC_QUERY : api === 'GET_FILES_OVERVIEW_QUERY' ? GET_FILES_OVERVIEW_DESC_QUERY : GET_CASES_OVERVIEW_DESC_QUERY);

const TabView = ({
  classes,
  data,
  customColumn,
  primaryKeyIndex = 0,
  openSnack,
  disableRowSelection,
  buttonText,
  tableID,
  saveButtonDefaultStyle,
  DeactiveSaveButtonDefaultStyle,
  ActiveSaveButtonDefaultStyle,
  externalLinkIcon,
  options,
  count,
  api,
  paginationAPIField,
  paginationAPIFieldDesc,
  dataKey,
  filteredSubjectIds,
  filteredSampleIds,
  filteredFileIds,
  defaultSortCoulmn,
  defaultSortDirection,
  // tableHasSelections,
  setRowSelection,
  selectedRowInfo = [],
  selectedRowIndex = [],
  clearTableSelections,
  fetchAllFileIDs,
  getFilesCount,
  tableDownloadCSV,
  tooltipMessage,
  tooltipIcon,
  tooltipAlt,
}) => {
  // Get the existing files ids from  cart state
  const cart = getCart();
  const fileIDs = cart.fileIds ? cart.fileIds : [];
  const saveButton = useRef(null);
  const saveButton2 = useRef(null);
  const AddToCartAlertDialogRef = useRef();

  const [cartIsFull, setCartIsFull] = React.useState(false);
  const buildButtonStyle = (button, styleObject) => {
    const styleKV = Object.entries(styleObject);
    // eslint-disable-next-line  no-restricted-syntax, no-unused-vars
    for (const [key, value] of styleKV) {
      // eslint-disable-next-line no-param-reassign
      button.current.style[key] = value;
    }
  };
  const initSaveButtonDefaultStyle = (button) => {
    // eslint-disable-next-line no-param-reassign
    button.current.disabled = true;
    buildButtonStyle(button, saveButtonDefaultStyle);
  };

  const updateActiveSaveButtonStyle = (flag, button) => {
    if (flag) {
      // eslint-disable-next-line no-param-reassign
      button.current.disabled = true;
      buildButtonStyle(button, DeactiveSaveButtonDefaultStyle);
    } else {
      // eslint-disable-next-line no-param-reassign
      button.current.disabled = false;
      buildButtonStyle(button, ActiveSaveButtonDefaultStyle);
    }
  };

  async function updateButtonStatus(status) {
    if (!status) {
      updateActiveSaveButtonStyle(true, saveButton);
      updateActiveSaveButtonStyle(true, saveButton2);
    } else {
      updateActiveSaveButtonStyle(false, saveButton);
      updateActiveSaveButtonStyle(false, saveButton2);
    }
  }

  useEffect(() => {
    initSaveButtonDefaultStyle(saveButton);
    initSaveButtonDefaultStyle(saveButton2);
    updateButtonStatus(selectedRowInfo.length > 0);
  });

  async function exportFiles() {
    const selectedIDs = await fetchAllFileIDs(getFilesCount(), selectedRowInfo);
    // Find the newly added files by comparing
    const selectFileIds = filteredFileIds != null
      ? selectedIDs.filter((x) => filteredFileIds.includes(x))
      : selectedIDs;
    const newFileIDS = fileIDs !== null ? selectFileIds.filter(
      (e) => !fileIDs.find((a) => e === a),
    ).length : selectedIDs.length;
    if (cartWillFull(newFileIDS)) {
      // throw an alert
      setCartIsFull(true);
      AddToCartAlertDialogRef.current.open();
    } else if (newFileIDS > 0) {
      addToCart({ fileIds: selectFileIds });
      openSnack(newFileIDS);
      // tell the reducer to clear the selection on the table.
      clearTableSelections();
    } else if (newFileIDS === 0) {
      openSnack(newFileIDS);
      // tell the reducer to clear the selection on the table.
      clearTableSelections();
    }
  }

  function rowSelectionEvent(displayData, rowsSelected) {
    const displayedDataKeies = displayData;
    const selectedRowsKey = rowsSelected
      ? rowsSelected.map((index) => displayedDataKeies[index])
      : [];
    let newSelectedRowInfo = [];

    if (rowsSelected) {
      // Remove the rowInfo from selectedRowInfo if this row currently be
      // displayed and not be selected.
      if (selectedRowInfo.length > 0) {
        newSelectedRowInfo = selectedRowInfo.filter((key) => {
          if (displayedDataKeies.includes(key)) {
            return false;
          }
          return true;
        });
      }
    } else {
      newSelectedRowInfo = selectedRowInfo;
    }
    newSelectedRowInfo = newSelectedRowInfo.concat(selectedRowsKey);

    // Get selectedRowIndex by comparing current page data with selected row's key.
    // if rowInfo from selectedRowInfo is currently be displayed
    const newSelectedRowIndex = displayedDataKeies.reduce(
      (accumulator, currentValue, currentIndex) => {
        if (newSelectedRowInfo.includes(currentValue)) {
          accumulator.push(currentIndex);
        }
        return accumulator;
      }, [],
    );

    // reduce the state chagne, when newSelectedRowIndex and newSelectedRowInfo is same as previous.
    if (_.differenceWith(
      newSelectedRowIndex,
      selectedRowIndex,
      _.isEqual,
    ).length !== 0
      || _.differenceWith(
        newSelectedRowInfo,
        selectedRowInfo,
        _.isEqual,
      ).length !== 0
      || _.differenceWith(
        selectedRowInfo,
        newSelectedRowInfo,
        _.isEqual,
      ).length !== 0
      || _.differenceWith(
        selectedRowIndex,
        newSelectedRowIndex,
        _.isEqual,
      ).length !== 0) {
      setRowSelection({
        selectedRowInfo: newSelectedRowInfo,
        selectedRowIndex: newSelectedRowIndex,
      });
    }
  }

  /*
    Presist user selection
  */
  function onRowsSelect(curr, allRowsSelected, rowsSelected, displayData) {
    rowSelectionEvent(displayData.map((d) => d.data[primaryKeyIndex]), rowsSelected);
  }

  // overwrite default options
  // overwrite default options
  const defaultOptions = () => ({
    dataKey,
    rowsSelectedTrigger: (displayData, rowsSelected) => rowSelectionEvent(
      displayData,
      rowsSelected,
    ),
    rowsSelected: selectedRowIndex,
    onRowSelectionChange: onRowsSelect,
    isRowSelectable: (dataIndex) => (disableRowSelection
      ? disableRowSelection(data[dataIndex], fileIDs) : true),
  });
  const finalOptions = {
    ...options,
    ...defaultOptions(),
    serverTableRowCount: selectedRowInfo.length,
  };

  return (
    <div>
      <Grid item xs={12} className={classes.saveButtonDiv}>
        <SelectAllModal tableIDForButton={tableID} openSnack={openSnack} />
        <AddToCartAlertDialog
          cartWillFull={cartIsFull}
          ref={AddToCartAlertDialogRef}
        />
        <button
          type="button"
          ref={saveButton2}
          onClick={exportFiles}
          className={classes.button}
          id={`${tableID}_${buttonText}`}
        >
          { buttonText }
        </button>
        <ToolTip classes={{ tooltip: classes.customTooltip, arrow: classes.customArrow }} title={tooltipMessage} arrow placement="bottom">
          <IconButton
            aria-label="help"
            className={classes.helpIconButton}
          >
            {tooltipIcon ? (
              <img
                src={tooltipIcon}
                alt={tooltipAlt}
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

      </Grid>
      <Grid container>
        <Grid item xs={12} id={tableID}>
          <CustomDataTable
            data={data}
            columns={getColumns(customColumn, classes, data, externalLinkIcon, '', () => {}, DocumentDownload)}
            options={finalOptions}
            count={count}
            overview={getOverviewQuery(api)}
            overviewDesc={getOverviewDescQuery(api)}
            paginationAPIField={paginationAPIField}
            paginationAPIFieldDesc={paginationAPIFieldDesc}
            queryCustomVaribles={{
              subject_ids: filteredSubjectIds,
              sample_ids: filteredSampleIds,
              file_ids: filteredFileIds,
            }}
            defaultSortCoulmn={defaultSortCoulmn}
            defaultSortDirection={defaultSortDirection}
            tableDownloadCSV={tableDownloadCSV}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.saveButtonDivBottom}>
        <button
          type="button"
          ref={saveButton}
          onClick={exportFiles}
          className={classes.button}
        >
          { buttonText }
        </button>

        <ToolTip classes={{ tooltip: classes.customTooltip, arrow: classes.customArrow }} title={tooltipMessage} arrow placement="bottom">
          <IconButton
            aria-label="help"
            className={classes.helpIconButton}
          >
            {tooltipIcon ? (
              <img
                src={tooltipIcon}
                alt={tooltipAlt}
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
        <div style={{ position: 'relative' }}>
          <Link
            rel="noreferrer"
            to={(location) => ({ ...location, pathname: '/fileCentricCart' })}
            color="inherit"
            className={classes.cartlink}
          >
            Go to Cart
            {' '}
            {'>'}
          </Link>
        </div>

      </Grid>
    </div>
  );
};

const styles = () => ({

  link: {
    color: '#7747ff',
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
  cartlink: {
    fontFamily: 'Lato',
    color: '#3E6886',
    fontSize: '12px',
    marginRight: '70px',
    textDecoration: 'none',
    borderBottom: '1px solid #3E6886',
    paddingBottom: '3px',
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
    paddingTop: '5px',
    paddingRight: '25px',
    textAlign: 'right',
  },
  saveButtonDivBottom: {
    paddingTop: '5px',
    paddingRight: '25px',
    textAlign: 'right',
    marginBottom: '30px',
    position: 'relative',
  },
  button: {
    borderRadius: '10px',
    width: '156px',
    lineHeight: '37px',
    fontSize: '12px',
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    color: '#fff',
    backgroundColor: '#10A075',
    marginTop: '6px',
    marginBottom: '10px',
    marginRight: '5px',
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
  messageBottom: {
    zIndex: '500',
    position: 'absolute',
    marginTop: '-148px',
    marginLeft: 'calc(100% - 220px)',
  },
  helpIcon: {
    zIndex: '600',
  },
  helpIconButton: {
    verticalAlign: 'top',
    marginLeft: '-5px',
  },
  customTooltip: {
    border: '#03A383 1px solid',
  },
  customArrow: {
    '&::before': {
      border: '#03A383 1px solid',
    },
  },
});

export default withStyles(styles, { withTheme: true })(TabView);
