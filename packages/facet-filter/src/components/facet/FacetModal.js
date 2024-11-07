import React, { useState } from 'react';
import {
  Modal,
  Box,
  Button,
  Typography,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import styles from './ModalStyle';
import ModalFilterItems from '../inputs/ModalFilterItems';

const resetIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg',
  alt: 'Reset icon',
  size: '12 px',
};

const ModalView = ({
  classes,
  facet,
  open,
  onClose,
  onClearFacetSection,
}) => {
  const [search, setSearch] = useState('');

  console.log(facet);
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="diagnosis-search-modal"
    >
      <Box className={classes.modalBody}>
        <div className={classes.header}>
          <Typography id="modal-modal-title" className={classes.modalTitle}>
            Diagnosis Facet Search
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            className={classes.closeButton}
            sx={(theme) => ({
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.searchContainer}>
          <div className={classes.searchDiagnosis}>Search Diagnosis</div>
          <input className={classes.searchBox} value={search} type="text" placeholder="e.g. A1CF, CREB3L1, PIK3CA" onChange={(e) => setSearch(e.target.value)} />
          <Button
            variant="outlined"
            onClick={() => setSearch('')}
            className={classes.resetIcon}
          >
            <img
              src={resetIcon.src}
              height={resetIcon.size}
              width={resetIcon.size}
              alt={resetIcon.alt}
            />
          </Button>
        </div>
        <div className={classes.itemContainer}>
          <ModalFilterItems
            onClearFacetSection={onClearFacetSection}
            searchText={search}
            facet={facet}
          />
        </div>
      </Box>
    </Modal>
  );
};

export default withStyles(styles)(ModalView);
