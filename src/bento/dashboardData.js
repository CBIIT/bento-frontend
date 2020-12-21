import gql from 'graphql-tag';

// --------------- Dashboard Sidebar Filters configuration --------------
// A maximum of 12 facetSearchData are allowed
export const facetSearchData = [
  {
    label: 'Program', field: 'group', api: 'subjectCountByProgram', filterAPI: 'filterSubjectCountByProgram', datafield: 'programs', section: 'Filter By Cases', show: true,
  },
  {
    label: 'Arm', field: 'group', api: 'subjectCountByStudy', filterAPI: 'filterSubjectCountByStudy', datafield: 'studies', section: 'Filter By Cases', show: true,
  },
  {
    label: 'Diagnosis', field: 'group', api: 'subjectCountByDiagnoses', filterAPI: 'filterSubjectCountByDiagnoses', datafield: 'diagnoses', section: 'Filter By Cases', show: true,
  },
  {
    label: 'Recurrence Score', field: 'group', api: 'subjectCountByRecurrenceScore', filterAPI: 'filterSubjectCountByRecurrenceScore', datafield: 'rc_scores', section: 'Filter By Cases', show: true,
  },
  {
    label: 'Tumor Size', field: 'group', api: 'subjectCountByTumorSize', filterAPI: 'filterSubjectCountByTumorSize', datafield: 'tumor_sizes', section: 'Filter By Cases', show: true,
  },
  {
    label: 'Chemotherapy', field: 'group', api: 'subjectCountByChemotherapyRegimen', filterAPI: 'filterSubjectCountByChemotherapyRegimen', datafield: 'chemo_regimen', section: 'Filter By Cases', show: true,
  },
  {
    label: 'Tumor Grade', field: 'group', api: 'subjectCountByTumorGrade', filterAPI: 'filterSubjectCountByTumorGrade', datafield: 'tumor_grades', section: 'Filter By Cases', show: true,
  },
  {
    label: 'ER Status', field: 'group', api: 'subjectCountByErStatus', filterAPI: 'filterSubjectCountByErStatus', datafield: 'er_status', section: 'Filter By Cases', show: true,
  },
  {
    label: 'PR Status', field: 'group', api: 'subjectCountByPrStatus', filterAPI: 'filterSubjectCountByPrStatus', datafield: 'pr_status', section: 'Filter By Cases', show: true,
  },
  {
    label: 'Endocrine Therapy', field: 'group', api: 'subjectCountByEndocrineTherapy', filterAPI: 'filterSubjectCountByEndocrineTherapy', datafield: 'endo_therapies', section: 'Filter By Cases', show: true,
  },
  {
    label: 'Menopause Status', field: 'group', api: 'subjectCountByMenopauseStatus', filterAPI: 'filterSubjectCountByMenopauseStatus', datafield: 'meno_status', section: 'Filter By Cases', show: true,
  },
  {
    label: 'Tissue Type', field: 'group', api: 'subjectCountByTissueType', filterAPI: 'filterSubjectCountByTissueType', datafield: 'tissue_type', section: 'Filter By Samples', show: true,
  },
  {
    label: 'Tissue Composition', field: 'group', api: 'subjectCountByTissueComposition', filterAPI: 'filterSubjectCountByTissueComposition', datafield: 'composition', section: 'Filter By Samples', show: true,
  },
  {
    label: 'File Association', field: 'group', api: 'subjectCountByFileAssociation', filterAPI: 'filterSubjectCountByFileAssociation', datafield: 'association', section: 'Filter By Files', show: true,
  },
  {
    label: 'File Type', field: 'group', api: 'subjectCountByFileType', filterAPI: 'filterSubjectCountByFileType', datafield: 'file_type', section: 'Filter By Files', show: true,
  },
];

// --------------- Dashboard Sidebar Sections styling --------------
export const facetSectionVariables = {
  'Filter By Cases': {
    color: '#10A075',
    height: '5px',
    labelAfterCount: 'cases',
  },
  'Filter By Samples': {
    color: '#10BEFF',
    height: '5px',
    labelAfterCount: 'samples',
  },
  'Filter By Files': {
    color: '#E636E4',
    height: '5px',
    labelAfterCount: 'files',
  },
};

// --------------- Dashboard Widgets configuration --------------
// A maximum of 6 widgets are allowed
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
    dataName: 'subjectCountByDiagnoses',
    datatable_field: 'diagnosis',
    show: true,
  },
  {
    type: 'donut',
    label: 'Recurrence Score',
    dataName: 'subjectCountByRecurrenceScore',
    datatable_field: 'recurrence_score',
    show: true,
  },
  {
    type: 'donut',
    label: 'Tumor Size',
    dataName: 'subjectCountByTumorSize',
    datatable_field: 'tumor_size',
    show: true,
  },
  {
    type: 'donut',
    label: 'Chemotherapy',
    dataName: 'subjectCountByChemotherapyRegimen',
    datatable_field: 'chemotherapy',
    show: true,
  },
  {
    type: 'donut',
    label: 'Endocrine Therapy',
    dataName: 'subjectCountByEndocrineTherapy',
    datatable_field: 'endocrine_therapy',
    show: true,
  },
];

// --------------- Dahboard Table external link configuration --------------
// Ideal size for externalLinkIcon is 16x16 px
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/program/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Dashboard Table configuration --------------
export const dashboardTable = {
  tableTitle: 'Cases',
  tableData: [
    // A maximum of 10 columns (tableData) are allowed
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
      display: false,
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
  ],
};

// --------------- Dashboard Query configuration --------------
export const GET_DASHBOARD_DATA_QUERY = gql`{
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
  subjectCountByFileType{
    group
    subjects
}
subjectCountByFileAssociation {
    group
    subjects
}
subjectCountByTissueComposition{
    group
    subjects
}
subjectCountByTissueType{
    group
    subjects
}
    armsByPrograms {
        program
        caseSize
        children {
            arm
            caseSize
            size
        }
    }
    subjectOverViewPaged(first: 100) {
      subject_id
      program_id
      study_info
      samples
      program
      study_acronym
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
      lab_procedures
      files{
        file_id
      }
  }
  }`;

// --------------- Dashboard Query configuration --------------
export const GET_DASHBOARD_TABLE_DATA_QUERY = gql`{

  subjectOverViewPaged(first: 1000000) {
      subject_id
      program_id
      study_info
      samples
      program
      study_acronym
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
      lab_procedures
      files{
        file_id
      }
  }
  }`;
