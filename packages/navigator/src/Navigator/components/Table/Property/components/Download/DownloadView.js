/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { saveAs } from 'file-saver';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  StyledDropDownButton,
  StyledDropdownIconLabelContainer,
  StyledDownloadBtn,
  StyleDownloadBtnIcon,
  StyledMenu,
  StyledMenuItem,
} from './Download.styled';
import { capitalizeFirstLetter, createFileName } from '../../../../../utils/Utils';

const DOWNLOADS = 'DOWNLOADS';
const filePerfix = 'ICDC_Controlled_Vocabulary-';
const FILE_TYPE_JSON = 'JSON';
const CONTENT_TYPE_JSON = 'application/json';
const CONTENT_TYPE_TSV = 'data:text/tab-separated-values';
const FILE_TYPE_TSV = 'TSV';
const fileTypes = [FILE_TYPE_JSON, FILE_TYPE_TSV];

const DownloadBtnView = ({
  data,
  propertyId,
  pdfConfig,
}) => {
  const [label, setLabel] = useState(DOWNLOADS);
  const [anchorElement, setAnchorElement] = useState(null);
  const closeHandler = () => {
    setAnchorElement(null);
  };

  const clickHandler = (event) => {
    setLabel(DOWNLOADS);
    setAnchorElement(event.currentTarget);
  };

  const download = (thisData, fileType, contentType) => {
    const exportData = new Blob([thisData], { type: contentType });
    const title = capitalizeFirstLetter(propertyId);
    const fileName = createFileName(`${title}`, pdfConfig?.prefix || filePerfix).replace(/\s+/g, '_');
    saveAs(exportData, `${fileName}.${fileType.toLowerCase()}`);
  };

  const downladFile = () => {
    if (label === FILE_TYPE_JSON) {
      const jsonData = JSON.stringify(data);
      download(jsonData, FILE_TYPE_JSON, CONTENT_TYPE_JSON);
    }
    if (label === FILE_TYPE_TSV) {
      let content = '';
      if (data && data.length) {
        data.forEach((item, index) => {
          content += index === 0 ? item : `${'\n'}${item}`;
        });
      }
      download(content, FILE_TYPE_TSV, CONTENT_TYPE_TSV);
    }
  };

  const setFileType = (value) => {
    setLabel(value);
    setAnchorElement(null);
  };

  return (
    <>
      <ButtonGroup>
        <StyledDropDownButton
          onClick={clickHandler}
        >
          <StyledDropdownIconLabelContainer>
            <KeyboardArrowDownIcon />
            {label}
          </StyledDropdownIconLabelContainer>
        </StyledDropDownButton>
        <StyledDownloadBtn
          disabled={DOWNLOADS === label}
          onClick={downladFile}
          aria-label="download file"
        >
          <StyleDownloadBtnIcon />
        </StyledDownloadBtn>
      </ButtonGroup>
      <StyledMenu
        className="dropdown-menu"
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={closeHandler}
      >
        {fileTypes.map((item) => (
          <StyledMenuItem
            className={`option ${item}`}
            onClick={() => setFileType(item)}
          >
            {item}
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </>
  );
};

export default DownloadBtnView;
