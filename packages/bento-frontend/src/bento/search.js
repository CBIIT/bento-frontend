import gql from 'graphql-tag';

// --------------- Icons configuration --------------
// Ideal size for programListingIcon is 100x100 px
// Ideal size for externalLinkIcon is 16x16 px
export const programListingIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/programIcon.svg',
  alt: 'Bento program logo',
};

/** certain search data items */
export const SEARCH_KEYS = {
  public: [],
  private: ['programs', 'studies', 'subjects', 'samples', 'files'],
};

export const SEARCH_DATAFIELDS = {
  public: [],
  private: ['program_id', 'study_id', 'subject_id', 'sample_id', 'file_id'],
};

/** Public search queries */
export const SEARCH_PUBLIC = gql`
    query publicGlobalSearchQuery($input: String) {
        publicGlobalSearch(input: $input) {
            model_count
            about_count
            program_count
            study_count
            subject_count
            sample_count
            file_count
            about_page{
                page
                title
                type
                text
            }
        }
    }
`;

export const SEARCH_PAGE_RESULT_PROGRAM_PUBLIC = gql`
    query publicGlobalSearchQuery($input: String, $first: Int, $offset: Int) {
        publicGlobalSearchQuery(
            input: $input
            first: $first
            offset: $offset) {
            programs{
                type
                program_id
                program_name
                program_code
            }
        }
    }
`;

export const SEARCH_PAGE_RESULT_ABOUT_PUBLIC = gql`
    query publicGlobalSearch($input: String, $first: Int, $offset: Int){
        publicGlobalSearch(
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
    }`;

export const SEARCH_PAGE_RESULTS_PUBLIC = gql`
    query publicGlobalSearch($input: String, $first: Int, $offset: Int){
        publicGlobalSearch(
            input: $input
            first: $first
            offset: $offset
        ) {
            program_count
            model_count
            about_count
            study_count
            subject_count
            sample_count
            file_count
        }
    }
`;

export const SEARCH_PAGE_RESULT_MODEL_PUBLIC = gql`
    query publicGlobalSearch($input: String, $first: Int, $offset: Int){
        publicGlobalSearch(
            input: $input
            first: $first
            offset: $offset
        ) {
            model {
                type
                node_name
                property_name
                property_description
                property_required
                property_type
                value
                highlight
            }
        }
    }
`;

/** End of public searches */

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
            model {
                node_name
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
                program_id
                study_name
                study_type
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
                subject_id
                program_id
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
                sample_id
                program_id
                subject_id
                diagnosis
                sample_anatomic_site
                tissue_type
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
                file_id
                file_name
                file_format
                program_id
                subject_id
                sample_id
            }
        }
    }
`;

export const SEARCH_PAGE_RESULT_MODEL = gql`
    query globalSearch($input: String, $first: Int, $offset: Int){
        globalSearch(
            input: $input
            first: $first
            offset: $offset
        ) {
            model {
                type
                node_name
                property_name
                property_description
                property_required
                property_type
                value
                highlight
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
            model_count
            about_count
        }
    }
`;
