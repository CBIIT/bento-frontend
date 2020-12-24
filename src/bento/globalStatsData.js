import gql from 'graphql-tag';

export const statsStyling = {
  global: {
    horizontalStyle: true,
    statTitleFirst: true,
    height: '47px',
    background: '#8DCAFF',
  },
};

export const globalStatsData = [
  // A maximum of 6 stats are allowed
  {
    statTitle: 'Programs',
    type: 'field',
    statAPI: 'numberOfPrograms',
  },
  {
    statTitle: 'Arms',
    type: 'field',
    statAPI: 'numberOfStudies',
  },
  {
    statTitle: 'Cases',
    type: 'field',
    statAPI: 'numberOfSubjects',
  },
  {
    statTitle: 'samples',
    type: 'field',
    statAPI: 'numberOfSamples',
  },
  {
    statTitle: 'Assays',
    type: 'field',
    statAPI: 'numberOfLabProcedures',
  },
  {
    statTitle: 'files',
    type: 'field',
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
