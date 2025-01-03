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
}) => (
  <Document>
    <Page style={styles.page} size="A4">
      <PdfHeader />
      <View style={styles.body}>
        {
            nodes.map((node) => (
              <View style={styles.tableContainer}>
                <PdfTitle
                  title={node.id}
                  nodeClass={node.class}
                  assignment={node.assignment}
                  desc={node.desc}
                  category={node.category}
                />
                <div style={styles.spacer} />
                <PdfTable node={node} />
              </View>
            ))
          }
      </View>
      <PdfFooter />
    </Page>
  </Document>
);

export default PdfDocument;
