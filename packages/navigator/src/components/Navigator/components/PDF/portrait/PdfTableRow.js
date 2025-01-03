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
  row: {
    flexDirection: 'row',
    paddingLeft: '5px',
  },
  evenRow: {
    backgroundColor: '#f4f5f5',
  },
  tableCol: {
    width: '24%',
  },
  tableCol2: {
    width: '24%',
  },
  tableColKey: {
    width: '4%',
  },
  tableColType: {
    width: '18%',
  },
  tableColSource: {
    width: '14%',
    paddingLeft: 5,
  },
  tableColDesc: {
    textAlign: 'left',
    width: '30%',
  },
  tableColRequired: {
    width: '12%',
  },
  tableCell: {
    fontSize: 8,
    overflowWrap: 'break-word',
    paddingLeft: '2px',
    paddingTop: '5px',
    paddingBottom: '5px',
    lineHeight: 1.2,
    fontFamily: FontRegistry('NunitoNormal'),
  },
  key: {
    fontSize: 8,
    color: '#0d71a3',
    paddingLeft: '2px',
    paddingTop: '5px',
    paddingBottom: '5px',
    lineHeight: 1.2,
    width: '90%',
    // justifyContent: 'left',
    fontFamily: FontRegistry('NunitoSemiBold'),
  },
  tableColKey1: {
    width: '90%',
    justifyContent: 'center',
  },
  tableColKey2: {
    width: '114%',
  },
  keyText: {
    marginRight: '10px',
  },
  keyIcon: {
    width: '12px',
    marginLeft: '20px',
  },
  keyIconView: {
    position: 'absolute',
    left: '20px',
  },
  required: {
    color: '#ff5a20',
    fontFamily: FontRegistry('NunitoExtraBold'),
  },
  boldLabeled: {
    fontSize: 8,
    fontFamily: FontRegistry('NunitoExtraBold')
  },
  labeled: {
    fontSize: 8,
  },
  labeledContainer: {
    marginTop: '16px',
  },
});

const PdfTableRow = ({ node }) => {
  const keys = Object.keys(node.properties);
  const textContent = (text, symbol) => {
    if (String(text).length > 20) {
      return String(text).replace(symbol, `${symbol}\n`);
    }
    return text;
  };

  const validateEnums = (enums) => {
    if (Array.isArray(enums)) {
      let concatEnums = '';
      enums.forEach((value) => {
        concatEnums += textContent(`'${value}'; `, '/');
      });
      return concatEnums;
    }
    return JSON.stringify(enums);
  };

  const validateType = (property) => {
    if (Array.isArray(property)) {
      if (property.length > 10) {
        return textContent(`${property}`, '_');
      }
      return property;
    }
    const type = typeof property;
    if (type === 'object') {
      return textContent(JSON.stringify(property), ']');
    }
    return property;
  };

  const required = (key) => {
    if (node.required.includes(key)) {
      return (
        <Text style={{ ...styles.tableCell, ...styles.required }}>Required</Text>
      );
    }
    if (node.preferred.includes(key)) {
      return (
        <Text style={styles.tableCell}>Preferred</Text>
      );
    }
    return <Text style={styles.tableCell}>Optional</Text>;
  };

  const displayKeyPropsDiscription = (description) => {
    const lines = description.split('<br>');
    return lines.map((line, index) => <Text key={index} style={styles.tableCell}>{line}</Text>);
  };

  const getStyles = (classes, index) => ((index % 2 === 0)
    ? { ...classes, ...styles.evenRow } : { ...classes });
  const rows = keys.map((key, index) => (
    <View style={getStyles(styles.row, index)} key={key}>
      <View style={styles.tableCol}>
        {node.properties[key].key ? (
          <>
            <View style={(String(key).length > 20) ? styles.tableColKey2 : styles.tableColKey1}>
              <Text style={styles.key}>
                {key}
                {' '}
                <Image style={styles.keyIcon} src={keyIcon} alt="key icon" />
              </Text>
            </View>
          </>
        ) : (
          <Text style={styles.tableCell}>
            {textContent(key, '_')}
          </Text>
        )}
      </View>
      <View style={styles.tableColType}>
        {node.properties[key].enum ? (
          <Text style={styles.tableCell}>
            {'Acceptable Values: '}
            {validateEnums(node.properties[key].enum)}
          </Text>
        ) : (
          <Text style={styles.tableCell}>
            {validateType(node.properties[key].type)}
          </Text>
        ) }
      </View>
      <View style={styles.tableColRequired}>
        {required(key)}
      </View>
      <View style={styles.tableColDesc}>
        {node.properties[key].key ? (
          <>
            <Text>
              {displayKeyPropsDiscription(node.properties[key].description)}
            </Text>
            {
            node.properties[key].labeled && (
              <Text style={styles.labeledContainer}>
                <Text style={styles.boldLabeled}>
                  Displayed as:
                </Text>
                <Text style={styles.labeled}>{` ${node.properties[key].labeled}`}</Text>
              </Text>
            )
          }
          </>
        ) : (
          <>
            <Text style={styles.tableCell}>
              {node.properties[key].description}
            </Text>
            {
              node.properties[key].labeled && (
                <Text style={styles.labeledContainer}>
                  <Text style={styles.boldLabeled}>
                    Displayed as:
                  </Text>
                  <Text style={styles.labeled}>{` ${node.properties[key].labeled}`}</Text>
                </Text>
              )
            }
          </>
        )}
      </View>
      <View style={styles.tableColSource}>
        <Text style={styles.tableCell}>{textContent(node.properties[key].src, '/')}</Text>
      </View>
    </View>
  ));

  return (<>{rows}</>);
};

export default PdfTableRow;
