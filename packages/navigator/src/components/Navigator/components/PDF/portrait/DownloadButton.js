import React from 'react';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import {
  Button,
  withStyles,
  createTheme,
  MuiThemeProvider,
} from '@material-ui/core';
import { pdf } from '@react-pdf/renderer';
import { cn } from 'bento-components';
import PdfDocument from './Pdf';
import LandscapePDFDoc from '../LandscapeNodePDF/Pdf';
import { fileManifestDownload } from '../../../../config/file-manifest-config';

const DownloadButton = ({
  classes,
  config,
  documentData,
  fileName,
  isFileManifest,
}) => {
  const  pdfDownloadConfig = useSelector(state => state.ddgraph && state.ddgraph.pdfDownloadConfig);
  
  const [isLoading, setLoading] = React.useState(false);
  const theme = createTheme({
    overrides: {
      MuiButton: {
        root: {
          minWidth: '35px',
          paddingRight: '10px',
          '&:hover': {
            backgroundColor: 'none',
          },
        },
      },
    },
  });

  const tsvMiddleware = (node) => {
    let line = 'type';
    const { links } = node;

    if (links && links.length) {
      links.forEach((c) => {
        if (c.targetId && String(c.generatedType).toLowerCase() !== 'loader-generated') {
          line += `${'\t'} ${c.target_type}.${c.targetId}`;
        }
      });
    }

    return line;
  };

  const generateFileManifest = (node) => {
    let line = tsvMiddleware(node);

    const arr = Object.entries(node.properties);
    const mergedArr = arr.concat(fileManifestDownload);
    mergedArr.forEach(([key, value]) => {
      if (value.src !== 'Loader-derived') {
        line += ('\t').concat(`${key}`);
      }
    });

    const text = `${line}\r\n${node.title}`;
    return text;
  };

  const convertToTSV = (node) => {
    let line = tsvMiddleware(node);
    Object.keys(node.properties).forEach((key) => {
      line += ('\t').concat(`${key}`);
    });
    const text = `${line}\r\n${node.title}`;
    return text;
  };
  const generatePdfDocument = async (object) => {
    const document = (config.type === 'document') ? object : [object];
    const blob = await pdf((
      config.landscape ? <LandscapePDFDoc nodes={document} icon={config.catagoryIcon} 
      pdfDownloadConfig={pdfDownloadConfig} /> : <PdfDocument nodes={document} />
    )).toBlob();
    setLoading(false);
    saveAs(blob, `${fileName}.pdf`);
  };

  const downloadPdf = () => {
    setLoading(true);
    setTimeout(() => {
      generatePdfDocument(documentData);
    }, 50);
  };

  const downloadTsv = () => {
    const tsv = isFileManifest ? generateFileManifest(documentData) : convertToTSV(documentData);
    const exportData = new Blob([tsv], { type: 'data:text/tab-separated-values' });
    saveAs(exportData, `${fileName}.tsv`);
  };

  const download = () => {
    if (config.fileType === 'tsv') {
      downloadTsv();
    } else {
      downloadPdf();
    }
  };

  const btnClass = (config.type === 'document')
    ? cn(classes.headerButton, classes.documentDownloadBtn)
    : cn(classes.headerButton, classes.nodeDownloadBtn);

  return (
    <MuiThemeProvider theme={theme}>
      <Button
        type="button"
        disableRipple
        // className={isLoading ? config.loading : config.class}
        className={btnClass}
        onClick={() => download()}
      >
        {isLoading ? ' Loading document... '
          : config.image ? <img className={classes.image} src={config.image} alt="download pdf" /> : 'DOWNLOAD DICTIONARY'}
      </Button>
    </MuiThemeProvider>
  );
};

const styles = () => ({
  root: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '9px',
    letterSpacing: '0.025em',
    color: '#000',
  },
  headerButton: {
    padding: 0,
  },
  documentDownloadBtn: {
    background: '#0D71A3',
    paddingRight: '15px',
    paddingLeft: '20px',
    color: '#fff',
    fontSize: '11px',
    marginBottom: '15px',
    height: '38px',
    marginRight: '21px',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  nodeDownloadBtn: {
    marginLeft: '15px',
    background: '#0D71A3',
    height: '35px',
    color: '#fff',

  },
  image: {
    width: '35px',
  },
  loading: {

  },
});

export default withStyles(styles)(DownloadButton);
