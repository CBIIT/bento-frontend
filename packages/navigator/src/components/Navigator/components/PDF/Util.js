import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { categoryColorAndIcon } from '../Category/helper';
import logo from './assets/icdc_nih_logo.png'
import LandscapePDFDoc from './landscape/Pdf';
import PortraitPdfDoc from './portrait/Pdf';
import { createFileName } from '../../utils/file';

export const generatePdfDocument = async (
  nodes,
  fileName = '',
  isLandscape = true,
) => {
  const PdfView = isLandscape ? LandscapePDFDoc : PortraitPdfDoc;
  const blob = await pdf((
    <PdfView
      nodes={nodes}
      pdfDownloadConfig={{
        iconSrc: logo
      }}
    />
  )).toBlob();
  const pdfFileName = createFileName(fileName);
  saveAs(blob, `${pdfFileName}.pdf`);
  return true;
};

export const convertToTSV = (node) => {
  let line = tsvMiddleware(node);
  const propertyKeys = Object.keys(node.properties || {});
  propertyKeys.forEach((key) => {
    line += ('\t').concat(`${key}`);
  });
  const text = `${line}\r\n${node.title}`;
  return text;
};

const tsvMiddleware = (node) => {
  let line = 'type';
  const { links } = node;

  if (links && links.length) {
    links.forEach((c) => {
      if (c.targetId && String(c.generatedType).toLowerCase() !== 'loader-generated') {
        line += `${'\t'} ${c.target_type}.${c.targetId}`;
      }
    });
  }

  return line;
};

export const downloadTSV = (
  node,
  fileName = 'test'
) => {
  let line = tsvMiddleware(node);
  Object.keys(node.properties).forEach((key) => {
    line += ('\t').concat(`${key}`);
  });
  const text = `${line}\r\n${node.title}`;
  const exportData = new Blob([text], { type: 'data:text/tab-separated-values' });
  saveAs(exportData, `${fileName}.tsv`);
};
