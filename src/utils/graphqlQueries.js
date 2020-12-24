import gql from '@apollo/client';

export const GET_CASE_DETAIL_DATA_QUERY = gql`
  query subjectDetail($subject_id: String) {
    subjectDetail(subject_id: $subject_id) {
        subject_id
        program_acronym
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
  }`;

export const STATS_QUERY = gql`{
  numberOfTrials
  numberOfCases
  numberOfFiles
  }
  `;
export const LANDING_QUERY = gql`{
  numberOfCases
  numberOfTrials
  numberOfFiles
  numberOfArms
  numberOfFileTypes
  numberOfDiagnoses
  diagnosisCountByArm {
    arm_id
    diagnoses
    }
  }
  `;
