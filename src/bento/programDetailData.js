import gql from 'graphql-tag';

// --------------- Page title configuration --------------
const pageTitle = {
  label: 'Program :',
  field: 'program_acronym',
};

const pageSubTitle = {
  field: 'program_id',
};

const breadCrumb = {
  label: 'ALL PROGRAMS',
  link: '/programs',
};

// --------------- Aggregated count configuration --------------
const aggregateCount = {
  labelText: 'Cases',
  field: 'num_subjects',
  link: '/cases',
  display: true,
};

// --------------- Icons configuration --------------
const icon = {
  src: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/program/programIcon.svg',
  alt: 'Bento program logo',
};

const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/program/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Left Pannel configuration --------------
const leftPanelattributes = {
  data: [
    {
      field: 'program_acronym',
      label: 'Program',
    },
    {
      field: 'program_name',
      label: 'Program Name',
    },
    {
      field: 'program_id',
      label: 'Program Id',
    },
    {
      field: 'program_full_description',
      label: 'Program Description',
    },
    {
      field: 'institution_name',
      label: 'Institution',
    },
    {
      field: 'program_external_url',
      label: 'External Link to Program',
      externalLinkToLabel: true,
    },
  ],
};

// --------------- Right Pannel configuration --------------
const rightpannel = {
  widjet: [
    {
      field: 'diagnosis',
      label: 'Diagnosis',
      display: true,
    },
  ],
  files: [
    {
      field: 'num_files',
      label: 'Number of files',
      fileIconSrc: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/program/programNumberofFilesIcon.svg',
      fileIconAlt: 'Number of files icon',
      display: true,
    },
  ],
};

// --------------- Table configuration --------------
const table = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  title: 'ARMS',
  // Field name for table data, need to be updated only when using a different GraphQL query
  dataField: 'studies',
  // Value must be one of the 'field' in columns
  defaultSortField: 'study_acronym',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Columns
  columns: [
    {
      field: 'study_acronym',
      label: 'Arm',
      link: '/arm/{study_acronym}',
    },
    {
      field: 'study_name',
      label: 'Arm Name',
    },
    {
      field: 'study_full_description',
      label: 'Arm Description',
    },
    {
      field: 'study_type',
      label: 'Arm Type',
    },
    {
      field: 'num_subjects',
      label: 'Cases',
    },
  ],
};

// --------------- GraphQL query - Retrieve program details --------------
const PROGRAM_DETAIL_QUERY = gql`
query programDetail($program_id: String!) {
  programDetail(program_id: $program_id) {
    program_acronym
    program_id
    program_name
    program_full_description
    institution_name
    program_external_url
    num_subjects
    num_files
    disease_subtypes
    studies { 
      study_name
      study_type
      study_acronym
      study_full_description
      num_subjects
    }
  }
}`;

export {
  pageTitle,
  pageSubTitle,
  aggregateCount,
  icon,
  leftPanelattributes,
  rightpannel,
  externalLinkIcon,
  breadCrumb,
  PROGRAM_DETAIL_QUERY,
  table,
};
