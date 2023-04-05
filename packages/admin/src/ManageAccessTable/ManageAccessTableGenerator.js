import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import DEFAULT_CONFIG from './config';
import DEFAULT_STYLES from './styles';
import utils from '../utils';

/**
 * Generate a Manage Access Table with the custom configuration
 * applied
 *
 * @param {object} [uiConfig]
 * @returns {object} { SearchBox }
 */
export const ManageAccessTableGenerator = (uiConfig = DEFAULT_CONFIG) => {
  const { functions } = uiConfig;

  const getOptions = functions && typeof functions.getOptions === 'function'
    ? functions.getOptions
    : DEFAULT_CONFIG.functions.getOptions;

  const getDefaultCustomFooter = functions && typeof functions.getDefaultCustomFooter === 'function'
    ? functions.getDefaultCustomFooter
    : DEFAULT_CONFIG.functions.getDefaultCustomFooter;

  const CustomDataTable = functions && functions.CustomDataTable
    ? functions.CustomDataTable
    : DEFAULT_CONFIG.functions.CustomDataTable;

  const ManageAccessTable = ({
    classes,
    columns,
    content,
    tableSpec,
  }) => {
    const { loading, error, data } = content;
    const options = getOptions(tableSpec, classes, getDefaultCustomFooter);

    if (loading) {
      return (
        <CircularProgress />
      );
    }

    if (error) {
      return (
        <Typography variant="h5" color="error" size="sm">
          {error ? `An error has occurred in loading component: ${error}` : 'Recieved wrong data'}
        </Typography>
      );
    }

    return (
      <>
        <Grid container spacing={32}>
          <Grid item xs={12}>
            <CustomDataTable
              data={data ? utils.transformData(data.listUsers, tableSpec.columns) : []}
              columns={columns}
              options={options}
            />
          </Grid>
        </Grid>
      </>
    );
  };

  return {
    // @ts-ignore
    // eslint-disable-next-line max-len
    ManageAccessTable: withStyles(DEFAULT_STYLES, { withTheme: true })(ManageAccessTable),
  };
};

export default ManageAccessTableGenerator;
