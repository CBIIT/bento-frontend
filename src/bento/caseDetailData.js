import gql from 'graphql-tag';

// -------------- Case ID area configurations --------------
const caseHeader = {
  label: 'Case ID',
  dataField: 'subject_id',
};

// --------------- Data panel configuration --------------
const leftPanelSubsections = [
  // Each object here represents a subsection in the panel
  // A maximum of 3 subsections are allowed
  {
    sectionHeader: 'Program',
    // sectionDesc: 'Subsection description goes here',
    properties: [
      // A maximum of 10 properties are allowed
      {
        label: 'Assigned to Program',
        dataField: 'program_acronym',
        // link property specify URL value should link to
        // space holder "{program_id}" will be replaced by actual value in the property program_id
        link: '/program/{program_id}',
        // labelLink property specify URL label should link to
        // labelLink: '/programs',
        // external links must have URL scheme part such as "https://"
      },
      {
        label: 'Arm',
        dataField: 'study_acronym',
        link: '/arm/{study_acronym}',
      },
      {
        label: 'Arm Description',
        dataField: 'study_name',
      },
    ],
  },
  {
    sectionHeader: 'Demographics',
    // sectionDesc: 'Demographic Related Info',
    properties: [
      // A maximum of 10 properties are allowed
      {
        label: 'Gender',
        dataField: 'gender',
      },
      {
        label: 'Race',
        dataField: 'race',
      },
      {
        label: 'Ethnicity',
        dataField: 'ethnicity',
      },
      {
        label: 'Age At Enrollment',
        dataField: 'age_at_index',
      },
      {
        label: 'Menopause Status',
        dataField: 'menopause_status',
      },
      {
        label: 'Vital Status',
        dataField: 'vital_status',
      },
      {
        label: 'Cause Of Death',
        dataField: 'cause_of_death',
      },
    ],
  },
  {
    sectionHeader: 'Diagnosis',
    // sectionDesc: 'Diagnosis Related Info',
    properties: [
      {
        label: 'Diagnosis',
        dataField: 'disease_type',
      },
      {
        label: 'Diagnosis Subtype',
        dataField: 'disease_subtype',
      },
      {
        label: 'Tumor Grade',
        dataField: 'tumor_grade',
      },
      {
        label: 'Tumor Grade (mm)',
        dataField: 'tumor_largest_dimension_diameter',
      },
      {
        label: 'ER Status',
        dataField: 'er_status',
      },
      {
        label: 'PR Status',
        dataField: 'pr_status',
      },
      {
        label: 'Nuclear Grade',
        dataField: 'nuclear_grade',
      },
      {
        label: 'Recurrence Score',
        dataField: 'recurrence_score',
      },
    ],
  },
];

const rightPanelSubsections = [
  // Each object here represents a subsection in the panel
  // A maximum of 3 subsections are allowed
  {
    sectionHeader: 'Treatment',
    // sectionDesc: 'Treatment Related Info',
    properties: [
      // A maximum of 10 properties are allowed
      {
        label: 'Primary Surgical Procedure',
        dataField: 'primary_surgical_procedure',
      },
      {
        label: 'Chemotherapy Regimen Group',
        dataField: 'chemotherapy_regimen_group',
      },
      {
        label: 'Chemotherapy Regimen',
        dataField: 'chemotherapy_regimen',
      },
      {
        label: 'Endocrine Therapy Type',
        dataField: 'endocrine_therapy_type',
      },
    ],
  },
  {
    sectionHeader: 'Follow Up',
    // sectionDesc: 'Follow Up Related Info',
    properties: [
      // A maximum of 10 properties are allowed
      {
        label: 'Is Disease Free',
        dataField: 'dfs_event_indicator',
      },
      {
        label: 'Is Recurrence Free',
        dataField: 'recurrence_free_indicator',
      },
      {
        label: 'Is Distant Recurrence Free',
        dataField: 'distant_recurrence_indicator',
      },
      {
        label: 'Disease Free Event Type',
        dataField: 'dfs_event_type',
      },
      {
        label: 'Recurrence Event Type',
        dataField: 'first_recurrence_type',
      },
      {
        label: 'Days to Progression',
        dataField: 'days_to_progression',
      },
      {
        label: 'Days to Recurrence',
        dataField: 'days_to_recurrence',
      },
    ],
  },
];

// --------------- File table configuration --------------

const tableConfig = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  title: 'ASSOCIATED FILES',
  // Field name for files data, need to be updated only when using a different GraphQL query
  filesField: 'files',
  // Value must be one of the 'dataField's in fileTableColumns
  defaultSortField: 'file_name',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // A maximum of 10 columns are allowed
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
};

// --------------- GraphQL query configuration --------------

// query name, also used as root of returned data
const dataRoot = 'subjectDetail';
// Primary ID field used to query a case
const caseIDField = 'subject_id';
// GraphQL query to retrieve detailed info for a case
const GET_CASE_DETAIL_DATA_QUERY = gql`
  query subjectDetail($subject_id: String) {
    subjectDetail(subject_id: $subject_id) {
      subject_id
      program_acronym
      program_id
      study_acronym
      study_name
      gender
      race
      ethnicity
      age_at_index
      menopause_status
      vital_status
      cause_of_death
      disease_type
      disease_subtype
      tumor_grade
      tumor_largest_dimension_diameter
      er_status
      pr_status
      nuclear_grade
      recurrence_score
      primary_surgical_procedure
      chemotherapy_regimen_group
      chemotherapy_regimen
      endocrine_therapy_type
      dfs_event_indicator
      recurrence_free_indicator
      distant_recurrence_indicator
      dfs_event_type
      first_recurrence_type
      days_to_progression
      days_to_recurrence
      files {
        subject_id
        file_name
        file_type
        association
        file_description
        file_format
        file_size
        file_id
        md5sum
      }
      num_samples
      num_lab_procedures
    }
  }
`;

export {
  caseHeader,
  dataRoot,
  caseIDField,
  leftPanelSubsections,
  rightPanelSubsections,
  tableConfig,
  GET_CASE_DETAIL_DATA_QUERY,
};
