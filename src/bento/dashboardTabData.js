import gql from 'graphql-tag';
import { customCasesTabDownloadCSV, customFilesTabDownloadCSV, customSamplesTabDownloadCSV } from './tableDownloadCSV';

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  alt: 'tooltipIcon',
  0: 'Click button to add selected files associated with the selected case(s).',
  1: 'Click button to add selected files associated with the selected sample(s).',
  2: 'Click button to add selected files.',
};

// --------------- Dahboard Table external link configuration --------------
// Ideal size for externalLinkIcon is 16x16 px
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Tabs Table configuration --------------
export const tabContainers = [
  {

    name: 'Cases',
    dataField: 'dataCase',
    api: 'GET_CASES_OVERVIEW_QUERY',
    paginationAPIField: 'subjectOverViewPaged',
    paginationAPIFieldDesc: 'subjectOverViewPagedDesc',
    count: 'numberOfSubjects',
    dataKey: 'subject_id',
    defaultSortField: 'subject_id',
    defaultSortDirection: 'asc',
    buttonText: 'Add Selected Files',
    saveButtonDefaultStyle: {
      color: '#fff',
      backgroundColor: '#09A175',
      opacity: '1',
      border: '0px',
      cursor: 'pointer',
    },
    ActiveSaveButtonDefaultStyle: {
      cursor: 'pointer',
      opacity: 'unset',
      border: 'unset',
    },
    DeactiveSaveButtonDefaultStyle: {
      opacity: '0.3',
      cursor: 'auto',
    },
    columns: [
      {
        dataField: 'subject_id',
        header: 'Case ID',
        sort: 'asc',
        link: '/case/{subject_id}',
        primary: true,
        display: true,
      },
      {
        dataField: 'program',
        header: 'Program Code',
        sort: 'asc',
        link: '/program/{program_id}',
        display: true,
      },
      {
        dataField: 'program_id',
        header: 'Program ID',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'study_acronym',
        header: 'Arm',
        sort: 'asc',
        link: '/arm/{study_acronym}',
        display: true,
      },
      {
        dataField: 'diagnosis',
        header: 'Diagnosis',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'recurrence_score',
        header: 'Recurrence Score',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'tumor_size',
        header: 'Tumor Size (cm)',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'er_status',
        header: 'ER Status',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'pr_status',
        header: 'PR Status',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'age_at_index',
        header: 'Age (years)',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'survival_time',
        header: 'Survival (days)',
        sort: 'asc',
        display: true,
      },
    ],
    id: 'case_tab',
    onRowsSelect: 'type1',
    disableRowSelection: 'type1',
    tableID: 'case_tab_table',
    selectableRows: true,
    tableDownloadCSV: customCasesTabDownloadCSV,
    tabIndex: '0',
    downloadFileName: 'Bento_Dashboard_cases_download',
    headerPagination: true,
    footerPagination: true,
  },
  {
    name: 'Samples',
    dataField: 'dataSample',
    api: 'GET_SAMPLES_OVERVIEW_QUERY',
    count: 'numberOfSamples',
    paginationAPIField: 'sampleOverview',
    paginationAPIFieldDesc: 'sampleOverviewDesc',
    dataKey: 'sample_id',
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
        dataField: 'sample_id',
        header: 'Sample ID',
        sort: 'asc',
        primary: true,
        display: true,
      },
      {
        dataField: 'subject_id',
        header: 'Case ID',
        sort: 'asc',
        link: '/case/{subject_id}',
        display: true,
      },
      {
        dataField: 'program',
        header: 'Program Code',
        sort: 'asc',
        link: '/program/{program_id}',
        display: true,
      },
      {
        dataField: 'program_id',
        header: 'Program ID',
        sort: 'asc',
        display: false,
      },
      {
        dataField: 'arm',
        header: 'Arm',
        sort: 'asc',
        link: '/arm/{arm}',
        display: true,
      },
      {
        dataField: 'diagnosis',
        header: 'Diagnosis',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'tissue_type',
        header: 'Tissue Type',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'tissue_composition',
        header: 'Tissue Composition',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'sample_anatomic_site',
        header: 'Sample Anatomic Site',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'sample_procurement_method',
        header: 'Sample Procurement Method',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'platform',
        header: 'platform',
        sort: 'asc',
        display: true,
      },
    ],
    id: 'sample_tab',
    onRowsSelect: 'type3',
    disableRowSelection: 'type2',
    buttonText: 'Add Selected Files',
    tableID: 'sample_tab_table',
    selectableRows: true,
    tabIndex: '1',
    tableDownloadCSV: customSamplesTabDownloadCSV,
    downloadFileName: 'Bento_Dashboard_cases_download',
    headerPagination: true,
    footerPagination: true,
  },
  {
    name: 'Files',
    dataField: 'dataFile',
    api: 'GET_FILES_OVERVIEW_QUERY',
    paginationAPIField: 'fileOverview',
    paginationAPIFieldDesc: 'fileOverviewDesc',
    defaultSortField: 'file_name',
    defaultSortDirection: 'asc',
    count: 'numberOfFiles',
    buttonText: 'Add Selected Files',
    dataKey: 'file_name',
    saveButtonDefaultStyle: {
      color: '#fff',
      backgroundColor: '#DC2FDA',
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
        dataField: 'file_name',
        header: 'File Name',
        sort: 'asc',
        primary: true,
        display: true,
      },
      {
        dataField: 'file_id',
        header: 'File ID',
        sort: 'asc',
        display: false,
      },
      {
        dataField: 'association',
        header: 'Association',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'file_description',
        header: 'Description',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'file_format',
        header: 'File Format',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'file_size',
        header: 'Size',
        sort: 'asc',
        display: true,
        formatBytes: true,
      },
      {
        dataField: '', // This need to left empty if no data need to be displayed before file download icon
        header: 'Access',
        sort: 'asc',
        display: true,
        downloadDocument: true, // To indicate that column is document donwload
        documentDownloadProps: {
          // Max file size needs to bin Bytes to seperate two support file preview and download
          maxFileSize: 315,
          // Tool top text for file download
          toolTipTextFileDownload: 'Download a copy of this file',
          // Tool top text for file preview
          toolTipTextFilePreview: 'Because of its size and/or format, this file is unavailable for download and must be accessed via the My Files workflow',
          // datafield where file file column exists in the table
          fileSizeColumn: 'file_size',
          // datafield where file file id exists in the table which is used to get file location
          fileLocationColumn: 'file_id',
          // file download icon
          iconFileDownload: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadPDF.svg',
          // file preview ico
          iconFilePreview: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadCloud.svg',
        },
      },
      {
        dataField: 'program',
        header: 'Program Code',
        sort: 'asc',
        link: '/program/{program_id}',
        display: true,
      },
      {
        dataField: 'program_id',
        header: 'Program ID',
        sort: 'asc',
        display: false,
      },
      {
        dataField: 'arm',
        header: 'Arm',
        sort: 'asc',
        link: '/arm/{arm}',
        display: true,
      },
      {
        dataField: 'subject_id',
        header: 'Case ID',
        sort: 'asc',
        link: '/case/{subject_id}',
        display: true,
      },
      {
        dataField: 'sample_id',
        header: 'Sample ID',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'diagnosis',
        header: 'Diagnosis',
        sort: 'asc',
        display: true,
      },
    ],
    id: 'file_tab',
    onRowsSelect: 'type2',
    disableRowSelection: 'type3',
    tableID: 'file_tab_table',
    selectableRows: true,
    tabIndex: '2',
    tableDownloadCSV: customFilesTabDownloadCSV,
    downloadFileName: 'Bento_Dashboard_cases_download',
    headerPagination: true,
    footerPagination: true,
  },
];

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
  subjectCountByFileType{
    group
    subjects
  }
  subjectCountByFileAssociation {
      group
      subjects
  }
  subjectCountByTissueComposition{
      group
      subjects
  }
  subjectCountByTissueType{
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
  subjectOverViewPaged(first: 10) {
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
query search($programs: [String] ,
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
  $file_type: [String]
  $first: Int ) {
searchSubjects(        programs: $programs,
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
      file_type: $file_type
      first: $first) {
  numberOfPrograms
  numberOfStudies
  numberOfSubjects
  numberOfSamples
  numberOfLabProcedures
  numberOfFiles
  sampleIds
  fileIds
  subjectIds
  firstPage {
          subject_id
          program
          program_id
          study_acronym
          diagnosis
          recurrence_score
          tumor_size
          tumor_grade
          er_status
          pr_status
          age_at_index
          survival_time
          survival_time_unit
      }
  
}
filterSubjectCountByProgram(programs: $programs, studies: $studies, diagnoses: $diagnoses, rc_scores: $rc_scores, tumor_sizes: $tumor_sizes, chemo_regimen: $chemo_regimen, tumor_grades: $tumor_grades, er_status: $er_status, pr_status: $pr_status, endo_therapies: $endo_therapies, meno_status: $meno_status, tissue_type: $tissue_type, composition: $composition, association: $association, file_type: $file_type) {
  group
  subjects
}
filterSubjectCountByStudy(programs: $programs, studies: $studies, diagnoses: $diagnoses, rc_scores: $rc_scores, tumor_sizes: $tumor_sizes, chemo_regimen: $chemo_regimen, tumor_grades: $tumor_grades, er_status: $er_status, pr_status: $pr_status, endo_therapies: $endo_therapies, meno_status: $meno_status, tissue_type: $tissue_type, composition: $composition, association: $association, file_type: $file_type) {
  group
  subjects
}
filterSubjectCountByDiagnoses(programs: $programs, studies: $studies, diagnoses: $diagnoses, rc_scores: $rc_scores, tumor_sizes: $tumor_sizes, chemo_regimen: $chemo_regimen, tumor_grades: $tumor_grades, er_status: $er_status, pr_status: $pr_status, endo_therapies: $endo_therapies, meno_status: $meno_status, tissue_type: $tissue_type, composition: $composition, association: $association, file_type: $file_type) {
  group
  subjects
}
filterSubjectCountByRecurrenceScore(programs: $programs, studies: $studies, diagnoses: $diagnoses, rc_scores: $rc_scores, tumor_sizes: $tumor_sizes, chemo_regimen: $chemo_regimen, tumor_grades: $tumor_grades, er_status: $er_status, pr_status: $pr_status, endo_therapies: $endo_therapies, meno_status: $meno_status, tissue_type: $tissue_type, composition: $composition, association: $association, file_type: $file_type) {
  group
  subjects
}
filterSubjectCountByTumorSize(programs: $programs, studies: $studies, diagnoses: $diagnoses, rc_scores: $rc_scores, tumor_sizes: $tumor_sizes, chemo_regimen: $chemo_regimen, tumor_grades: $tumor_grades, er_status: $er_status, pr_status: $pr_status, endo_therapies: $endo_therapies, meno_status: $meno_status, tissue_type: $tissue_type, composition: $composition, association: $association, file_type: $file_type) {
  group
  subjects
}
filterSubjectCountByTumorGrade(programs: $programs, studies: $studies, diagnoses: $diagnoses, rc_scores: $rc_scores, tumor_sizes: $tumor_sizes, chemo_regimen: $chemo_regimen, tumor_grades: $tumor_grades, er_status: $er_status, pr_status: $pr_status, endo_therapies: $endo_therapies, meno_status: $meno_status, tissue_type: $tissue_type, composition: $composition, association: $association, file_type: $file_type) {
  group
  subjects
}
filterSubjectCountByErStatus(programs: $programs, studies: $studies, diagnoses: $diagnoses, rc_scores: $rc_scores, tumor_sizes: $tumor_sizes, chemo_regimen: $chemo_regimen, tumor_grades: $tumor_grades, er_status: $er_status, pr_status: $pr_status, endo_therapies: $endo_therapies, meno_status: $meno_status, tissue_type: $tissue_type, composition: $composition, association: $association, file_type: $file_type) {
  group
  subjects
}
filterSubjectCountByPrStatus(programs: $programs, studies: $studies, diagnoses: $diagnoses, rc_scores: $rc_scores, tumor_sizes: $tumor_sizes, chemo_regimen: $chemo_regimen, tumor_grades: $tumor_grades, er_status: $er_status, pr_status: $pr_status, endo_therapies: $endo_therapies, meno_status: $meno_status, tissue_type: $tissue_type, composition: $composition, association: $association, file_type: $file_type) {
  group
  subjects
}
filterSubjectCountByChemotherapyRegimen(programs: $programs, studies: $studies, diagnoses: $diagnoses, rc_scores: $rc_scores, tumor_sizes: $tumor_sizes, chemo_regimen: $chemo_regimen, tumor_grades: $tumor_grades, er_status: $er_status, pr_status: $pr_status, endo_therapies: $endo_therapies, meno_status: $meno_status, tissue_type: $tissue_type, composition: $composition, association: $association, file_type: $file_type) {
  group
  subjects
}
filterSubjectCountByEndocrineTherapy(programs: $programs, studies: $studies, diagnoses: $diagnoses, rc_scores: $rc_scores, tumor_sizes: $tumor_sizes, chemo_regimen: $chemo_regimen, tumor_grades: $tumor_grades, er_status: $er_status, pr_status: $pr_status, endo_therapies: $endo_therapies, meno_status: $meno_status, tissue_type: $tissue_type, composition: $composition, association: $association, file_type: $file_type) {
  group
  subjects
}
filterSubjectCountByMenopauseStatus(programs: $programs, studies: $studies, diagnoses: $diagnoses, rc_scores: $rc_scores, tumor_sizes: $tumor_sizes, chemo_regimen: $chemo_regimen, tumor_grades: $tumor_grades, er_status: $er_status, pr_status: $pr_status, endo_therapies: $endo_therapies, meno_status: $meno_status, tissue_type: $tissue_type, composition: $composition, association: $association, file_type: $file_type) {
  group
  subjects
}
filterSubjectCountByTissueType(programs: $programs, studies: $studies, diagnoses: $diagnoses, rc_scores: $rc_scores, tumor_sizes: $tumor_sizes, chemo_regimen: $chemo_regimen, tumor_grades: $tumor_grades, er_status: $er_status, pr_status: $pr_status, endo_therapies: $endo_therapies, meno_status: $meno_status, tissue_type: $tissue_type, composition: $composition, association: $association, file_type: $file_type) {
  group
  subjects
}
filterSubjectCountByTissueComposition(programs: $programs, studies: $studies, diagnoses: $diagnoses, rc_scores: $rc_scores, tumor_sizes: $tumor_sizes, chemo_regimen: $chemo_regimen, tumor_grades: $tumor_grades, er_status: $er_status, pr_status: $pr_status, endo_therapies: $endo_therapies, meno_status: $meno_status, tissue_type: $tissue_type, composition: $composition, association: $association, file_type: $file_type) {
  group
  subjects
}
filterSubjectCountByFileAssociation(programs: $programs, studies: $studies, diagnoses: $diagnoses, rc_scores: $rc_scores, tumor_sizes: $tumor_sizes, chemo_regimen: $chemo_regimen, tumor_grades: $tumor_grades, er_status: $er_status, pr_status: $pr_status, endo_therapies: $endo_therapies, meno_status: $meno_status, tissue_type: $tissue_type, composition: $composition, association: $association, file_type: $file_type) {
  group
  subjects
}
filterSubjectCountByFileType(programs: $programs, studies: $studies, diagnoses: $diagnoses, rc_scores: $rc_scores, tumor_sizes: $tumor_sizes, chemo_regimen: $chemo_regimen, tumor_grades: $tumor_grades, er_status: $er_status, pr_status: $pr_status, endo_therapies: $endo_therapies, meno_status: $meno_status, tissue_type: $tissue_type, composition: $composition, association: $association, file_type: $file_type) {
  group
  subjects
}

}

`;

// --------------- GraphQL query - Retrieve files tab details --------------
export const GET_FILES_OVERVIEW_QUERY = gql`
query fileOverview($file_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="file_name"){
  fileOverview(file_ids: $file_ids, offset: $offset,first: $first, order_by: $order_by) {
    file_id
    file_name
    association
    file_description
    file_format
    file_size
    program
    program_id
    arm
    subject_id
    sample_id
    diagnosis
  }
}
  `;

export const GET_FILES_OVERVIEW_DESC_QUERY = gql`
  query fileOverviewDesc($file_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="file_name"){
    fileOverviewDesc(file_ids: $file_ids, offset: $offset,first: $first, order_by: $order_by) {
      file_id
      file_name
      association
      file_description
      file_format
      file_size
      program
      program_id
      arm
      subject_id
      sample_id
      diagnosis
    }
  }
    `;

// --------------- GraphQL query - Retrieve sample tab details --------------

export const GET_SAMPLES_OVERVIEW_QUERY = gql`
  query sampleOverview($sample_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String =""){
  sampleOverview(sample_ids: $sample_ids, offset: $offset,first: $first, order_by: $order_by) {
    sample_id
    subject_id
    program
    program_id
    arm
    diagnosis
    tissue_type
    tissue_composition
    sample_anatomic_site
    sample_procurement_method
    platform
    files 
}
}
  `;

// --------------- GraphQL query - Retrieve sample tab details --------------

export const GET_SAMPLES_OVERVIEW_DESC_QUERY = gql`
  query sampleOverview($sample_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String =""){
  sampleOverviewDesc(sample_ids: $sample_ids, offset: $offset,first: $first, order_by: $order_by) {
    sample_id
    subject_id
    program
    program_id
    arm
    diagnosis
    tissue_type
    tissue_composition
    sample_anatomic_site
    sample_procurement_method
    platform
    files 
}
}
  `;

// --------------- GraphQL query - Retrieve sample tab details --------------

export const GET_CASES_OVERVIEW_QUERY = gql`
query subjectOverViewPaged($subject_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String =""){
  subjectOverViewPaged(subject_ids: $subject_ids, first: $first, offset: $offset, order_by: $order_by) {
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
      files {
            file_id
      }
      lab_procedures
  }
}
  `;

// --------------- GraphQL query - Retrieve sample tab details --------------

export const GET_CASES_OVERVIEW_DESC_QUERY = gql`
  query subjectOverViewPaged($subject_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String =""){
    subjectOverViewPagedDesc(subject_ids: $subject_ids, first: $first, offset: $offset, order_by: $order_by) {
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
        files {
              file_id
        }
        lab_procedures
    }
}
  `;

export const GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL = gql`
  query subjectOverViewPaged($subject_ids: [String], $first: Int = 10000000){
    subjectOverViewPaged(subject_ids: $subject_ids, first: $first) {
        files {
              file_id
        }
    }
}
  `;

export const GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL = gql`
query sampleOverview($sample_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String =""){
  sampleOverview(sample_ids: $sample_ids, offset: $offset,first: $first, order_by: $order_by) {
    files
}
}
  `;

export const GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL = gql`
query fileOverview($file_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by: String = "file_name") {
  fileOverview(file_ids: $file_ids, offset: $offset, first: $first, order_by: $order_by) {
    file_id
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
