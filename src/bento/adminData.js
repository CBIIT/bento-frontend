import gql from 'graphql-tag';

export const icon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/programIcon.svg',
  alt: 'Bento program logo',
};

export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

export const adminPortalIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/AdminPortal.Icon.svg',
  alt: 'Admin Portal Icon',
};

export const EDIT = 'edit';
export const VIEW = 'view';

export const editViewPageTitle = 'Edit User';
export const viewPageTitle = 'Approved Arm(s)';

export const useMock = true;

// --------------- tab Pending Request --------------
const tabPendingRequest = {

  tabTitle: 'PENDING REQUESTS',

  table: {
    // Set 'display' to false to hide the table entirely
    display: true,
    // Value must be one of the 'dataField's in "columns"
    defaultSortField: 'name',
    // 'asc' or 'desc'
    defaultSortDirection: 'asc',

    columns: [
      {
        dataField: 'displayName',
        header: 'Name',
      },
      {
        dataField: 'IDP',
        header: 'Account Type',
      },
      {
        dataField: 'email',
        header: 'Email',
      },
      {
        dataField: 'organization',
        header: 'Organization',
      },
      {
        dataField: 'numberOfArms',
        header: 'Arm(s)',
      },
    ],
  },

};

// --------------- tab Pending Request --------------
const tabManageAccess = {

  tabTitle: 'MANAGE ACCESS',

  table: {
    // Set 'display' to false to hide the table entirely
    display: true,
    // Value must be one of the 'dataField's in "columns"
    defaultSortField: 'displayName',
    // 'asc' or 'desc'
    defaultSortDirection: 'asc',

    columns: [
      {
        dataField: 'displayName',
        header: 'Name',
      },
      {
        dataField: 'IDP',
        header: 'Account Type',
      },
      {
        dataField: 'email',
        header: 'Email',
      },
      {
        dataField: 'organization',
        header: 'Organization',
      },
      {
        dataField: 'role',
        header: 'Role',
      },
      {
        dataField: 'userStatus',
        header: 'Status',
      },
      {
        dataField: 'numberOfArms',
        header: 'Arm(s)',
      },
    ],
  },

};

export const tabs = [tabManageAccess, tabPendingRequest];

// --------------- GraphQL query configuration --------------

// Get a list of MEMBER info  role == member
// Get all user info info  role == member,non-member
// Get pending data access requests  role == member,non-member ,accessStatus ==requested

export const GET_LIST_USERS = gql`
query listUsers($role: [String], $accessStatus: [String]) {
  User(role: $role) {
    displayName
    IDP
    email
    organization
    role
    userStatus
    numberOfArms
    userID
    creationDate
    acl(accessStatus: $accessStatus) {
            accessStatus
        }
  }
}
`;
export const GET_USER = gql`
  query getUser ($userID: ID!){
    getUser (userID: $userID){
      firstName
      lastName
      organization
      userID
      email
      IDP
      role
      userStatus
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

export const REJECT_ACCESS = gql`
  mutation rejectAccess($userID: ID!, $armIDs: [String]!, $comment: String!){
    rejectAccess (userID: $userID, armIDs: $armIDs, comment: $comment){
      armID
      armName
      accessStatus
      requestDate
      reviewAdminName
      reviewDate
      comment
    }
}
`;

export const APPROVE_ACCESS = gql`
  mutation approveAccess($userID: ID!, $armIDs: [String]!, $comment: String){
    approveAccess (userID: $userID, armIDs: $armIDs, comment: $comment){
      armID
      armName
      accessStatus
      requestDate
      reviewAdminName
      reviewDate
      comment
    }
  }
`;

export const SAVE_UPDATED_USER = gql`
  mutation editUser($userID: ID!, $role: String, $userStatus: String, $armIDs: [String]!, $comment: String!){
    revokeAccess(userID: $userID, armIDs: $armIDs, comment: $comment){
      accessStatus
    }
    editUser(userID: $userID, role: $role userStatus:$userStatus){
      firstName
      lastName
      organization
      userID
      email
      IDP
      role
      userStatus
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
