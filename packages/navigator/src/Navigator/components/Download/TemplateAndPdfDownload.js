import React, { useState } from 'react';
import IconDownloadPDF from './icons/icon_download_PDF.svg';
import IconDownloadTSV from './icons/icon_download_TSV.svg';
import * as Styled from './Download.styled';
import { downloadTSV, generatePdfDocument } from '../../utils/Utils';

const TemplateAndPdfDownload = ({
  nodes,
  pdfFileName,
  tsvFileName,
  isTemplate,
}) => {
  const [isLoading, setLoading] = useState(false);

  const downloadPdf = async () => {
    setLoading(true);
    generatePdfDocument(nodes, pdfFileName)
      .then((response) => {
        if (response) {
          setLoading(false);
        }
      });
  };

  const downloadTSVTemplate = () => {
    const tsvName = tsvFileName || nodes[0]?.title || '';
    downloadTSV(nodes[0], tsvName);
  };

  return (
    <>
      {(isTemplate) && (
        <Styled.DownLoadBtn
          className="tsvDownloadBtn"
          onClick={downloadTSVTemplate}
        >
          <Styled.DownloadIcon
            className="tsvDownloadIcon"
            src={IconDownloadTSV}
            alt="tsvIcon"
          />
        </Styled.DownLoadBtn>
      )}
      <Styled.DownLoadBtn
        className="pdfDownloadBtn"
        onClick={downloadPdf}
      >
        {isLoading ? ' Loading document... '
          : (
            <Styled.DownloadIcon
              className="pdfDownloadIcon"
              src={IconDownloadPDF}
              alt="pdfIcon"
            />
          )}
      </Styled.DownLoadBtn>
    </>
  );
};

export default TemplateAndPdfDownload;
