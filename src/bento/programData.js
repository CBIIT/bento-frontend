import gql from 'graphql-tag';
// import Test from '../assets/header/CTDC_Logo.svg';
// headerIconSrc optimum size 100x100
// wizardIconSrc optimum size 400x46.76

const tableTitle = 'Programs';

const icon = {
  src: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/program/programIcon.svg',
  alt: 'Bento program logo',
};

const table = {
  data: [
    {
      field: 'program_acronym',
      label: 'Program Code',
      internalLink: '/program/{program_id}',
    },
    {
      field: 'program_id',
      label: 'Program ID',
    },
    {
      field: 'program_name',
      label: 'Program Name',
    },
    {
      field: 'start_date',
      label: 'Start Date',
    },
    {
      field: 'end_date',
      label: 'End Date',
    },
    {
      field: 'pubmed_id',
      label: 'PubMed ID',
      externalLink: 'https://pubmed.ncbi.nlm.nih.gov/{}',
    },
    {
      field: 'num_studies',
      label: 'Number of ARMs',
    },
    {
      field: 'num_subjects',
      label: 'Cases',
    },
  ],
};

const PROGRAMS_QUERY = gql`{
  programInfo {
 program_acronym
 program_id
 program_name
 start_date
 end_date
 pubmed_id
 num_studies
 num_subjects
 }
}
 `;

export {
  tableTitle,
  icon,
  PROGRAMS_QUERY,
  table,
};
