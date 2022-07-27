import gql from 'graphql-tag';

export const pageTitle = 'Data Access Request';

/*
  "levelDetails" variable is used to get accessControlLevel related data
  from GET_ACCESS_CONTROL_LEVEL_DETAILS_QUERY's response object.
*/
export const acl = 'Arms';
export const aclAPIOptionsField = 'listArms';

export const formFields = [
  {
    id: 'lastName',
    type: 'textBox',
    required: true,
    label: 'Last Name',
    placeHolder: 'Last Name',
  },
  {
    id: 'firstName',
    type: 'textBox',
    required: true,
    label: 'First Name',
    placeHolder: 'First Name',
  },
  {
    id: 'organization',
    type: 'textBox',
    required: true,
    label: 'Organization/Institution',
    placeHolder: 'Organization/Institution',
  },
  {
    id: 'acl',
    type: 'dropdown',
    required: true,
    label: 'Study Arm',
    placeHolder: 'Study Arm',
    multiple: true,
    optionsAPIField: aclAPIOptionsField,
    options: [
      {
        id: 'a',
        name: 'A: RS 0-10, assigned endocrine therapy alone',
      },
      {
        id: 'b',
        name: 'B: RS 11-25, randomized to endocrine therapy alone',
      },
      {
        id: 'c',
        name: 'C: RS 11-25, randomized to chemo + endocrine therapy',
      },
      {
        id: 'd',
        name: 'D: RS > 25, assigned to chemo +',
      },
    ],
  },
];

export const SUBMIT_REGISTER = gql`
mutation registerUser($user: RegisterUserInput!) {
  registerUser(userInfo: $user) {
    firstName
    lastName
    email
    IDP
    organization
    acl
    userID
    registrationDate
    approvalDate
    editDate
    role
    status
  }
}`;

export const GET_ACCESS_CONTROL_LEVEL_DETAILS_QUERY = gql`
query listArms {
  listArms{
        id,
        name
}
}`;

export default null;
