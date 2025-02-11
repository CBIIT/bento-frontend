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
