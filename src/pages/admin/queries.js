import gql from 'graphql-tag';

const queries = {
  GET_LIST_USERS: gql`
    query listUsers($role: [String], $userStatus: [String], $accessStatus: [String]){
      listUsers (role: $role, userStatus: $userStatus, accessStatus: $accessStatus){
          firstName
          lastName
          displayName
          organization
          userID
          email
          IDP
          role
          userStatus
          creationDate
          editDate
          numberOfArms
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
  `,
};

export default queries;
