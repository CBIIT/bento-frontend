import React, { useState } from 'react';
import IconDownloadPDF from "./assets/icon_download_PDF.svg";
import IconDownloadTSV from "./assets/icon_download_TSV.svg";
import * as Styled from './Download.styled';
import { downloadTSV, generatePdfDocument } from './Util';



const DownloadButtonView = ({
  nodes,
  category,
  pdfDownloadConfig = {}
}) => {
  const [isLoading, setLoading] = useState(false);

  const downloadPdf = async () => {
    setLoading(true);
    generatePdfDocument(nodes)
      .then((response) => {
        if(response) {
          setLoading(false);
        }
    });
  };

  const downloadTSVTemplate = () => {
    nodes.forEach(node => {
      downloadTSV(node);
    })
  };

  return (
    <>
      <Styled.PdfDownlaodButton
        className='tsvDownloadBtn'
        onClick={downloadTSVTemplate}
      >
        <Styled.PdfDownloadIcon
          className='tsvDownloadIcon'
          src={IconDownloadTSV}
          alt='tsvIcon'
        />
      </Styled.PdfDownlaodButton>
      <Styled.PdfDownlaodButton
        className='pdfDownloadBtn'
        onClick={downloadPdf}
      >
        {isLoading ? ' Loading document... ' : 
          (
            <Styled.PdfDownloadIcon
              className='pdfDownloadIcon'
              src={IconDownloadPDF}
              alt='pdfIcon'
            />
          )
        }
      </Styled.PdfDownlaodButton>
    </>
  );
};

export default DownloadButtonView;
