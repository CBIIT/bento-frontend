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
import { CustomDataTable } from 'bento-components';
import { GET_LIST_USERS, useMock } from '../../../bento/adminData';

const TablePendingRequest = ({ classes }) => {
  // get data
  const { loading, error, data } = useQuery(GET_LIST_USERS, {
    context: {
      clientName: useMock ? 'mockService' : 'userService',
    },
    variables: {
      role: ['member', 'non-member', 'admin'],
      accessStatus: ['requested'],
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
  const columns = [{ name: 'displayName', label: 'Name' },
    { name: 'IDP', label: 'Account Type' },
    { name: 'email', label: 'Email' },
    { name: 'organization', label: 'Organization' },
    { name: 'userStatus', label: 'Membership Status' },
    { name: 'role', label: 'Role' },
    { name: 'numberOfArms', label: 'Arm(s)' },
    {
      name: 'userID',
      label: 'Actions',
      options: {
        customBodyRender: (value) => {
          const href = `/#/review/${value}`;
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

  const options = {
    selectableRows: 'none',
    responsive: 'stacked',
    search: false,
    filter: false,
    searchable: false,
    print: false,
    download: false,
    viewColumns: false,
  };

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
