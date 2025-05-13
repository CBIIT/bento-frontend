import styled from '@emotion/styled';

export const OverlayTableContainer = styled('div')({
  position: 'absolute',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  zIndex: '15',
});

export const OverlayTableBackground = styled('div')({
  position: 'absolute',
  top: '0',
  height: '100%',
  left: '0',
  right: '0',
  backgroundColor: '#4a4a4a5c',
});

export const OverlayFixedContainer = styled('div')({
  height: '100%',
  overflowY: 'scroll',
  padding: '15px 40px',
});

export const OverlayContent = styled('div')({
  heigh: '100%',
  backgroundColor: '#fff',
  borderRadius: '5px',
  padding: '19px 17px',
  boxShadow: '-5px 4px 21px 18px rgba(27,28,28,0.32)',
});

export const OverlayContentTitle = styled('div')({
  headertop: '0',
  zIndex: '3',
});
