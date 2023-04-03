import gql from 'graphql-tag';

export const GET_USER_DETAILS = gql`
query getMyUser {
  getMyUser {
    firstName
    lastName
    organization
    userID
    userStatus
    email
    IDP
    role
    creationDate
    editDate
    acl {
      armID
      armName
      accessStatus
      requestDate
      reviewAdminName
      reviewDate
      comment
    }
  }
}
`;
