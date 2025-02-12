import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import { FontRegistry } from './util';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingLeft: '5px',
  },
  test: {
    flexDirection: 'row',
  },
  horizontalCells: {
    flexDirection: 'row',
    paddingBottom: '5px',
  },
  boldLabeled: {
    fontSize: 8,
    fontFamily: FontRegistry('NunitoExtraBold'),
  },
  labeledContainer: {
    marginTop: '8px',
    marginBottom: '8px',
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
    width: '100%',
  },
  tableColRequired: {
    width: '12%',
  },
  labeled: {
    fontSize: 8,
  },
  cellHeader: {
    fontSize: '6px',
    overflowWrap: 'break-word',
    fontWeight: '600',
    paddingLeft: '6px',
    paddingTop: '5px',
    // paddingBottom: '5px',
    lineHeight: 1.2,
    fontFamily: FontRegistry('NunitoSans'),
    textAlign: 'justify',
    width: '78px',
  },
  cellHorizontalHeader: {
    fontSize: '6px',
    overflowWrap: 'break-word',
    fontWeight: '600',
    paddingLeft: '6px',
    paddingTop: '5px',
    // paddingBottom: '5px',
    lineHeight: 1.2,
    fontFamily: FontRegistry('NunitoSans'),
    textAlign: 'justify',
    width: '70.5px',
  },
  tableCell: {
    fontSize: 8,
    overflowWrap: 'break-word',
    // paddingLeft: '2px',
    paddingTop: '3px',
    paddingBottom: '5px',
    lineHeight: 1.2,
    fontFamily: FontRegistry('NunitoNormal'),
    width: '100%',
    textAlign: 'justify',
  },
  descriptionCell: {
    width: '100%',
    paddingLeft: '6px',
  },
  horizontalTableCell: {
    fontSize: 8,
    overflowWrap: 'break-word',
    // paddingLeft: '2px',
    paddingTop: '3px',
    // paddingBottom: '5px',
    lineHeight: 1.2,
    fontFamily: FontRegistry('NunitoNormal'),
    width: '126px',
    textAlign: 'justify',
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
  brText: {
    marginTop: '8px',
    marginBottom: '2px',
    fontFamily: FontRegistry('NunitoNormal'),
    fontSize: 8,
    width: '100%',
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
});

const PdfTableRow = ({ propInfo }) => {
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

  const required = (value) => {
    if (value === 'required') {
      return (
        <Text style={{ ...styles.tableCell, ...styles.required }}>Required</Text>
      );
    }
    return <Text style={styles.tableCell}>{value}</Text>;
  };

  const displayKeyPropsDiscription = (description) => {
    const lines = description.split('<br>');
    return lines[0];
  };

  const displayKeyPropsDescriptionBlurb = (description) => {
    const lines = description.split('<br>');
    return lines[1];
  };

  return (
    <View>
      <View style={styles.test}>
        <Text style={styles.cellHeader}>DESCRIPTION</Text>
        <View style={styles.tableColDesc}>
          {propInfo.key ? (
            <>
              <Text style={styles.tableCell}>
                {displayKeyPropsDiscription(propInfo.description)}
              </Text>

              <Text style={styles.brText}>
                {displayKeyPropsDescriptionBlurb(propInfo.description)}
              </Text>
              {
            propInfo.labeled && (
              <Text style={styles.labeledContainer}>
                <Text style={styles.boldLabeled}>
                  Displayed as:
                </Text>
                <Text style={styles.labeled}>{` ${propInfo.labeled}`}</Text>
              </Text>
            )
          }
            </>
          ) : (
            <>
              <Text style={styles.tableCell}>
                {propInfo.description}
              </Text>
              {
              propInfo.labeled && (
                <Text style={styles.labeledContainer}>
                  <Text style={styles.boldLabeled}>
                    Displayed as:
                  </Text>
                  <Text style={styles.labeled}>{` ${propInfo.labeled}`}</Text>
                </Text>
              )
            }
            </>
          )}
        </View>
      </View>
      <View style={styles.test}>
        <Text style={styles.cellHeader}>TYPE</Text>
        <>
          {propInfo.enum ? (
            <Text style={styles.tableCell}>
              {'Acceptable Values: '}
              {validateEnums(propInfo.enum)}
            </Text>
          ) : (
            <Text style={styles.tableCell}>
              {validateType(propInfo.type)}
            </Text>
          ) }
        </>
      </View>
      <View style={styles.horizontalCells}>
        <Text style={styles.cellHorizontalHeader}>REQUIRED</Text>
        <Text
          style={styles.horizontalTableCell}
        >
          {required(propInfo.inclusion)}

        </Text>

        <Text style={styles.cellHeader}>SOURCE</Text>
        <Text style={styles.horizontalTableCell}>{textContent(propInfo.src, '/')}</Text>
        {
          propInfo.labeled && (
          <>
            <Text style={{ ...styles.cellHeader }}>
              DISPLAYED AS
            </Text>
            <Text style={styles.horizontalTableCell}>{propInfo.labeled}</Text>
          </>
          )
        }
      </View>
    </View>
  );
};

export default PdfTableRow;
