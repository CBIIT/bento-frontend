import gql from 'graphql-tag';
import { NODE_LEVEL_ACCESS } from './siteWideConfig';
import custodianUtils from '../utils/custodianUtilFuncs';

export const icon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/AdminPortal.Icon.svg',
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
export const viewPageTitle = `Approved ${custodianUtils.getNodeLevelLabel()}`;

export const useMock = false;

// Node Name configured in the Data Access Request form
export const nodeName = custodianUtils.getNodeLevelLabel();

export const nodeField = 'numberOfArms'; // Node field

/* Approve DAR Comment Field configuration
    - "Optional" By Default or "Required"
*/
export const approveCommentField = 'Optional';

/* Reject DAR Comment Field configuration
    - "Optional" By Default or "Required"
*/
export const rejectCommentField = 'Optional';

export const nodeLevelAccess = NODE_LEVEL_ACCESS; // Node-Level Access is configured as "Off"

// --------------- tab Pending Request --------------
export const tabPendingRequest = {

  tabTitle: 'PENDING REQUESTS',

  table: {
    // Set 'display' to false to hide the table entirely
    display: true,
    // Value must be one of the 'dataField's in "columns"
    defaultSortField: 'name',
    // 'asc' or 'desc'
    defaultSortDirection: 'asc',

    search: false,

    columns: [
      {
        dataField: 'displayName',
        header: 'Name',
        isCapital: true,
      },
      {
        dataField: 'IDP',
        header: 'Account Type',
        isCapital: true,
      },
      {
        dataField: 'email',
        header: 'Email',
      },
      {
        dataField: 'organization',
        header: 'Organization',
        isCapital: true,
      },
      {
        dataField: 'userStatus',
        header: 'Membership Status',
        isCapital: true,
      },
      {
        dataField: 'role',
        header: 'Role',
        isCapital: true,
      },
      {
        dataField: 'requestDate',
        header: 'Request Date',
      },
      {
        dataField: nodeField,
        header: nodeName,
        noEmpty: true,
        display: nodeLevelAccess,
      },
    ],
  },

};

// --------------- tab Pending Request --------------
export const tabManageAccess = {

  tabTitle: 'MANAGE ACCESS',

  table: {
    // Set 'display' to false to hide the table entirely
    display: true,
    search: false,

    columns: [
      {
        dataField: 'displayName',
        header: 'Name',
        isCapital: true,
      },
      {
        dataField: 'IDP',
        header: 'Account Type',
        isCapital: true,
      },
      {
        dataField: 'email',
        header: 'Email',
      },
      {
        dataField: 'organization',
        header: 'Organization',
        isCapital: true,
      },
      {
        dataField: 'userStatus',
        header: 'Membership Status',
        isCapital: true,
      },
      {
        dataField: 'role',
        header: 'Role',
        isCapital: true,
      },
    ],
  },

};

// --------------- Columns Configuration for Review DAR Table --------------
export const getReviewDARConfig = () => ({
  // Set 'display' to false to hide the table entirely
  display: true,
  title: 'Review individual pending data access requests',
  columns: [
    {
      dataField: 'armName',
      header: nodeLevelAccess ? nodeName : 'Data Commons',
      display: true,
    },
    {
      dataField: 'requestDate',
      header: 'Request Date',
      display: true,
    },
  ],
});

export const GET_LIST_REQUESTS = gql`
query listRequest($requestID: [ID], $accessStatus: [String]){
    listRequest (requestID: $requestID, accessStatus: $accessStatus){
        firstName
        lastName
        displayName
        organization
        userID
        email
        IDP
        role
        userStatus
        numberOfArms
        requestID
        requestDate
        acl {
            armID
            armName
            accessStatus
            requestDate
            reviewAdminName
            reviewDate
            comment
            requestID
        }
    }
}
`;
// --------------- GraphQL query configuration --------------

// Get a list of MEMBER info  role == member
// Get all user info info  role == member,non-member
// Get pending data access requests  role == member,non-member ,accessStatus ==pending

export const GET_LIST_USERS = gql`
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
  mutation editUser($userID: ID!, $role: String, $armIDs: [String]!, $comment: String!, $userStatus: String){
    revokeAccess(userID: $userID, armIDs: $armIDs, comment: $comment){
      accessStatus
    }
    editUser(userID: $userID, role: $role, userStatus: $userStatus){
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
