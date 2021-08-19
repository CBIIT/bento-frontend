import gql from 'graphql-tag';

// --------------- GraphQL query - Retrieve stats details --------------
export const GET_ALL_IDS = gql`{
  idsLists{
    subjectIds
    sampleIds
    fileIds
    fileNames
}
  }
  `;

export const GET_SEARCH_NODECOUNTS = gql`
  query nodeCounts($subject_ids: [String]=[], $sample_ids: [String] = [], $file_ids: [String]=[], $file_names: [String]=[]){
    nodeCountsFromLists(subject_ids: $subject_ids, sample_ids: $sample_ids, file_ids: $file_ids, file_names: $file_names) {
      numberOfPrograms
      numberOfStudies
      numberOfSubjects
      numberOfLabProcedures
      numberOfSamples
      numberOfFiles
  }



subjectCountByDiagnosesFromLists(subject_ids: $subject_ids, sample_ids: $sample_ids, file_ids: $file_ids, file_names: $file_names){
  group
  subjects
}
subjectCountByRecurrenceScoreFromLists(subject_ids: $subject_ids, sample_ids: $sample_ids, file_ids: $file_ids, file_names: $file_names){
  group
  subjects
}
subjectCountByTumorSizeFromLists(subject_ids: $subject_ids, sample_ids: $sample_ids, file_ids: $file_ids, file_names: $file_names) {
  group
  subjects
}
subjectCountByChemotherapyRegimenFromLists(subject_ids: $subject_ids, sample_ids: $sample_ids, file_ids: $file_ids, file_names: $file_names) {
  group
  subjects
}
subjectCountByEndocrineTherapyFromLists(subject_ids: $subject_ids, sample_ids: $sample_ids, file_ids: $file_ids, file_names: $file_names){
  group
  subjects
}

subjectCountByFileTypeFromLists(subject_ids: $subject_ids, sample_ids: $sample_ids, file_ids: $file_ids, file_names: $file_names) {
  group
  subjects
}

armsByProgramsFromLists(subject_ids: $subject_ids, sample_ids: $sample_ids, file_ids: $file_ids, file_names: $file_names){
  program
  caseSize
  children{
      arm
      caseSize
      size
  }
}  

findIdsFromLists(subject_ids: $subject_ids, sample_ids: $sample_ids, file_ids: $file_ids, file_names: $file_names){
  subjectIds
  sampleIds
  fileIds
  fileNames
}
}
  `;

export const widgetsSearchData = [
  {
    type: 'sunburst',
    label: 'Programs and Arms',
    dataName: 'armsByProgramsFromLists',
    mapWithDashboardWidget: 'armsByPrograms',
    datatable_level1_field: 'program',
    datatable_level2_field: 'study_acronym',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Diagnosis',
    dataName: 'subjectCountByDiagnosesFromLists',
    mapWithDashboardWidget: 'subjectCountByDiagnoses',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Recurrence Score',
    dataName: 'subjectCountByRecurrenceScoreFromLists',
    mapWithDashboardWidget: 'subjectCountByRecurrenceScore',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Tumor Size',
    dataName: 'subjectCountByTumorSizeFromLists',
    mapWithDashboardWidget: 'subjectCountByTumorSize',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Chemotherapy',
    dataName: 'subjectCountByChemotherapyRegimenFromLists',
    mapWithDashboardWidget: 'subjectCountByChemotherapyRegimen',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Endocrine Therapy',
    dataName: 'subjectCountByEndocrineTherapyFromLists',
    mapWithDashboardWidget: 'subjectCountByEndocrineTherapy',
    titleText: 'Cases',
    show: true,
  },
];
