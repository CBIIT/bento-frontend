import React, { useState, useEffect } from 'react';
import _ from 'lodash';
// import CircularProgress from '@material-ui/core/CircularProgress';
import {
  JBrowseComponent,
  FileLocation,
  Index,
  Adapter,
  Track,
  Display,
  ViewTrack,
} from 'bento-components';
import {
  assemblies,
  assemblyNames,
  UriLocation,
  BamAdapter,
  // VariantAdapter,
  FILE_TYPE_BAM,
  FILE_TYPE_BAI,
  // FILE_TYPE_VCF,
  // FILE_TYPE_VCF_INDEX,
  alignment,
  variant,
  chunkSizeLimit,
  // alignemntLocation,
  // variantLocation,
  defaultSession,
  theme,
} from './jbrowseData';

const getAdapter = ({ bamLocationUri, indexUri }) => {
  const bamFileLocation = new FileLocation(
    bamLocationUri,
    UriLocation,
  );
  const index = new Index(new FileLocation(
    indexUri,
    UriLocation,
  ));
  return new Adapter(
    BamAdapter,
    bamFileLocation,
    index,
  );
};

const getDefaultSession = (alignments, session) => {
  if (alignments && alignments.length > 0) {
    alignments.forEach((item) => {
      if (item.type === alignment.type) {
        const display = new Display(
          alignment.display,
          alignment.height,
          alignment.maxDisplayedBpPerPx,
          `${item.trackId}-${alignment.display}`,
        );
        const viewTrack = new ViewTrack(
          item.type,
          item.trackId,
          [{ ...display }],
        );
        session.view.tracks.push({ ...viewTrack });
      }

      if (item.type === variant.type) {
        const display = new Display(
          variant.display,
          variant.height,
          variant.maxDisplayedBpPerPx,
          `${item.trackId}-${variant.display}`,
        );
        const viewTrack = new ViewTrack(
          item.type,
          item.trackId,
          [{ ...display }],
        );
        session.view.tracks.push({ ...viewTrack });
      }
    });
  }
  return session;
};

const getTracks = ({
  alignmentUris, optionalTracks,
}) => {
  const allTracks = [];
  if (alignmentUris && alignmentUris.file_name) {
    const aligmentAdapter = getAdapter(alignmentUris);
    aligmentAdapter.chunkSizeLimit = chunkSizeLimit;
    const alignmentOpts = new Track(
      alignment.trackId,
      alignment.trackName,
      assemblyNames,
      alignment.type,
      aligmentAdapter,
    );
    allTracks.push(alignmentOpts);
  }

  // eslint-disable-next-line no-unused-expressions
  optionalTracks && optionalTracks.forEach((track) => {
    if (track.display) {
      allTracks.push(track);
    }
  });
  return allTracks;
};

const JBrowseViewDetail = ({
  bamFiles,
  vcfFiles,
  options: {
    alignments,
    optionalTracks,
  },
}) => {
  const [trackList, setTracks] = useState([]);
  const [session, setSession] = useState([]);

  const configureAdapters = () => {
    const alignmentUris = {};

    if (bamFiles.length > 0 && alignments) {
      bamFiles.forEach((file) => {
        alignmentUris.file_name = file.file_name;
        if (file.file_type === FILE_TYPE_BAM) {
          alignmentUris.bamLocationUri = file.file_location;
        }
        if (file.file_type === FILE_TYPE_BAI) {
          alignmentUris.indexUri = file.file_location;
        }
      });
    }

    const currentTracks = getTracks({
      alignmentUris, alignments, optionalTracks,
    });

    const initSession = getDefaultSession(currentTracks, session);
    setSession(initSession);
    setTracks(currentTracks);
  };

  useEffect(() => {
    setSession(_.cloneDeep(defaultSession));
    if (bamFiles.length > 0 || (vcfFiles && vcfFiles.length > 0)) {
      configureAdapters();
    }
  }, [bamFiles, vcfFiles]);

  const trackData = [{
    trackId: 'my_alignments_track',
    name: 'My Alignment',
    assemblyNames: ['canFam6', 'canFam5', 'canFam4', 'canFam3', 'canFam2', 'canFam1'],
    type: 'AlignmentsTrack',
    adapter: {
      type: 'BamAdapter', bamLocation: { uri: 'https://nci-cbiit-caninedatacommons-file.s3.amazonaws.com/Final/NCATS/NCATS01/Bam-files/010015_0103_sorted.bam?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAINBJ6QVTSWMR7UZQ%2F20220614%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220614T024331Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&user_id=anonymous&username=anonymous&X-Amz-Signature=d188d59bd2c11e35728d00966c60d11f779ced17a5b59287b3942467604c4d19', locationType: 'UriLocation' }, index: { location: { uri: 'https://nci-cbiit-caninedatacommons-file.s3.amazonaws.com/Final/NCATS/NCATS01/Bam-files/010015_0103_sorted.bam.bai?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAINBJ6QVTSWMR7UZQ%2F20220614%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220614T024331Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&user_id=anonymous&username=anonymous&X-Amz-Signature=90641a74360b2890041ad7fdd84bb1cf2e9bf879cdc5f44f30d7ed9bf369e152', locationType: 'UriLocation' } }, chunkSizeLimit: 20000000,
    },
  }];

  const sessionData = {
    name: 'My session',
    view: {
      id: 'linearGenomeView',
      type: 'LinearGenomeView',
      tracks: [{
        type: 'ReferenceSequenceTrack',
        configuration: 'reference_id_canFam6',
        displays: [{
          type: 'LinearReferenceSequenceDisplay', maxDisplayedBpPerPx: 22345, height: 200, configuration: 'reference_id_canFam6-LinearReferenceSequenceDisplay',
        }],
      }, {
        type: 'AlignmentsTrack',
        configuration: 'my_alignments_track',
        displays: [{
          type: 'LinearPileupDisplay', height: 200, maxDisplayedBpPerPx: 50000, configuration: 'my_alignments_track-LinearPileupDisplay',
        }],
      }],
    },
  };
  return (
    <>
      <JBrowseComponent
        theme={theme}
        tracks={trackData}
        assemblies={assemblies}
        // location={location}
        defaultSession={sessionData}
      />
    </>
  );
};

JBrowseViewDetail.defaultProps = {
  options: {
    variants: false,
    alignments: false,
  },
  bamFiles: [],
};

export default JBrowseViewDetail;
