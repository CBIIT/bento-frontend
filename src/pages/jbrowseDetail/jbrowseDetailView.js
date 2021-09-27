import React, { useState, useEffect } from 'react';
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
      bamLocation: { uri: '' },
      index: { location: { uri: '' } },
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

const JBrowseDetail = ({ bamFiles }) => {
  const [trackList, setTracks] = useState(tracks);

  const getState = () => {
    const state = createViewState({
      assembly,
      tracks: trackList,
      location: '10:29,838,737..29,838,819',
    });
    return state;
  };

  const configureAdapter = () => {
    const adapter = {
      type: 'BamAdapter',
      bamLocation: { uri: '' },
      index: { location: { uri: '' } },
    };

    bamFiles.forEach((file) => {
      if (file.file_type === 'bam') {
        adapter.bamLocation.uri = file.file_location;
      }
      if (file.file_type === 'bai') {
        adapter.index.location.uri = file.file_location;
      }
    });

    let alignmentTrack = trackList[0];
    alignmentTrack = {
      ...alignmentTrack,
      adapter,
    };

    setTracks([alignmentTrack, trackList[1]]);
  };

  useEffect(() => {
    if (bamFiles.length > 0) {
      configureAdapter();
    }
  }, [bamFiles]);

  return (
    <ThemeProvider theme={theme}>
      <JBrowseLinearGenomeView viewState={getState()} />
    </ThemeProvider>
  );
};

export default withStyles(defaultFooterStyles, { withTheme: true })(JBrowseDetail);
