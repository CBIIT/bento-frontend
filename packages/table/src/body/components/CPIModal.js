import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Checkbox,
  Button,
  Modal,
  Typography,
  IconButton,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ThemeProvider,
  Tooltip,
} from '@material-ui/core';
// import CustomTableBody from '../../body/CustomTblBody';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { withStyles, makeStyles, createTheme } from '@material-ui/core/styles';
import styles from './ModalStyle';
// import TableHeader from '../../header/CustomTblHeader';
import HeaderCell from '../../header/CustomCell';
import AddFileButtonView from '../../wrapper/components/ReduxAddFile';
import questionIcon from './assets/Question_Icon.svg';
import downloadIcon from './assets/download.svg';

const useStyles = makeStyles(() => ({
  button: {
    width: '189px',
    height: '41px',
    alignSelf: 'end',
    color: '#FFFFFF',
    backgroundColor: '#2A6E93',
    borderColor: '#2A6E93',
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '13px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '0 12px',
    borderRadius: '5px',
    transition: 'border-radius 0.2s ease-in-out',
    textAlign: 'left',
    '&:hover': {
      backgroundColor: '#245A7A',
    },
    '& .MuiButton-label': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
  },
  buttonOpen: {
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0',
  },
  dropdownContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    zIndex: 10000,
    marginTop: '-1px',
    backgroundColor: 'white',
    border: '1px solid #07679C',
    borderTop: 'none',
    borderRadius: '0 0 5px 5px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    minWidth: '189px',
    width: '189px',
    transformOrigin: 'top',
    animation: '$slideDown 0.2s ease-out',
  },
  '@keyframes slideDown': {
    '0%': {
      opacity: 0,
      transform: 'translateY(-10px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  dropdownList: {
    padding: 0,
    margin: 0,
  },
  dropdownItem: {
    borderBottom: '1px solid #07679C',
    padding: '0',
    height: '41px',
    minHeight: '41px',
    display: 'flex',
    alignItems: 'center',
    '&:first-child': {
      borderTop: '1px solid #07679C',
    },
    '&:last-child': {
      borderBottom: 'none',
    },
    '&:hover': {
      backgroundColor: '#DEE4EC',
    },
    '&:active': {
      backgroundColor: '#e9ecef',
    },
    '&:not(:last-child)': {
      borderBottom: '1px solid #07679C',
    },
    '& > div': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      height: '100%',
    },
    '& button': {
      width: '100% !important',
      height: '41px !important',
      borderRadius: '0 !important',
      backgroundColor: 'transparent !important',
      color: '#343434 !important',
      fontFamily: 'Poppins !important',
      fontWeight: '500 !important',
      fontStyle: 'Medium !important',
      fontSize: '12px !important',
      lineHeight: '13px !important',
      letterSpacing: '-0.02em !important',
      textTransform: 'uppercase !important',
      textAlign: 'left !important',
      justifyContent: 'flex-start !important',
      padding: '0 12px !important',
      border: 'none !important',
      boxShadow: 'none !important',
      display: 'flex !important',
      alignItems: 'center !important',
      verticalAlign: 'middle !important',
      '&:hover': {
        backgroundColor: 'transparent !important',
      },
    },
  },
  dropdownItemText: {
    '& .MuiListItemText-primary': {
      fontFamily: 'Poppins',
      fontWeight: '600',
      fontSize: '12px',
      color: '#07679C',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
  },
  questionIcon: {
    width: '10px',
    height: '10px',
    position: 'absolute',
    top: '3px',
    right: '-12px',
    cursor: 'pointer',
    zIndex: 1,
  },
  tooltipContent: {
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontStyle: 'Regular',
    fontSize: '13px',
    lineHeight: '17.5px',
    letterSpacing: '-0.01em',
    color: '#000000',
    backgroundColor: '#FFFFFF',
    border: '0.5px solid #000000',
    borderRadius: '4px',
    padding: '12px',
    maxWidth: '400px',
  },
  tooltipIcon: {
    width: '16px',
    height: '11px',
    marginRight: '8px',
    verticalAlign: 'middle',
  },
  customTooltip: {
    backgroundColor: '#FFFFFF !important',
    color: '#000000 !important',
    border: '0.5px solid #000000 !important',
    borderRadius: '4px !important',
    padding: '0 !important',
    boxShadow: 'none !important',
    '& .MuiTooltip-arrow': {
      color: '#000000 !important',
    },
  },
}));

const CustomTableContainer = (props) => {
  const { children, className } = props;
  const tableStyle = {
    height: '450px',
    overflowX: 'hidden',
  };
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <TableContainer className={className} id="tableContainer" component={Paper} style={tableStyle}>
        {children}
      </TableContainer>
    </ThemeProvider>
  );
};

const CPIModal = ({
  open,
  onClose,
  row,
  navigation,
}) => {
  const classes = useStyles();
  // const [sortBy, setSortBy] = useState('associated_id');
  // const [sortOrder, setSortOrder] = useState('asc');
  const [data, setData] = useState(row.cpi_data);
  const [selectedIds, setIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const participantId = row.participant_id;
  const studyId = row.study_id;

  useEffect(() => {
    // Reset all state when row or open status changes
    setData(row.cpi_data || []);
    setIds([]);
    setSelectAll(false);
    setDropdownOpen(false);
  }, [row, open]);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const displayColumns = [
    {
      dataField: 'associated_id',
      header: 'Participant ID',
      // tooltipText: 'sort',
      sortable: false,
    },
    {
      dataField: 'repository_of_synonym_id',
      header: 'Name',
      // tooltipText: 'sort',
      sortable: false,
    },
    {
      dataField: 'domain_description',
      header: 'Description',
      // tooltipText: 'sort',
      sortable: false,
    },
    {
      dataField: 'domain_category',
      header: 'Category',
      // tooltipText: 'sort',
      sortable: false,
    },
    {
      dataField: 'data_location',
      header: 'Location',
      // tooltipText: 'sort',
      sortable: false,
    },
  ];

  const handleDownloadCSV = () => {
    // Use the same column order and headers as the table display
    const csvColumnOrder = displayColumns;

    // Get the table data using the same column order as table
    const csvData = data.map((dataRow) => csvColumnOrder.map((column) => {
      const value = dataRow[column.dataField];
      // Escape commas and quotes in CSV
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value || '';
    }));

    // Create CSV headers using the same headers as table
    const headers = csvColumnOrder.map((column) => column.header).join(',');

    // Create CSV content
    const csvContent = [
      headers,
      ...csvData.map((csvRow) => csvRow.join(',')),
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `alternative_identifiers_${participantId}_${studyId}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const wrapperConfig = {
    container: 'buttons',
    size: 'xl',
    clsName: 'container_header',
    items: [
      {
        participantIds: data,
        title: 'ADD ALL FILES FOR PARTICIPANT',
        clsName: 'add_all_button',
        role: 'ADD_ALL_FILES',
        btnType: 'ADD_ALL_FILES',
        conditional: false,
        alertMessage: 'The cart is limited to 200,000 files. Please narrow the search criteria or remove some files from the cart to add more.',
      },
      {
        participantIds: selectedIds,
        title: 'ADD SELECTED FILES FOR PARTICIPANT',
        clsName: 'add_selected_button',
        role: 'ADD_SELECTED_FILES',
        btnType: 'ADD_SELECTED_FILES',
        conditional: true,
        disabled: selectedIds.length === 0,
        alertMessage: 'The cart is limited to 200,000 files. Please narrow the search criteria or remove some files from the cart to add more.',
      },
    ],
  };

  /* const sortingData = (column, newOrder) => {
    const sortedData = data.sort((a, b) => a[column].localeCompare(b[column]));

    if (newOrder === 'desc') {
      return sortedData.reverse();
    }
    return sortedData;
  }; */

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectAll(false);
      setIds([]);
    } else {
      setSelectAll(true);
      let toAdd = [];

      data.forEach((e) => {
        if (e.data_type === 'internal' && e.p_id) {
          toAdd = toAdd.concat(e.p_id);
        }
      });
      setIds(toAdd);
    }
  };

  const handleSelect = (id) => {
    if (selectedIds.indexOf(id) !== -1) {
      setIds(selectedIds.filter((e) => e !== id));
    } else {
      const toAdd = selectedIds.concat(id);
      setIds(toAdd);
    }
  };

  /* const handleSortByColumn = (column, order) => {
    const newOrder = (order === 'asc' && sortBy === column) ? 'desc' : 'asc';
    const newData = sortingData(column, newOrder);
    setData(newData);
    setSortBy(column);
    setSortOrder(newOrder);
  }; */

  const buttonContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    gap: '20px',
  };

  const addAllFilesButton = {
    width: '174px',
    height: '41px',
    borderRadius: '5px',
    backgroundColor: '#536D70',
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: '12px',
    color: 'white',
    lineHeight: '14px',
  };

  const addSelectedFilesButton = {
    width: '174px',
    height: '41px',
    borderRadius: '5px',
    backgroundColor: selectedIds.length ? '#2A6E93' : '#B3D6EA',
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: '12px',
    color: selectedIds.length ? 'white' : '#666666',
    lineHeight: '14px',
    opacity: selectedIds.length ? 1 : 0.6,
    cursor: selectedIds.length ? 'pointer' : 'not-allowed',
  };

  const goToCartButton = {
    width: '174px',
    height: '41px',
    borderRadius: '5px',
    backgroundColor: '#5666BD',
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: '12px',
    color: 'white',
  };

  const downloadAltIdsButton = {
    width: '189px',
    height: '41px',
    borderRadius: '5px',
    backgroundColor: '#5A7C84',
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: '12px',
    color: 'white',
    textTransform: 'uppercase',
    border: 'none',
  };

  const viewInExploreButton = {
    width: '189px',
    height: '41px',
    borderRadius: '5px',
    backgroundColor: '#2A5C75',
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: '12px',
    color: 'white',
    textTransform: 'uppercase',
    border: 'none',
  };

  const modalBody = {
    position: 'absolute',
    top: '5%',
    left: '25%',
    width: '880px',
    height: '671px',
    background: '#FFFFFF',
    border: '1px solid #505050',
    borderRadius: '40px',
    overflow: 'visible',
  };

  const header = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '55px',
  };

  const cell = {
    paddingLeft: '3px',
    paddingRight: '5px',
  };

  const cellLast = {
    paddingLeft: '3px',
    paddingRight: '10px',
    wordBreak: 'break-word',
  };

  const footer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50px',
    color: '#7D267E',
    fontFamily: 'Nunito',
    fontSize: '16px',
    fontWeight: '400',
    padding: '0 25px',
    borderTop: '1px solid #505050',
    textAlign: 'center',
    lineHeight: '30px',
  };

  const link = {
    color: '#7D267E',
    fontFamily: 'Nunito',
    fontSize: '16px',
    fontWeight: '700',
    textDecoration: 'underline',
  };

  const modalTitle = {
    fontFamily: 'Poppins',
    fontSize: '19px',
    fontWeight: '400',
    lineHeight: '21px',
    letterSpacing: '0.02em',
    textAlign: 'center',
    color: '#000000',
  };

  const closeButton = {
    marginLeft: '769px',
    position: 'absolute',
    backgroundColor: 'transparent',
  };

  const countContainer = {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    borderTop: '3px solid #939393',
    borderBottom: '3px solid #939393',
    height: '51px',
    paddingLeft: '16px',
  };

  const tableContainer = {
    '&::-webkit-scrollbar': {
      width: '6px',
      borderWidth: '0px 1px 1px 1px',
      borderStyle: 'solid',
      borderColor: '#B0B0B0',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#CECECE',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#003F74',
    },
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={`${row.id}-modal`}
    >
      <Box style={modalBody}>
        <div className="header" style={header}>
          <Typography id="modal-modal-title" className="modalTitle" style={modalTitle}>
            {`Alternative Identifiers for Participant ${participantId} in ${studyId}`}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            className="closeButton"
            style={closeButton}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        <div className="container" style={countContainer}>
          {`${data.length} mapped identifiers`}
        </div>
        <CustomTableContainer
          style={tableContainer}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <span style={{ display: 'none' }}>Select all</span>
                  <Checkbox
                    color="primary"
                    checked={selectAll}
                    onChange={() => handleSelectAll()}
                  />
                </TableCell>
                {
                  displayColumns.map((column) => (
                    <HeaderCell
                      column={column}
                      // sortBy={sortBy}
                      // sortOrder={sortOrder}
                      // toggleSort={() => handleSortByColumn(column.dataField, sortOrder)}
                      style={{ paddingLeft: '3px', paddingRight: '3px', fontWeight: '700' }}
                    />
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody style={{ borderBottom: '3px solid rgb(147, 147, 147)' }}>
              {
                data.map((currRow) => (
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="#2A6E93"
                        checked={selectedIds.includes(currRow.p_id)}
                        disabled={currRow.data_type === 'external'}
                        onChange={() => handleSelect(currRow.p_id)}
                      />
                    </TableCell>
                    {
                      displayColumns.map((column) => (
                        (
                          column.dataField !== 'data_location'
                            ? <TableCell style={cell}>{currRow[column.dataField]}</TableCell>
                            : <TableCell style={cellLast}><a href={currRow[column.dataField]} target="_blank" rel="noopener noreferrer">{currRow[column.dataField]}</a></TableCell>
                        )
                      ))
                    }
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </CustomTableContainer>
        <div style={buttonContainer}>
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <Button
              style={downloadAltIdsButton}
              onClick={handleDownloadCSV}
              disableRipple
            >
              <div style={{ textAlign: 'center', lineHeight: '1.2' }}>
                <div>DOWNLOAD</div>
                <div>ALTERNATIVE IDS</div>
              </div>
            </Button>
            <Tooltip
              title={(
                <div className={classes.tooltipContent}>
                  <div style={{ marginBottom: '8px' }}>
                    Clicking on DOWNLOAD ALTERNATIVE IDS will download the available
                    alternative identifiers for this Participant.
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    CPI mappings are also available for each study as part of the downloadable
                    study manifest. Follow these steps to download all alternative identifiers
                    for a study:
                  </div>
                  <div style={{ paddingLeft: '16px' }}>
                    <div style={{ marginBottom: '4px' }}>1. Go to the Explore Dashboard</div>
                    <div style={{ marginBottom: '4px' }}>2. Go to the Studies Tab of the Table</div>
                    <div style={{ marginBottom: '4px' }}>
                      3. Click on the icon
                      {' '}
                      <img
                        src={downloadIcon}
                        alt="Download"
                        style={{
                          width: '12px', height: '8px', margin: '0 4px', verticalAlign: 'middle',
                        }}
                      />
                      {' '}
                      in the Manifest column to download the Manifest.
                    </div>
                    <div>
                      4. Open the downloaded Manifest and go to the "alternative identifiers" tab
                    </div>
                  </div>
                </div>
              )}
              placement="top"
              arrow
              classes={{ tooltip: classes.customTooltip }}
            >
              <img src={questionIcon} alt="Help" className={classes.questionIcon} />
            </Tooltip>
          </div>

          <Button
            style={viewInExploreButton}
            onClick={() => {
              onClose();
              navigation(`/explore?p_id=${participantId}&dbgap_accession=${studyId}`);
            }}
            disableRipple
          >
            VIEW IN EXPLORE
          </Button>

          <div className={classes.dropdownContainer} ref={dropdownRef}>
            <Button
              variant="outlined"
              className={`${classes.button} ${dropdownOpen ? classes.buttonOpen : ''}`}
              onClick={handleDropdownToggle}
              disableRipple
            >
              <span>ADD TO OR GO TO CART</span>
              {dropdownOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>

            {dropdownOpen && (
              <>
                <div
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 9998,
                  }}
                  onClick={() => setDropdownOpen(false)}
                />
                <div className={classes.dropdown}>
                  <div className={classes.dropdownList}>
                    <div className={classes.dropdownItem}>
                      <AddFileButtonView
                        {...wrapperConfig.items[0]}
                        buttonStyle={addAllFilesButton}
                        rowID={row.id}
                      />
                    </div>
                    <div className={classes.dropdownItem}>
                      <AddFileButtonView
                        {...wrapperConfig.items[1]}
                        buttonStyle={addSelectedFilesButton}
                        rowID={row.id}
                        disabled={selectedIds.length === 0}
                      />
                    </div>
                    <div className={classes.dropdownItem}>
                      <Button
                        style={goToCartButton}
                        onClick={() => {
                          onClose();
                          setDropdownOpen(false);
                          navigation('/fileCentricCart');
                        }}
                        disableRipple
                      >
                        GO TO CART
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="footer" style={footer}>
          <span>
            For more information about CPI, click
            {' '}
            <a
              style={link}
              href="https://participantindex-docs.ccdi.cancer.gov/"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </span>
        </div>
      </Box>
    </Modal>
  );
};

export default withStyles(styles)(CPIModal);
