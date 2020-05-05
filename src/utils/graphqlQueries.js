import gql from 'graphql-tag';

export const DASHBOARD_QUERY = gql`{
    numberOfTrials
    numberOfCases
    numberOfFiles

     casesCountBaseOnTrialId {
        clinical_trial_id
        cases
    }
     casesCountBaseOnTrialCode {
        clinical_trial_designation
        cases
    }
     casesCountBaseOnPubMedID {
        pubmed_id
        cases
    }
     casesCountBaseOnGender {
        gender
        cases
    }
     casesCountBaseOnRace {
        race
        cases
    }
    casesCountBaseOnEthnicity {
        ethnicity
        cases
    }

    casesCountBaseOnDiagnosis {
        disease
        cases
    }
     casesCountBaseOnFileType {
        file_type
        cases
    }
    casesCountBaseOnFileFormat {
        file_format
        cases
    }

    casesCountBaseOnTrialArm {
        trial_arm
        cases
    }
    
   caseOverview{   
        case_id
        clinical_trial_code
        arm_id
        arm_drug
        disease
        gender
        race
        arm_target
        ethnicity
        clinical_trial_id
        pubmed_id
        trial_arm
        file_types
        file_formats
        files{
           uuid
           file_name
           file_type
           file_description
           file_format
           file_size
        }
     }
}`;


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
query casesInList($caseIds: [String!]!) {

  casesInList(case_ids: $caseIds) {
    case_id
    clinical_trial_code
    clinical_trial_id
    arm_id
    arm_drug
    disease
    gender
    race
    arm_target
    ethnicity
}
 filesOfCases(case_ids: $caseIds) {
      case_id
    parent
    file_name
    file_type
    file_description
    file_format
    file_size
    md5sum
    uuid
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
