import gql from 'graphql-tag';

export const STATS_QUERY = gql`{
  numberOfStudies
  numberOfCases
  numberOfSamples
  numberOfFiles
  numberOfAliquots
  }
  `;

export const DASHBOARD_QUERY = gql`{
    numberOfStudies
    numberOfCases
    numberOfSamples
    numberOfFiles
    numberOfAliquots

    
    caseCountByFileFormat{
      file_format
       cases
    }
    caseCountByBreed {
      cases
      breed
    }
    caseCountByGender {
      cases
      gender
    }
    caseCountByDiagnosis {
      cases
      diagnosis
    }
    caseCountByDiseaseSite { 
      cases
      disease_site 
    }
    caseCountByStageOfDisease { 
      cases
      stage_of_disease 
    }

    caseCountByStudyCode{
      study_code
     cases
    }

   caseCountByStudyType {
     study_type
     cases
    }

    caseCountByAge {
     age
     cases
    }

    caseCountByDataType {
     data_type
     cases
    }
    caseCountByProgram {
     program
     cases
    }

   caseOverview{   
        case_id  
        program
        study_code   
        study_type   
        breed   
        diagnosis   
        stage_of_disease   
        age   
        sex   
        neutered_status
        data_types
        disease_site
        samples
        files{
          uuid
          file_format
          file_type
        }
        file_formats
     }
  }`;

export const GET_STUDYTABLE_DATA_QUERY = gql`{
    studiesByProgram {
        program_id
        clinical_study_designation
        clinical_study_name
         clinical_study_type
         numberOfCases
    }
  }
  `;

export const GET_CASE_DETAIL_DATA_QUERY = gql`
  query Case($case_id: String!) {
    sampleCountOfCase(case_id:$case_id)
    fileCountOfCase(case_id: $case_id)
    aliquotCountOfCase(case_id: $case_id)
    fileCountOfCase(case_id: $case_id)
    case(case_id:$case_id){
        case_id
        patient_id
        patient_first_name
        study{
            clinical_study_name
            clinical_study_designation
            program{
            program_acronym
          }
        }
        demographic{
            breed
            sex
            patient_age_at_enrollment
            neutered_indicator
        }
        cohort{
            cohort_description
            study_arm{
                arm
                ctep_treatment_assignment_code
            }
        }
        enrollment{
            site_short_name
            date_of_registration
            patient_subgroup
            date_of_informed_consent
            initials
        }
        diagnoses{
            disease_term
            stage_of_disease
            date_of_diagnosis
            primary_disease_site
            histological_grade
            histology_cytopathology
        }
    }
    filesOfCase(case_id:$case_id)
    {   
        parent 
        file_name 
        file_type 
        file_description 
        file_format 
        file_size 
        md5sum 

    }
 }`;


export const GET_CASES_QUERY = gql`
   query Case($study_id: String!) {

   sampleCountOfStudy(study_code:$study_id)

   fileCountOfStudy(study_code: $study_id)

   aliguotCountOfStudy(study_code: $study_id)

   caseCountOfStudy(study_code: $study_id)

   caseOverview(study_codes:[$study_id]) {   
        case_id  
        study_code   
        study_type   
        breed   
        diagnosis   
        stage_of_disease   
        age   
        sex   
        neutered_status
     }
  }
  `;


export const GET_PROGRAM_DETAIL_DATA_QUERY = gql`
query program($programTitle: String!) {


  sampleCountOfProgram(program_id: $programTitle)
  fileCountOfProgram(program_id: $programTitle)
  aliguotCountOfProgram(program_id: $programTitle)
  studyCountOfProgram(program_id: $programTitle)
  caseCountOfProgram(program_id: $programTitle)
 
  
  program(program_acronym: $programTitle)
  { 
    program_name
    program_acronym
    program_short_description
    program_full_description
    program_external_url
    program_sort_order
    }
    studiesByProgramId(program_id: $programTitle)
    { 
      program_id
      clinical_study_id
      clinical_study_designation
      clinical_study_name
      clinical_study_description
      clinical_study_type
      date_of_iacuc_approval
      dates_of_conduct
      numberOfCases
      }


}`;


export const GET_PROGRAM_DATA_QUERY = gql`
{
  program(orderBy: program_sort_order_asc)
  {
    program_name
    program_acronym
    program_full_description
    program_short_description
    program_sort_order
    program_external_url
    studies
    {
      clinical_study_designation
    }
  }
}
`;


export const GET_STUDY_DETAIL_DATA_QUERY = gql`
  query Study($csd: String!) {

   sampleCountOfStudy(study_code:$csd)

   fileCountOfStudy(study_code: $csd)

   aliguotCountOfStudy(study_code: $csd)

   caseCountOfStudy(study_code: $csd)

   filesOfStudy(study_code: $csd){
    file_type
   }

  study(clinical_study_designation: $csd){
    program{
      program_acronym
    }
    clinical_study_id
    clinical_study_name
    clinical_study_designation
    clinical_study_description
    clinical_study_type
    date_of_iacuc_approval
    dates_of_conduct
    cohorts{
        cohort_dose
        cohort_description
    }

    study_arms{
      arm
      ctep_treatment_assignment_code
      cohorts{
        cohort_dose
        cohort_description
      }

    }

    principal_investigators{
      pi_first_name
      pi_last_name
      pi_middle_initial
    }
    cases{
      case_id
      diagnoses{
        disease_term
      }
    }
  }
  
 }`;

export const GET_MY_CASES_DATA_QUERY = gql`
query casesInList($caseIds: [String!]!) {

  casesInList(case_ids: $caseIds) {
    case_id
    study_code
    study_type
    breed
    diagnosis
    stage_of_disease
    age
    sex
    neutered_status
}
 filesOfCases(case_ids: $caseIds) {
     case_id
  parent
  file_description
  file_format
  file_locations
  file_name
  file_size
  file_status
  file_type
  md5sum
  uuid
}

}`;
