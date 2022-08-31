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
  GET_LIST_USERS, useMock, tabPendingRequest, nodeField, nodeName, nodeLevelAccess,
} from '../../../bento/adminData';
import getDateInFormat from '../../../utils/date';

const TablePendingRequest = ({ classes }) => {
  // get data
  const { loading, error, data } = useQuery(GET_LIST_USERS, {
    fetchPolicy: 'no-cache',
    context: {
      clientName: useMock ? 'mockService' : 'userService',
    },
    variables: {
      role: ['member', 'non-member'],
      accessStatus: ['pending'],
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

  const { table } = tabPendingRequest;

  const nodeLevelColumn = [{
    name: nodeField,
    label: nodeName,
  }];

  let dateColumn = [];

  const draftCloumns = getColumns(table, classes);

  const customizedCloumns = [];
  for (let i = 0; i < draftCloumns.length; i += 1) {
    if (draftCloumns[i].name === 'creationDate') {
      dateColumn = [
        {
          name: 'creationDate',
          label: 'Request Date',
          options: {
            display: true,
            filter: false,
            customBodyRender: (value) => (getDateInFormat(value, '-')),
          },
        }];
    } else {
      customizedCloumns.push(draftCloumns[i]);
    }
  }

  const actionColumn = [{
    name: 'userID',
    label: 'Actions',
    options: {
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

  const columns = nodeLevelAccess
    ? customizedCloumns.concat(nodeLevelColumn).concat(dateColumn).concat(actionColumn)
    : customizedCloumns.concat(dateColumn).concat(actionColumn);
  const options = getOptions(table, classes, getDefaultCustomFooter);

  return (
    <>
      <Grid container spacing={32}>
        <Grid item xs={12}>
          <CustomDataTable
            data={data ? data.listUsers : []}
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

export default withStyles(styles, { withTheme: true })(TablePendingRequest);
