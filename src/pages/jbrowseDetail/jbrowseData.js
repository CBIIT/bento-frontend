import gql from 'graphql-tag';

export const assemblyNames = ['canFam6', 'canFam5', 'canFam4', 'canFam3', 'canFam2', 'canFam1'];

export const BamAdapter = 'BamAdapter';
export const VariantAdapter = 'VcfTabixAdapter';
export const BgzipFastaAdapter = 'BgzipFastaAdapter';
export const UriLocation = 'UriLocation';
export const FILE_TYPE_BAM = 'bam';
export const FILE_TYPE_BAI = 'bai';
export const FILE_TYPE_VCF = 'gz';
export const FILE_TYPE_VCF_INDEX = 'tbi';
export const JbrowserFiles = [FILE_TYPE_BAM, FILE_TYPE_BAI, FILE_TYPE_VCF, FILE_TYPE_VCF_INDEX];
export const alignemntLocation = 'chr1:60,632,043..60,636,011';
export const variantLocation = 'chr1:60,032,043..60,636,011';
// size in bytes
export const chunkSizeLimit = 20000000;
export const alignment = {
  trackId: 'my_alignments_track',
  trackName: 'My Alignment',
  type: 'AlignmentsTrack',
  display: 'LinearPileupDisplay',
  maxDisplayedBpPerPx: 50000,
  height: 200,
};
export const variant = {
  trackId: 'my_variant_track',
  trackName: 'My Variants',
  type: 'VariantTrack',
  display: 'LinearVariantDisplay',
  maxDisplayedBpPerPx: 50000,
  height: 200,
};

export const jBrowseOptions = {
  jBrowse: true,
  variants: true,
  alignments: true,
  optionalTracks: [
    {
      display: false,
      trackId: 'repeats_canFam',
      name: 'Repeats',
      assemblyNames: ['canFam3'],
      type: 'FeatureTrack',
      category: ['Annotation'],
      adapter: {
        type: 'BigBedAdapter',
        bigBedLocation: {
          uri: '',
          locationType: 'UriLocation',
        },
      },
    },
    {
      type: 'FeatureTrack',
      display: false,
      trackId: 'gff3tabix_genes',
      assemblyNames: [...assemblyNames],
      name: 'GFF3Tabix genes',
      category: ['Miscellaneous'],
      adapter: {
        type: 'Gff3TabixAdapter',
        gffGzLocation: {
          uri: 'volvox.sort.gff3.gz',
          locationType: 'UriLocation',
        },
        index: {
          location: {
            uri: 'volvox.sort.gff3.gz.tbi',
            locationType: 'UriLocation',
          },
        },
      },
    },
    {
      type: 'HicTrack',
      display: false,
      trackId: 'hic',
      name: 'Hic Track',
      assemblyNames: [...assemblyNames],
      adapter: {
        type: 'HicAdapter',
        hicLocation: {
          uri: '',
          locationType: 'UriLocation',
        },
      },
    },
    {
      display: false,
      trackId: 'my_wiggle_track',
      name: 'My Wiggle Track',
      assemblyNames: [...assemblyNames],
      type: 'QuantitativeTrack',
      adapter: {
        type: 'BigWig',
        bigWigLocation: {
          uri: '',
          locationType: 'UriLocation',
        },
      },
    },
    {
      display: false,
      type: 'SyntenyTrack',
      trackId: 'dotplot_track',
      assemblyNames: [...assemblyNames],
      name: 'dotplot',
      adapter: {
        type: 'PAFAdapter',
        pafLocation: {
          uri: '',
          locationType: 'UriLocation',
        },
        assemblyNames: [...assemblyNames],
      },
    },
  ],
};

export const assemblies = [{
  name: 'canFam6',
  aliases: ['Dog10K_Boxer_Tasha'],
  sequence: {
    type: 'ReferenceSequenceTrack',
    trackId: 'reference_id_canFam6',
    adapter: {
      type: 'TwoBitAdapter',
      twoBitLocation: {
        uri: 'https://hgdownload.soe.ucsc.edu/goldenPath/canFam6/bigZips/canFam6.2bit',
        locationType: 'UriLocation',
      },
      chromSizesLocation: {
        uri: 'https://hgdownload.soe.ucsc.edu/goldenPath/canFam6/bigZips/canFam6.chrom.sizes',
        locationType: 'UriLocation',
      },
    },
  },
  refNameAliases: {
    adapter: {
      type: 'RefNameAliasAdapter',
      location: {
        uri: 'https://hgdownload.soe.ucsc.edu/goldenPath/canFam6/bigZips/canFam6.chromAlias.txt',
        locationType: 'UriLocation',
      },
    },
  },
},
{
  name: 'canFam5',
  aliases: ['UMICH_Zoey_3.1'],
  sequence: {
    type: 'ReferenceSequenceTrack',
    trackId: 'reference_id_canFam5',
    adapter: {
      type: 'TwoBitAdapter',
      twoBitLocation: {
        uri: 'https://hgdownload.soe.ucsc.edu/goldenPath/canFam5/bigZips/canFam5.2bit',
        locationType: 'UriLocation',
      },
      chromSizesLocation: {
        uri: 'https://hgdownload.soe.ucsc.edu/goldenPath/canFam5/bigZips/canFam5.chrom.sizes',
        locationType: 'UriLocation',
      },
    },
  },
  refNameAliases: {
    adapter: {
      type: 'RefNameAliasAdapter',
      location: {
        uri: 'https://hgdownload.soe.ucsc.edu/goldenPath/canFam5/bigZips/canFam5.chromAlias.txt',
        locationType: 'UriLocation',
      },
    },
  },
},
{
  name: 'canFam4',
  aliases: ['UU_Cfam_GSD_1.0'],
  sequence: {
    type: 'ReferenceSequenceTrack',
    trackId: 'reference_id_canFam4',
    adapter: {
      type: 'TwoBitAdapter',
      twoBitLocation: {
        uri: 'https://hgdownload.soe.ucsc.edu/goldenPath/canFam4/bigZips/canFam4.2bit',
        locationType: 'UriLocation',
      },
      chromSizesLocation: {
        uri: 'https://hgdownload.soe.ucsc.edu/goldenPath/canFam4/bigZips/canFam4.chrom.sizes',
        locationType: 'UriLocation',
      },
    },
  },
  refNameAliases: {
    adapter: {
      type: 'RefNameAliasAdapter',
      location: {
        uri: 'https://hgdownload.soe.ucsc.edu/goldenPath/canFam4/bigZips/canFam4.chromAlias.txt',
        locationType: 'UriLocation',
      },
    },
  },
},
{
  name: 'canFam3',
  aliases: ['Broad CanFam3.1'],
  sequence: {
    type: 'ReferenceSequenceTrack',
    trackId: 'reference_id_canFam3',
    adapter: {
      type: 'TwoBitAdapter',
      twoBitLocation: {
        uri: 'https://hgdownload.soe.ucsc.edu/goldenPath/canFam3/bigZips/canFam3.2bit',
        locationType: 'UriLocation',
      },
      chromSizesLocation: {
        uri: 'https://hgdownload.soe.ucsc.edu/goldenPath/canFam3/bigZips/canFam3.chrom.sizes',
        locationType: 'UriLocation',
      },
    },
  },
  refNameAliases: {
    adapter: {
      type: 'RefNameAliasAdapter',
      location: {
        uri: 'https://hgdownload.soe.ucsc.edu/goldenPath/canFam3/bigZips/canFam3.chromAlias.txt',
        locationType: 'UriLocation',
      },
    },
  },
},
{
  name: 'canFam2',
  aliases: ['Broad'],
  sequence: {
    type: 'ReferenceSequenceTrack',
    trackId: 'reference_id_canFam2',
    adapter: {
      type: 'TwoBitAdapter',
      twoBitLocation: {
        uri: 'https://hgdownload.soe.ucsc.edu/goldenPath/canFam2/bigZips/canFam2.2bit',
        locationType: 'UriLocation',
      },
      chromSizesLocation: {
        uri: 'https://hgdownload.soe.ucsc.edu/goldenPath/canFam2/bigZips/canFam2.chrom.sizes',
        locationType: 'UriLocation',
      },
    },
  },
  refNames: [
    'chr1',
    'chr2',
    'chr3',
    'chr4',
    'chr5',
    'chr6',
    'chr7',
    'chr8',
    'chr9',
    'chr10',
    'chr11',
    'chr12',
    'chr13',
    'chr14',
    'chr15',
    'chr16',
    'chr17',
    'chr18',
    'chr19',
    'chr20',
    'chr21',
    'chr22',
    'chr23',
    'chr24',
    'chr25',
    'chr26',
    'chr27',
    'chr28',
    'chr29',
    'chr30',
    'chr31',
    'chr32',
    'chr33',
    'chr34',
    'chr35',
    'chr36',
    'chr37',
    'chr38',
    'chrM',
    'chrUn',
    'chrM',
  ],
},
{
  name: 'canFam1',
  aliases: ['Broad'],
  sequence: {
    type: 'ReferenceSequenceTrack',
    trackId: 'reference_id_canFam1',
    adapter: {
      type: 'TwoBitAdapter',
      twoBitLocation: {
        uri: 'https://hgdownload.soe.ucsc.edu/goldenPath/canFam1/bigZips/canFam1.2bit',
        locationType: 'UriLocation',
      },
      chromSizesLocation: {
        uri: 'https://hgdownload.soe.ucsc.edu/goldenPath/canFam1/bigZips/canFam1.chrom.sizes',
        locationType: 'UriLocation',
      },
    },
  },
  refNames: [
    'chr1',
    'chr2',
    'chr3',
    'chr4',
    'chr5',
    'chr6',
    'chr7',
    'chr8',
    'chr9',
    'chr10',
    'chr11',
    'chr12',
    'chr13',
    'chr14',
    'chr15',
    'chr16',
    'chr17',
    'chr18',
    'chr19',
    'chr20',
    'chr21',
    'chr22',
    'chr23',
    'chr24',
    'chr25',
    'chr26',
    'chr27',
    'chr28',
    'chr29',
    'chr30',
    'chr31',
    'chr32',
    'chr33',
    'chr34',
    'chr35',
    'chr36',
    'chr37',
    'chr38',
    'chrM',
    'chrUn',
    'chrM',
  ],
},
];

export const tracks = [
  {
    trackId: 'my_alignments_track',
    name: 'My Alignments',
    assemblyNames: [...assemblyNames],
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
    assemblyNames: [...assemblyNames],
    adapter: {
      type: 'VcfTabixAdapter',
      vcfGzLocation: { uri: 'https://bento-bam-vcf-files.s3.amazonaws.com/NA20811.10.sorted.vcf.gz' },
      index: { location: { uri: 'https://bento-bam-vcf-files.s3.amazonaws.com/NA20811.10.sorted.vcf.gz.tbi' } },
    },
  },
  {
    type: 'BasicTrack',
    trackId:
      'GCA_000001405.15_GRCh38_full_analysis_set.refseq_annotation.sorted.gff',
    name: 'NCBI RefSeq Genes',
    assemblyNames: [...assemblyNames],
    category: ['Genes'],
    adapter: {
      type: 'Gff3TabixAdapter',
      gffGzLocation: {
        uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/ncbi_refseq/GCA_000001405.15_GRCh38_full_analysis_set.refseq_annotation.sorted.gff.gz',
      },
      index: {
        location: {
          uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/ncbi_refseq/GCA_000001405.15_GRCh38_full_analysis_set.refseq_annotation.sorted.gff.gz.tbi',
        },
      },
    },
  },
];

export const defaultSession = {
  name: 'My session',
  view: {
    id: 'linearGenomeView',
    type: 'LinearGenomeView',
    tracks: [
      {
        type: 'ReferenceSequenceTrack',
        configuration: 'reference_id_canFam6',
        displays: [
          {
            type: 'LinearReferenceSequenceDisplay',
            maxDisplayedBpPerPx: 22345,
            height: 200,
            configuration:
              'reference_id_canFam6-LinearReferenceSequenceDisplay',
          },
        ],
      },
    ],
  },
};

export const GET_JBROWSE_DETAIL_DATA_QUERY = gql`
  query Sample($sample_id: String!) {
    filesBySampleId(sample_id:$sample_id){
      file_type
      uuid
      file_format
      file_name
      file_description
    }
  }
`;

export const GET_FILES_ID_BY_NAME = gql`
query subjectOverViewPaged($file_name: [String]){
  fileIdsFromFileName(file_name: $file_name) {
   file_uuid
   file_name
  }
}
`;

export const theme = {
  palette: {
    primary: {
      main: '#5da8a3',
    },
    secondary: {
      main: '#333',
    },
  },
};
