import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import { FontRegistry } from './util';
import keyIcon from '../assets/key_icon.png';

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
    width: '9.25%',
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
    fontWeight: '600',
    color: '#606060',
    fontSize: '6px',
    paddingTop: '1.5px',
    fontFamily: FontRegistry('NunitoSans'),
  },
  key: {
    fontSize: 8,
    color: '#0d71a3',
    // paddingLeft: '2px',
    // paddingTop: '5px',
    paddingBottom: '5px',
    lineHeight: 1.2,
    width: '90%',
    // justifyContent: 'left',
    fontFamily: FontRegistry('NunitoSemiBold'),
  },
  keyIcon: {
    width: '12px',
    marginLeft: '20px',
  },
});

const PdfTableHeader = ({ value, propInfo }) => {
  const textContent = (text) => text;

  return (
    <View style={styles.container}>
      <View style={styles.tableColHeader}>
        <Text style={styles.tableCellHeader}>PROPERTY</Text>
      </View>
      {/* <View style={styles.tableColKey} /> */}
      <View style={styles.tableCol}>
        {propInfo.key ? (
          <>
            <View style={(String(value).length > 20) ? styles.tableColKey2 : styles.tableColKey1}>
              <Text style={styles.key}>
                {value}
                {' '}
                <Image style={styles.keyIcon} src={keyIcon} alt="value icon" />
              </Text>
            </View>
          </>
        ) : (
          <Text style={styles.headerCell}>
            {textContent(value, '_')}
          </Text>
        )}
      </View>
    </View>
  );
};

export default PdfTableHeader;
