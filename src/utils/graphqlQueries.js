import gql from 'graphql-tag';

export const GET_CASE_DETAIL_DATA_QUERY = gql`
  query caseDetailByCaseId($case_id: String!){
          caseDetailByCaseId(case_id:$case_id){
            case_id
            clinical_trial_code
            clinical_trial_id
            disease
            gender
            race
            arms{
                arm_id
                arm_target
                arm_drug
            }
            ethnicity
          }
          filesOfCase(case_id:$case_id){
        parent 
        file_name 
        file_type 
        file_description 
        file_format 
        file_size 
        md5sum 
    }
      }`;

export const GET_MY_CASES_DATA_QUERY = gql`
query subjectsInList($subject_ids: [String!]!) {

  subjectsInList(subject_ids: $subject_ids) {
    subject_id
    program
    study_acronym
    diagnosis
    recurrence_score
    tumor_size
    er_status
    pr_status
    age_at_index
    survival_time
    survival_time_unit
}
filesOfSubjects(subject_ids: $subject_ids) {
   subject_id
    file_description
    file_format
    file_name
    file_size
    file_type
    association
    file_id
    md5sum
}

}`;

export const TRIALS_QUERY = gql`{
   clinicalTrials{
    clinical_trial_id
  clinical_trial_short_name
  clinical_trial_description
  clinical_trial_designation
  clinical_trial_long_name
  clinical_trial_type
  lead_organization
  principal_investigators
  number_of_arms
  number_of_cases
    }
}
  `;

export const TRIAL_BY_ID_QUERY = gql`
query clinicalTrialByTrialId($id: String!) {

   caseCountByTrialId(trial_id:$id)
   fileCountByTrialId(trial_id:$id)

  clinicalTrialByTrialId(trial_id: $id) {
  clinical_trial_id
  clinical_trial_short_name
  clinical_trial_description
  clinical_trial_designation
  clinical_trial_long_name
  clinical_trial_type
  lead_organization
  principal_investigators
  number_of_cases
  number_of_arms
}

clinicalTrialArmByTrialId(trial_id:$id){
                  arm_id
                  arm_target
                  arm_drug
                  pubmed_id
                  number_of_cases
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
