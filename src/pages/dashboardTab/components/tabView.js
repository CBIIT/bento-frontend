import React, { useRef, useEffect } from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import ServerPaginatedDataTable from '../../../components/serverPaginatedTable/serverPaginatedTable';
import CustomFooter from './tabFooter';
import { addToCart, getCart } from '../../fileCentricCart/store/cart';
import Message from '../../../components/Message';
import { dateTimeStamp, manipulateLinks } from '../../../utils/helpers';
import formatBytes from '../../../utils/formatBytes';

const TabView = ({
  classes,
  data,
  customColumn,
  customOnRowsSelect,
  openSnack,
  disableRowSelection,
  buttonTitle,
  tableID,
  saveButtonDefaultStyle,
  DeactiveSaveButtonDefaultStyle,
  ActiveSaveButtonDefaultStyle,
  toggleMessageStatus,
  BottomMessageStatus,
  tabIndex,
  downloadFileName,
  externalLinkIcon,
}) => {
  // Get the existing files ids from  cart state
  const cart = getCart();
  const fileIDs = cart.fileIds ? cart.fileIds : [];
  let selectedIDs = [];
  const saveButton = useRef(null);
  const saveButton2 = useRef(null);

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

  useEffect(() => {
    initSaveButtonDefaultStyle(saveButton);
    initSaveButtonDefaultStyle(saveButton2);

    if (selectedIDs.length === 0) {
      updateActiveSaveButtonStyle(true, saveButton);
      updateActiveSaveButtonStyle(true, saveButton2);
    } else {
      updateActiveSaveButtonStyle(false, saveButton);
      updateActiveSaveButtonStyle(false, saveButton2);
    }
  });

  function exportFiles() {
    // Find the newly added files by comparing
    const newFileIDS = fileIDs !== null ? selectedIDs.filter(
      (e) => !fileIDs.find((a) => e === a),
    ).length : selectedIDs.length;
    addToCart({ fileIds: selectedIDs });
    if (newFileIDS > 0) {
      openSnack(newFileIDS);
    }
    selectedIDs = [];
  }

  function onRowsSelect(curr, allRowsSelected) {
    selectedIDs = [...new Set(
      customOnRowsSelect(data, allRowsSelected),
    )];

    if (allRowsSelected.length === 0) {
      updateActiveSaveButtonStyle(true, saveButton);
      updateActiveSaveButtonStyle(true, saveButton2);
    } else {
      updateActiveSaveButtonStyle(false, saveButton);
      updateActiveSaveButtonStyle(false, saveButton2);
    }
  }

  const options = () => ({
    selectableRows: true,
    search: false,
    filter: false,
    searchable: false,
    print: false,
    download: false,
    downloadOptions: {
      filename: downloadFileName.concat(dateTimeStamp()).concat('.csv'),
      filterOptions: {
        useDisplayedColumnsOnly: true,
      },
    },
    viewColumns: false,
    pagination: true,
    isRowSelectable: (dataIndex) => disableRowSelection(data[dataIndex], fileIDs),
    onRowSelectionChange: (curr, allRowsSelected) => onRowsSelect(curr, allRowsSelected),
    // eslint-disable-next-line no-unused-vars
    customToolbarSelect: () => '',
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
      <CustomFooter
        text="SAVE TO MY CASES"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={(event) => changeRowsPerPage(event.target.value)}
      // eslint-disable-next-line no-shadow
        onChangePage={(_, page) => changePage(page)}
      />
    ),

  });

  const displayFalseTableColumns = customColumn
    .filter((col) => col.display === false).length;

  const displayTableColumns = customColumn.slice(0, displayFalseTableColumns + 10);

  const updatedTableWithLinks = manipulateLinks(displayTableColumns);

  const columns = updatedTableWithLinks.map((column) => ({
    name: column.dataField,
    label: column.header,
    options: {
      display: column.display ? column.display : false,
      filter: false,
      customBodyRender: (value, tableMeta) => (
        <div>
          {
          column.internalLink ? <Link className={classes.link} to={`${column.actualLink}${tableMeta.rowData[column.actualLinkId]}`}>{value}</Link>
            : column.externalLink ? (
              <span className={classes.linkSpan}>
                <a href={`${column.actualLink}${tableMeta.rowData[column.actualLinkId]}`} target="_blank" rel="noopener noreferrer" className={classes.link}>
                  {' '}
                  {column.formatBytes ? formatBytes(value) : value}
                  {' '}
                </a>
                <img
                  src={externalLinkIcon ? externalLinkIcon.src : ''}
                  alt={externalLinkIcon.alt ? externalLinkIcon.alt : ''}
                  className={classes.externalLinkIcon}
                />
              </span>
            )
              : `${column.formatBytes ? formatBytes(value) : value}`
}
        </div>
      ),
    },
  }));

  return (
    <div>

      <Grid item xs={12} className={classes.saveButtonDiv}>
        <button
          type="button"
          ref={saveButton2}
          onClick={exportFiles}
          className={classes.button}
        >
          { buttonTitle }
        </button>
        <IconButton aria-label="help" className={classes.helpIconButton}>
          <HelpIcon className={classes.helpIcon} fontSize="small" onMouseEnter={() => toggleMessageStatus('top', 'open')} onMouseLeave={() => toggleMessageStatus('top', 'close')} />
        </IconButton>

      </Grid>
      <Grid container>
        <Grid item xs={12} id={tableID}>
          <ServerPaginatedDataTable
            data={data}
            columns={columns}
            options={options(downloadFileName)}
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
          { buttonTitle }
        </button>

        <IconButton aria-label="help" className={classes.helpIconButton}>
          <HelpIcon className={classes.helpIcon} fontSize="small" onMouseEnter={() => toggleMessageStatus('bottom', 'open')} onMouseLeave={() => toggleMessageStatus('bottom', 'close')} />
        </IconButton>
        <div style={{ position: 'relative' }}>
          { BottomMessageStatus.isActive
            && tabIndex === BottomMessageStatus.currentTab.toString() ? (
              <div className={classes.messageBottom}>
                {' '}
                <Message data={BottomMessageStatus.text} />
                {' '}
              </div>
            ) : ''}
          <Link
            target="_blank"
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
    color: '#DC762F',
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
    marginLeft: 'calc(100% - 212px)',
  },
  helpIcon: {
    zIndex: '600',
  },
  helpIconButton: {
    verticalAlign: 'top',
  },
});

export default withStyles(styles, { withTheme: true })(TabView);
