import React, { useRef, useEffect } from 'react';
import {
  Grid,
  withStyles,
  Link,
} from '@material-ui/core';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { CustomDataTable } from 'bento-components';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import CustomFooter from './customFooter';
import { addToCart } from '../../pages/fileCentricCart/store/cart';
import externalIcon from '../../assets/icons/ExternalLinkIcon.svg';
import Message from '../../pages/fileCentricCart/components/message';

const FileGridView = ({
  classes, data, columns, customOnRowsSelect, openSnack, disableRowSelection, bottonText, options,
}) => {
  // Get the existing files ids from  cart state
  const fileIDs = useSelector((state) => state.cart.fileIds);
  const [BottomMessageStatus, setBottomMessageStatus] = React.useState(false);

  const saveButton = useRef(null);

  function openMessage() {
    return setBottomMessageStatus(true);
  }

  function closeMessage() {
    return setBottomMessageStatus(false);
  }

  function toggleMessageStatus(location, status) {
    return status === 'close' ? closeMessage(location) : openMessage(location);
  }

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
  };

  useEffect(() => {
    saveButton.current.disabled = true;
    saveButton.current.style.color = '#FFFF';
    saveButton.current.style.backgroundColor = '#03A383';
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
    addToCart({ fileIds: selectedFileIDs });
    selectedFileIDs = [];
  }

  function divStyle() {
    const css = {};
    css.display = 'inherit';
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

  function onRowsSelect(curr, allRowsSelected) {
    selectedFileIDs = [...new Set(selectedFileIDs.concat(
      customOnRowsSelect(data, allRowsSelected),
    ))];

    if (allRowsSelected.length === 0) {
      saveButton.current.disabled = true;
      saveButton.current.style.color = '#FFFFFF';
      saveButton.current.style.backgroundColor = '#03A383';
      saveButton.current.style.opacity = '0.3';
      saveButton.current.style.border = '3px solid grey';
      saveButton.current.style.fontWeight = '600';
      saveButton.current.style.cursor = 'auto';
    } else {
      saveButton.current.disabled = false;
      saveButton.current.style.color = '#FFFFFF';
      saveButton.current.style.backgroundColor = '#03A383';
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

  const finalOptions = { ...defaultOptions(), ...options };

  return (
    <div>
      <Grid container>
        <Grid item xs={12} id="table_file">
          <CustomDataTable
            data={_.cloneDeep(data)}
            columns={columns}
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
          { bottonText }
          {' '}
        </button>
        {' '}
        <IconButton aria-label="help">
          <HelpIcon className={classes.helpIcon} onMouseEnter={() => toggleMessageStatus('bottom', 'open')} onMouseLeave={() => toggleMessageStatus('bottom', 'close')} />
        </IconButton>
        { BottomMessageStatus ? (
          <div className={classes.messageBottom}>
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
    padding: '10px 39px 0px 0px',
    position: 'relative',
  },
  messageBottom: {
    position: 'absolute',
    right: '20px',
    bottom: '20px',
    zIndex: '400',
  },
  linkIcon: {
    color: '#dc762f',
    width: '20px',
    verticalAlign: 'sub',
    margin: '0px 0px 0px 2px',
  },
});

export default withStyles(styles, { withTheme: true })(FileGridView);
