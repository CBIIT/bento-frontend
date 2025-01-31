import React, { useState, useRef } from 'react';
import {
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  Popper
} from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import {
  FILE_TYPE_README,
  FILE_TYPE_FULL_DICTIONARY,
  FILE_TYPE_TEMPLATES,
  FILE_TYPE_CONTROLLED_VOCAB_TSV,
  FILE_TYPE_CONTROLLED_VOCAB_JSON,
  FILE_TYPE_LOADING_EXAMPLE,
} from './Constants';
import * as Styled from './Dropdown.styled';

const DropDownView = () => {

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
  
  return (
    <>
      <ButtonGroup>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          startIcon={<KeyboardArrowDownOutlinedIcon />}
        >
          {selectedMenuItem ? selectedMenuItem : 'Available Downloads'}
        </Button>
        <Styled.DownloadButton
          disabled={selectedMenuItem === null}
        >
          <Styled.DownloadIcon
            alt="download icon"
            src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DMN_title_bar_download_icon.svg"
          />
        </Styled.DownloadButton>
      </ButtonGroup>
      <Menu
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
            FILE_TYPE_LOADING_EXAMPLE,
          ].map((item) => (
            <MenuItem
              onClick={() => handleSelectMenu(item)}
            >
              {item}
            </MenuItem>
          ))
        }
      </Menu>
    </>
  );
}

export default DropDownView;
