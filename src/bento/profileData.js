import gql from 'graphql-tag';

const adminIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/userProfileAdminIcon.svg',
  alt: 'Admin User Icon',
};

const userIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/userProfileIcon.svg',
  alt: 'Member User Icon',
};

const inactiveUserIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/userProfileNonMemberIcon.svg',
  alt: 'Inactive user Icon',
};

const editTool = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/userProfileEditTool.svg',
  alt: 'edit',
};

const testProfileInfoData = {
  getMyUser: {
    firstName: 'Jonathan',
    lastName: 'Dorian',
    IDP: 'don\'t know',
    organization: 'NCI/NIH',
    email: 'jondoe@emailaddress.com',
    acl: [
      /* {
        armID: 1,
        armName: 'AbbVie Inc.',
        accessStatus: 'active',
      }, {
        armID: 2,
        armName: 'McKesson Contract Packaging',
        accessStatus: 'active',
      }, {
        armID: 3,
        armName: 'State of Florida DOH Central Pharmacy',
        accessStatus: 'in-active',
      }, {
        armID: 4,
        armName: 'Sagent Pharmaceuticals',
        accessStatus: 'in-active',
      }, {
        armID: 5,
        armName: 'Nelco Laboratories, Inc.',
        accessStatus: 'active',
      }, {
        armID: 6,
        armName: 'CVS Pharmacy',
        accessStatus: 'in-active',
      }, {
        armID: 7,
        armName: 'Migranade Inc.',
        accessStatus: 'in-active',
      }, {
        armID: 8,
        armName: 'Northwind Pharmaceuticals',
        accessStatus: 'active',
      }, {
        armID: 9,
        armName: 'Almatica Pharma Inc.',
        accessStatus: 'active',
      }, {
        armID: 10,
        armName: 'Western Family Foods Inc',
        accessStatus: 'active',
      }, */
    ],
    associations: ['first arm of justice'],
    userId: 'jondorian',
    editDate: new Date(),
    creationDate: new Date(),
    // role: 'admin',
    role: 'member',
    // role: 'non-member',
    // userStatus: 'active',
    userStatus: 'inactive',
  },
};

export const profileArmsTable = {
  display: true,
  title: 'Access List',
  dataField: 'acl',
  defaultSortField: 'armName',
  defaultSortDirection: 'asc',
  selectableRows: false,
  columns: [
    {
      dataField: 'armID',
      header: 'Arms',
      primary: true,
      display: true,
    },
    {
      dataField: 'armName',
      header: 'Arm Name',
      display: true,
    },
    {
      dataField: 'accessStatus',
      header: 'Status',
      display: true,
    },
    {
      dataField: 'requestDate',
      header: 'Access Request Date',
      display: true,
    },
    {
      dataField: 'reviewDate',
      header: 'Access Approved Date',
      display: true,
    },
  ],
};

const GET_MY_PROFILE_QUERY = gql`
    query getMyUser {
        getMyUser{
            firstName
            lastName
            email
            IDP
            organization
            acl {
                armID
                armName
                requestDate
                reviewDate
                accessStatus
            }
            userID
            creationDate
            editDate
            role
            userStatus
        }
    }
`;

const changeUserBasicInfo = gql`
    mutation updateMyUser($userInfo: UpdateUserInput! ){
        updateMyUser(userInfo: $userInfo) {
            firstName
            lastName
            organization
            userID
            userStatus
            IDP
            role
            acl {
                armID
                armName
                requestDate
                reviewDate
                comment
                accessStatus
            }
            editDate
            creationDate
        }
    }
`;

// eslint-disable-next-line import/prefer-default-export
export {
  adminIcon,
  userIcon,
  editTool,
  inactiveUserIcon,
  GET_MY_PROFILE_QUERY,
  changeUserBasicInfo,
  testProfileInfoData,
};
