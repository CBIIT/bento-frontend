import gql from 'graphql-tag';

// --------------- GraphQL query configuration --------------

// query name, also used as root of returned data
const dataRoot = 'subjectDetail';
// query name, also used as key for files to Samples Mapping.
const filesOfSamples = 'samplesForSubjectId';
// Primary ID field used to query a case
const caseIDField = 'subject_id';

// GraphQL query to retrieve detailed info for a case
const GET_JBROWSE_DETAIL_DATA_QUERY = gql`
  query subjectDetail($subject_id: String!) {
    subjectDetail(subject_id: $subject_id) {
      subject_id
      files {
        subject_id
        file_name
        file_type
        file_format
        file_size
        file_id
      }
    }
    samplesForSubjectId(subject_id: $subject_id) {
      sample_id
      files {
        file_id
        file_name
      }
    }
  }
`;

export {
  dataRoot,
  caseIDField,
  filesOfSamples,
  GET_JBROWSE_DETAIL_DATA_QUERY,
};
