import gql from 'graphql-tag';

// --------------- Page title configuration --------------
const pageTitle = {
  label: 'Program :',
  dataField: 'program_acronym',
};

const pageSubTitle = {
  dataField: 'program_id',
};

const breadCrumb = {
  label: 'ALL PROGRAMS',
  link: '/programs',
};

// --------------- Aggregated count configuration --------------
const aggregateCount = {
  labelText: 'Cases',
  dataField: 'num_subjects',
  link: '/cases',
  display: true,
};

// --------------- Icons configuration --------------
// Ideal size for programDetailIcon is 107x107 px
// Ideal size for externalLinkIcon is 16x16 px
const programDetailIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/programIcon.svg',
  alt: 'Bento program logo',
};

const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Left Pannel configuration --------------
// A maximum of 6 leftPanelattributes are allowed
const leftPanel = {
  attributes: [
    {
      dataField: 'program_acronym',
      label: 'Program',
    },
    {
      dataField: 'program_name',
      label: 'Program Name',
    },
    {
      dataField: 'program_id',
      label: 'Program Id',
    },
    {
      dataField: 'program_full_description',
      label: 'Program Description',
    },
    {
      dataField: 'institution_name',
      label: 'Institution',
    },
    {
      dataField: 'program_external_url',
      label: 'External Link to Program',
      externalLinkToLabel: true,
    },
  ],
};

// --------------- Right Pannel configuration --------------
// Ideal size for fileIconSrc is 66x53 px
const rightPanel = {
  widget: [
    {
      dataField: 'diagnoses',
      label: 'Diagnosis',
      display: true,
    },
  ],
  files: [
    {
      dataField: 'num_files',
      label: 'Number of files',
      fileIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/programNumberofFilesIcon.svg',
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
  // Set 'selectableRows' to true to show the row selection
  selectableRows: false,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'study_acronym',
      header: 'Arm',
      link: '/arm/{study_acronym}',
    },
    {
      dataField: 'study_name',
      header: 'Arm Name',
    },
    {
      dataField: 'study_full_description',
      header: 'Arm Description',
    },
    {
      dataField: 'study_type',
      header: 'Arm Type',
    },
    {
      dataField: 'num_subjects',
      header: 'Associated Cases',
    },
  ],
};

// --------------- GraphQL query - Retrieve program details --------------
const GET_PROGRAM_DETAIL_DATA_QUERY = gql`
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
    num_samples
    num_lab_procedures
    disease_subtypes
    diagnoses {
      group
      subjects
    }
    studies { 
      study_name
      study_type
      study_acronym
      study_info
      study_full_description
      num_subjects
    }
  }
}`;

export {
  pageTitle,
  pageSubTitle,
  aggregateCount,
  programDetailIcon,
  leftPanel,
  rightPanel,
  externalLinkIcon,
  breadCrumb,
  GET_PROGRAM_DETAIL_DATA_QUERY,
  table,
};
