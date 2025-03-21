import React from 'react';
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
  sortBy,
  searchText,
  open,
  onClose,
  onClearFacetSection,
  onSearchTextChange,
  onSortChange,
}) => {
  const onClearSection = () => {
    onSortChange(null);
    onClearFacetSection(facet);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={`${facet.datafield}-search-modal`}
    >
      <Box className={classes.modalBody}>
        <div className={classes.header}>
          <Typography id="modal-modal-title" className={classes.modalTitle}>
            {`${facet.label} Facet Search`}
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
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        <div className={classes.searchContainer}>
          <div className={classes.searchInputbox}>{`Search ${facet.label}`}</div>
          <input className={classes.searchBox} value={searchText} type="text" placeholder={facet.searchPlaceholder ? facet.searchPlaceholder : 'e.g. Sarcoma, Neoplasm'} onChange={(e) => onSearchTextChange(facet.datafield, e.target.value)} />
          <Button
            variant="outlined"
            onClick={() => onSearchTextChange(facet.datafield, '')}
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
            searchText={searchText}
            facet={facet}
            sortBy={sortBy}
            onClearSection={onClearSection}
            onSortChange={onSortChange}
          />
        </div>
      </Box>
    </Modal>
  );
};

export default withStyles(styles)(ModalView);
