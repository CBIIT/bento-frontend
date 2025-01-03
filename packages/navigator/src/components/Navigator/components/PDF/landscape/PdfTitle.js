import React from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
// import { getCategoryColor, pdfNodeCategoryList } from '../NodeCategories/helper';
import { FontRegistry, capitalizeFirstLetter } from './util';
import { getCategoryColor, pdfNodeCategoryList } from '../../Category/helper';

const styles = StyleSheet.create({
  row: {
    margin: 'auto',
    flexDirection: 'row',
  },
  categoryStyle: {
    flexDirection: 'row',
    padding: '7px 0px 7px 10px',
    // height: '50px'
  },
  hr: {
    height: '4px',
    backgroundColor: '#E7E5E5',
  },
  nodeInfo: {
    flexDirection: 'row',
    padding: '6px 15px 2px 15px',
    backgroundColor: '#f4f5f5',
    display: 'flex',
  },
  tagsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '15px',  
    paddingBottom: '5px',
    height: '30px',
    padding: '6px 0px 2px 15px',
    backgroundColor: '#f4f5f5',
    display: 'flex',
    marginBottom: '-12px',
  },
  nodeTitle: {
    color: '#000000',
    fontSize: '10px',
    fontWeight: 'heavy',
    fontFamily: FontRegistry('NunitoBold'),
    width: '158.5px',
    flex: '1',
    // marginRight: '75px',
  },
  nodeDesc: {
    color: '#000000',
    fontSize: '9px',
    paddingTop: '-2px',
    lineHeight: 1.2,
    overflowWrap: 'break-word',
    width: '650px',
    textAlign: 'justify',
    flex: '3',
    fontFamily: FontRegistry('NunitoNormal'),
  },
  categoryHeader: {
    marginLeft: '10px',
    fontWeight: 'heavy',
    fontSize: '11.25px',
    paddingTop: '8px',
    flex: '1',
    fontFamily: FontRegistry('NunitoExtraBold'),
  },
  nodeAssignment: {
    // float: 'right',
    // width: '105px',
    height: '17px',
    paddingTop: '3px',
    paddingRight: '10px',
    paddingLeft: '10px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    border: '0.5px solid #cdcdcd',
    textAlign: 'center',
    marginLeft: '192px',
    marginRight: '11px',
  },
  nodeClass: {
    paddingTop: '3px',
    paddingRight: '10px',
    paddingLeft: '10px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    border: '0.5px solid #cdcdcd',
  },
  tagContainer: {
    position: 'relative',
    left: '139em',
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    fontWeight: '900',
    fontSize: '7px',
    height: '15px',
    paddingTop: '0px',
    paddingBottom: '2px',
    dispaly: 'block',
    float: 'left',
    color: '#6c6c6c',
    fontFamily: FontRegistry('NunitoExtraBold'),
  },
  assignment: {
    fontSize: '8px',
    paddingTop: '2px',
    marginRight: '10px',
    border: '0.5px solid #cdcdcd',
    borderRadius: '8px',
    textAlign: 'center',
    backgroundColor: '#fff',
    color: '#2982af',
    fontFamily: FontRegistry('NunitoNormal'),
  },
  class: {
    fontSize: '8px',
    paddingRight: '4px',
    paddingTop: '2px',
    border: '0.5px solid #cdcdcd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    color: '#2982af',
    height: '13px',
    fontFamily: FontRegistry('NunitoNormal'),
  },
  icon: {
    width: "30px",
    height : "30px",
    backgroundColor: '#ffffff'
  }
});

const createStyle = (classes, categoryColor) => ({ ...classes, ...{ borderLeft: `5px solid ${categoryColor}` } });
const PdfTitle = (node) => {
  const { category, desc, title, assignment, nodeClass } = node;
  const categoryColor = getCategoryColor(category);
  return (
    <View>
      <View style={createStyle(styles.categoryStyle, categoryColor)}>
        {/* {SvgIcon} */}
        <Image style={styles.icon} src={pdfNodeCategoryList[category]?.icon} />
        <Text style={{ color: categoryColor, ...styles.categoryHeader }}>
          {capitalizeFirstLetter(category)}
        </Text>
      </View>
      <View style={createStyle(styles.hr, categoryColor)} />
      <View style={{
        display: "flex",
        flexDirection: "row",
        padding: '6px 15px 5px 15px',
        borderLeft: `5px solid ${categoryColor}`,
        backgroundColor: '#f4f5f5',
      }}>
        <Text style={styles.nodeTitle}>{capitalizeFirstLetter(title)}</Text>
        <Text style={styles.nodeDesc}>{desc}</Text>
      </View>
      <View style={{
        display: "flex",
        flexDirection: "row",
        // marginBottom: 1,
        borderLeft: `5px solid ${categoryColor}`,
        backgroundColor: '#f4f5f5',
        paddingBottom: '10px',
      }}> 
          <Text style={styles.nodeAssignment}>
            <Text style={styles.label}>
              {'Assignment: '}
            </Text>
            <Text style={styles.assignment}>
              {capitalizeFirstLetter(assignment)}
            </Text>
          </Text>
          <Text style={styles.nodeClass}>
            <Text style={styles.label}>
              {'Class: '}
            </Text>
            <Text style={styles.class}>
              {capitalizeFirstLetter(nodeClass)}
            </Text>
          </Text>
      </View>
    </View>
  );
};

export default PdfTitle;