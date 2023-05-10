import gql from 'graphql-tag';

export const statsStyling = {
  global: {
    horizontalStyle: false,
    statTitleFirst: false,
    height: '56px',
    background: '#8DCAFF',
  },
  statsGroup: {
    margin: '7.25px 0px 9.25px 0px',
    padding: '0.1% 6% 2% 6%',
    borderRight: '1px solid #0B3556',
    '&:first-child': {
      padding: '0.1% 6% 2% 6%',
    },
  },
  statsIcon: {
    width: '40px',
    height: '45px',
    margin: '2px 0px 0px -45px',
  },
  statCount: {
    color: '#263960',
    fontFamily: 'sans-serif',
    fontSize: '16.8px',
    margin: '0px 0px -4px 8px',
    float: 'left',
    padding: '4px 60px',
  },
  statTitle: {
    color: '#0B3556',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    textTransform: 'none',
    margin: '0px 0px 0px 8px',
    float: 'left',
  },
};

/**
 * @property {statAPI} numberOfPrograms Used to index a stat value
 */
export const globalStatsData = [
  // A maximum of 6 stats are allowed
  {
    statTitle: 'Programs',
    type: 'field',
    statAPI: 'numberOfPrograms',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Data_Vol_.svg',
    statIconAlt: 'Data Volume Stats Bar Icon',
  },
  {
    statTitle: 'Arms',
    type: 'field',
    statAPI: 'numberOfStudies',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Data_Vol_.svg',
  },
  {
    statTitle: 'Cases',
    type: 'field',
    statAPI: 'numberOfSubjects',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Data_Vol_.svg',
  },
  {
    statTitle: 'samples',
    type: 'field',
    statAPI: 'numberOfSamples',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Data_Vol_.svg',
  },
  {
    statTitle: 'Assays',
    type: 'field',
    statAPI: 'numberOfLabProcedures',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Data_Vol_.svg',
  },
  {
    statTitle: 'files',
    type: 'field',
    statAPI: 'numberOfFiles',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Data_Vol_.svg',
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
