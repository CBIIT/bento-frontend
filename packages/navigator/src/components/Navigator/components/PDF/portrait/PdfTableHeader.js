import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import { FontRegistry } from './util';

const styles = StyleSheet.create({
  container: {
    marginTop: '5px',
    flexDirection: 'row',
    borderTop: '1.5px solid #606060',
    borderBottom: '1.5px solid #606060',
    backgroundColor: '#fff',
    fontSize: 8,
    fontWeight: 900,
    color: '#606060',
    paddingTop: '5px',
    paddingRight: '5px',
    paddingLeft: '5px',
    paddingBottom: '5px',
    fontFamily: FontRegistry('NunitoBold'),
  },
  tableColHeader: {
    width: '24%',
    paddingLeft: 2,
  },
  tableColKey: {
    width: '4%',
    paddingLeft: 2,
  },
  tableColType: {
    width: '18%',
    paddingLeft: 2,
  },
  tableColSource: {
    width: '14%',
    paddingLeft: 10,
  },
  tableColRequired: {
    width: '12%',
    paddingLeft: 4,
  },
  tableColDesc: {
    width: '30%',
    paddingLeft: 5,
  },
  tableCellHeader: {
    // margin: 'auto',
    overflowWrap: 'break-word',
    fontWeight: 'heavy',
    color: '#606060',
    fontSize: 8,
    fontFamily: FontRegistry('NunitoBold'),
  },
});

const PdfTableHeader = () => (
  <View style={styles.container}>
    <View style={styles.tableColHeader}>
      <Text style={styles.tableCellHeader}>Property</Text>
    </View>
    {/* <View style={styles.tableColKey} /> */}
    <View style={styles.tableColType}>
      <Text style={styles.tableCellHeader}>Type</Text>
    </View>
    <View style={styles.tableColRequired}>
      <Text style={styles.tableCellHeader}>Required</Text>
    </View>
    <View style={styles.tableColDesc}>
      <Text style={styles.tableCellHeader}>Description</Text>
    </View>
    <View style={styles.tableColSource}>
      <Text style={styles.tableCellHeader}>Source</Text>
    </View>
  </View>
);

export default PdfTableHeader;
