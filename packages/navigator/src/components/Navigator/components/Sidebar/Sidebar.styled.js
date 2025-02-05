import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const SidebarContainer = styled('div')({
  width: "320px",
  minWidth: "320px",
  height: "100%",
  marginTop: "-3px",
  overflowY: "auto",
  boxShadow: "inset -10px -1px 10px -7px rgb(50 50 50 / 25%)",
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
