import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import styles from './ModalStyle';
import { sortType } from '../../utils/Sort';
import FilterItems from '../inputs/FilterItems';

const ModalView = ({
  classes,
  facet,
  open,
  onClose,
}) => {
  const title = 'Diagnosis Facet Search';
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const onSortFacet = (type) => {
    setSortBy(type);
  };

  console.log(facet);
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
        <div className={classes.searchContainer}>
          <input className={classes.searchBox} value={search} type="text" placeholder="e.g. A1CF, CREB3L1, PIK3CA" onChange={(e) => setSearch(e.target.value)} />
        </div>
        <>
          <span
            className={
              clsx(classes.sortGroupItem, {
                [classes.highlight]: sortBy === sortType.ALPHABET,
              })
            }
            onClick={() => {
              onSortFacet(sortType.ALPHABET);
            }}
          >
            Sort alphabetically
          </span>
          <span
            className={
              clsx(classes.sortGroupItemCounts, {
                [classes.highlight]: sortBy === sortType.NUMERIC,
              })
            }
            onClick={() => {
              onSortFacet(sortType.NUMERIC);
            }}
          >
            Sort by count
          </span>
        </>
        <div className={classes.itemContainer}>
          <FilterItems
            searchText={search}
            facet={facet}
            sortBy={sortBy}
          />
        </div>
      </Box>
    </Modal>
  );
};

export default withStyles(styles)(ModalView);
