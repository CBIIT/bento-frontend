import gql from 'graphql-tag';

// --------------- GraphQL query configuration --------------

// query name, also used as root of returned data
const dataRoot = 'subjectDetail';
// query name, also used as key for files to Samples Mapping.
const filesOfSamples = 'samplesForSubjectId';
// Primary ID field used to query a case
const caseIDField = 'subject_id';

// GraphQL query to retrieve detailed info for a case
const GET_CASE_DETAIL_DATA_QUERY = gql`
  query subjectDetail($subject_id: String!) {
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
      test_name
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
      samples {
        sample_id
        sample_anatomic_site
        composition
        method_of_sample_procurement
        tissue_type
        sample_type
      }
      num_samples
      num_lab_procedures
    }
    samplesForSubjectId(subject_id: $subject_id) {
      sample_id
      files {
        file_id
        file_name
      }
    }
  }
`;

export {
  dataRoot,
  caseIDField,
  filesOfSamples,
  GET_CASE_DETAIL_DATA_QUERY,
};
