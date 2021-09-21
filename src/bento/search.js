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
        program_ids
        arm_ids
        subject_ids
        sample_ids
        file_ids
    }
}
`;
