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
  data: {
    firstName: 'Jonathan',
    lastName: 'Dorian',
    IDP: 'don\'t know',
    organization: 'NCI/NIH',
    email: 'jondoe@emailaddress.com',
    acl: [
      {
        armId: 1,
        armName: 'AbbVie Inc.',
        accessStatus: 'active',
      }, {
        armId: 2,
        armName: 'McKesson Contract Packaging',
        accessStatus: 'active',
      }, {
        armId: 3,
        armName: 'State of Florida DOH Central Pharmacy',
        accessStatus: 'in-active',
      }, {
        armId: 4,
        armName: 'Sagent Pharmaceuticals',
        accessStatus: 'in-active',
      }, {
        armId: 5,
        armName: 'Nelco Laboratories, Inc.',
        accessStatus: 'active',
      }, {
        armId: 6,
        armName: 'CVS Pharmacy',
        accessStatus: 'in-active',
      }, {
        armId: 7,
        armName: 'Migranade Inc.',
        accessStatus: 'in-active',
      }, {
        armId: 8,
        armName: 'Northwind Pharmaceuticals',
        accessStatus: 'active',
      }, {
        armId: 9,
        armName: 'Almatica Pharma Inc.',
        accessStatus: 'active',
      }, {
        armId: 10,
        armName: 'Western Family Foods Inc',
        accessStatus: 'active',
      },
    ],
    associations: ['first arm of justice'],
    userId: 'jondorian',
    editDate: new Date(),
    creationDate: new Date(),
    role: 'member',
    userStatus: 'active',
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
      dataField: 'armId',
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
      header: 'Request Date',
      display: true,
    },
    {
      dataField: 'approvedDate',
      header: 'Approved Date',
      display: true,
    },
  ],
};

const GET_MY_PROFILE_QUERY = gql`
    query getMyUser {
        getMyUser {
            firstName
            lastName
            email
            IDP
            organization
            acl {
                armID
                armName
                accessStatus
            }
            userID
            creationDate
            editDate
            role
            userStatus
        }
    }`;

const listOfUserProfiles = gql`
    query listUsers(
        $role: [String] = ["standard"],
        $status: [String] = ["active"],
        $accessStatus: [String] = ["requested", "approved"]) {
        listUsers(role: $role, status: $status, accessStatus: $accessStatus) {
            firstName
            lastName
            email
            IDP
            organization
            acl {
                armId
                armName
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
    mutation changeUserInformation($firstName: String ){
        changeUser(firstName: $firstName) {
            irstName
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
    }
`;

const getUserById = gql`
    query getUser($user: [String]) {
        getUser(user: $user){
            firstName
            lastName
            email
            IDP
            organization
            acl {
                armId
                armName
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

// eslint-disable-next-line import/prefer-default-export
export {
  adminIcon,
  userIcon,
  editTool,
  inactiveUserIcon,
  listOfUserProfiles,
  getUserById,
  GET_MY_PROFILE_QUERY,
  changeUserBasicInfo,
  testProfileInfoData,
};
