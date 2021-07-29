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

const tracks = [
  {
    trackId: 'my_alignments_track',
    name: 'My Alignments',
    assemblyNames: ['GRCh38'],
    type: 'AlignmentsTrack',
    adapter: {
      type: 'BamAdapter',
      bamLocation: { uri: ' https://d1c9wxtw4a60lg.cloudfront.net/PACT1-1K/wgEncodeUwRepliSeqBg02esG1bAlnRep1.bam?Expires=1627668541&Key-Pair-Id=K3M5ZT6KJNAGN7&Signature=EvqMJuDZQzdrOqpzHG04KzgW--O-pCy3~ca-2nwa9MZ1HzXQLo0UjMVl5bCyoMP6SMXqksN6ic~fmCR7HyxeUXD8nEg2NE25G96WfDmHq~ZgsDqLsssKFRjvygSNAEjbJia3W4iwyRkZWkqqxvMpTFu4ERCz7qvZ3FnPby1TOHjUZuPpqQGH4wRwdRQjXxwOC9-yPsTvFhk8SwOiIR8hJj40WwXXSr4DHLaaKCT3cFVQHklqN-AUNi1hbEO2J8NrDd62K2OsYGeyc-K3JgUi1193gKFnybMfl9hFhT3iP3W9t1FzSmYmfGD2E8PkQ~5WU3Cd~yMUYY-I80s7KnONTA__' },
      index: { location: { uri: 'https://d1c9wxtw4a60lg.cloudfront.net/PACT1-1K/wgEncodeUwRepliSeqBg02esG1bAlnRep1.bam.bai?Expires=1627668291&Key-Pair-Id=K3M5ZT6KJNAGN7&Signature=lvy-ImCnYj2ujwhNBrb-BJImjhrd5w4hvazZGEbpN0J9JDX6P3oIHwq7A37uy2bl14ZpbSZl0rF0JDX54-hGKcii3EmtkjJWzgrgLj0AuXlfhdSMV2Y0hrIeAnrCMX03fVNmFzm0lJrDgRBwauHo9i1rb~QU0jrEKGYWg7jFyE0x~teF~-0oYMwLLM3~h6cLGMGWAM7zEXr8OHbOr8hwoBKdXoNiAbeheCmncVBrffmM7bJPoE6Lnh7YX-nb3EYBxB-RQ8LPZP2gTnplTndNDyx9Do31dnE-VBLUbRnSlziN9smcOulFVFNS6diX4j7oXGYSAtTLOtAbBnutfalzpQ__' } },
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
// const getTracks = (bamFiles) => {
//   console.log(bamFiles);
//   const bamFile = bamFiles.filter((file) => file.file_type === 'bam');
//   console.log(bamFile);
//   const baiFile = bamFiles.filter((file) => file.file_type === 'bai');
//   const tester = [
//     {
//       trackId: 'my_alignments_track',
//       name: 'My Alignments',
//       assemblyNames: ['GRCh38'],
//       type: 'AlignmentsTrack',
//       adapter: {
//         type: 'BamAdapter',
//         bamLocation: { uri: bamFile.file_location },
//         index: { location: { uri: baiFile.file_location } },
//       },
//     },
//     {
//       type: 'VariantTrack',
//       trackId: 'my_track',
//       name: 'My Variants',
//       assemblyNames: ['GRCh38'],
//       adapter: {
//         type: 'VcfTabixAdapter',
//         vcfGzLocation: { uri: 'https://bento-bam-vcf-files.s3.amazonaws.com/NA20811.10.sorted.vcf.gz' },
//         index: { location: { uri: 'https://bento-bam-vcf-files.s3.amazonaws.com/NA20811.10.sorted.vcf.gz.tbi' } },
//       },
//     },
//   ];
//   return tester;
// };

const state = createViewState({
  assembly,
  tracks,
  location: '10:29,838,737..29,838,819',
  // defaultSession,
});

const JBrowseDetail = () => (
  <ThemeProvider theme={theme}>
    <JBrowseLinearGenomeView viewState={state} />
  </ThemeProvider>
);

export default withStyles(defaultFooterStyles, { withTheme: true })(JBrowseDetail);
