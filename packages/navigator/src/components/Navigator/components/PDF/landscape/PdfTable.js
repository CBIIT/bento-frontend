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
    marginTop: '5px',
    fontFamily: FontRegistry('NunitoExtraLightItalic'),
  },
});

const PdfTable = ({ node, categoryColor }) => {
  const { properties } = node;
  const propKeys = Object.keys(properties);
  const count = propKeys.length;
  return (
    <View style={{ ...styles.tableContainer, borderLeft: `5px solid ${categoryColor}` }}>
      <Text style={styles.properties}>
        {`This node has ${count} properties`}
      </Text>
      {
        propKeys.map((property) => (
          <>
            <PdfTableHeader propInfo={node && node.properties[property]} value={property} />
            <PdfTableRow
              thisProperty={property}
              propInfo={node && node.properties[property]}
              node={node}
            />
          </>
        ))
      }
    </View>
  );
};

export default PdfTable;
