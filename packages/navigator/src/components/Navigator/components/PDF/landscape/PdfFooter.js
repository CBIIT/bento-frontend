import React from 'react';
import {
  StyleSheet,
  Text,
} from '@react-pdf/renderer';
import { FontRegistry } from './util';

const styles = StyleSheet.create({
  hr: {
    position: 'absolute',
    bottom: '55',
    left: 40,
    width: '100%',
    height: '2px',
    backgroundColor: '#0B3556',
  },
  date: {
    position: 'absolute',
    bottom: 40,
    fontSize: 7,
    left: 0,
    right: 52,
    textAlign: 'right',
    color: '#606060',
    textTransform: 'uppercase',
    fontFamily: FontRegistry('NunitoNormal'),
  },
  pageNumber: {
    position: 'absolute',
    bottom: 40,
    fontSize: 7,
    left: 0,
    right: 40,
    textAlign: 'right',
    color: '#606060',
    fontFamily: FontRegistry('NunitoNormal'),
  },
  link: {
    position: 'absolute',
    bottom: 40,
    fontSize: 7,
    left: 41,
    right: 0,
    textTransform: 'uppercase',
    color: '#606060',
    fontFamily: FontRegistry('NunitoNormal'),
  },
});

const date = new Date().toLocaleString('en-us', { month: 'long', year: 'numeric', day: 'numeric' });

const PdfFooter = ({
  pdfDownloadConfig
}) => {

  return (
    <>
      <Text
        style={styles.hr}
        fixed
      />
      <Text
        style={styles.link}
        fixed
      >
        {pdfDownloadConfig?.footnote ? pdfDownloadConfig.footnote : "caninecommons.cancer.gov/#/icdc-data-model"}
      </Text>
      <Text style={styles.date} fixed>
        {`${date}    |  `}
      </Text>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber }) => (
          `${pageNumber}`
        )}
        fixed
      />
    </>
  );
};

export default PdfFooter;
