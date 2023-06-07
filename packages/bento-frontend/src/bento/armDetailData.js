import gql from 'graphql-tag';
import { cellTypes } from '@bento-core/table';

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  src: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  alt: 'tooltipIcon',
  arrow: true,
  placement: 'top-end',
  sample: 'Click button to add selected files associated with the selected sample(s).',
  files: 'Click button to add selected files.',
};

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
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
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
  GET_ARM_DETAIL_DATA_QUERY,
};

// --------------- File table configuration --------------
export const filesTable = {
  name: 'files',
  // Set 'display' to false to hide the table entirely
  display: true,
  dataKey: 'file_name',
  // Table title
  title: 'ASSOCIATED FILES',
  // Field name for files data, need to be updated only when using a different GraphQL query
  filesField: 'files',
  // Value must be one of the 'dataField's in "columns"
  defaultSortField: 'file_name',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: true,
  tooltipMessage: 'Click button to add selected files.',
  helpMessage: 'Here help message',
  // Text to appear on Add to cart button
  buttonText: 'Add Selected Files',
  columns: [
    {
      cellType: cellTypes.CHECKBOX,
      role: cellTypes.CHECKBOX,
      display: true,
    },
    {
      dataField: 'file_name',
      header: 'File Name',
      display: true,
      role: cellTypes.DISPLAY,
      tooltipText: 'sort',
    },
    {
      dataField: 'file_type',
      header: 'File Type',
      display: true,
      role: cellTypes.DISPLAY,
      tooltipText: 'sort',
    },
    {
      dataField: 'file_description',
      header: 'Description',
      display: true,
      role: cellTypes.DISPLAY,
      tooltipText: 'sort',
    },
    {
      dataField: 'file_format',
      header: 'Format',
      display: true,
      role: cellTypes.DISPLAY,
      tooltipText: 'sort',
    },
    {
      dataField: 'file_size',
      header: 'Size',
      // set formatBytes to true to display file size (in bytes) in a more human readable format
      formatBytes: true,
      display: true,
      role: cellTypes.DISPLAY,
      tooltipText: 'sort',
    },
  ],
  tableMsg: {
    noMatch: 'Sorry, no matching records found',
  },
};
