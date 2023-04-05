import gql from 'graphql-tag';
import { NODE_LEVEL_ACCESS } from './siteWideConfig';
import { nodeName } from './adminData';

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
const ignoredArms = ['revoked', 'rejected'];

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
      display: false,
    },
    {
      dataField: 'armName',
      header: NODE_LEVEL_ACCESS ? nodeName : 'Data Commons',
      display: true,
    },
    {
      dataField: 'accessStatus',
      header: 'Status',
      primary: true,
      display: true,
    },
    {
      dataField: 'requestDate',
      header: 'Request Date',
      display: true,
    },
    {
      dataField: 'reviewDate',
      header: 'Approved Date',
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

export {
  adminIcon,
  userIcon,
  editTool,
  inactiveUserIcon,
  GET_MY_PROFILE_QUERY,
  changeUserBasicInfo,
  ignoredArms,
};
