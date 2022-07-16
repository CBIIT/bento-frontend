/* eslint-disable */
import gql from 'graphql-tag';

export const icon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/programIcon.svg',
  alt: 'Bento program logo',
};

export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};


export const useMock = true;

// --------------- GraphQL query configuration --------------

// Get a list of MEMBER info  role == member
// Get all user info info  role == member,non-member
// Get pending data access requests  role == member,non-member ,accessStatus ==requested

export const GET_LIST_USERS = gql`
query listUsers($role: [String],$userStatus: [String],$accessStatus: [String]) {
  User(role: $role,userStatus: $userStatus) {
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
	    acl(accessStatus: $accessStatus){
	    	armID
	    	accessStatus
	    }
   }
}`;
