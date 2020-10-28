import gql from 'graphql-tag';
import { FileOnRowsSelect } from '../utils/fileTable';

// -------------- Case ID area configurations --------------
const header = {
  label: 'Arm',
  dataField: 'study_acronym',
};

// --------------- Data panel configuration --------------
const subsections = [
  // Each object here represents a subsection in the panel
  // A maximum of 6 subsections are allowed
  {
    properties: [
      // Each object here represents a set of label:value pair of a property
      // A maximum of 10 properties are allowed
      {
        label: 'Arm',
        dataField: 'study_acronym',
        // link property specify URL value should link to
        // space holder "{study_acronym}" will be replaced by
        // actual value in the property program_id
        // link: '/arm/{study_acronym}',
        // labelLink property specify URL label should link to
        // labelLink: '/programs',
        // external links must have URL scheme part such as "https://"
      },
      {
        label: 'Arm Name',
        dataField: 'study_name',
      },
      {
        label: 'Arm Type',
        dataField: 'study_type',
      },
      {
        label: 'Arm Description',
        dataField: 'study_full_description',
      },
    ],
  },
];

// Ideal size for externalLinkIcon is 16x16 px
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/program/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- File table configuration --------------
const table = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  title: 'ASSOCIATED FILES',
  // Field name for files data, need to be updated only when using a different GraphQL query
  filesField: 'files',
  // Value must be one of the 'dataField's in "columns"
  defaultSortField: 'file_name',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: false,
  tooltipMessage: 'Click button to add selected files.',
  helpMessage: 'Here help message',
  // Text to appear on Add to cart button
  buttonText: 'Add Selected Files',
  columns: [
    {
      dataField: 'file_name',
      header: 'File Name',
    },
    {
      dataField: 'file_type',
      header: 'File Type',
    },
    {
      dataField: 'association',
      header: 'Association',
    },
    {
      dataField: 'file_description',
      header: 'Description',
    },
    {
      dataField: 'file_format',
      header: 'Format',
    },
    {
      dataField: 'file_size',
      header: 'Size',
      // set formatBytes to true to display file size (in bytes) in a more human readable format
      formatBytes: true,
    },
  ],
  // Util Functions
  // Custom function on selct checkbox is selected.
  customOnRowsSelect: FileOnRowsSelect,
  // Custom function disable selct checkbox in table if related files are in cart
  disableRowSelection: null,
};

// --------------- GraphQL query configuration --------------

// query name, also used as root of returned data
const dataRoot = 'armDetail';
// Primary ID field used to query a case
const armIDField = 'study_acronym';
// GraphQL query to retrieve detailed info for a case
const GET_ARM_DETAIL_DATA_QUERY = gql`
  query armDetail($study_acronym: String) {
    armDetail(study_acronym: $study_acronym) {
      study_acronym
      study_name
      study_type
      study_full_description
      study_info
      num_subjects
      num_files
      num_samples
      num_lab_procedures
      diagnoses {
        group
        subjects
      }
      files {
        file_name
        file_type
        file_description
        file_format
        file_size
        file_id
        md5sum
      }
    }
  }
`;

export {
  header,
  dataRoot,
  armIDField,
  subsections,
  table,
  GET_ARM_DETAIL_DATA_QUERY,
};
