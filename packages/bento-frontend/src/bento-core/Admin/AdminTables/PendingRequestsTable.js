import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import {
  CustomDataTable,
} from 'bento-components';
import {
  getColumns,
  getOptions,
  getDateInFormat,
  getDefaultCustomFooter,
} from '../../util';
import utils from '../utils';

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

  const draftCloumns = getColumns(tableSpec, classes);

  // transform the datetime
  const customizedCloumns = [];
  for (let i = 0; i < draftCloumns.length; i += 1) {
    if (draftCloumns[i].name === 'requestDate') {
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
      customizedCloumns.push(draftCloumns[i]);
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

const styles = () => ({
  btn: {
    backgroundColor: '#7E4EC5',
    color: '#fff',
  },
});

export default withStyles(styles, { withTheme: true })(PendingRequestsTable);
