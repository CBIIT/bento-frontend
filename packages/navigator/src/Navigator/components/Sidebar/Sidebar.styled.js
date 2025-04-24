import styled from '@emotion/styled';
import { Button } from '@mui/material';

export const SidebarContainer = styled('div')({
  width: '320px',
  minWidth: '320px',
  height: '100%',
  marginTop: '-3px',
  overflowY: 'auto',
  borderTopRightRadius: '7px',
});

export const SearchBarTitle = styled('div')({
  backgroundColor: '#488ad4',
  paddingTop: '15px',
  paddingBottom: '13px',
  paddingLeft: '33px',
  borderTopRightRadius: '7px',
});

export const SearchBarTitleText = styled('span')({
  height: '15px',
  color: '#FFFFFF',
  fontfamily: 'Lato',
  fontSize: '18px',
  fontWeight: 'bold',
});

export const SearchInputContrainer = styled('div')({
  gap: '4px',
  // width: '100%',
  border: '1px solid #000000',
  display: 'flex',
  textAlign: 'right',
  paddingTop: '15px',
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingBottom: '20px',
  flexDirection: 'column',
  backgroundColor: '#0f4c91',
});

export const ClearAllBtn = styled(Button)({
  marginTop: '20px',
  width: '75px',
  height: '22px',
  padding: '2px',
  fontSize: '9px',
  alignSelf: 'end',
  background: '#fff',
  minHeight: '20px',
  fontFamily: 'Open Sans',
  borderRadius: '100px',
  textTransform: 'none',
  marginRight: '5px',
  '&:hover': {
    background: '#fff',
  },
});
