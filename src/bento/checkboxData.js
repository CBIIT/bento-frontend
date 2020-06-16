const mappingCheckBoxToDataTable = [
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

export default mappingCheckBoxToDataTable;
