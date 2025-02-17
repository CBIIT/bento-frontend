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
/* eslint-disable arrow-spacing */
/* eslint-disable keyword-spacing */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable no-spaced-func */
/* eslint-disable func-call-spacing */
/* eslint-disable no-unexpected-multiline */

import styled from '@emotion/styled';

export const LegendContainer = styled('div')(
  ({ display }) => {
    if(display) {
      return {
        position: "absolute",
        backgroundColor: "#494949",
        border: "2px solid #5486AF",
        borderTopLeftRadius: "10px 10px",
        borderBottomLeftRadius: "10px 10px",
        paddingBottom: "15px", 
        right: '17px',
        zIndex: 10
      };
    }
    return {
      position: "absolute",
      backgroundColor: "#18588C",
      border: "1px solid #125C5D",
      borderTopLeftRadius: "10px 10px",
      borderBottomLeftRadius: "10px 10px",
      right: '17px',
      zIndex: 10
    };
  }
);

export const LegendTitle = styled('div')(
  ({ display }) => {
    if(display) {
      return {
        boxSizing: "border-box",
        height: "46px",
        paddingTop: "10px",
        paddingRight: "15px",
        paddingLeft: "15px",
        maxWidth: "228px",
        backgroundColor: "#343434",
        borderTopLeftRadius: "10px 10px",
      }
    }
    return {
      boxSizing: "border-box",
      height: "45px",
      paddingTop: "10px",
      paddingRight: "15px",
      paddingLeft: "15px",
      width: "62px",
      borderTopLeftRadius: "10px 10px",
      borderBottomLeftRadius: "10px 10px",
      backgroundColor: "#18588C",
    }
  }
);

export const Title = styled('span')
  (({ display }) => {
    if (display) {
      return {
        color: "#FFFFFF",
        fontFamily: "Lato",
        fontSize: "18px",
        fontWeight: "500",
        paddingTop: "8px",
        marginRight: "30px",
      }
    }
    return {
      display: 'none',
    }
});

export const ToggleButton = styled('span')({
  float: "right",
  cursor: "pointer",
});

export const CategoryText = styled('span')({
  color: "#ffffff",
  fontFamily: "Lato",
  fontSize: "13px",
  letterSpacing: "0",
  lineHeight: "18px",
  wordBreak: "break-all",
  display: "block",
  margin: "auto",
  textTransform: "lowercase",
  marginLeft: "11px",
});

export const ImgDiv = styled('div')({
  paddingTop: "5px",
});

export const CategoryContainer = styled('div')({
  lineHeight: "20px",
  verticalAlign: "middle",
  display: "flex",
  height: "38px",
  paddingLeft: "22px",
});
