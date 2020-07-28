import gql from 'graphql-tag';

// --------------- Dashboard Sidebar Filters configuration --------------
export const facetSearchData = [
  {
    group: 'Program', field: 'group', api: 'subjectCountByProgram', datafield: 'program', show: true,
  },
  {
    group: 'Arm', field: 'group', api: 'subjectCountByStudy', datafield: 'study_info', show: true,
  },
  {
    group: 'Diagnosis', field: 'group', api: 'subjectCountByDiagnoses', datafield: 'diagnosis', show: true,
  },
  {
    group: 'Recurrence Score', field: 'group', api: 'subjectCountByRecurrenceScore', datafield: 'recurrence_score', show: true,
  },
  {
    group: 'Tumor Size', field: 'group', api: 'subjectCountByTumorSize', datafield: 'tumor_size', show: true,
  },
  {
    group: 'Chemotherapy Regimen', field: 'group', api: 'subjectCountByChemotherapyRegimen', datafield: 'chemotherapy', show: true,
  },
  {
    group: 'Tumor Grade', field: 'group', api: 'subjectCountByTumorGrade', datafield: 'tumor_grade', show: true,
  },
  {
    group: 'ER Status', field: 'group', api: 'subjectCountByErStatus', datafield: 'er_status', show: true,
  },
  {
    group: 'PR Status', field: 'group', api: 'subjectCountByPrStatus', datafield: 'pr_status', show: true,
  },
  {
    group: 'Chemotherapy', field: 'group', api: 'subjectCountByChemotherapyRegimen', datafield: 'chemotherapy', show: true,
  },
  {
    group: 'Endocrine Therapy', field: 'group', api: 'subjectCountByEndocrineTherapy', datafield: 'endocrine_therapy', show: true,
  },
  {
    group: 'Menopause Status', field: 'group', api: 'subjectCountByMenopauseStatus', datafield: 'menopause_status', show: true,
  },
];

// --------------- Dashboard Widgets configuration --------------
export const widgetsData = [
  {
    type: 'sunburst',
    label: 'Programs and Arms',
    dataName: 'armsByPrograms',
    datatable_level1_field: 'program',
    datatable_level2_field: 'study_acronym',
    show: true,
  },
  {
    type: 'donut',
    label: 'Diagnosis',
    dataName: 'caseCountByDiagnosis',
    datatable_field: 'diagnosis',
    show: true,
  },
  {
    type: 'donut',
    label: 'Recurrence Score',
    dataName: 'caseCountByRecurrenceScore',
    datatable_field: 'recurrence_score',
    show: true,
  },
  {
    type: 'donut',
    label: 'Tumor Size',
    dataName: 'caseCountByTumorSize',
    datatable_field: 'tumor_size',
    show: true,
  },
  {
    type: 'donut',
    label: 'Chemotherapy',
    dataName: 'caseCountByChemotherapy',
    datatable_field: 'chemotherapy',
    show: true,
  },
  {
    type: 'donut',
    label: 'Endocrine Therapy',
    dataName: 'caseCountByEndocrineTherapy',
    datatable_field: 'endocrine_therapy',
    show: true,
  },
];

// --------------- Dahboard Table external link configuration --------------
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/program/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Dashboard Table configuration --------------
export const dashboardTable = {
  tableTitle: 'Cases',
  tableData: [
    {
      field: 'subject_id',
      label: 'Case ID',
      sort: 'asc',
      link: '/case/{subject_id}',
      primary: true,
      display: true,
    },
    {
      field: 'program',
      label: 'Program Code',
      sort: 'asc',
      link: '/program/{program_id}',
      display: true,
    },
    {
      field: 'program_id',
      label: 'Program ID',
      sort: 'asc',
      display: false,
    },
    {
      field: 'study_acronym',
      label: 'Arm',
      sort: 'asc',
      link: '/arm/{study_acronym}',
      display: true,
    },
    {
      field: 'diagnosis',
      label: 'Diagnosis',
      sort: 'asc',
      display: true,
    },
    {
      field: 'recurrence_score',
      label: 'Recurrence Score',
      sort: 'asc',
      display: true,
    },
    {
      field: 'tumor_size',
      label: 'Tumor Size (cm)',
      sort: 'asc',
      display: true,
    },
    {
      field: 'er_status',
      label: 'ER Status',
      sort: 'asc',
      display: true,
    },
    {
      field: 'pr_status',
      label: 'PR Status',
      sort: 'asc',
      display: true,
    },
    {
      field: 'age_at_index',
      label: 'Age (years)',
      sort: 'asc',
      display: true,
    },
    {
      field: 'survival_time',
      label: 'Survival (days)',
      sort: 'asc',
      display: true,
    },
  ],
};

// --------------- Dashboard Query configuration --------------
export const DASHBOARD_QUERY = gql`{
  numberOfPrograms
  numberOfStudies
  numberOfSubjects
  numberOfSamples
  numberOfLabProcedures
  numberOfFiles
  subjectCountByProgram{
        group
        subjects
      }
    subjectCountByStudy{
        group
        subjects
      }
    subjectCountByDiagnoses{
        group
        subjects
      }
    subjectCountByRecurrenceScore{
        group
        subjects
      }
    subjectCountByTumorSize{
        group
        subjects
      }
    subjectCountByChemotherapyRegimen{
        group
        subjects
      }
    subjectCountByTumorGrade{
        group
        subjects
      }
  subjectCountByErStatus{
        group
        subjects
      }
  subjectCountByPrStatus{
        group
        subjects
      }
  subjectCountByMenopauseStatus{
        group
        subjects
      }
  subjectCountByChemotherapyRegimen{
        group
        subjects
      }
      subjectCountByEndocrineTherapy{
    group
    subjects
  }
    
    subjectOverView {
      subject_id
      program_id
      study_info
      samples
      lab_procedures
      program
      study_acronym
      study_short_description
      diagnosis
      recurrence_score
      tumor_size
      tumor_grade
      er_status
      pr_status
      chemotherapy
      endocrine_therapy
      menopause_status
      age_at_index
      survival_time
      survival_time_unit
      files{
        file_id
        file_type
        file_description
        file_format
        file_size
        file_name
        file_location
        md5sum
        file_status
      }
  }
  }`;
