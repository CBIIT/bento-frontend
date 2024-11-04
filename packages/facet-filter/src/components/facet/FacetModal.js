import React from 'react';
import {
  Modal,
  Box,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './ModalStyle';

const ModalView = ({
  classes,
  open,
  onClose,
}) => {
  const title = 'Diagnosis Facet Search';
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="diagnosis-search-modal"
    >
      <Box className={classes.modalBody}>
        <Typography id="modal-modal-title" component="h2">
          {title}
        </Typography>
      </Box>
    </Modal>
  );
};

export default withStyles(styles)(ModalView);
