import styled from '@emotion/styled';
import { Accordion, AccordionSummary, Box, Divider } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';

export const FacetSectionContainer = styled('div')(
  ({ section }) =>  {

    if (section === 'filterByNode') {
      return {
        borderTop: '7px solid #0d71a3',
      }
    }

    return {
      borderTop: '7px solid #94c0ec',
    }
});

export const SectionAccordian = styled(Accordion)({

});

export const SectionAccordianSummary = styled(AccordionSummary)({
    background: "#EAEAEA",
});

export const FacetAccordian = styled(Accordion)({
  '&.MuiPaper-root': {
    margin: '0',
    borderBottom: '1px solid #B1B1B1'
  }
});

export const FacetAccordianSummary = styled(AccordionSummary)({
  // minHeight: '58px',
  flexDirection: "row-reverse",
  paddingLeft: 0,
  fontSize: '13px',
  fontFamily: 'Raleway',
  fontWeight: 'bold',
  lineHeight: '0',
  marginLeft: '10px',
  letterSpacing: '0.25px',
  textTransform: 'capitalize',
  margin: '0',
  '& .Mui-expanded':{
    margin: '0',
  }
});

export const MuiExpandMoreIcon = styled(ExpandMoreIcon)({
  padding: '12px',
});

export const MuiArrowDrowdownIcon = styled(ArrowDropDownSharpIcon)({
  '&.MuiSvgIcon-root': {
    fontSize: '35px',
  }
});

export const FacetLabelAndResetBtn = styled(Box)({
  width: '100%',
  height: '58px',
  // padding: '8px 10px 8px 0px',
  display: 'flex',
  justifyContent: 'space-between',
  p: 1,
  m: 1,
  bgcolor: 'background.paper',
});

export const ResetBtnDiv = styled('div')({
  color: "#323232",
  fontFamily: "Nunito",
  fontSize: "14px",
  marginRight: "0px",
  paddingTop: '15px',
});

export const FacetLabelDiv = styled('div')({
  color: "#323232",
  fontFamily: "Nunito",
  fontSize: "14px",
  fontWeight: "700",
});

export const ResetIcon = styled('img')({
  width: '12px',
});

export const SortGroup = styled('div')({
  display: "flex",
  paddingTop: 5,
  alignItems: "center",
  justifyContent: "space-between",
  borderTop: "1px solid #B1B1B1",
  paddingLeft: '20px'
});
  
export const SortGroupItem = styled('span')(
  ({ highlight }) => {
      return {
        cursor: "pointer",
        fontFamily: "Nunito",
        fontSize: "10px",
        marginRight: "20px",
        color: highlight ? '#B2C6D6' : '',
      }
  }
);
