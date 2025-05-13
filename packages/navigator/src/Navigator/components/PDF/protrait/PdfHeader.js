import React from 'react';
import {
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import { useSelector } from 'react-redux';
import logo from '../assets/icdc_nih_logo.png';

const styles = StyleSheet.create({
  logo: {
    float: 'left',
    width: '50%',
  },
  hr: {
    height: '2px',
    marginTop: '5px',
    backgroundColor: '#0b3556',
  },
});

const PdfHeader = () => {
  const pdfConfig = useSelector((state) => state.ddgraph && state.ddgraph.pdfDownloadConfig);

  return (
    <>
      <Image style={styles.logo} src={pdfConfig?.iconSrc || logo} />
      <div style={styles.hr} />
    </>
  );
};

export default PdfHeader;
