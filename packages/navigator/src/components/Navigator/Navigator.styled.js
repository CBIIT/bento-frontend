import styled from '@emotion/styled';
import { Box, Tab, Tabs } from '@mui/material';

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
});

export const StyledTabs = styled(Tabs)({
  paddingLeft: "5%",
  boxShadow: 'inset 1px -4px 10px -7px',
  '& .MuiTabs-indicator': {
    backgroundColor: '#fff',
  }
});

export const StyledTabView = styled(Tab)({
  textTransform: 'none',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
  background: 'rgba(229, 227, 227, 0.28)',
  marginRight: '10px',
  marginLeft: '10px',
  marginTop: '20px',
  minWidth: '130px',
  paddingLeft: '30px',
  paddingRight: '30px',
  fontSize: '18px',
  borderTop: '0.9px solid #C4C4C4',
  borderRight: '0.9px solid #C4C4C4',
  borderLeft: '0.9px solid #C4C4C4',
  height: '50px',
  '@media (min-width: 600px)': {
    minWidth: '110px',
  },
  '&.Mui-selected': {
    boxShadow: '-1px -3px 10px 1px rgb(50 50 50 / 25%)',
    borderBottom: '10px solid #fff',
    background: '#ffffff',
    border: '0.75px solid #fffff5',
    fontSize: '18px',
    fontFamily: 'Lato',
    fontWeight: 'bold',
    color: '#6d9eba'
  },
});
