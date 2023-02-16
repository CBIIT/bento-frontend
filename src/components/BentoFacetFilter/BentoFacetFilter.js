/* eslint-disable block-scoped-var */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
/* eslint-disable arrow-body-style */
import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './BentoFacetFilterStyle';
import FacetFilter from '../../bento-core/FacetFilter/FacetFilterController';
import { facetsConfig } from './FacetConfig';

const BentoFacetFilter = ({
  searchData,
}) => {
  return (
    <div>
      <h3>Bento Filter</h3>
      <FacetFilter
        data={searchData}
        facetsConfig={facetsConfig}
      />
    </div>
  );
};

export default withStyles(styles)(BentoFacetFilter);
