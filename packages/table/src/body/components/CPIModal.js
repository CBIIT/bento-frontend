import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  Modal,
  Typography,
  IconButton,
  Paper,
  Table,
  TableContainer,
  ThemeProvider,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@material-ui/core';
// import CustomTableBody from '../../body/CustomTblBody';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import styles from './ModalStyle';
// import TableHeader from '../../header/CustomTblHeader';
import HeaderCell from '../../header/CustomCell';
import AddFileButtonView from '../../wrapper/components/ReduxAddFile';
import questionIcon from './assets/Question_Icon.svg';
import cartIcon from './assets/Cart_Icon.svg';

const tooltipContentAddAll = {
  tooltipText: 'Click button to add all Hub files associated with this participant to the cart.',
  icon: questionIcon,
  alt: 'tooltipIcon',
  Participants: 'Click button to add all files associated with the filtered row(s).',
  arrow: true,
  styles: {
    border: '#03A383 1px solid',
  },
};

const tooltipContent = {
  tooltipText: 'Click button to add all selected files associated with this participant to the cart.',
  icon: questionIcon,
  alt: 'tooltipIcon',
  Participants: 'Click button to add files associated with the selected row(s).',
  arrow: true,
  styles: {
    border: '#03A383 1px solid',
  },
};

const CustomTableContainer = (props) => {
  const { children, themeConfig, className } = props;
  const tableStyle = {
    height: '425px',
    overflowX: 'hidden',
  };
  return (
    <ThemeProvider theme={themeConfig}>
      <TableContainer className={className} id="tableContainer" component={Paper} style={tableStyle}>
        {children}
      </TableContainer>
    </ThemeProvider>
  );
};

const CPIModal = ({
  classes,
  open,
  onClose,
  row,
  themeConfig = {},
  navigation,
}) => {
  const [sortBy, setSortBy] = useState('associated_id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [data, setData] = useState(() => {
    const result = row.cpi_data;
    return result;
  });
  const [selectedIds, setIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

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
        tooltipCofig: tooltipContentAddAll,
        conditional: false,
        alertMessage: 'The cart is limited to 200,000 files. Please narrow the search criteria or remove some files from the cart to add more.',
      },
      {
        participantIds: selectedIds,
        title: 'ADD SELECTED FILES FOR PARTICIPANT',
        clsName: 'add_selected_button',
        role: 'ADD_SELECTED_FILES',
        btnType: 'ADD_SELECTED_FILES',
        tooltipCofig: tooltipContent,
        conditional: true,
        alertMessage: 'The cart is limited to 200,000 files. Please narrow the search criteria or remove some files from the cart to add more.',
      },
    ],
  };

  const sortingData = (column, newOrder) => {
    const sortedData = data.sort((a, b) => a[column].localeCompare(b[column]));

    if (newOrder === 'desc') {
      return sortedData.reverse();
    }
    return sortedData;
  };

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

  const handleSortByColumn = (column, order) => {
    const newOrder = (order === 'asc' && sortBy === column) ? 'desc' : 'asc';
    const newData = sortingData(column, newOrder);
    setData(newData);
    setSortBy(column);
    setSortOrder(newOrder);
  };

  const buttonContainer = {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
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
    color: 'white',
    lineHeight: '14px',
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
    height: '55px',
    color: '#7D267E',
    fontFamily: 'Nunito',
    fontSize: '16px',
    fontWeight: '400',
    padding: '40px',
    paddingLeft: '35px',
    paddingRight: '20px',
    borderTop: '1px solid #505050',
  };

  const link = {
    color: '#7D267E',
    fontFamily: 'Nunito',
    fontSize: '16px',
    fontWeight: '700',
    position: 'relative',
    top: '11.5px',
    right: '39px',
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
      <Box className={classes.modalBody} style={modalBody}>
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
          className={classes.tableContainer}
          themeConfig={themeConfig}
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
                      sortBy={sortBy}
                      sortOrder={sortOrder}
                      toggleSort={() => handleSortByColumn(column.dataField, sortOrder)}
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
          <AddFileButtonView
            {...wrapperConfig.items[0]}
            buttonStyle={addAllFilesButton}
            rowID={row.id}
          />
          <AddFileButtonView
            {...wrapperConfig.items[1]}
            buttonStyle={addSelectedFilesButton}
            rowID={row.id}
          />
          <Button
            style={goToCartButton}
            onClick={() => navigation('/fileCentricCart')}
          >
            GO TO CART
            <img src={cartIcon} alt="cart" style={{ paddingLeft: '30px' }} />
          </Button>
        </div>
        <div className="footer" style={footer}>
          All CPI mappings for a given study can be found in the "synonyms"
          tab of the downloadable manifest,
          available under the "Studies" tab in the Explore Dashboard.
          For more information about CPI, click&nbsp;
          <a style={link} href="https://participantindex-docs.ccdi.cancer.gov/" target="_blank" rel="noopener noreferrer">here</a>
        </div>
      </Box>
    </Modal>
  );
};

export default withStyles(styles)(CPIModal);
