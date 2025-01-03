import React from 'react';
import {
  Page,
  Document,
  StyleSheet,
  View,
} from '@react-pdf/renderer';
import PdfTitle from './PdfTitle';
import PdfTable from './PdfTable';
import PdfHeader from './PdfHeader';
import PdfFooter from './PdfFooter';
import { getCategoryColor } from '../../Category/helper';

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
});

const PdfDocument = ({
  nodes,
  pdfDownloadConfig,
}) => {
  // const {url, type} = icon;
  return (
    <Document style={styles.doc}>
      <Page style={styles.page} size="A4" orientation="landscape">
        <PdfHeader
          pdfDownloadConfig={pdfDownloadConfig}
        />
        <View style={styles.body}>
          {nodes.map((node) => (
            <View style={styles.tableContainer}>
              <PdfTitle
                title={node.id}
                nodeClass={node.class}
                assignment={node.assignment}
                desc={node.desc}
                category={node.category} />
              {/* <div style={styles.spacer} /> */}
              <PdfTable node={node} categoryColor={getCategoryColor(node.category)} />
            </View>
          ))}
        </View>
        <PdfFooter
          pdfDownloadConfig={pdfDownloadConfig}
        />
      </Page>
    </Document>
  );
}

export default PdfDocument;
