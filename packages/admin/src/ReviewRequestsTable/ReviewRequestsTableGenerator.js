import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';

import DEFAULT_CONFIG from './config';
import DEFAULT_STYLES from './styles';

/**
 * Generate a Review Requests Table with the custom configuration
 * applied
 *
 * @param {object} [uiConfig]
 * @returns {object} { SearchBox }
 */
export const ReviewRequestsTableGenerator = (uiConfig = DEFAULT_CONFIG) => {
  const { functions } = uiConfig;

  const CustomDataTable = functions && functions.CustomDataTable
    ? functions.CustomDataTable
    : DEFAULT_CONFIG.functions.CustomDataTable;

  const ReviewRequestsTable = ({
    classes,
    columns,
    data,
    options,
  }) => (
    <>
      <Grid container>
        <Grid item xs={12}>
          <CustomDataTable
            data={data}
            columns={columns}
            options={options}
            className={classes.customDataTable}
          />
        </Grid>
      </Grid>
    </>
  );

  return {
    // @ts-ignore
    // eslint-disable-next-line max-len
    ReviewRequestsTable: withStyles(DEFAULT_STYLES, { withTheme: true })(ReviewRequestsTable),
  };
};

export default ReviewRequestsTableGenerator;
