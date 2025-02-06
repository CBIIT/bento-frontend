import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const SidebarContainer = styled('div')({
  width: "320px",
  minWidth: "320px",
  height: "100%",
  marginTop: "-3px",
  overflowY: "auto",
  borderTopRightRadius: "7px",
});

export const SearchBarTitle = styled('div')({
  backgroundColor: "#488ad4",
  paddingTop: "15px",
  paddingBottom: "13px",
  paddingLeft: "33px",
  borderTopRightRadius: "7px",
});

export const SearchBarTitleText = styled('span')({
  height: "15px",
  color: "#FFFFFF",
  fontfamily: "Lato",
  fontSize: "18px",
  fontWeight: "bold",
});

export const SearchInputContrainer = styled('div') ({
  gap: '4px',
  width: '100%',
  border: '1px solid #000000',
  height: '120px',
  display: 'flex',
  textAlign: 'right',
  paddingTop: '15px',
  paddingLeft: '10px',
  flexDirection: 'column',
  backgroundColor: '#0f4c91',
});
