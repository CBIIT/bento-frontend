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
      <TableContainer id="tableContainer" component={Paper}>
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
  const [sortOrder, setSortOrder] = useState('desc');
  const [data, setData] = useState(() => {
    const result = row.cpi_data;
    return result;
  });

  const sortingData = (column, newOrder) => {
    //doing the sorting for cpi_data
    return [];
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
    width: '836px',
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
  };

  const countContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTop: '3px solid #939393',
    borderBottom: '3px solid #939393',
    height: '51px',
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
          test
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
                    />
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>testing</TableCell>
                {/* {
                  data.map((column) => (
                    <HeaderCell
                      column={column}
                      sortBy={sortBy}
                      sortOrder={sortOrder}
                      toggleSort={() => handleSortByColumn(column.dataField, sortOrder)}
                    />
                  ))
                } */}
              </TableRow>
            </TableBody>
          </Table>
        </CustomTableContainer>
        {/* <Table>
          <TableHead>
            <TableRow>
              <TableCell>{columns[0].header}</TableCell>
              <TableCell>Test2</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>testing</TableCell>
            </TableRow>
          </TableBody>
        </Table> */}
      </Box>
    </Modal>
  );
};

export default withStyles(styles)(CPIModal);
