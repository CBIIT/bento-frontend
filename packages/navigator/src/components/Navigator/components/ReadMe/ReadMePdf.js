import React from 'react';
import {
  Page,
  Document,
  StyleSheet,
  View,
  Text,
} from '@react-pdf/renderer';
import PdfHeader from '../DataDictionary/NodePDF/PdfHeader';
import PdfFooter from '../DataDictionary/NodePDF/PdfFooter';
import { FontRegistry } from '../DataDictionary/NodePDF/util';

const styles = StyleSheet.create({
  page: {
    padding: '40px 40px 69px 40px',
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  logo: {
    float: 'left',
    width: '46%',
  },
  tableContainer: {
    border: '1px solid #C1C1C1',
    marginTop: '60px',
  },
  title: {
    marginTop: '20px',
    marginBottm: '25px',
    color: '#0d71a3',
    fontSize: '12px',
    fontWeight: 'heavy',
    fontFamily: FontRegistry('NunitoBold'),
  },
  space: {
    marginTop: '20px',
  },
  h1: {
    color: '#000000',
    fontSize: '10px',
    fontWeight: 'heavy',
    marginLeft: '12px',
    fontFamily: FontRegistry('NunitoBold'),
  },
  h2: {
    color: '#000000',
    fontSize: '10px',
    fontWeight: 'heavy',
    marginLeft: '12px',
    fontFamily: FontRegistry('NunitoBold'),
  },
  h3: {
    color: '#000000',
    fontSize: '10px',
    fontWeight: 'heavy',
    marginLeft: '12px',
    fontFamily: FontRegistry('NunitoBold'),
  },
  h4: {
    color: '#000000',
    fontSize: '10px',
    fontWeight: 'heavy',
    marginLeft: '12px',
    fontFamily: FontRegistry('NunitoBold'),
  },
  content: {
    color: '#000000',
    fontSize: '9px',
    paddingTop: '-2px',
    lineHeight: 1.4,
    marginLeft: '12px',
    marginRight: '5px',
    overflowWrap: 'break-word',
    width: '500px',
    textAlign: 'justify',
    fontFamily: FontRegistry('NunitoLight'),
  },
});

const PdfTemplate = ({
  title,
  content,
}) => {
  const renderSubHeader = (text, count) => {
    const titleStyle = styles[`h${count}`];
    return <Text style={titleStyle}>{text}</Text>;
  }

  const renderContent = (text) => {
    // split text with newline and generate pdf elements
    const lines = text.split(/\r?\n/);
    const pdfContent = lines.map((item) => {
      const count = (item.match(/#/g) || []).length;
      if (count > 0) {
        return renderSubHeader(item.replaceAll('#', ''), count);
      }
      return <Text style={styles.content}> {item} </Text>
    });
    return pdfContent;
  }
  return (
  <Document>
    <Page style={styles.page} size="A4">
      <PdfHeader />
      <View>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.space}>
        </Text>
        {renderContent(content)}
      </View>
      <PdfFooter />
    </Page>
  </Document>
)};

export default PdfTemplate;
