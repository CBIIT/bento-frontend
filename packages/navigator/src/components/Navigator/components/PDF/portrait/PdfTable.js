import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from '@react-pdf/renderer';
import PdfTableHeader from './PdfTableHeader';
import PdfTableRow from './PdfTableRow';
import { FontRegistry } from './util';

const styles = StyleSheet.create({
  tableContainer: {
    display: 'table',
    width: 'auto',
    paddingTop: '10px',
    paddingLeft: '18px',
    paddingRight: '15px',
    paddingBottom: '10px',
  },
  properties: {
    color: '#7a7a7a',
    fontSize: '8px',
    marginLeft: '10px',
    fontFamily: FontRegistry('NunitoExtraLightItalic'),
  },
});

const PdfTable = ({ node }) => {
  const { properties } = node;
  const count = Object.keys(properties).length;
  return (
    <View style={styles.tableContainer}>
      <Text style={styles.properties}>
        {`This node has ${count} properties`}
      </Text>
      <PdfTableHeader />
      <PdfTableRow node={node} />
    </View>
  );
};

export default PdfTable;
