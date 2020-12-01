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
import { addToCart } from '../../pages/fileCentricCart/store/cart';
import Message from '../Message';

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
  messageData,
  saveButtonDefaultStyle,
  DeactiveSaveButtonDefaultStyle,
  ActiveSaveButtonDefaultStyle,
}) => {
  // Get the existing files ids from  cart state
  const fileIDs = useSelector((state) => state.cart.fileIds);
  const [messageStatus, setMessageStatus] = React.useState(false);

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
    marginRight: '5px',
  };

  let selectedFileIDs = [];

  useEffect(() => {
    initSaveButtonDefaultStyle(saveButton);

    if (selectedFileIDs.length === 0) {
      updateActiveSaveButtonStyle(true, saveButton);
    } else {
      updateActiveSaveButtonStyle(false, saveButton);
    }
  });

  function exportFiles() {
    // Find the newly added files by comparing
    const newFileIDS = fileIDs !== null ? selectedFileIDs.filter(
      (e) => !fileIDs.find((a) => e === a),
    ).length : selectedFileIDs.length;
    openSnack(newFileIDS);
    addToCart({ fileIds: selectedFileIDs });
    selectedFileIDs = [];
  }

  function divStyle() {
    const css = {};
    css.display = 'inherit';
    return css;
  }

  function onRowsSelect(curr, allRowsSelected) {
    selectedFileIDs = [...new Set(selectedFileIDs.concat(
      customOnRowsSelect(data, allRowsSelected),
    ))];

    if (allRowsSelected.length === 0) {
      updateActiveSaveButtonStyle(true, saveButton);
    } else {
      updateActiveSaveButtonStyle(false, saveButton);
    }
  }

  // overwrite default options
  const defaultOptions = () => ({
    onRowsSelect: (curr, allRowsSelected) => onRowsSelect(curr, allRowsSelected),
    isRowSelectable: (dataIndex) => (disableRowSelection
      ? disableRowSelection(data[dataIndex], fileIDs)
      : true),
  });
  const finalOptions = { ...options, ...defaultOptions() };

  return (
    <div>
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
        >
          { buttonText }
          {' '}
        </button>
        {' '}
        <IconButton aria-label="help" className={classes.helpIconButton} onMouseEnter={() => toggleMessageStatus('bottom', 'open')} onMouseOver={() => toggleMessageStatus('bottom', 'open')} onMouseLeave={() => toggleMessageStatus('bottom', 'close')}>
          <HelpIcon className={classes.helpIcon} fontSize="small" onMouseEnter={() => toggleMessageStatus('bottom', 'open')} onMouseOver={() => toggleMessageStatus('bottom', 'open')} />
        </IconButton>
        { messageStatus ? (
          <div className={classes.messageBottom} style={tooltipStyle(messageData)}>
            {' '}
            <Message data={messageData} />
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
    marginTop: '1px',
  },
});

export default withStyles(styles, { withTheme: true })(GridView);
