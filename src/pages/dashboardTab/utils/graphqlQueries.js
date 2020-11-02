import gql from 'graphql-tag';

export const DASHBOARD_QUERY_TMP = gql`{ sample{
    sample_id
    files{
      uuid
    }
   } }`;

export const FILTER_GROUP_QUERY = gql`
   query groupCounts($subject_ids: [String]){
    subjectCountByProgram(subject_ids: $subject_ids) {
        group
        subjects
    }
    subjectCountByStudy(subject_ids: $subject_ids) {
        group
        subjects
    }
    subjectCountByDiagnoses (subject_ids: $subject_ids){
        group
        subjects
    }
    subjectCountByRecurrenceScore (subject_ids: $subject_ids){
        group
        subjects
    }
    subjectCountByTumorSize(subject_ids: $subject_ids) {
        group
        subjects
    }
    subjectCountByChemotherapyRegimen(subject_ids: $subject_ids) {
        group
        subjects
    }
    subjectCountByEndocrineTherapy (subject_ids: $subject_ids){
        group
        subjects
    }
    subjectCountByTumorGrade(subject_ids: $subject_ids){
        group
        subjects
    }
    subjectCountByErStatus(subject_ids: $subject_ids){
        group
        subjects
    }
    subjectCountByPrStatus(subject_ids: $subject_ids){
        group
        subjects
    }
    subjectCountByMenopauseStatus(subject_ids: $subject_ids){
        group
        subjects
    }
    subjectCountByFileType (subject_ids: $subject_ids){
        group
        subjects
    }
    subjectCountByFileAssociation(subject_ids: $subject_ids) {
        group
        subjects
    }
    subjectCountByTissueComposition(subject_ids: $subject_ids) {
        group
        subjects
    }
    subjectCountByTissueType(subject_ids: $subject_ids) {
        group
        subjects
    }
}
  `;

export const FILTER_QUERY = gql`
  query search (          
    $programs: [String] ,
    $studies: [String] ,
    $diagnoses: [String] ,
    $rc_scores: [String] ,
    $tumor_sizes: [String] ,
    $chemo_regimen: [String] ,
    $tumor_grades: [String] ,
    $er_status: [String] ,
    $pr_status: [String] ,
    $endo_therapies: [String] ,
    $meno_status: [String] ,
    $first: Int 
){
    searchSubjects (          
        programs: $programs,
        studies: $studies,
        diagnoses: $diagnoses,
        rc_scores: $rc_scores,
        tumor_sizes: $tumor_sizes,
        chemo_regimen: $chemo_regimen,
        tumor_grades: $tumor_grades,
        er_status: $er_status,
        pr_status: $pr_status,
        endo_therapies: $endo_therapies,
        meno_status: $meno_status,
        first: $first
    ) {
      numberOfPrograms
      numberOfStudies
      numberOfSubjects
      numberOfSamples
      numberOfLabProcedures
      numberOfFiles
        subjectIds
        firstPage {
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
    }
}`;

export const DASHBOARD_QUERY = gql`{
  numberOfPrograms
  numberOfStudies
  numberOfSubjects
  numberOfSamples
  numberOfLabProcedures
  numberOfFiles
  subjectCountByProgram{
        group
        subjects
      }
    subjectCountByStudy{
        group
        subjects
      }
    subjectCountByDiagnoses{
        group
        subjects
      }
    subjectCountByRecurrenceScore{
        group
        subjects
      }
    subjectCountByTumorSize{
        group
        subjects
      }
    subjectCountByChemotherapyRegimen{
        group
        subjects
      }
    subjectCountByTumorGrade{
        group
        subjects
      }
  subjectCountByErStatus{
        group
        subjects
      }
  subjectCountByPrStatus{
        group
        subjects
      }
  subjectCountByMenopauseStatus{
        group
        subjects
      }
  subjectCountByChemotherapyRegimen{
        group
        subjects
      }
      subjectCountByEndocrineTherapy{
    group
    subjects
  }
    armsByPrograms {
        program
        caseSize
        children {
            arm
            caseSize
            size
        }
    }

  subjectOverViewPaged(first: 100) {
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
  sampleOverview {
    sample_id
    subject_id
    program
    arm
    diagnosis
    tissue_type
    tissue_composition
    sample_anatomic_site
    sample_procurement_method
    platform
    files 
}

fileOverview {
    file_id
    file_name
    association
    file_description
    file_format
    file_size
    program
    arm
    subject_id
    sample_id
    diagnosis
}
  }`;
