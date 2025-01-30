import styled from '@emotion/styled';
import { Button } from '@mui/material';
import MuiMenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';

export const CancerGenomicsCloudLink = styled('a')({
  color: '#165F83',
});

export const TitleContainer = styled('div')({
  height: "85px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingLeft: "27px",
  paddingRight: "38px",
  paddingTop: "21px",
  marginBottom: "13px",
});

export const LogoAndTitle =  styled('div')({
  display: "flex",
  gap: "13px",
});

export const HeaderLogo = styled('img')({
  height: "85px",
  width: "85px",
  border: "0px",
  zIndex: "2",
});

export const Title = styled('h2')({
  color: "#007FC6",
  fontSize: "25px",
  fontWeight: "bold",
  letterSpacing: "1px",
  fontFamily: "Raleway",
});

export const ButtonContainer = styled('div')({
  display: "flex",
  gap: "15px",
});
