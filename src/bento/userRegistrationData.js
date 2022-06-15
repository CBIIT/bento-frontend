import gql from 'graphql-tag';

export const registrationForm = [
  {
    id: 'IDP',
    type: 'dropdown',
    required: true,
    label: 'Account Type',
    placeHolder: 'Account Type',
    multiple: false,
    options: {
      google: {
        title: 'Google',
      },
      'login.gov': {
        title: 'Login.Ggov',
      },
      nih: {
        title: 'NIH iTrust',
      },
    },
  },
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
    id: 'email',
    type: 'email',
    required: true,
    label: 'Email Address',
    placeHolder: 'Email Address',
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
    type: 'textBox',
    required: false,
    label: 'Study Arm',
    placeHolder: 'Study Arm',
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

export default null;
