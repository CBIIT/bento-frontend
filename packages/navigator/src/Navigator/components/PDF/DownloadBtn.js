import React, { useState } from 'react';
import IconDownloadPDF from './assets/icon_download_PDF.svg';
import IconDownloadTSV from './assets/icon_download_TSV.svg';
import * as Styled from './Download.styled';
import { downloadTSV, generatePdfDocument } from '../../utils/Util';

const DownloadButtonView = ({
  nodes,
}) => {
  const [isLoading, setLoading] = useState(false);

  const downloadPdf = async () => {
    setLoading(true);
    generatePdfDocument(nodes)
      .then((response) => {
        if (response) {
          setLoading(false);
        }
      });
  };

  const downloadTSVTemplate = () => {
    nodes.forEach((node) => {
      downloadTSV(node);
    });
  };

  return (
    <>
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

export default DownloadButtonView;
