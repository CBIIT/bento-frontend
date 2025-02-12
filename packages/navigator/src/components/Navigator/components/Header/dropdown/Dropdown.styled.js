import styled from '@emotion/styled';
import { Button, Menu } from '@mui/material';
import MuiMenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';

export const SelectButton = styled(Button)({
  width: '258px',
  height: '38px',
  backgroundColor: '#F2F2F2'
});

export const DownloadButton = styled(Button)(
  ({ disabled }) => ({
    width: '44px',
    backgroundColor: '#0F4C91',
    '&:hover': {
      backgroundColor: '#0F4C91',
    },
    '&:disabled': {
      backgroundColor: disabled ? '#A2ABBF' : '',
    },
}));

export const DownloadIcon = styled('img')({
  height: '19px',
  width: '19px'
});

export const MuiStyledGrow = styled(Grow)(
  ({ placement }) => ({
  transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
}));

export const DropDownMenuList = styled(MenuList)({
  paddingTop: '0px',
  paddingBottom: '0px',
  width: '257px',
  color: '#ffffff',
  borderBottomRightRadius: '8px',
  borderBottomLeftRadius: '8px',
  border: '2px solid #0d71a3',
});

export const MuiPaper = styled(Paper)({
  maxWidth: '250px',
  borderBottomRightRadius: '8px',
  borderBottomLeftRadius: '8px',
  zIndex: '100',
});

export const MuiMenu = styled(Menu)({
  '& .MuiList-root': {
    width: '257px',
    border: '1px solid #d3d4d5',
    borderTopRightRadius: '0px',
    borderTopLeftRadius: '0px',
  },
});

export const MenuItem = styled(MuiMenuItem)(
  ({ isDropDownDisabled }) => ({
    textAlign: 'left',
    cursor: isDropDownDisabled && 'not-allowed',
    fontSize: '15px',
    padding: '10px 10px 10px 29px',
    fontFamily: 'Lato',
    fontWeight: '500',
    marginTop: '1px',
    '&: hover': {
      backgroundColor: '#0D71A3',
      color: '#fff'
    },
}));
