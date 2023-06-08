/* eslint-disable */
import gql from 'graphql-tag';
import { cellTypes } from '@bento-core/table';
import { customCasesTabDownloadCSV, customFilesTabDownloadCSV, customSamplesTabDownloadCSV } from './tableDownloadCSV';
import { dataFormatTypes } from '@bento-core/table';

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  alt: 'tooltipIcon',
  0: 'Click button to add selected files associated with the selected case(s).',
  1: 'Click button to add selected files associated with the selected sample(s).',
  2: 'Click button to add selected files.',
  Cases: 'Click button to add selected files associated with the selected case(s).',
  Samples: 'Click button to add selected files associated with the selected sample(s).',
  Files: 'Click button to add selected files.',
  arrow: true,
  styles: {
    border: '#03A383 1px solid',
  }
};

// --------------- Dahboard Table external link configuration --------------
// Ideal size for externalLinkIcon is 16x16 px
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};


// --------------- Tabs Header Data configuration --------------
export const tabs = [
  {
    id: 'case_tab',
    title: 'Cases',
    dataField: 'dataCase',
    count: 'numberOfSubjects',
  },
  {
    id: 'sample_tab',
    title: 'Samples',
    dataField: 'dataSample',
    count: 'numberOfSamples',
  },
  {
    id: 'file_tab',
    title: 'Files',
    dataField: 'dataFile',
    count: 'numberOfFiles',
  },
];

// --------------- Tabs Header Style configuration --------------
export const tabIndex = [
  {
    title: 'Cases',
    primaryColor: '#D6F2EA',
    secondaryColor: '#FFDFB8',
    selectedColor: '#10A075',
  },
  {
    title: 'Samples',
    primaryColor: '#CFEDF9',
    secondaryColor: '#C9F1F1',
    selectedColor: '#0DAFEC',
  },
  {
    title: 'Files',
    primaryColor: '#F7D7F7',
    secondaryColor: '#86D6F0',
    selectedColor: '#C92EC7',
  },
];

export const DASHBOARD_QUERY_NEW = gql`
query search (          
    $subject_ids: [String],
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
    $tissue_type: [String],
    $composition: [String],
    $association: [String],
    $file_type: [String],
    $age_at_index: [Float]
){
    searchSubjects (          
        subject_ids: $subject_ids,
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
        tissue_type: $tissue_type,
        composition: $composition,
        association: $association,       
        file_type: $file_type,
        age_at_index: $age_at_index
    ) {
        numberOfPrograms
        numberOfStudies
        numberOfSubjects
        numberOfSamples
        numberOfLabProcedures
        numberOfFiles
        armsByPrograms {
            program
            caseSize
            children {
                arm
                caseSize
                size
            }
        }
        subjectCountByProgram {
            group
            subjects
        }
        subjectCountByStudy {
            group
            subjects
        }
        subjectCountByDiagnoses {
            group
            subjects
        }
        subjectCountByRecurrenceScore {
            group
            subjects
        }
        subjectCountByTumorSize {
            group
            subjects
        }
        subjectCountByChemotherapyRegimen {
            group
            subjects
        }
        subjectCountByEndocrineTherapy {
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
        subjectCountByFileType {
            group
            subjects
        }
        subjectCountByFileAssociation {
            group
            subjects
        }
        subjectCountByTissueComposition {
            group
            subjects
        }
        subjectCountByTissueType {
            group
            subjects
        }
        filterSubjectCountByProgram {
            group
            subjects
        }
        filterSubjectCountByStudy{
            group
            subjects
        }
        filterSubjectCountByDiagnoses{
            group
            subjects
        }
        filterSubjectCountByRecurrenceScore{
            group
            subjects
        }
        filterSubjectCountByTumorSize{
            group
            subjects
        }
        filterSubjectCountByTumorGrade{
            group
            subjects
        }
        filterSubjectCountByErStatus{
            group
            subjects
        }
        filterSubjectCountByPrStatus{
            group
            subjects
        }
        filterSubjectCountByChemotherapyRegimen{
            group
            subjects
        }
        filterSubjectCountByEndocrineTherapy{
            group
            subjects
        }
        filterSubjectCountByMenopauseStatus{
            group
            subjects
        }
        filterSubjectCountByTissueType{
            group
            subjects
        }
        filterSubjectCountByTissueComposition{
            group
            subjects
        }
        filterSubjectCountByFileAssociation{
            group
            subjects
        }
        filterSubjectCountByFileType{
            group
            subjects
        }
        filterSubjectCountByAge{
            lowerBound
            upperBound
            subjects
        }
    }
}
`;

export const DASHBOARD_QUERY = gql`
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
      $tissue_type: [String],
      $composition: [String],
      $association: [String],
      $file_type: [String],
      $age_at_index: [Float]
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
          tissue_type: $tissue_type,
          composition: $composition,
          association: $association,       
          file_type: $file_type,
          age_at_index: $age_at_index
      ) {
          numberOfPrograms
          numberOfStudies
          numberOfSubjects
          numberOfSamples
          numberOfLabProcedures
          numberOfFiles
          armsByPrograms {
              program
              caseSize
              children {
                  arm
                  caseSize
                  size
              }
  
          }
  
      subjectCountByProgram {
              group
              subjects
          }
          subjectCountByStudy {
              group
              subjects
          }
          subjectCountByDiagnoses {
              group
              subjects
          }
          subjectCountByRecurrenceScore {
              group
              subjects
          }
          subjectCountByTumorSize {
              group
              subjects
          }
          subjectCountByChemotherapyRegimen {
              group
              subjects
          }
          subjectCountByEndocrineTherapy {
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
          subjectCountByFileType {
              group
              subjects
          }
          subjectCountByFileAssociation {
              group
              subjects
          }
          subjectCountByTissueComposition {
              group
              subjects
          }
          subjectCountByTissueType {
              group
              subjects
          }
  
          filterSubjectCountByProgram {
              group
              subjects
          }
          filterSubjectCountByStudy{
              group
              subjects
          }
          filterSubjectCountByDiagnoses{
              group
              subjects
          }
          filterSubjectCountByRecurrenceScore{
              group
              subjects
          }
          filterSubjectCountByTumorSize{
              group
              subjects
          }
          filterSubjectCountByTumorGrade{
              group
              subjects
          }
          filterSubjectCountByErStatus{
              group
              subjects
          }
          filterSubjectCountByPrStatus{
              group
              subjects
          }
          filterSubjectCountByChemotherapyRegimen{
              group
              subjects
          }
          filterSubjectCountByEndocrineTherapy{
              group
              subjects
          }
          filterSubjectCountByMenopauseStatus{
              group
              subjects
          }
          filterSubjectCountByTissueType{
              group
              subjects
          }
          filterSubjectCountByTissueComposition{
              group
              subjects
          }
          filterSubjectCountByFileAssociation{
              group
              subjects
          }
          filterSubjectCountByFileType{
              group
              subjects
          }
          filterSubjectCountByAge{
            lowerBound
            upperBound
            subjects
        }
  
      }
  }
  
   `;

export const FILTER_GROUP_QUERY = gql`
  query groupCounts($subject_ids: [String]){
   armsByPrograms(subject_ids: $subject_ids) {
     program
     caseSize
     children {
         arm
         caseSize
         size
     }
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
  $tissue_type: [String],
  $composition: [String],
  $association: [String],
  $file_type: [String],
  $age_at_index: [Float]
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
      tissue_type: $tissue_type,
      composition: $composition,
      association: $association,       
      file_type: $file_type,
      age_at_index: $age_at_index
  ) {
      numberOfPrograms
      numberOfStudies
      numberOfSubjects
      numberOfSamples
      numberOfLabProcedures
      numberOfFiles
      armsByPrograms {
          program
          caseSize
          children {
              arm
              caseSize
              size
          }

      }

  subjectCountByProgram {
          group
          subjects
      }
      subjectCountByStudy {
          group
          subjects
      }
      subjectCountByDiagnoses {
          group
          subjects
      }
      subjectCountByRecurrenceScore {
          group
          subjects
      }
      subjectCountByTumorSize {
          group
          subjects
      }
      subjectCountByChemotherapyRegimen {
          group
          subjects
      }
      subjectCountByEndocrineTherapy {
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
      subjectCountByFileType {
          group
          subjects
      }
      subjectCountByFileAssociation {
          group
          subjects
      }
      subjectCountByTissueComposition {
          group
          subjects
      }
      subjectCountByTissueType {
          group
          subjects
      }

      filterSubjectCountByProgram {
          group
          subjects
      }
      filterSubjectCountByStudy{
          group
          subjects
      }
      filterSubjectCountByDiagnoses{
          group
          subjects
      }
      filterSubjectCountByRecurrenceScore{
          group
          subjects
      }
      filterSubjectCountByTumorSize{
          group
          subjects
      }
      filterSubjectCountByTumorGrade{
          group
          subjects
      }
      filterSubjectCountByErStatus{
          group
          subjects
      }
      filterSubjectCountByPrStatus{
          group
          subjects
      }
      filterSubjectCountByChemotherapyRegimen{
          group
          subjects
      }
      filterSubjectCountByEndocrineTherapy{
          group
          subjects
      }
      filterSubjectCountByMenopauseStatus{
          group
          subjects
      }
      filterSubjectCountByTissueType{
          group
          subjects
      }
      filterSubjectCountByTissueComposition{
          group
          subjects
      }
      filterSubjectCountByFileAssociation{
          group
          subjects
      }
      filterSubjectCountByFileType{
          group
          subjects
      }
      filterSubjectCountByAge{
        lowerBound
        upperBound
        subjects
      }

  }
}
`;

export const GET_FILES_OVERVIEW_QUERY = gql`
query fileOverview(
    $subject_ids: [String],
    $file_ids: [String],
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
    $tissue_type: [String],
    $composition: [String],
    $association: [String],
    $file_type: [String],
    $age_at_index: [Float],
    $first: Int, 
    $offset: Int, 
    $order_by:  String
    $sort_direction: String ){
    fileOverview(
        subject_ids: $subject_ids,
        file_ids: $file_ids,
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
        tissue_type: $tissue_type,
        composition: $composition,
        association: $association,       
        file_type: $file_type,
        age_at_index: $age_at_index,
        first: $first, 
        offset: $offset, 
        order_by: $order_by,
        sort_direction: $sort_direction
    ){
        file_id,
        program_id,
        file_name,
        association,
        file_description,
        file_format,
        file_size,
        program,
        arm,
        acl,
        subject_id,
        sample_id,
        diagnosis,
    }
}
`;

export const GET_SAMPLES_OVERVIEW_QUERY = gql`
query sampleOverview(
    $subject_ids: [String],
    $sample_ids: [String],
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
    $tissue_type: [String],
    $composition: [String],
    $association: [String],
    $file_type: [String],
    $age_at_index: [Float],
    $first: Int, 
    $offset: Int, 
    $order_by:  String
    $sort_direction: String ){
    sampleOverview(
        subject_ids: $subject_ids,
        sample_ids: $sample_ids,
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
        tissue_type: $tissue_type,
        composition: $composition,
        association: $association,       
        file_type: $file_type,
        age_at_index: $age_at_index,
        first: $first, 
        offset: $offset, 
        order_by: $order_by,
        sort_direction: $sort_direction
    ){
        sample_id,
        subject_id,
        program,
        program_id,
        arm,
        diagnosis,
        tissue_type,
        tissue_composition,
        sample_anatomic_site,
        sample_procurement_method,
        platform,
        files 
    }
}
`;

export const GET_CASES_OVERVIEW_QUERY = gql`
query subjectOverview(
    $subject_ids: [String],
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
    $tissue_type: [String],
    $composition: [String],
    $association: [String],
    $file_type: [String],
    $age_at_index: [Float],
    $first: Int, 
    $offset: Int, 
    $order_by:  String
    $sort_direction: String ){
    subjectOverview(
        subject_ids: $subject_ids,
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
        tissue_type: $tissue_type,
        composition: $composition,
        association: $association,       
        file_type: $file_type,
        age_at_index: $age_at_index,
        first: $first, 
        offset: $offset, 
        order_by: $order_by,
        sort_direction: $sort_direction
        
        ) {
        subject_id
        program
        program_id
        study_acronym
        study_short_description
        study_info
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
        survival_time_unit
        files
        lab_procedures
        samples
    }
}
`;

export const GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL = gql`
query search (          
  $subject_ids: [String],
){
  fileIDsFromList (          
      subject_ids: $subject_ids,
  ) 
}
  `;

export const GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL = gql`
query search (          
  $sample_ids: [String],
){
  fileIDsFromList (          
    sample_ids: $sample_ids,
  ) 
}
  `;

export const GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL = gql`
query search (          
  $file_names: [String] 
){
  fileIDsFromList (          
      file_names: $file_names
  ) 
}
  `;

export const GET_ALL_FILEIDS_FROM_CASESTAB_FOR_ADD_ALL_CART = gql`
query subjectsAddAllToCart(
  $subject_ids: [String],
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
  $tissue_type: [String],
  $composition: [String],
  $association: [String],
  $file_type: [String],
  $age_at_index: [Float],
  $first: Int,
  $offset: Int= 0, 
  $order_by: String = "file_id",
  $sort_direction: String = "asc" 
  ){
  subjectOverview(
      subject_ids: $subject_ids,
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
      tissue_type: $tissue_type,
      composition: $composition,
      association: $association,
      file_type: $file_type,
      age_at_index: $age_at_index,
      first: $first,
      offset: $offset,
      order_by: $order_by,
      sort_direction: $sort_direction
      ) {
      files
  }
}
    `;

export const GET_ALL_FILEIDS_FROM_SAMPLETAB_FOR_ADD_ALL_CART = gql`
    query samplesAddAllToCart(
      $subject_ids: [String],
      $sample_ids: [String],
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
      $tissue_type: [String],
      $composition: [String],
      $association: [String],
      $file_type: [String],
      $age_at_index: [Float],
      $first: Int,
      $offset: Int= 0, 
      $order_by: String = "file_id",
      $sort_direction: String = "asc" ){
      sampleOverview(
          subject_ids: $subject_ids,
          sample_ids: $sample_ids,
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
          tissue_type: $tissue_type,
          composition: $composition,
          association: $association,
          file_type: $file_type,
          age_at_index: $age_at_index,
          first: $first,
          offset: $offset,
          order_by: $order_by,
          sort_direction: $sort_direction
          ) {
          files
      }
    }
        `;

export const GET_ALL_FILEIDS_FROM_FILESTAB_FOR_ADD_ALL_CART = gql`
query fileAddAllToCart(
  $subject_ids: [String],
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
  $tissue_type: [String],
  $composition: [String],
  $association: [String],
  $file_type: [String],
  $age_at_index: [Float],
  $first: Int,
  $offset: Int= 0, 
  $order_by: String = "file_id",
  $sort_direction: String = "asc"
 ){
  fileOverview(
      subject_ids:$subject_ids,
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
      tissue_type: $tissue_type,
      composition: $composition,
      association: $association,       
      file_type: $file_type,
      age_at_index: $age_at_index,
      first: $first, 
      offset: $offset, 
      order_by: $order_by,
      sort_direction: $sort_direction
  ){
      file_id,
  }
}
            `;

// --------------- GraphQL query - Retrieve files tab details --------------
export const GET_FILES_NAME_QUERY = gql`
query fileOverview($file_ids: [String], $offset: Int = 0, $first: Int = 100000, $order_by:String ="file_name"){
  fileOverview(file_ids: $file_ids, offset: $offset,first: $first, order_by: $order_by) {
    file_name
  }
}
  `;

export const GET_FILE_IDS_FROM_FILE_NAME = gql`
  query (
      $file_name: [String],
      $offset: Int,
      $first: Int,
      $order_by: String
  )
  {
      fileIdsFromFileNameDesc(
          file_name:$file_name, 
          offset:$offset,
          first:$first,
          order_by:$order_by
      )
      {
          file_id
      }
  }`;

// --------------- Tabs Table configuration --------------
export const tabContainers = [
  {
    name: 'Cases',
    dataField: 'dataCase',
    api: GET_CASES_OVERVIEW_QUERY,
    paginationAPIField: 'subjectOverview',
    count: 'numberOfSubjects',
    dataKey: 'subject_id',
    defaultSortField: 'subject_id',
    defaultSortDirection: 'asc',
    buttonText: 'Add Selected Files',
    tableID: 'case_tab_table',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: false,
    },
    columns: [
      {
        cellType: cellTypes.CHECKBOX,
        display: true,
        role: cellTypes.CHECKBOX,
      },
      {
        dataField: 'subject_id',
        header: 'Case ID',
        cellType: cellTypes.LINK,
        linkAttr : {
          rootPath: '/case',
          pathParams: ['subject_id'],
        },
        display: true,
        tooltipText: 'sort',
      },
      {
        dataField: 'program',
        header: 'Program Code',
        cellType: cellTypes.LINK,
        linkAttr : {
          rootPath: '/program',
          pathParams: ['program_id'],
        },
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'program_id',
        header: 'Program ID',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'study_acronym',
        header: 'Arm',
        cellType: cellTypes.LINK,
        linkAttr : {
          rootPath: '/arm',
          pathParams: ['study_acronym'],
        },
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'diagnosis',
        header: 'Diagnosis',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'recurrence_score',
        header: 'Recurrence Score',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'tumor_size',
        header: 'Tumor Size (cm)',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'er_status',
        header: 'ER Status',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'pr_status',
        header: 'PR Status',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'age_at_index',
        header: 'Age (years)',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'survival_time',
        header: 'Survival (days)',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        cellType: cellTypes.CUSTOM_ELEM,
        displayEmpty: false,
      },
    ],
    id: 'case_tab',
    tableID: 'case_tab_table',
    tableDownloadCSV: customCasesTabDownloadCSV,
    tabIndex: '0',
    downloadFileName: 'Bento_Dashboard_cases_download',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    addFilesRequestVariableKey: 'subject_ids',
    addFilesResponseKeys: ['fileIDsFromList'],
    addAllFilesResponseKeys: ['subjectOverview', 'files'],
    addAllFileQuery: GET_ALL_FILEIDS_FROM_CASESTAB_FOR_ADD_ALL_CART,
    addSelectedFilesQuery: GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL,
  },
  {
    name: 'Samples',
    dataField: 'dataSample',
    api: GET_SAMPLES_OVERVIEW_QUERY,
    count: 'numberOfSamples',
    paginationAPIField: 'sampleOverview',
    dataKey: 'sample_id',
    defaultSortField: 'sample_id',
    defaultSortDirection: 'asc',
    tableID: 'sample_tab_table',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: false,
    },
    saveButtonDefaultStyle: {
      color: '#fff',
      backgroundColor: '#00AEEF',
      opacity: '1',
      border: '0px',
      cursor: 'pointer',
    },
    DeactiveSaveButtonDefaultStyle: {
      opacity: '0.3',
      cursor: 'auto',
    },
    ActiveSaveButtonDefaultStyle: {
      cursor: 'pointer',
      opacity: 'unset',
      border: 'unset',
    },

    columns: [
      {
        cellType: cellTypes.CHECKBOX,
        display: true,
        role: cellTypes.CHECKBOX,
      },
      {
        dataField: 'sample_id',
        header: 'Sample ID',
        display: true,
        tooltipText: 'sort',
      },
      {
        dataField: 'subject_id',
        header: 'Case ID',
        link: '/case/{subject_id}',
        cellType: cellTypes.LINK,
        linkAttr : {
          rootPath: '/case',
          pathParams: ['subject_id'],
        },
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'program',
        header: 'Program Code',
        cellType: cellTypes.LINK,
        tooltipText: 'sort',
        linkAttr : {
          rootPath: '/program',
          pathParams: ['program_id'],
        },
        display: true,
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'program_id',
        header: 'Program ID',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'arm',
        header: 'Arm',
        link: '/arm/{arm}',
        cellType: cellTypes.LINK,
        linkAttr : {
          rootPath: '/arm',
          pathParams: ['arm'],
        },
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'diagnosis',
        header: 'Diagnosis',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'tissue_type',
        header: 'Tissue Type',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'tissue_composition',
        header: 'Tissue Composition',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'sample_anatomic_site',
        header: 'Sample Anatomic Site',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'sample_procurement_method',
        header: 'Sample Procurement Method',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'platform',
        header: 'platform',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
    ],
    id: 'sample_tab',
    tableID: 'sample_tab_table',
    tabIndex: '1',
    tableDownloadCSV: customSamplesTabDownloadCSV,
    downloadFileName: 'Bento_Dashboard_cases_download',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    addFilesRequestVariableKey: 'sample_ids',
    addFilesResponseKeys: ['fileIDsFromList'],
    addAllFilesResponseKeys: ['sampleOverview', 'files'],
    addAllFileQuery: GET_ALL_FILEIDS_FROM_SAMPLETAB_FOR_ADD_ALL_CART,
    addSelectedFilesQuery: GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL,
  },
  {
    name: 'Files',
    dataField: 'dataFile',
    api: GET_FILES_OVERVIEW_QUERY,
    paginationAPIField: 'fileOverview',
    defaultSortField: 'file_name',
    defaultSortDirection: 'asc',
    count: 'numberOfFiles',
    dataKey: 'file_name',
    tableID: 'file_tab_table',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: false,
    },
    columns: [
      {
        cellType: cellTypes.CHECKBOX,
        display: true,
        role: cellTypes.CHECKBOX,
      },
      {
        dataField: 'file_name',
        header: 'File Name',
        display: true,
        tooltipText: 'sort',
      },
      {
        dataField: 'file_id',
        header: 'File ID',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'association',
        header: 'Association',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'file_description',
        header: 'Description',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'file_format',
        header: 'File Format',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'file_size',
        header: 'Size',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        dataFormatType: dataFormatTypes.FORMAT_BYTES,
        cellType: cellTypes.FORMAT_DATA,
      },
      {
        dataField: 'acl', // This need to left empty if no data need to be displayed before file download icon
        header: 'Access',
        display: true,
        cellType: cellTypes.CUSTOM_ELEM,
        downloadDocument: true, // To indicate that column is document donwload
        documentDownloadProps: {
          // Max file size needs to bin Bytes to seperate two support file preview and download
          maxFileSize: 315,
          // Tool top text for Unauthenticated users
          toolTipTextUnauthenticated: 'Controlled access file',
          // Tool top text for file download
          toolTipTextFileDownload: 'Download a copy of this file',
          // Tool top text for file preview
          toolTipTextFilePreview: 'Because of its size and/or format, this file is unavailable for download and must be accessed via the My Files workflow',
          // datafield where file file column exists in the table
          fileSizeColumn: 'file_size',
          // datafield where file file id exists in the table which is used to get file location
          fileLocationColumn: 'file_id',
          // datafield where file format exists in the table
          fileFormatColumn: 'file_format',
          // datafield where file case id exists in the table which is used to get file information
          caseIdColumn: 'subject_id',
          // Unauthenticated lock icon
          iconUnauthenticated: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Access_Lock.svg',
          // file download icon
          iconFileDownload: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadPDF.svg',
          // file preview icon
          iconFilePreview: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadCloud.svg',
          // file viewer icon JBrowse
          iconFileViewer: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadBAM.svg',
        },
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'program',
        header: 'Program Code',
        link: '/program/{program_id}',
        cellType: cellTypes.LINK,
        linkAttr : {
          rootPath: '/program',
          pathParams: ['program_id'],
        },
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'program_id',
        header: 'Program ID',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'arm',
        header: 'Arm',
        link: '/arm/{arm}',
        cellType: cellTypes.LINK,
        linkAttr : {
          rootPath: '/arm',
          pathParams: ['arm'],
        },
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'subject_id',
        header: 'Case ID',
        link: '/case/{subject_id}',
        cellType: cellTypes.LINK,
        linkAttr : {
          rootPath: '/case',
          pathParams: ['subject_id'],
        },
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'sample_id',
        header: 'Sample ID',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'diagnosis',
        header: 'Diagnosis',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
    ],
    id: 'file_tab',
    tableID: 'file_tab_table',
    selectableRows: true,
    tableDownloadCSV: customFilesTabDownloadCSV,
    downloadFileName: 'Bento_Dashboard_cases_download',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    addFilesRequestVariableKey: 'file_names',
    addFilesResponseKeys: ['fileIDsFromList'],
    addAllFilesResponseKeys: ['fileOverview', 'file_id'],
    addAllFileQuery: GET_ALL_FILEIDS_FROM_FILESTAB_FOR_ADD_ALL_CART,
    addSelectedFilesQuery: GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL,
  },
];

  