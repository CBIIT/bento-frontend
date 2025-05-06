import React from 'react';
import ReactMarkdown from 'react-markdown';
import { marked } from 'marked';
import html2pdf from 'html2pdf.js';
import { createFileName } from '../../../../../utils/Utils';
import * as Styled from './Dialog.styled';
import PdfDownloadIcon from './assets/icon_download_PDF.svg';
import footerLine from './assets/two-pixel-footer-line.png';
import nihLogo from './assets/icdc_nih_logo.png';

const date = new Date()
  .toLocaleString('en-us', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  })
  .toUpperCase();

/** download pdf of marked down file
 * 1.convert or generate html element of marked object
 * 2. uses html2pdf library to convert html to pdf
 * all the html style from marked down file will be reflected on PDF
 */
export const downloadMarkdownPdf = async (
  title,
  content,
  iconSrc = nihLogo,
  filePrefix = 'ICDC_Data_Model-',
  footnote = '',
) => {
  const html = marked(content);
  const htmlWithPageBreaks = html.replace(
    /<!-- PAGE BREAK -->/g,
    '<div class=\'page-break\'></div>',
  );

  const readMeContent = document.createElement('div');
  /** add header logo on first page */
  const headerLogo = `<img src='${iconSrc}' width="40%" alt='logo' />
  <br> <hr style="height:1px" color="#173554" />`;
  readMeContent.innerHTML += headerLogo;
  const titleEl = '<br><span style=\'color: #4D6787; font-size: 18px; font-family: Lato; font-weight: 700\';>'
    .concat(title, '</span>');
  readMeContent.innerHTML += titleEl;
  readMeContent.innerHTML += htmlWithPageBreaks;

  /** set pdf fileneam */
  const fileName = createFileName('read_me', filePrefix);
  /** configure pdf increase pixel of the PDF */
  const options = {
    margin: [0.5, 0.5, 0.5, 0.5],
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      dpi: 192,
      scale: 4,
      letterRendering: true,
      useCORS: true,
    },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy'],
    },
  };

  html2pdf()
    .set(options)
    .from(readMeContent)
    .toPdf()
    .get('pdf')
    .then((pdf) => {
      const totalPages = pdf.internal.getNumberOfPages();
      const pageSz = pdf.internal.pageSize;
      const pgHeight = pageSz.getHeight();
      const pgWidth = pageSz.getWidth();

      /** set header and footer content for each pdf page
       * page height and width is used for assigning header and footer element
       * adjust height & width for footer
       * adjust height & width for header
       */
      for (let i = 1; i <= totalPages; i += 1) {
        pdf.setPage(i);
        pdf.setFont('Helvetica');
        pdf.setFontSize(7);
        pdf.setTextColor('#606060');
        pdf.setCharSpace(0.015);
        pdf.text(pgWidth - 2.3, pgHeight - 0.5, `${date}     |      ${i}`);
        pdf.text(
          pgWidth - 8,
          pgHeight - 0.5,
          footnote || 'CANINECOMMONS.CANCER.GOV/#/ICDC-DATA-MODEL',
        );
        pdf.addImage(
          footerLine,
          'JPEG',
          pgWidth - 8,
          pgHeight - 0.75,
          7.5,
          0.05,
        );
      }
    })
    .save();
};

const ReadMeDialogView = ({
  display,
  displayReadMeDialog,
  content = '',
}) => (
  <>
    <Styled.MuiDialog
      open={display}
      onClose={displayReadMeDialog}
      maxWidth="md"
      className="readMeDialog"
    >
      <Styled.TitleContent className="readMeDialogTitleContent">
        <Styled.Title className="readMeDialogTitle">
          Understanding the Data Model
        </Styled.Title>
        <Styled.BtnContainer className="readMeDialogBtnContainer">
          <Styled.DownloadButton
            onClick={() => downloadMarkdownPdf(
              'Understanding the Data Model',
              content,
            )}
            className="readMeDialogDownloadButton"
          >
            <Styled.DownloadIcon
              src={PdfDownloadIcon}
              alt="paf download icon"
              className="readMeDialogDownloadButton"
            />
          </Styled.DownloadButton>
          <Styled.MuiIconButton
            onClick={displayReadMeDialog}
            className="readMeDialogMuiIconButton"
          >
            <Styled.ClsIcon fontSize="small" className="readMeDialogClsIcon" />
          </Styled.MuiIconButton>
        </Styled.BtnContainer>
      </Styled.TitleContent>
      <Styled.Content className="readMeDialogContent">
        <ReactMarkdown>
          {content.replace(/<!-- PAGE BREAK -->/g, '')}
        </ReactMarkdown>
      </Styled.Content>
    </Styled.MuiDialog>
  </>
);

export default ReadMeDialogView;
