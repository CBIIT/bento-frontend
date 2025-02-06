import styled from '@emotion/styled';
import { Accordion, AccordionSummary, Divider } from '@mui/material';

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
  flexDirection: "row-reverse",
  paddingLeft: 0,
  fontSize: '13px',
  fontFamily: 'Raleway',
  fontWeight: 'bold',
  lineHeight: '0',
  marginLeft: '10px',
  letterSpacing: '0.25px',
  textTransform: 'capitalize',
  borderBottom: '1px solid',
  margin: '0',
  '&.Mui-expanded':{
    minHeight: '48px',
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
