import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';

import DEFAULT_CONFIG from './config';
import DEFAULT_STYLES from './styles';

/**
 * Generate a Revoke Access Table with the custom configuration
 * applied
 *
 * @param {object} [uiConfig]
 * @returns {object} { RevokeAccessTable }
 */
export const RevokeAccessTableGenerator = (uiConfig = DEFAULT_CONFIG) => {
  const { functions } = uiConfig;

  const CustomDataTable = functions && functions.CustomDataTable
    ? functions.CustomDataTable
    : DEFAULT_CONFIG.functions.CustomDataTable;

  const RevokeAccessTable = ({
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
    RevokeAccessTable: withStyles(DEFAULT_STYLES, { withTheme: true })(RevokeAccessTable),
  };
};

export default RevokeAccessTableGenerator;
