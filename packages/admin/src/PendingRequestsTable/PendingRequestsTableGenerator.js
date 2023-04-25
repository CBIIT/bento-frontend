import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import DEFAULT_CONFIG from './config';
import DEFAULT_STYLES from './styles';
import utils from '../utils';

/**
 * Generate a Pending Requests Table with the custom configuration
 * applied
 *
 * @param {object} [uiConfig]
 * @returns {object} { PendingRequestsTable }
 */
export const PendingRequestsTableGenerator = (uiConfig = DEFAULT_CONFIG) => {
  const { functions } = uiConfig;

  const getColumns = functions && typeof functions.getColumns === 'function'
    ? functions.getColumns
    : DEFAULT_CONFIG.functions.getColumns;

  const getOptions = functions && typeof functions.getOptions === 'function'
    ? functions.getOptions
    : DEFAULT_CONFIG.functions.getOptions;

  const getDefaultCustomFooter = functions && typeof functions.getDefaultCustomFooter === 'function'
    ? functions.getDefaultCustomFooter
    : DEFAULT_CONFIG.functions.getDefaultCustomFooter;

  const getDateInFormat = functions && typeof functions.getDateInFormat === 'function'
    ? functions.getDateInFormat
    : DEFAULT_CONFIG.functions.getDateInFormat;

  const CustomDataTable = functions && functions.CustomDataTable
    ? functions.CustomDataTable
    : DEFAULT_CONFIG.functions.CustomDataTable;

  const PendingRequestsTable = ({
    classes,
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

    let dateColumn = [];

    const draftColumns = getColumns(tableSpec, classes);

    // transform the datetime
    const customizedCloumns = [];
    for (let i = 0; i < draftColumns.length; i += 1) {
      if (draftColumns[i].name === 'requestDate') {
        dateColumn = [
          {
            name: 'requestDate',
            label: 'Request Date',
            options: {
              display: true,
              filter: false,
              customBodyRender: (value) => (getDateInFormat(value, '/')),
            },
          }];
      } else {
        customizedCloumns.push(draftColumns[i]);
      }
    }

    const actionColumn = [{
      name: 'requestID',
      label: 'Action',
      options: {
        sort: false,
        customBodyRender: (value) => {
          const href = `/#/admin/review/${value}`;
          return (
            <Button
              variant="contained"
              component={Link}
              href={href}
              classes={{
                root: classes.btn,
              }}
            >
              review
            </Button>
          );
        },
      },
    },
    ];

    const columns = customizedCloumns.concat(dateColumn).concat(actionColumn);

    return (
      <>
        <Grid container spacing={32}>
          <Grid item xs={12}>
            <CustomDataTable
              data={data ? utils.transformData(data.listRequest, tableSpec.columns) : []}
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
    PendingRequestsTable: withStyles(DEFAULT_STYLES, { withTheme: true })(PendingRequestsTable),
  };
};

export default PendingRequestsTableGenerator;
