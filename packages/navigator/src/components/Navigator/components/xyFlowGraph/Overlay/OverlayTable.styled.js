/* eslint-disable guard-for-in */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable space-infix-ops */
/* eslint-disable prefer-template */
/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable import/no-cycle */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable indent */
/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable import/order */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-indent */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable arrow-spacing */
/* eslint-disable keyword-spacing */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-case-declarations */
/* eslint-disable space-before-blocks */
/* eslint-disable arrow-parens */
/* eslint-disable function-paren-newline */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable comma-spacing */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable no-else-return */
/* eslint-disable padded-blocks */
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
