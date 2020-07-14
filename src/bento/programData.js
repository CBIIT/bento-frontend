import gql from 'graphql-tag';

const tableTitle = 'Programs';

const icon = {
  src: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/program/programIcon.svg',
  alt: 'Bento program logo',
};

const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/program/externalLinkIcon.svg',
  alt: 'External link icon',
};

const table = {
  data: [
    {
      field: 'program_acronym',
      label: 'Program Code',
      link: '/program/{program_id}',
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
      link: 'https://pubmed.ncbi.nlm.nih.gov/{pubmed_id}',
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
  externalLinkIcon,
  PROGRAMS_QUERY,
  table,
};
