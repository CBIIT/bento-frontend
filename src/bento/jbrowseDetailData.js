import gql from 'graphql-tag';

// --------------- GraphQL query configuration --------------
// Primary ID field used to query a case
const caseIDField = 'subject_id';

// GraphQL query to retrieve detailed info for a case
const GET_JBROWSE_DETAIL_DATA_QUERY = gql`
  query subjectDetail($subject_id: String!) {
    subjectDetail(subject_id: $subject_id) {
      subject_id
      files {
        file_name
      }
    }
  }
`;

export {
  caseIDField,
  GET_JBROWSE_DETAIL_DATA_QUERY,
};
