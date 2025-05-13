import styled from '@emotion/styled';
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export const StyledMenu = styled(Menu)({
  '& .MuiPaper-root': {
    border: '2px solid #0D71A3',
    width: '118px',
    borderBottomRightRadius: '5px !important',
    borderBottomLeftRadius: '5px !important',
    borderRadius: '0px',
    '& li.option': {
      width: '100% !important',
      justifyContent: 'left',
      fontSize: '10px',
      fontWeight: 'bold',
      fontFamily: 'Lato',
      color: '#0d71a3',
      height: '27px',
      padding: '6px 16px',
      '&:last-child': {
        backgroundColor: '#CBE2EE',
        '&:hover': {
          backgroundColor: '#e1f0f7',
        },
      },
    },
  },
  '& .MuiList-root': {
    padding: '0',
  },
});

export const StyledMenuItem = styled(MenuItem)({
});

export const StyledDropDownButton = styled(Button)({
  '&.MuiButtonBase-root': {
    width: '120px',
    fontSize: '0.675rem',
    fontWeight: '600',
    fontFamily: 'sans-serif',
    height: '27px',
    boxSizing: 'border-box',
    color: '#0d71a3',
    backgroundColor: '#F2F1F1',
    textTransform: 'none',
    padding: '7px',
    marginRight: '0',
    float: 'left',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#F2F1F1',
    },
  },
});

export const StyledDropdownIconLabelContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
});

export const StyledDownloadBtn = styled(Button)({
  '&.MuiButtonBase-root': {
    backgroundColor: '#376FA0',
    width: '27px',
    minWidth: '27px',
    color: 'white',
    height: '2em',
    '&:disabled': {
      backgroundColor: '#376FA0',
    },
    '&:hover': {
      backgroundColor: '#376FA0',
    },
  },
});

export const StyleDownloadBtnIcon = styled(ArrowDownwardIcon)({
  color: '#fff',
});
