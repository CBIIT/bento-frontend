import styled from '@emotion/styled';
import { Button } from '@mui/material';
import MuiMenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';

export const MuiStyledGrow = styled(Grow)(({ placement }) => ({
  transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
}));

export const DropDownMenuList = styled(MenuList)({
  paddingTop: '0px',
  paddingBottom: '0px',
  color: '#ffffff',
  borderBottomRightRadius: '8px',
  borderBottomLeftRadius: '8px',
  border: '2px solid #0d71a3',
});

export const MuiStyledPaper = styled(Paper)({
  maxWidth: '250px',
  borderBottomRightRadius: '8px',
  borderBottomLeftRadius: '8px',
  zIndex: '100',
});

export const MenuItem = styled(MuiMenuItem)(({ isDropDownDisabled }) => ({
  textAlign: 'left',
  cursor: isDropDownDisabled && 'not-allowed',
  backgroundColor: '#3C597C',
  marginTop: '1px',
  '&: hover': {
    backgroundColor: '#1A3D69',
  },
}));
