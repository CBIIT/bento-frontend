import React from 'react';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { generateQueryStr } from '@bento-core/util';
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

const SEARCH_PLACEHOLDERS_BY_LABEL = {
  Diagnosis: 'e.g. Neuroblastoma, Osteosarcoma, Leukemia',
  'Diagnosis Category': 'e.g. Embryonal tumors, Gliomas, Leukemias',
  'Gene Symbol': 'e.g. A1CF, CREB3L1, PIK3CA',
  Alteration: 'e.g. BRAF V600E, EWSR1-FLI1, ALK Mutation',
  'Sample Anatomic Site': 'e.g. Bone marrow, Blood, Brain',
};

const SEARCH_PLACEHOLDERS_BY_DATAFIELD = {
  diagnoses: SEARCH_PLACEHOLDERS_BY_LABEL.Diagnosis,
  diagnosis: SEARCH_PLACEHOLDERS_BY_LABEL.Diagnosis,
  diagnosis_category: SEARCH_PLACEHOLDERS_BY_LABEL['Diagnosis Category'],
  gene_symbol: SEARCH_PLACEHOLDERS_BY_LABEL['Gene Symbol'],
  alteration: SEARCH_PLACEHOLDERS_BY_LABEL.Alteration,
  sample_anatomic_site: SEARCH_PLACEHOLDERS_BY_LABEL['Sample Anatomic Site'],
  anatomic_site: SEARCH_PLACEHOLDERS_BY_LABEL['Sample Anatomic Site'],
};

const getSearchPlaceholder = (facet) => (
  facet.searchPlaceholder
  || SEARCH_PLACEHOLDERS_BY_LABEL[facet.label]
  || SEARCH_PLACEHOLDERS_BY_DATAFIELD[facet.datafield]
  || 'Search...'
);

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
  queryParams,
}) => {
  const query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();

  const onClearSection = () => {
    const field = facet.datafield;
    const paramValue = {};
    paramValue[field] = '';
    const queryStr = generateQueryStr(query, queryParams, paramValue);
    navigate(`/exploreParticipants${queryStr}`, { replace: true });
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
          <input className={classes.searchBox} value={searchText} type="text" placeholder={getSearchPlaceholder(facet)} onChange={(e) => onSearchTextChange(facet.datafield, e.target.value)} />
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
            queryParams={queryParams}
          />
        </div>
      </Box>
    </Modal>
  );
};

export default withStyles(styles)(ModalView);
