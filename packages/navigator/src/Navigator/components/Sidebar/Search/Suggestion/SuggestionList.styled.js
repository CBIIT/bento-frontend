import styled from '@emotion/styled';
import { ListItem, MenuList } from '@mui/material';

export const SuggestListContainer = styled(MenuList)({
  paddingRight: '10px',
  position: 'relative',
  zIndex: 1,
  background: '#fff',
  paddingTop: '0px',
  border: '1px solid #606060',
});

export const SuggestListItem = styled(ListItem)({
  cursor: 'pointer',
  overflow: 'hidden',
  borderTop: '1px solid #606060',
  textAlign: 'left',
  paddingTop: '8px',
  whiteSpace: 'nowrap',
  paddingLeft: '15px',
  textOverflow: 'ellipsis',
  paddingBottom: '8px',
  backgroundColor: '#fff',
});
