import gql from 'graphql-tag';
// import Test from '../assets/header/CTDC_Logo.svg';
// headerIconSrc optimum size 100x100
// wizardIconSrc optimum size 400x46.76

export const navBarCartData = {
  cartLabel: 'MY CASES',
  cartLink: '/myCases',
  cartIcon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Icon-Cart-Navbar.svg',
  cartIconAlt: 'cart_logo',
};

export const myCasesPageData = {
  myCasesMainTitle: 'My Cases :',
  myCasesSubTitle: 'Cases',
  buttonText: 'GO TO FILES',
  buttonLink: '/mycasesfiles',
  headerIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Icon-Cart-Workflow.svg',
  headerIconAlt: 'Bento MyCases header logo',
  wizardIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Cart-Wizard-Step2.svg',
  wizardIconAlt: 'Bento MyCases Wizard',
};

export const myFilesPageData = {
  mainTitle: 'My Files :',
  subTitle: 'Files',
  buttonText: 'DOWNLOAD MANIFEST',
  headerIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Icon-Cart-Workflow.svg',
  headerIconAlt: 'Bento MyFiles header logo',
  wizardIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Cart-Wizard-Step3.svg',
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
