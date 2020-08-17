import gql from 'graphql-tag';

// --------------- Icons configuration --------------
const icon = {
  src: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/program/programIcon.svg',
  alt: 'Bento program logo',
};

const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/program/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Table configuration --------------
const table = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  title: 'Programs',
  // Field name for table data, need to be updated only when using a different GraphQL query
  dataField: 'programInfo',
  // Value must be one of the 'field' in columns
  defaultSortField: 'program_acronym',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // A maximum of 10 columns are allowed
  columns: [
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
      label: 'Associated Cases',
    },
  ],
};

// --------------- GraphQL query - Retrieve program info --------------
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
  icon,
  externalLinkIcon,
  table,
  PROGRAMS_QUERY,
};
