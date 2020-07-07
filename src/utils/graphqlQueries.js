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

export const PROGRAMS_QUERY = gql`{
   programInfo {
  program_acronym
  program_id
  program_name
  start_date
  end_date
  pubmed_id
  num_studies
  num_subjects
  }
}
  `;

export const PROGRAM_DETAIL_QUERY = gql`
query programDetail($program_id: String!) {
  programDetail(program_id: $program_id) {
    program_acronym
    program_id
    program_name
    program_full_description
    institution_name
    program_external_url
    num_subjects
    num_files
    disease_subtypes
    studies { 
      study_name
      study_type
      study_acronym
      study_full_description
      num_subjects
    }
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
