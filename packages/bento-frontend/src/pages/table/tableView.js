import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { CustomDataTable } from 'bento-components';

const columns = [{ name: 'program_id', label: 'Program' },
  { name: 'clinical_study_designation', label: 'Study Code' },
  { name: 'clinical_study_name', label: 'Study Name' },
  { name: 'clinical_study_type', label: 'Study Type' },
  { name: 'numberOfCases', label: 'Cases' },
];
const data = [
  ['COP', 'COTC007B', 'Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs', 'Clinical Trial', '85'],
  ['COP', 'COTC008', 'Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs', 'Clinical Trial', '52'],
  ['COP', 'COTC009', 'Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs', 'Clinical Trial', '25'],
  ['NCATS', 'NCATS01', 'Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs', 'Clinical Trial', '60'],
  ['Loriem ipsum', 'NCATS01', 'Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs', 'Clinical Trial', '0'],
  ['COP', 'COTC007B', 'Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs', 'anything embarrassingTr', '85'],
  ['COP', 'COTC008', " industry. Lorem Ipsum has been the industry's standard dogs", 'Clinical Trial', '52'],
  ['COP', 'COTC009', 'Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs', 'Clinical Trial', '25'],
  ['NCATS', 'NCATS01', 'Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs', 'Clinical Trial', '60'],
  ['Loriem ipsum', 'NCATS01', "simply dummy text of the prry. Lorem Ipsum has been the industry's  Bearing Dogs", 'Clinical Trial', '0'],
  ['COP', 'COTC007B', 'Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs', 'Clinical Trial', '85'],
  ['COP', 'COTC008', 'Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs', 'Clinical Trial', '52'],
  ['COP', 'COTC009', 'Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs', 'Clianything embarrassingal', '25'],
  ['NCATS', 'NCATS01', 'Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs', 'Clinical Trial', '60'],
  ['Loriem ipsum', 'NCATS01', 'Preclinical Evaluation of three indenoisquinoline Candidated in Tumor Bearing Dogs', 'Clinical Trial', '0'],
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

const Studies = () => (
  <>
    <Grid container spacing={32}>
      <Grid item xs={12}>
        <CustomDataTable
          title="Sample Table"
          data={data}
          columns={columns}
          options={options}
        />
      </Grid>
    </Grid>
  </>
);

const styles = (theme) => ({
  card: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  caseCardContainer: {
    marginTop: '32px',
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
});

export default withStyles(styles, { withTheme: true })(Studies);
