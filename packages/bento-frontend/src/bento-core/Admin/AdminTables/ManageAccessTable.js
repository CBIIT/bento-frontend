import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import {
  CustomDataTable,
} from 'bento-components';
import {
  getOptions,
  getDefaultCustomFooter,
} from '../../util';
import utils from '../utils';

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

const styles = () => ({
  btn: {
    backgroundColor: '#437BBE',
    color: '#fff',
    borderRadius: '10px',
    marginLeft: '-6px',
  },
  link: {
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
});

export default withStyles(styles, { withTheme: true })(ManageAccessTable);
