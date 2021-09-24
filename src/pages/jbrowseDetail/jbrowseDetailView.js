import axios from 'axios';
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
      bamLocation: { uri: 'https://d1c9wxtw4a60lg.cloudfront.net/PACT1-1K/wgEncodeUwRepliSeqBg02esG1bAlnRep1.bam?Expires=1632576488&Key-Pair-Id=K3USBVWL2TSK7R&Signature=cjNFSJZUZssSIjepwsGVFg5FLSsEe9PPG2Grfeod-vHmWzAacUEQdMIyWXP8SOzierPAtD1p8JfM7-qhvbP-bkD-2b1YMT1VCJlLDGaxLnWB3Oyes~ZZCCszw0MkMpoA78paGQ127E6NcbSle1Vu6JzMp3Ukl~pJrzPgJKUAyYkRVyttOfKWHmk4zNYRqCNW0-Sdh0E6cJo4RBnGj36EVy-yB2UiVbeNfBYeRsutSRQBDYf7nQD4SEtLPo80eVP6q-LHqj0tlq40LZ1Q3SKRmk9s~8SoxeXqal5-s-Rjqse6aHT8eCbYbc9-QxltBsruXTLJKUmMm2qVhlRGo5wovA__' },
      index: { location: { uri: 'https://d1c9wxtw4a60lg.cloudfront.net/PACT1-1K/wgEncodeUwRepliSeqBg02esG1bAlnRep1.bam.bai?Expires=1632576499&Key-Pair-Id=K3USBVWL2TSK7R&Signature=fbsqCGdxfa-ezAoEr9N6lelBBjZCWJNuJToCG5VU-C~-sHALO4gqP-SxmBtRhnkrKgzO1cNv3BS-E~~jcA9xkC8Mt0qJfCmuAHXYmydzAeY5fzjmowJRX-EUKicY9lpPNODVc0OwHj4JDUTkmxlNae8LrxvYOPd1a~skabRrfg~hEoLZPVAitHdJ9T1KeTUTC~AeKegtgAQ7hcmDdCqATx~C-R87FWkbPmnrCvmaqDAFA94KmLgn9CtRKpacr2geR8W29J2mjQW~~1zZhKPWYajYua2r1dMBBzi5ppUMJYmOkmpDtRww2dRLgKnEZR9Ia4Y8S4OOAm-M5Hkv2csHFg__' } },
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

const state = createViewState({
  assembly,
  tracks,
  location: '10:29,838,737..29,838,819',
});

const JBrowseDetail = ({ bamFiles }) => {
  // eslint-disable-next-line
  const [trackList, setTracks] = useState(tracks);

  const getFileUris = async () => {
    const resp1 = await axios.get(bamFiles[0].file_location);
    const resp2 = await axios.get(bamFiles[0].file_location, {
      headers: {
        'Content-Type': 'applciation/json',
      },
    });
    console.log(resp1, resp2, 'SOMETHING');
  };

  useEffect(() => {
    // trackList[0].adapter.bamLocation.uri =
    if (bamFiles.length > 0) {
      getFileUris();
    }
  }, [bamFiles]);

  return (
    <ThemeProvider theme={theme}>
      <JBrowseLinearGenomeView viewState={state} />
    </ThemeProvider>
  );
};

export default withStyles(defaultFooterStyles, { withTheme: true })(JBrowseDetail);
