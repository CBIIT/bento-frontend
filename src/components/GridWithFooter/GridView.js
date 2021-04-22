import React, { useRef, useEffect } from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { CustomDataTable } from 'bento-components';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import { addToCart, cartWillFull } from '../../pages/fileCentricCart/store/cart';
import Message from '../Message';
import AddToCartAlertDialog from '../AddToCartDialog';

const GridView = ({
  classes,
  data,
  title,
  columns,
  customOnRowsSelect,
  openSnack,
  disableRowSelection,
  buttonText,
  options,
  tooltipMessage,
  tooltipContent,
  saveButtonDefaultStyle,
  DeactiveSaveButtonDefaultStyle,
  ActiveSaveButtonDefaultStyle,
}) => {
  // Get the existing files ids from  cart state
  const fileIDs = useSelector((state) => state.cart.fileIds);
  const [messageStatus, setMessageStatus] = React.useState(false);
  // Store current page selected info
  const [rowSelection, setRowSelection] = React.useState({
    selectedRowInfo: [],
    selectedRowIndex: [],
  });

  // Store current page selected info
  const [selectedIDs, setSelectedIDs] = React.useState([]);
  const AddToCartAlertDialogRef = useRef();
  const [cartIsFull, setCartIsFull] = React.useState(false);
  const saveButton = useRef(null);

  function openMessage() {
    return setMessageStatus(true);
  }

  function closeMessage() {
    return setMessageStatus(false);
  }

  function toggleMessageStatus(location, status) {
    return status === 'close' ? closeMessage(location) : openMessage(location);
  }

  // Button styling functions.
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
      buildButtonStyle(button, ActiveSaveButtonDefaultStyle);
    } else {
      // eslint-disable-next-line no-param-reassign
      button.current.disabled = false;
      buildButtonStyle(button, DeactiveSaveButtonDefaultStyle);
    }
  };

  // Calculate the properate marginTop value for the tooltip on the top
  function tooltipStyle(text) {
    const topValue = text.length > 35 ? '-78px' : '-51px';
    return { top: topValue };
  }

  const btnStyle = {
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
    marginRight: '4px',
  };

  useEffect(() => {
    initSaveButtonDefaultStyle(saveButton);

    if (selectedIDs.length === 0) {
      updateActiveSaveButtonStyle(true, saveButton);
    } else {
      updateActiveSaveButtonStyle(false, saveButton);
    }
  });

  function exportFiles() {
    // Find the newly added files by comparing
    const newFileIDS = fileIDs !== null ? selectedIDs.filter(
      (e) => !fileIDs.find((a) => e === a),
    ).length : selectedIDs.length;
    if (cartWillFull(newFileIDS)) {
      // throw an alert
      setCartIsFull(true);
      AddToCartAlertDialogRef.current.open();
    } else if (newFileIDS > 0) {
      addToCart({ fileIds: selectedIDs });
      openSnack(newFileIDS);
      setSelectedIDs([]);
    }
  }

  function divStyle() {
    const css = {};
    css.display = 'inherit';
    return css;
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
      if (rowSelection.selectedRowInfo.length > 0) {
        newSelectedRowInfo = rowSelection.selectedRowInfo.filter((key) => {
          if (displayedDataKeies.includes(key)) {
            return false;
          }
          return true;
        });
      }
    } else {
      newSelectedRowInfo = rowSelection.selectedRowInfo;
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

    setRowSelection({
      selectedRowInfo: newSelectedRowInfo,
      selectedRowIndex: newSelectedRowIndex,
    });
  }

  /*
    Presist user selection
  */
  function onRowsSelect(curr, allRowsSelected, rowsSelected, displayData) {
    rowSelectionEvent(displayData.map((d) => d.data[0]), rowsSelected);
    setSelectedIDs([...new Set(
      customOnRowsSelect(data, allRowsSelected),
    )]);

    if (allRowsSelected.length === 0) {
      updateActiveSaveButtonStyle(true, saveButton);
    } else {
      updateActiveSaveButtonStyle(false, saveButton);
    }
  }

  // overwrite default options
  const defaultOptions = () => ({
    rowsSelected: rowSelection.selectedRowIndex,
    onRowSelectionChange: (curr, allRowsSelected, rowsSelected, displayData) => onRowsSelect(
      curr,
      allRowsSelected,
      rowsSelected,
      displayData,
    ),
    isRowSelectable: (dataIndex) => (disableRowSelection
      ? disableRowSelection(data[dataIndex], fileIDs) : true),
  });

  const finalOptions = { ...options, ...defaultOptions() };

  return (
    <div>
      <AddToCartAlertDialog cartWillFull={cartIsFull} ref={AddToCartAlertDialogRef} />
      <Grid container>
        <Grid item xs={12} id="table_file">
          <CustomDataTable
            data={_.cloneDeep(data)}
            columns={columns}
            title={title}
            options={finalOptions}
          />
        </Grid>

      </Grid>
      <div className={classes.topButtonGroup} style={divStyle()}>
        <button
          type="button"
          style={btnStyle}
          ref={saveButton}
          onClick={exportFiles}
          id={`button_${buttonText}`}
        >
          { buttonText }
        </button>
        <IconButton aria-label="help" className={classes.helpIconButton} onMouseOver={() => toggleMessageStatus('top', 'open')} onMouseEnter={() => toggleMessageStatus('top', 'open')} onMouseLeave={() => toggleMessageStatus('top', 'close')}>
          {tooltipContent.src ? (
            <img
              onMouseEnter={() => toggleMessageStatus('top', 'open')}
              onMouseOver={() => toggleMessageStatus('top', 'open')}
              onFocus={() => toggleMessageStatus('top', 'open')}
              src={tooltipContent.src}
              alt={tooltipContent.alt}
              className={classes.helpIcon}
            />
          ) : (
            <HelpIcon
              className={classes.helpIcon}
              fontSize="small"
              onMouseOver={() => toggleMessageStatus('top', 'open')}
              onMouseEnter={() => toggleMessageStatus('top', 'open')}
              onFocus={() => toggleMessageStatus('top', 'open')}
            />
          )}
        </IconButton>
        { messageStatus ? (
          <div className={classes.messageBottom} style={tooltipStyle(tooltipMessage)}>
            {' '}
            <Message data={tooltipMessage} />
            {' '}
          </div>
        ) : ''}
      </div>
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
    // backgroundColor: '#ff7f15',
  },
  helpIcon: {
    verticalAlign: 'top',
    zIndex: '600',
  },
  topButtonGroup: {
    textAlign: 'right',
    padding: '10px 0px 0px 0px',
    position: 'relative',
  },
  messageBottom: {
    position: 'absolute',
    right: '-8px',
    bottom: '20px',
    zIndex: '400',
  },
  linkIcon: {
    color: '#dc762f',
    width: '20px',
    verticalAlign: 'sub',
    margin: '0px 0px 0px 2px',
  },
  helpIconButton: {
    verticalAlign: 'top',
    marginLeft: '-5px',
  },
});

export default withStyles(styles, { withTheme: true })(GridView);
