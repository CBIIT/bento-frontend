import gql from 'graphql-tag';

export const globalStatsData = [
  // A maximum of 6 stats are allowed
  {
    statTitle: 'Programs',
    datatable_field: 'numberOfPrograms',
    type: 'field',
    statAPI: 'numberOfPrograms',
  },
  {
    statTitle: 'Arms',
    datatable_field: 'numberOfStudies',
    type: 'field',
    statAPI: 'numberOfStudies',
  },
  {
    statTitle: 'Cases',
    datatable_field: 'numberOfSubjects',
    type: 'field',
    statAPI: 'numberOfSubjects',
  },
  {
    statTitle: 'samples',
    type: 'field',
    datatable_field: 'numberOfSamples',
    statAPI: 'numberOfSamples',
  },
  {
    statTitle: 'Assays',
    type: 'field',
    datatable_field: 'numberOfLabProcedures',
    statAPI: 'numberOfLabProcedures',
  },
  {
    statTitle: 'files',
    type: 'field',
    datatable_field: 'numberOfFiles',
    statAPI: 'numberOfFiles',
  },
];

// --------------- GraphQL query - Retrieve stats details --------------
export const GET_GLOBAL_STATS_DATA_QUERY = gql`{
  numberOfPrograms
  numberOfStudies
  numberOfSubjects
  numberOfSamples
  numberOfLabProcedures
  numberOfFiles
  }
  `;
