import styled from '@emotion/styled';

export const MarkdownBox = styled('div')({
  fontFamily: 'Nunito',
  color: 'rgba(0, 0, 0, 0.87)',
  borderRadius: '6px',
  background: '#fff',
  position: 'relative',
  padding: '6px 72px',
  '& > h1:first-of-type': {
    textAlign: 'center',
  },
});

export const Error = styled('div')({
  marginTop: '20px',
  marginBottom: '20px',
});
