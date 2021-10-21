import gql from 'graphql-tag';

// --------------- GraphQL query configuration --------------
// Primary ID field used to query a case
const caseIDField = 'subject_id';

const jBrowseOptions = {
  jBrowse: true,
  variants: true,
  alignments: true,
  referenceSequenceUris: {
    fastaLocation: 'https://bento-bam-vcf-files.s3.amazonaws.com/ebi_grch37.fasta',
    faiLocation: 'https://bento-bam-vcf-files.s3.amazonaws.com/ebi_grch37.fasta.fai',
  },
  variantsUris: {
    vcfGzLocationUri: 'https://bento-bam-vcf-files.s3.amazonaws.com/NA20811.10.sorted.vcf.gz',
    indexUri: 'https://bento-bam-vcf-files.s3.amazonaws.com/NA20811.10.sorted.vcf.gz.tbi',
  },
};

// GraphQL query to retrieve detailed info for a case
const GET_JBROWSE_DETAIL_DATA_QUERY = gql`
  query subjectDetail($subject_id: String!) {
    subjectDetail(subject_id: $subject_id) {
      subject_id
      files {
        file_type
        file_id
      }
    }
  }
`;

export {
  caseIDField,
  jBrowseOptions,
  GET_JBROWSE_DETAIL_DATA_QUERY,
};
