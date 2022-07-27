/* eslint-disable */
import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { useQuery } from '@apollo/client';
import { CustomDataTable } from 'bento-components';
import { GET_LIST_USERS,useMock } from '../../../bento/adminData';

const TableManageAccess = ({classes,includeNonMember}) => {

 // get data
 const { loading, error, data } = useQuery(GET_LIST_USERS, {
   context: {
        clientName: useMock? "mockService":""
    },
    variables: { 
      role: includeNonMember?["member","non-member"]:["member"],
      accessStatus: ["approved"]
    },
 });


const columns = [{ name: 'displayName', label: 'Name'},
  { name: 'IDP', label: 'Account Type' },
  { name: 'email', label: 'Email', },
  { name: 'organization', label: 'Organization' },
  { name: 'role', label: 'Role' },
  { name: 'userStatus', label: 'Status' },
  { name: 'numberOfArms', label: 'Arm(s)',
  options: {
  customBodyRender: (value, tableMeta, updateValue) => (
    <Link href="#"> {value}</Link>
          )
      }
  },
  { name: 'userID', label: 'Actions',
    options: {
  customBodyRender: (value, tableMeta, updateValue) => { 
    const href = '/#/admin/edit/'+value; 
    return(

            <Button variant="contained"  component={Link} href={href}
            classes={{
                root:classes.btn
              }}
                >
               Edit
            </Button>
          )
}
      }
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

return(
  <>
    <Grid container spacing={32}>
      <Grid item xs={12}>
        <CustomDataTable
          data={data?data.User:[]}
          columns={columns}
          options={options}
        />
      </Grid>
    </Grid>
  </>
);
}


const styles = (theme) => ({
  btn: {
    backgroundColor: '#437BBE',
    color: '#fff'
  }
});
export default withStyles(styles, { withTheme: true })(TableManageAccess);
