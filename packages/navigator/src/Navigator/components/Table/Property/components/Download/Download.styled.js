import styled from '@emotion/styled';
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export const StyledMenu = styled(Menu)({
  border: '2px solid #0D71A3',
  width: '110px',
  borderBottomRightRadius: '5px !important',
  borderBottomLeftRadius: '5px !important',
  borderRadius: '0px',
});

export const StyledMenuItem = styled(MenuItem)({
  '&:focus': {
    backgroundColor: 'none',
    '& .MuiListItemIcon-root': {
      backgroundColor: 'none',
    },
  },
  '&:hover': {
    backgroundColor: '#e1f0f7',
  },
});

export const StyledDropDownButton = styled(Button)({
  backgroundColor: '#F2F1F1',
  width: '110px',
  color: '#0D71A3',
  fontSize: '11px',
  fontFamily: 'Lato',
  fontWeight: 'bold',
});

export const StyledDropdownIconLabelContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
});

export const StyledDownloadBtn = styled(Button)({
  backgroundColor: '#376FA0',
  width: '27px',
  minWidth: '27px',
  color: 'white',
  '&:disabled': {
    backgroundColor: '#376FA0',
  },
  '&:hover': {
    backgroundColor: '#376FA0',
  },
});

export const StyleDownloadBtnIcon = styled(ArrowDownwardIcon)({
  color: '#fff',
});
