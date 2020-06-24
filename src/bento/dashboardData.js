import gql from 'graphql-tag';

export const facetSearchData = [
  {
    group: 'Program', field: 'group', api: 'subjectCountByProgram', datafield: 'program', show: true,
  },
  {
    group: 'Study', field: 'group', api: 'subjectCountByStudy', datafield: 'study_info', show: true,
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
    group: 'Menopause Status', field: 'group', api: 'subjectCountByMenopauseStatus', datafield: 'menopause_status', show: true,
  },
];

export const widgetsData = [
  {
    type: 'sunburst',
    label: 'Programs and Arms',
    data: 'armsByTrial',
    datatable_level1_field: 'program',
    datatable_level2_field: 'study_acronym',
    show: true,
  },
  {
    type: 'donut',
    label: 'Diagnosis',
    data: 'caseCountByDiagnosis',
    datatable_field: 'diagnosis',
    show: true,
  },
  {
    type: 'donut',
    label: 'Recurrence Score',
    data: 'caseCountByRecurrenceScore',
    datatable_field: 'recurrence_score',
    show: true,
  },
  {
    type: 'donut',
    label: 'Tumor Size',
    data: 'caseCountByTumorSize',
    datatable_field: 'tumor_size',
    show: true,
  },
  {
    type: 'donut',
    label: 'Chemotherapy',
    data: 'caseCountByChemotherapy',
    datatable_field: 'chemotherapy',
    show: true,
  },
  {
    type: 'donut',
    label: 'Endocrine Therapy',
    data: 'caseCountByEndocrineTherapy',
    datatable_field: 'endocrine_therapy',
    show: true,
  },
];

export const dashboardTable = {
  tableTitle: 'Cases',
  tableData: [
    {
      field: 'subject_id',
      label: 'Case ID',
      sort: 'asc',
      cellRenderPath: '/case',
      primary: true,
      display: true,
    },
    {
      field: 'program',
      label: 'Program Code',
      sort: 'asc',
      cellRenderPath: '/trial',
      display: true,
    },
    {
      field: 'study_acronym',
      label: 'Arm',
      sort: 'asc',
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

export const DASHBOARD_QUERY = gql`{
  numberOfPrograms
  numberOfStudies
  numberOfSubjects
  numberOfSamples
  numberOfLabProcedures
  numberOfFiles
  subjectCountByProgram{
        group
         count
      }
    subjectCountByStudy{
        group
         count
      }
    subjectCountByDiagnoses{
        group
         count
      }
    subjectCountByRecurrenceScore{
        group
         count
      }
    subjectCountByTumorSize{
        group
         count
      }
    subjectCountByChemotherapyRegimen{
        group
         count
      }
    subjectCountByTumorGrade{
        group
         count
      }
  subjectCountByErStatus{
        group
         count
      }
  subjectCountByPrStatus{
        group
         count
      }
  subjectCountByMenopauseStatus{
        group
         count
      }
    
    subjectOverView {
      subject_id
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
