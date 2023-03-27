import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { useQuery } from '@apollo/client';
import {
  getColumns, getOptions, getDefaultCustomFooter, CustomDataTable,
} from 'bento-components';
import {
  GET_LIST_USERS, useMock, tabManageAccess, nodeName, nodeField, nodeLevelAccess,
} from '../../../bento/adminData';
import transformData from './utils';

const TableManageAccess = ({ classes, includeNonMember }) => {
  // get data
  const { loading, error, data } = useQuery(GET_LIST_USERS, {
    fetchPolicy: 'no-cache',
    context: {
      clientName: useMock ? 'mockService' : 'userService',
    },
    variables: {
      role: includeNonMember ? ['member', 'non-member', 'admin'] : ['member', 'admin'],
      accessStatus: ['approved'],
    },
  });

  if (loading) return <CircularProgress />;

  if (error) {
    return (
      <Typography variant="h5" color="error" size="sm">
        {error ? `An error has occurred in loading component: ${error}` : 'Recieved wrong data'}
      </Typography>
    );
  }

  const { table } = tabManageAccess;

  const nodeLevelColumn = [{
    name: nodeField,
    label: nodeName,
    options: {
      customBodyRender: (value, tableMeta) => {
        const href = `/#/admin/view/${tableMeta.rowData[7]}`;
        return (
          <Link
            href={href}
            classes={{
              root: classes.link,
            }}
          >
            {' '}
            {value}
          </Link>
        );
      },
    },
  }];

  const actionColumn = [{
    name: 'userID',
    label: 'Action',
    options: {
      sort: false,
      customBodyRender: (value) => {
        const href = `/#/admin/edit/${value}`;
        return (
          <Button
            variant="contained"
            component={Link}
            href={href}
            classes={{
              root: classes.btn,
            }}
          >
            Edit
          </Button>
        );
      },
    },
  }];

  const columns = nodeLevelAccess
    ? getColumns(table, classes).concat(nodeLevelColumn).concat(actionColumn)
    : getColumns(table, classes).concat(actionColumn);
  const options = getOptions(table, classes, getDefaultCustomFooter);

  return (
    <>
      <Grid container spacing={32}>
        <Grid item xs={12}>
          <CustomDataTable
            data={data ? transformData(data.listUsers, table.columns) : []}
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
export default withStyles(styles, { withTheme: true })(TableManageAccess);
