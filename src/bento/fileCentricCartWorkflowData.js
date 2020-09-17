import gql from 'graphql-tag';
// import Test from '../assets/header/CTDC_Logo.svg';
// headerIconSrc optimum size 100x100
// wizardIconSrc optimum size 400x46.76

export const navBarCartData = {
  cartLabel: 'MY Files',
  cartLink: '/fileCentricCart',
  cartIcon: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/icons/Icon-Cart-Navbar.svg',
  cartIconAlt: 'cart_logo',
};

export const myFilesPageData = {
  mainTitle: 'My Files :',
  subTitle: 'Files',
  downButtonText: 'DOWNLOAD MANIFEST',
  deleteButtonText: 'Remove From Your Files',
  headerIconSrc: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/icons/Icon-Cart-Workflow.svg',
  headerIconAlt: 'Bento MyFiles header logo',
  wizardIconSrc: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/icons/Cart-Wizard-Step3.svg',
  wizardIconAlt: 'Bento MyFiles Wizard',
  manifestFileName: 'BENTO File Manifest',
};

export const cartSelectionMessages = {
  selectionsAddedMessage: 'Case(s) successfully added to the My Cases list',
  selectionsRemovedMessage: 'Case(s) successfully removed from the My Cases list',
};

// --------------- GraphQL query - Retrieve selected cases info --------------
export const GET_MY_CASES_DATA_QUERY = gql`
query subjectsInList($subject_ids: [String!]!) {

  subjectsInList(subject_ids: $subject_ids) {
    subject_id
    program_id
    program
    study_acronym
    diagnosis
    recurrence_score
    tumor_size
    er_status
    pr_status
    age_at_index
    survival_time
    survival_time_unit
}
filesOfSubjects(subject_ids: $subject_ids) {
   subject_id
    file_description
    file_format
    file_name
    file_size
    file_type
    association
    file_id
    md5sum
}

}`;
