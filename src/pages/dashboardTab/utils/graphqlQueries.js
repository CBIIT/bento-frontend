import gql from 'graphql-tag';

export const DASHBOARD_QUERY_TMP = gql`{ sample{
    sample_id
    files{
      uuid
    }
   } }`;
export const DASHBOARD_QUERY = gql`{

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
