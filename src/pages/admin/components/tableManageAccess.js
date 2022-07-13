/* eslint-disable */
import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { CustomDataTable } from 'bento-components';

const TableManageAccess = ({classes}) => {

const columns = [{ name: 'name', label: 'Name' },
  { name: 'type', label: 'Account Type' },
  { name: 'email', label: 'Email' },
  { name: 'org', label: 'Organization' },
  { name: 'role', label: 'Role' },
  { name: 'status', label: 'Status' },
  { name: 'arm', label: 'Arm(s)',
  options: {
  customBodyRender: (value, tableMeta, updateValue) => (
    <Link href="#"> {value}</Link>
          )
      }
  },
  { name: 'action', label: 'Actions',
    options: {
  customBodyRender: (value, tableMeta, updateValue) => (
            <Button variant="contained" 
            classes={{
                root:classes.btn
              }}>
               Edit
            </Button>
          )
      }
  }
];
const data = [
['Chen,Kailing', 'NIH', 'kai-ling.chen@nih.gov', 'other(CBIIT)', 'Admin', 'Active', '28','id'],
['Mukherhee,Amit', 'Login.gov', 'amit.mukherjee@nih.gov', 'other(CBIIT)', 'Member', 'Active', '13','id'],
['Kuffel,Gina', 'Google', 'gina.kuffel@nih.gov', 'other(CBIIT)', 'Admin', 'Active', '4','id'],
['Wu,Ye', 'Login.gov', 'wuye@nih.gov', '', 'Non-Member', '', '','id'],
['Smith,John', 'Login.gov', 'john.smith@nih.gov', '','Non-Member', '', '','id'],
['Stog,Hannah', 'Login.gov', 'khannah.stog@nih.gov', 'other(CBIIT)', 'Member', 'Inactive', '0','id'],
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
          data={data}
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
