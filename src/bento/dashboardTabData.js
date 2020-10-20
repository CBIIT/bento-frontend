// --------------- Tooltip configuration --------------
export const tooltipContent = {
  0: 'Click button to add selected files associated with the selected case(s).',
  1: 'Click button to add selected files associated with the selected sample(s).',
  2: 'Click button to add selected files.',
};

// --------------- Dahboard Table external link configuration --------------
// Ideal size for externalLinkIcon is 16x16 px
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/program/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Tabs Table configuration --------------
export const tabContainers = [
  {
    id: 'case_tab',
    name: 'Cases',
    dataField: 'dataCase',
    onRowsSelect: 'type1',
    disableRowSelection: 'type1',
    buttonTitle: 'Add Selected Files',
    tableID: 'case_tab_table',
    saveButtonDefaultStyle: {
      color: '#fff',
      backgroundColor: '#09A175',
      opacity: '1',
      border: '0px',
      cursor: 'pointer',
    },
    ActiveSaveButtonDefaultStyle: {
      disabled: 'true',
      opacity: '0.3',
      cursor: 'auto',
    },
    DeactiveSaveButtonDefaultStyle: {
      cursor: 'pointer',
      opacity: 'unset',
      border: 'unset',
    },
    tabIndex: '0',
    downloadFileName: 'Bento_Dashboard_cases_download',
    columns: [
      {
        dataField: 'subject_id',
        header: 'Case ID',
        sort: 'asc',
        link: '/case/{subject_id}',
        primary: true,
        display: true,
      },
      {
        dataField: 'program',
        header: 'Program Code',
        sort: 'asc',
        link: '/program/{program_id}',
        display: true,
      },
      {
        dataField: 'program_id',
        header: 'Program ID',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'study_acronym',
        header: 'Arm',
        sort: 'asc',
        link: '/arm/{study_acronym}',
        display: true,
      },
      {
        dataField: 'diagnosis',
        header: 'Diagnosis',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'recurrence_score',
        header: 'Recurrence Score',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'tumor_size',
        header: 'Tumor Size (cm)',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'er_status',
        header: 'ER Status',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'pr_status',
        header: 'PR Status',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'age_at_index',
        header: 'Age (years)',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'survival_time',
        header: 'Survival (days)',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'cohort_description',
        header: 'Cohort',
        sort: 'asc',
        display: true,
      },
    ],
  },
  {
    id: 'sample_tab',
    name: 'Samples',
    dataField: 'dataSample',
    onRowsSelect: 'type3',
    disableRowSelection: 'type2',
    buttonTitle: 'Add Selected Files',
    tableID: 'sample_tab_table',
    saveButtonDefaultStyle: {
      color: '#fff',
      backgroundColor: '#00AEEF',
      opacity: '1',
      border: '0px',
      cursor: 'pointer',
    },
    ActiveSaveButtonDefaultStyle: {
      opacity: '0.3',
      cursor: 'auto',
    },
    DeactiveSaveButtonDefaultStyle: {
      cursor: 'pointer',
      opacity: 'unset',
      border: 'unset',
    },
    tabIndex: '1',
    downloadFileName: 'Bento_Dashboard_cases_download',
    columns: [
      {
        dataField: 'sample_id',
        header: 'Sample ID',
        sort: 'asc',
        primary: true,
        display: true,
      },
      {
        dataField: 'subject_id',
        header: 'Case ID',
        sort: 'asc',
        link: '/program/{subject_id}',
        display: true,
      },
      {
        dataField: 'program',
        header: 'Program Code',
        sort: 'asc',
        link: '/program/{program_id}',
        display: true,
      },
      {
        dataField: 'arm',
        header: 'Arm',
        sort: 'asc',
        link: '/arm/{study_acronym}',
        display: true,
      },
      {
        dataField: 'diagnosis',
        header: 'Diagnosis',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'tissue_type',
        header: 'Tissue Type',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'tumor_size',
        header: 'Tumor Size (cm)',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'tissue_composition',
        header: 'Tissue Composition',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'sample_anatomic_site',
        header: 'Sample Anatomic Site',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'sample_procurement_method',
        header: 'Sample Procurement Method',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'platform',
        header: 'platform',
        sort: 'asc',
        display: true,
      },
    ],
  },
  {
    id: 'file_tab',
    name: 'Files',
    dataField: 'dataFile',
    onRowsSelect: 'type2',
    disableRowSelection: 'type3',
    buttonTitle: 'Add Selected Files',
    tableID: 'file_tab_table',
    saveButtonDefaultStyle: {
      color: '#fff',
      backgroundColor: '#DC2FDA',
      opacity: '1',
      border: '0px',
      cursor: 'pointer',
    },
    ActiveSaveButtonDefaultStyle: {
      opacity: '0.3',
      cursor: 'auto',
    },
    DeactiveSaveButtonDefaultStyle: {
      cursor: 'pointer',
      opacity: 'unset',
      border: 'unset',
    },
    tabIndex: '2',
    downloadFileName: 'Bento_Dashboard_cases_download',
    columns: [
      {
        dataField: 'file_id',
        header: 'File ID',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'file_name',
        header: 'File Name',
        sort: 'asc',
        link: '/program/{program_id}',
        primary: true,
        display: true,
      },
      {
        dataField: 'association',
        header: 'Association',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'file_description',
        header: 'Description',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'file_format',
        header: 'Format',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'file_size',
        header: 'Size',
        sort: 'asc',
        display: true,
        formatBytes: true,
      },
      {
        dataField: 'program',
        header: 'Program Code',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'arm',
        header: 'Arm',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'subject_id',
        header: 'Case ID',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'sample_id',
        header: 'Sample ID',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'diagnosis',
        header: 'Diagnosis',
        sort: 'asc',
        display: true,
      },
    ],
  },
];

// --------------- Tabs Header Data configuration --------------
export const tabs = [
  {
    id: 'case_tab',
    name: 'Cases',
    dataField: 'dataCase',
  },
  {
    id: 'sample_tab',
    name: 'Samples',
    dataField: 'dataSample',
  },
  {
    id: 'file_tab',
    name: 'Files',
    dataField: 'dataFile',
  },
];

// --------------- Tabs Header Style configuration --------------
export const tabIndex = {
  0: {
    title: 'Cases',
    primaryColor: '#D6F2EA',
    secondaryColor: '#FFDFB8',
    selectedColor: '#10A075',
  },
  1: {
    title: 'Samples',
    primaryColor: '#CFEDF9',
    secondaryColor: '#C9F1F1',
    selectedColor: '#0DAFEC',
  },
  2: {
    title: 'Files',
    primaryColor: '#F7D7F7',
    secondaryColor: '#86D6F0',
    selectedColor: '#C92EC7',
  },
};
