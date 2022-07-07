/* eslint-disable */
import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { CustomDataTable } from 'bento-components';

const TablePendingRequest = ({ classes }) => {

const columns = [
  { name: 'name', label: 'Name' },
  { name: 'type', label: 'Account Type' },
  { name: 'email', label: 'Email' },
  { name: 'org', label: 'Organization' },
  { name: 'arm', label: 'Arm(s)',  options: {
  customBodyRender: (value, tableMeta, updateValue) => (
    <Link href="#"> {value}</Link>
          )
      }},
  { name: 'date', label: 'Access Request Date'},
  { name: 'action', label: 'Actions',
    options: {
  customBodyRender: (value, tableMeta, updateValue) => (
            <Button variant="contained" 
            classes={{
                root:classes.btn
              }}>
               Review
            </Button>
          )
      }
  },
];
const data = [
['Chen,Kailing', 'NIH', 'kai-ling.chen@nih.gov', 'other(CBIIT)', '28','07/01/2022','id'],
['Mukherhee,Amit', 'Login.gov', 'amit.mukherjee@nih.gov', 'other(CBIIT)', '13','07/01/2022','id'],
['Kuffel,Gina', 'Google', 'gina.kuffel@nih.gov', 'other(CBIIT)','4','07/01/2022','id'],
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

return ( <>
    <Grid container spacing={32}>
      <Grid item xs={12}>
        <CustomDataTable
          data={data}
          columns={columns}
          options={options}
        />
      </Grid>
    </Grid>
  </>)

};

const styles = (theme) => ({
  btn: {
    backgroundColor: '#7E4EC5',
    color: '#fff'
  }
});

export default withStyles(styles, { withTheme: true })(TablePendingRequest);
