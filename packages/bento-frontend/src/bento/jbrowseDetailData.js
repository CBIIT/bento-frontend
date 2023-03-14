import gql from 'graphql-tag';

// --------------- GraphQL query configuration --------------
// Primary ID field used to query a case
const caseIDField = 'subject_id';

const jBrowseOptions = {
  jBrowse: true,
  variants: true,
  alignments: true,
  referenceSequenceUris: {
    fastaLocation: {
      uri: 'https://jbrowse.org/genomes/hg19/fasta/hg19.fa.gz',
      locationType: 'UriLocation',
    },
    faiLocation: {
      uri: 'https://jbrowse.org/genomes/hg19/fasta/hg19.fa.gz.fai',
      locationType: 'UriLocation',
    },
    gziLocation: {
      uri: 'https://jbrowse.org/genomes/hg19/fasta/hg19.fa.gz.gzi',
      locationType: 'UriLocation',
    },
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
