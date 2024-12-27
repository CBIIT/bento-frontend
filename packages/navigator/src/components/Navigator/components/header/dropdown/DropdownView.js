import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Popper } from '@mui/material';
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
  const [open, setOpen] = useState(true);
  const anchorRef = React.useRef(null);

  const handleClose = () => {
    // console.log('click ')
  };
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  
  return (
    <>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Styled.MuiStyledGrow placement={placement} {...TransitionProps}>
            <Styled.MuiStyledPaper>
              <ClickAwayListener onClickAway={handleClose}>
                <Styled.DropDownMenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <Styled.MenuItem>
                    Item 1      
                  </Styled.MenuItem>
                </Styled.DropDownMenuList>
              </ClickAwayListener>
            </Styled.MuiStyledPaper>
          </Styled.MuiStyledGrow>
        )}
      </Popper>
    </>
  );
}

export default DropDownView;
