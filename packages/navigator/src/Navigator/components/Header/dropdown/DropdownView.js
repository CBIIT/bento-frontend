import React, { useState } from 'react';
import {
  ButtonGroup,
} from '@mui/material';
import axios from 'axios';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import {
  FILE_TYPE_README,
  FILE_TYPE_FULL_DICTIONARY,
  FILE_TYPE_TEMPLATES,
  FILE_TYPE_CONTROLLED_VOCAB_TSV,
  FILE_TYPE_CONTROLLED_VOCAB_JSON,
} from './Constants';
import * as Styled from './Dropdown.styled';
import { downloadMarkdownPdf } from '../ReadMe/Dialog/DialogView';
import { useModelContext } from '../../../state/NavContextProvider';
import { category2NodeList } from '../../Table/TableView';
import { createFileName, downloadAllTemplates, generatePdfDocument } from '../../../utils/Util';

export const generateVocabFullDownload = (fullDictionary, format, prefix = 'ICDC_') => {
  const c2nl = category2NodeList(fullDictionary);
  const enumArr = [];
  const zip = new JSZip();

  Object.keys(c2nl).forEach((category) => {
    const nodes = c2nl[category];
    nodes.forEach(({ title, properties = {} }) => {
      const propertyKeyList = Object.keys(properties);
      propertyKeyList.forEach((propertyKey) => {
        const property = properties[propertyKey];
        if (property.enum) {
          enumArr.push({ title, enums: property.enum, propertyKey });
        }
      });
    });
  });

  const zipFileName = createFileName(prefix.concat('Controlled_Vocabularies'), '');
  const getFileName = (title, propertyKey, fileFormat) => `${createFileName(`${title}-${propertyKey}`, prefix.concat('Controlled_Vocabulary-'))}.${fileFormat}`;
  switch (format) {
    case 'TSV': {
      const vocabTSVArr = enumArr.map(({ enums, title, propertyKey }) => {
        let content = '';
        if (enums && enums.length) {
          enums.forEach((item, index) => {
            content += (index === 0) ? item : `${'\n'}${item}`;
          });
        }
        return { content, title, propertyKey };
      });

      vocabTSVArr.forEach(({ title, propertyKey, content }) => zip.file(getFileName(title, propertyKey, 'tsv'), content));
      zip.generateAsync({ type: 'blob' }).then((thisContent) => {
        saveAs(thisContent, zipFileName);
      });
    }
      break;
    // eslint-disable-next-line no-lone-blocks
    case 'JSON': {
      enumArr.forEach(({ title, enums, propertyKey }) => zip.file(getFileName(title, propertyKey, 'json'), JSON.stringify(enums)));
      zip.generateAsync({ type: 'blob' }).then((thisContent) => {
        saveAs(thisContent, zipFileName);
      });
    }
      break;
    default:
      break;
  }
};

const DropDownView = ({
  readMeConfig,
}) => {
  const { context = {} } = useModelContext();
  const [isLoading, setLoading] = useState(false);

  const [selectedMenuItem, setSelect] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setSelect(null);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectMenu = (value) => {
    setAnchorEl(null);
    setSelect(value);
  };

  const download = () => {
    const { dictionary } = context;
    switch (selectedMenuItem) {
      case FILE_TYPE_README:
        axios.get(readMeConfig.readMeUrl)
          .then((response) => response)
          .then((resp) => {
            if (resp.data) {
              downloadMarkdownPdf('', resp.data);
            }
          });
        break;
      case FILE_TYPE_FULL_DICTIONARY: {
        const categoryNodes = category2NodeList(dictionary);
        const nodes = Object.keys(categoryNodes).reduce(
          (acc, item) => {
            acc.push(...categoryNodes[item]);
            return acc;
          }, [],
        );
        setLoading(true);
        generatePdfDocument(nodes)
          .then((response) => {
            if (response) {
              setLoading(false);
            }
          });
        break;
      }
      case FILE_TYPE_TEMPLATES:
        downloadAllTemplates(dictionary);
        break;

      case FILE_TYPE_CONTROLLED_VOCAB_TSV:
        generateVocabFullDownload(dictionary, 'TSV');
        break;

      case FILE_TYPE_CONTROLLED_VOCAB_JSON:
        generateVocabFullDownload(dictionary, 'JSON');
        break;

      default:
        return null;
    }
    return null;
  };

  return (
    <>
      <ButtonGroup>
        <Styled.SelectButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          startIcon={<KeyboardArrowDownOutlinedIcon />}
        >
          {isLoading ? (<p>Loading...</p>) : (
            <>
              {selectedMenuItem || 'Available Downloads'}
            </>
          )}
        </Styled.SelectButton>
        <Styled.DownloadButton
          disabled={selectedMenuItem === null}
          onClick={download}
        >
          <Styled.DownloadIcon
            alt="download icon"
            src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DMN_title_bar_download_icon.svg"
          />
        </Styled.DownloadButton>
      </ButtonGroup>
      <Styled.MuiMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          [
            FILE_TYPE_README,
            FILE_TYPE_FULL_DICTIONARY,
            FILE_TYPE_TEMPLATES,
            FILE_TYPE_CONTROLLED_VOCAB_TSV,
            FILE_TYPE_CONTROLLED_VOCAB_JSON,
          ].map((item) => (
            <Styled.MenuItem
              onClick={() => handleSelectMenu(item)}
            >
              {item}
            </Styled.MenuItem>
          ))
        }
      </Styled.MuiMenu>
    </>
  );
};

export default DropDownView;
