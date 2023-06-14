import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  createViewState,
  createJBrowseTheme,
  JBrowseLinearGenomeView,
  ThemeProvider,
} from '@jbrowse/react-linear-genome-view';

const defaultFooterStyles = {
};

const theme = createJBrowseTheme();

const assembly = {
  name: 'hg19',
  aliases: ['GRCh37'],
  sequence: {
    type: 'ReferenceSequenceTrack',
    trackId: 'Pd8Wh30ei9R',
    adapter: {
      type: 'BgzipFastaAdapter',
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
  },
  refNameAliases: {
    adapter: {
      type: 'RefNameAliasAdapter',
      location: {
        uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/hg19/hg19_aliases.txt',
        locationType: 'UriLocation',
      },
    },
  },
};

// http://localhost:3000/bam/NA20811.10.bam.bai
const tracks = [
  {
    trackId: 'my_alignments_track',
    name: 'My Alignments',
    assemblyNames: ['hg19'],
    type: 'AlignmentsTrack',
    adapter: {
      type: 'BamAdapter',
      bamLocation: { uri: 'https://s3.amazonaws.com/bento-bam-vcf-files/HCC1143.gathered.bam' },
      index: { location: { uri: 'https://s3.amazonaws.com/bento-bam-vcf-files/HCC1143.gathered.bam.bai' } },
    },
  },
  {
    type: 'VariantTrack',
    trackId: 'my_track',
    name: 'My Variants',
    assemblyNames: ['hg19'],
    adapter: {
      type: 'VcfTabixAdapter',
      vcfGzLocation: { uri: 'https://bento-bam-vcf-files.s3.amazonaws.com/NA20811.10.sorted.vcf.gz' },
      index: { location: { uri: 'https://bento-bam-vcf-files.s3.amazonaws.com/NA20811.10.sorted.vcf.gz.tbi' } },
    },
  },
];

// const defaultSession = { FeatureTrack
//   name: 'My session',
//   view: {
//     id: 'linearGenomeView',
//     type: 'LinearGenomeView',
//     tracks: [
//       {
//         type: 'AlignmentsTrack',
//         configuration: 'my_alignments_track',
//         displays: [
//           {
//             type: 'ReferenceSequenceTrack',
//             configuration:
//               'my_alignments_track-ReferenceSequenceTrack',
//           },
//         ],
//       },
//     ],
//   },
// };

const state = createViewState({
  assembly,
  tracks,
  location: '10:29,838,737..29,838,819',
  // defaultSession,
});

const JBrowse = () => (
  <ThemeProvider theme={theme}>
    <JBrowseLinearGenomeView viewState={state} />
  </ThemeProvider>
);

export default withStyles(defaultFooterStyles, { withTheme: true })(JBrowse);
