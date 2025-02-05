import styled from '@emotion/styled';
import { Accordion, AccordionSummary, Divider } from '@mui/material';

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

});

export const FacetAccordian = styled(Accordion)({

});

export const FacetAccordianSummary = styled(AccordionSummary)({
  flexDirection: "row-reverse",
  paddingLeft: 0,
});
