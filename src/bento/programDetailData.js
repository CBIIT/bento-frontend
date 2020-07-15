import gql from 'graphql-tag';

const pageTitle = {
  label: 'Program :',
  field: 'program_acronym',
};

const pageSubTitle = {
  field: 'program_id',
};

const programBreadCrumb = {
  label: 'ALL PROGRAMS',
  link: '/programs',
};

const attributes = {
  data: [
    {
      field: 'program_acronym',
      label: 'Program',
    },
    {
      field: 'program_name',
      label: 'Program Name',
    },
    {
      field: 'program_id',
      label: 'Program Id',
    },
    {
      field: 'program_full_description',
      label: 'Program Description',
    },
    {
      field: 'institution_name',
      label: 'Institution',
    },
    {
      field: 'program_external_url',
      label: 'External Link to Program',
    },
  ],
};

const tableTitle = 'ARMS';

const icon = {
  src: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/program/programIcon.svg',
  alt: 'Bento program logo',
};

const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/program/externalLinkIcon.svg',
  alt: 'External link icon',
};

const numberOfFilesIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/trial/Trials_File_Counter.Icon.svg',
  alt: 'Number of files icon',
};

const table = {
  data: [
    {
      field: 'study_acronym',
      label: 'Arm',
      link: '/arm/{study_acronym}',
    },
    {
      field: 'study_name',
      label: 'Arm Name',
    },
    {
      field: 'study_full_description',
      label: 'Arm Description',
    },
    {
      field: 'study_type',
      label: 'Arm Type',
    },
    {
      field: 'num_subjects',
      label: 'Cases',
    },
  ],
};

const PROGRAM_DETAIL_QUERY = gql`
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

export {
  tableTitle,
  pageTitle,
  pageSubTitle,
  icon,
  attributes,
  externalLinkIcon,
  numberOfFilesIcon,
  programBreadCrumb,
  PROGRAM_DETAIL_QUERY,
  table,
};
