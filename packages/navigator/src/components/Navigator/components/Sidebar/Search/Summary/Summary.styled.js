import styled from '@emotion/styled';
import { List, ListItem, Typography } from '@mui/material';

export const ResultSummaryContain = styled('div')({

});

export const LabelText = styled('div')({
  paddingLeft: "20%",
  paddingTop: "20px",
  height: "12px",
  color: "#323232",
  fontFamily: "Raleway",
  fontSize: "15px",
  fontWeight: "600",
  lineHeight: "18px",
});

export const ResultList = styled(List)({
  paddingTop: "15px",
  paddingBottom: "20px",
});

export const ResultItem = styled(ListItem)({
  marginBottom: "8px",
  marginTop: "5px",
  fontFamily: "Nunito",
  fontSize: "14px",
  fontWeight: "200",
  letterSpacing: "0",
  lineHeight: "15px",
});


export const ResultCountTitleDesc = styled('span')({
  height: "35px",
  width: "25px",
  color: "#0D71A3",
  lineHeight: "22px",
});

export const ResultCountProps = styled('sapn')({
  width: "25px",
  color: "#0D71A3",
});

export const NoResult = styled(Typography)({
  color: '#4A4A4A',
  margin: '0',
  fontSize: '0.875rem',
  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  fontWeight: 400,
  lineHeight: 1.43,
  letterSpacing: '0.01071em',
});
