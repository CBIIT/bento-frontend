import styled from '@emotion/styled';

export const SortGroup = styled('div')({
  display: 'flex',
  paddingTop: 5,
  alignItems: 'center',
  justifyContent: 'space-between',
  borderTop: '1px solid #B1B1B1',
  paddingLeft: '20px',
});

export const SortGroupItem = styled('span')({
  cursor: 'pointer',
  fontFamily: 'Nunito',
  fontSize: '10px',
  marginRight: '20px',
});

export const SectionDivider = styled('hr')({
  margin: '0',
});
