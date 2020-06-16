const mappingCheckBoxToDataTable = [
  {
    group: 'Program', field: 'group', api: 'subjectCountByProgram', datafield: 'group', show: true,
  },
  {
    group: 'Study', field: 'group', api: 'subjectCountByStudy', datafield: 'group', show: true,
  },
  {
    group: 'Diagnosis', field: 'group', api: 'subjectCountByDiagnoses', datafield: 'group', show: true,
  },
  {
    group: 'Recurrence Score', field: 'group', api: 'subjectCountByRecurrenceScore', datafield: 'group', show: true,
  },
  {
    group: 'Tumor Size', field: 'group', api: 'subjectCountByTumorSize', datafield: 'group', show: true,
  },
  {
    group: 'Chemotherapy Regimen', field: 'group', api: 'subjectCountByChemotherapyRegimen', datafield: 'group', show: true,
  },
  {
    group: 'Tumor Grade', field: 'group', api: 'subjectCountByTumorGrade', datafield: 'group', show: true,
  },
  {
    group: 'ER Status', field: 'group', api: 'subjectCountByErStatus', datafield: 'group', show: true,
  },
  {
    group: 'PR Status', field: 'group', api: 'subjectCountByPrStatus', datafield: 'group', show: true,
  },
  {
    group: 'Menopause Status', field: 'group', api: 'subjectCountByMenopauseStatus', datafield: 'group', show: true,
  },
];

export default mappingCheckBoxToDataTable;
