import gql from 'graphql-tag';

// --------------- Icons configuration --------------
// Ideal size for programListingIcon is 100x100 px
// Ideal size for externalLinkIcon is 16x16 px
export const programListingIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/programIcon.svg',
  alt: 'Bento program logo',
};

export const SEARCH = gql`
query globalSearch($input: String){
    globalSearch(input: $input) {
        programs {
            program_id
        }
        studies {
            study_id
        }
        subjects {
            subject_id
        }
        samples {
            sample_id
        }
        files {
            file_id
        }
        values {
            value
        }
        nodes {
            node_name
        }
        properties {
            property_name
        }
    }
}
`;

export const SEARCH_PAGE_RESULT_PROGRAM = gql`
query globalSearch($input: String, $first: Int, $offset: Int){
    globalSearch(
        input: $input
        first: $first
        offset: $offset
    ) {
        programs {
            type
            program_id
            program_name
            program_code
        }
}
}
`;

export const SEARCH_PAGE_RESULT_STUDIES = gql`
query globalSearch($input: String, $first: Int, $offset: Int){
    globalSearch(
        input: $input
        first: $first
        offset: $offset
    ) {
        studies {
            type
            study_id
            study_name
            study_code
        }
}
}
`;

export const SEARCH_PAGE_RESULT_SUBJECTS = gql`
query globalSearch($input: String, $first: Int, $offset: Int){
    globalSearch(
        input: $input
        first: $first
        offset: $offset
    ) {
        subjects {
            type
            program_code
            program_id
            study
            subject_id
            diagnosis
            age
        }
}
}
`;

export const SEARCH_PAGE_RESULT_SAMPLES = gql`
query globalSearch($input: String, $first: Int, $offset: Int){
    globalSearch(
        input: $input
        first: $first
        offset: $offset
    ) {
        samples {
            type
            subject_id
            sample_id
            diagnosis
            sample_anatomic_site
        }
}
}
`;

export const SEARCH_PAGE_RESULT_FILES = gql`
query globalSearch($input: String, $first: Int, $offset: Int){
    globalSearch(
        input: $input
        first: $first
        offset: $offset
    ) {
        files {
            type
            subject_id
            sample_id
            file_name
            file_id
        }
}
}
`;

export const SEARCH_PAGE_RESULT_VALUES = gql`
query globalSearch($input: String, $first: Int, $offset: Int){
    globalSearch(
        input: $input
        first: $first
        offset: $offset
    ) {
        values {
            type
            node_name
            property_name
            value
        }
}
}
`;

export const SEARCH_PAGE_RESULT_ABOUT = gql`
query globalSearch($input: String, $first: Int, $offset: Int){
    globalSearch(
        input: $input
        first: $first
        offset: $offset
    ) {

        about_page {
            type
            text
            page
            title
        }
}
}
`;

export const SEARCH_PAGE_RESULTS = gql`
query globalSearch($input: String, $first: Int, $offset: Int){
    globalSearch(
        input: $input
        first: $first
        offset: $offset
    ) {
        program_count
        study_count
        subject_count
        sample_count
        file_count
        value_count
        about_count
}
}
`;
