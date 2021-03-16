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
  name: 'GRCh38',
  sequence: {
    type: 'ReferenceSequenceTrack',
    trackId: 'GRCh38-ReferenceSequenceTrack',
    adapter: {
      type: 'IndexedFastaAdapter',
      fastaLocation: {
        uri: 'https://bento-bam-vcf-files.s3.amazonaws.com/ebi_grch37.fasta',
      },
      faiLocation: {
        uri: 'https://bento-bam-vcf-files.s3.amazonaws.com/ebi_grch37.fasta.fai',
      },
    },
  },
};

// http://localhost:3000/bam/NA20811.10.bam.bai
const tracks = [
  {
    trackId: 'my_alignments_track',
    name: 'My Alignments',
    assemblyNames: ['GRCh38'],
    type: 'AlignmentsTrack',
    adapter: {
      type: 'BamAdapter',
      bamLocation: { uri: 'https://bento-bam-vcf-files.s3.amazonaws.com/NA20811.bam' },
      index: { location: { uri: 'https://bento-bam-vcf-files.s3.amazonaws.com/NA20811.bam.bai' } },
    },
  },
  {
    type: 'VariantTrack',
    trackId: 'my_track',
    name: 'My Variants',
    assemblyNames: ['GRCh38'],
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
