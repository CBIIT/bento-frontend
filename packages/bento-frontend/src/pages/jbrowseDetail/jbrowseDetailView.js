import PropTypes from 'prop-types';
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

const createAssembly = ({ fastaLocation, faiLocation, gziLocation }) => ({
  name: 'hg19',
  aliases: ['GRCh37'],
  sequence: {
    type: 'ReferenceSequenceTrack',
    trackId: 'Pd8Wh30ei9R',
    adapter: {
      type: 'BgzipFastaAdapter',
      fastaLocation,
      faiLocation,
      gziLocation,
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
});

const getVariantsAdapter = ({ vcfGzLocationUri, indexUri }) => ({
  type: 'VcfTabixAdapter',
  vcfGzLocation: { uri: vcfGzLocationUri },
  index: { location: { uri: indexUri } },
});

const getAlignmentAdapter = ({ bamLocationUri, indexUri }) => ({
  type: 'BamAdapter',
  bamLocation: { uri: bamLocationUri },
  index: { location: { uri: indexUri } },
});

const getTracks = ({
  alignments, variants, variantsUris, alignmentUris,
}) => {
  const tracks = [];
  const alignmentOpts = {
    adapter: {},
    name: 'My Alignments',
    assemblyNames: ['hg19'],
    type: 'AlignmentsTrack',
    trackId: 'my_alignments_track',
  };

  const variantsOpts = {
    adapter: {},
    name: 'My Variants',
    trackId: 'my_track',
    type: 'VariantTrack',
    assemblyNames: ['hg19'],
  };

  if (alignments) {
    alignmentOpts.adapter = getAlignmentAdapter(alignmentUris);
    tracks.push(alignmentOpts);
  }

  if (variants) {
    variantsOpts.adapter = getVariantsAdapter(variantsUris);
    tracks.push(variantsOpts);
  }

  return tracks;
};

const JBrowseDetail = ({
  bamFiles,
  options: {
    variants,
    alignments,
    variantsUris,
    referenceSequenceUris,
  },
}) => {
  const [trackList, setTracks] = useState([]);

  const getState = () => {
    const state = createViewState({
      tracks: trackList,
      assembly: createAssembly(referenceSequenceUris),
      location: '10:29,838,737..29,838,819',
    });
    return state;
  };

  const configureAdapters = () => {
    const alignmentUris = {};

    if (alignments) {
      bamFiles.forEach((file) => {
        if (file.file_type === 'bam') {
          alignmentUris.bamLocationUri = file.file_location;
        }
        if (file.file_type === 'bai') {
          alignmentUris.indexUri = file.file_location;
        }
      });
    }

    const currentTracks = getTracks({
      alignmentUris, variantsUris, alignments, variants,
    });

    setTracks(currentTracks);
  };

  useEffect(() => {
    if (bamFiles.length > 0) {
      configureAdapters();
    }
  }, [bamFiles]);

  return (
    <ThemeProvider theme={theme}>
      <JBrowseLinearGenomeView viewState={getState()} />
    </ThemeProvider>
  );
};

JBrowseDetail.propTypes = {
  bamFiles: PropTypes.arrayOf(
    PropTypes.shape({
      file_type: PropTypes.string.isRequired,
      file_location: PropTypes.string.isRequired,
    }),
  ),
  options: PropTypes.shape({
    variants: PropTypes.bool,
    alignments: PropTypes.bool,
    referenceSequenceUris: PropTypes.shape({
      faiLocation: PropTypes.string.isRequired,
      fastaLocation: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

JBrowseDetail.defaultProps = {
  options: {
    variants: false,
    alignments: false,
  },
  bamFiles: [],
};

export default withStyles(defaultFooterStyles, { withTheme: true })(JBrowseDetail);
