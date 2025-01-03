import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledContainer = styled('div')({
  display: "flex",
  height: "calc(100vh)",
});

export const StyledSideBarContrainer = styled('div')({
  width: "320px",
  minWidth: "320px",
  height: "100%",
  marginTop: "-3px",
  overflowY: "auto",
  boxShadow: "inset -10px -1px 10px -7px rgb(50 50 50 / 25%)",
  borderTopRightRadius: "7px",
});

export const StyledTabContainer = styled(Box)({
  width: '100%'
});

export const StyledTabBtnContainer = styled(Box)({
  borderBottom: 1,
  borderColor: 'divider' ,
});

export const StyledTabPanelOuterContainer = styled('div')({
  height: "100%",
});

export const StyledTabPanelContainer = styled('div')({
  height: "89.5%",
  marginTop: "19px",
  marginLeft: "19px",
  marginRight: "17px",
  borderRadius: "25px",
  overflowY: "auto",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
});

export const TabPanelContrainer = styled('div')({
  height: '100%',
})
