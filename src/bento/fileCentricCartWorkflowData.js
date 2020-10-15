import gql from 'graphql-tag';

export const navBarCartData = {
  cartLabel: 'MY Files',
  cartLink: '/fileCentricCart',
  cartIcon: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/icons/Icon-Cart-Navbar.svg',
  cartIconAlt: 'cart_logo',
};

export const myFilesPageData = {
  mainTitle: 'Cart >',
  subTitle: 'Selected Files',
  downButtonText: 'DOWNLOAD MANIFEST',
  deleteButtonText: 'Remove From Your Files',
  headerIconSrc: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/icons/Icon-Cart-Workflow.svg',
  headerIconAlt: 'Bento MyFiles header logo',
  manifestFileName: 'BENTO File Manifest',
};

// --------------- GraphQL query - Retrieve selected cases info --------------
export const GET_MY_CART_DATA_QUERY = gql`
query filesInList($file_ids: [String]) {
    filesInList(file_ids: $file_ids) {
        study_code
        subject_id
        file_name
        file_type
        association
        file_description
        file_format
        file_size
        file_id
        md5sum
    }
}`;
