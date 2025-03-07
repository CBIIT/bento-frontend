import React, { useState } from 'react';
import {
  Box,
  Modal,
  Typography,
  IconButton,
  Paper,
  Table,
  TableContainer,
  ThemeProvider,
  createTheme,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
// import CustomTableBody from '../../body/CustomTblBody';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import styles from './ModalStyle';
// import TableHeader from '../../header/CustomTblHeader';
import HeaderCell from '../../header/CustomCell';

const CustomTableContainer = (props) => {
  const { children, customTheme } = props;
  const themeConfig = createTheme({ overrides: { ...customTheme } });
  return (
    <ThemeProvider theme={themeConfig}>
      <TableContainer id="tableContainer" component={Paper} style={{ height: '510px' }}>
        {children}
      </TableContainer>
    </ThemeProvider>
  );
};

const CPIModal = ({
  open,
  onClose,
  row,
  themeConfig = {},
}) => {
  const [sortBy, setSortBy] = useState('associated_id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [data, setData] = useState(() => {
    const result = row.cpi_data;
    return result;
  });

  const sortingData = (column, newOrder) => {
    const sortedData = data.sort((a, b) => a[column].localeCompare(b[column]));

    if (newOrder === 'desc') {
      return sortedData.reverse();
    }
    return sortedData;
  };

  const handleSortByColumn = (column, order) => {
    const newOrder = (order === 'asc' && sortBy === column) ? 'desc' : 'asc';
    const newData = sortingData(column, newOrder);
    setData(newData);
    setSortBy(column);
    setSortOrder(newOrder);
  };

  const modalBody = {
    position: 'absolute',
    top: '5%',
    left: '25%',
    width: '840px',
    height: '671px',
    background: '#FFFFFF',
    border: '1px solid #505050',
    borderRadius: '40px',
    overflow: 'hidden',
  };

  const header = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '55px',
  };

  const cell = {
    paddingLeft: '3px',
    paddingRight: '3px',
  };

  const footer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '55px',
    color: '#7D267E',
    fontFamily: 'Nunito',
    fontSize: '16px',
    fontWeight: '400',
  };

  const link = {
    color: '#7D267E',
    fontFamily: 'Nunito',
    fontSize: '16px',
    fontWeight: '700',
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

  const participantId = row.participant_id;
  const displayColumns = [
    {
      dataField: 'associated_id',
      header: 'Participant ID',
      tooltipText: 'sort',
    },
    {
      dataField: 'repository_of_synonym_id',
      header: 'Name',
      tooltipText: 'sort',
    },
    {
      dataField: 'domain_description',
      header: 'Description',
      tooltipText: 'sort',
    },
    {
      dataField: 'domain_category',
      header: 'Category',
      tooltipText: 'sort',
    },
    {
      dataField: 'data_location',
      header: 'Location',
      tooltipText: 'sort',
    },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={`${row.id}-modal`}
    >
      <Box className="modalBody" style={modalBody}>
        <div className="header" style={header}>
          <Typography id="modal-modal-title" className="modalTitle" style={modalTitle}>
            {`Participant ID ${participantId} : CPI Mappings`}
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
          customTheme={themeConfig.tblContainer || {}}
        >
          <Table>
            <TableHead>
              <TableRow>
                {
                  displayColumns.map((column) => (
                    <HeaderCell
                      column={column}
                      sortBy={sortBy}
                      sortOrder={sortOrder}
                      toggleSort={() => handleSortByColumn(column.dataField, sortOrder)}
                      style={{ paddingLeft: '3px', paddingRight: '3px' }}
                    />
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                data.map((currRow) => (
                  <TableRow>
                    {
                      displayColumns.map((column) => (
                        (
                          column.dataField !== 'data_location'
                            ? <TableCell style={cell}>{currRow[column.dataField]}</TableCell>
                            : <TableCell style={cell}><a href={currRow[column.dataField]} target="_blank" rel="noopener noreferrer">{currRow[column.dataField]}</a></TableCell>
                        )
                      ))
                    }
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </CustomTableContainer>
        <div className="footer" style={footer}>
          To learn more about CPI click&nbsp;
          <a style={link} href="https://participantindex-docs.ccdi.cancer.gov/" target="_blank" rel="noopener noreferrer">here</a>
        </div>
      </Box>
    </Modal>
  );
};

export default withStyles(styles)(CPIModal);
