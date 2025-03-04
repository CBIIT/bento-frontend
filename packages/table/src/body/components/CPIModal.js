import React from 'react';
import {
  Box,
  Modal,
  Typography,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import styles from './ModalStyle';

const CPIModal = ({
  open,
  onClose,
  row,
}) => {
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
  const columns = [
    {
      field: 'associated_id',
      header: 'Participant ID',
    },
    {
      field: 'repository_of_synonym_id',
      header: 'Name',
    },
    {
      field: 'domain_description',
      header: 'Description',
    },
    {
      field: 'domain_category',
      header: 'Category',
    },
    {
      field: 'data_location',
      header: 'Location',
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
        <Table>
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
        </Table>
      </Box>
    </Modal>
  );
};

export default withStyles(styles)(CPIModal);
