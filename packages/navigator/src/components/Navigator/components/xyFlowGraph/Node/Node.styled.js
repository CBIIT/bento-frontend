import styled from '@emotion/styled';
import { Handle } from '@xyflow/react';
import CloseIcon from '@mui/icons-material/Close';

export const LabelWrapper = styled('div')({
  fontSize: "16px",
  fontWeight: "500",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 8px",
  borderBottomRightRadius: '10px',
  borderTopRightRadius: '10px',
  "&:hover": {
    backgroundColor: "#ef8523",
    color: "#fff",
  },
});

export const NodeOuterDiv = styled('div')(
  ({ display }) => {
    if (display) {
      return {
        backgroundColor: "#2D4455",
        borderRadius: "5px",
        marginTop: "-10px",
        marginLeft: "-22px",
        border: "5px solid #0c3759",
        zIndex: "1000",
      }
    }
  }
);

export const NodeContainer = styled('div')(
  ({ display }) => {
    // node expand
    if (display) {
      return {
        fontSize: "10px",
        color: "#222",
        borderRadius: "5px",
        padding: "0px 0px 0px 0px",
        opacity: "0.97",
        boxSizing: "border-box",
        backgroundColor: "#2d4455",
      }
    }
    // node collapse
    return {
      fontSize: "10px",
      color: "#222",
      borderRadius: "2px",
      padding: "0",
      background: "transparent",
    }
  }
);

export const CloseIconBar = styled('div') ({
  display: "flex",
  alignItems: "center",
  padding: "5px 0",
  justifyContent: "end",
});

export const CloseButton = styled(CloseIcon)({
  float: "right",
  color: "#ffffff",
  height: "15px",
  width: "20px",
  cursor: "pointer",
});

export const ContentWrapper = styled('div')({
  display: "flex",
  flexDirection: "column",
  gap: "35px",
});

export const NodeTitle = styled('div')(
  (display) => {
    if (display) {
      return {
        paddingLeft: "20px",
        paddingRight: "20px",
      }
    }
    return {
      outline: "0.5px solid #ffffff",
    };
  }
);

export const NodeButton = styled('button')(
  ({display, isSearchMode, expandNodeView}) => {
    let styles = {};
    if (!isSearchMode || !expandNodeView) {
      styles = {
        borderRadius: "15px",
        border: '0',
        padding: '0'
      };
    }
    if (display) {
      styles = { 
        ...style,
        border: "2px solid #fff"
      }
    }
    return styles;
  }
);

export const NodeButtonInnerWrapper = styled('div')({
  border: "3px solid #2E2E2E",
    display: "grid",
    gridTemplateColumns: "60px 1fr",
    zIndex: "1",
    backgroundColor: "#fff",
    cursor: "pointer",
    borderRadius: "15px",
});

export const NodeBackground = styled('div')(
  ({ catgoryColor = '#fff' }) => {
  return {
    borderRadius: "11px",
    backgroundColor: catgoryColor,
  }}
);

export const IconWrapper = styled('div')(
  ({ catgoryColor }) => {
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderBottomLeftRadius: "13px",
      borderTopLeftRadius: "13px",
      backgroundColor: catgoryColor
    }
});

export const CategoryIcon = styled('img')({
  height: "39px",
});

export const FlowHandle = styled(Handle)({
  background: "transparent",
  border: "none",
});

export const Summary = styled('div')(
  ({ display }) => {
    if (display) {
      return {
        color: "#FFFFFF",
        fontSize: "10px",
        display: "flex",
        justifyContent: "center",
      };
    }
    return {
      display: "none",
    };
  }
);

export const SummaryList = styled('ul')({
  paddingLeft: "0px",
  marginBottom: "0px",
  listStyleType: "none",
  flexGrow: "1",
});

export const ListItem = styled('li')({
  fontSize: "12px",
  lineHeight: "18px",
  color: "#0077c1",
  padding: "0 45px",
  display: "flex",
  gap: "8px",
});

export const ListItemLabel = styled('span')({
  color: "#FFFFFF",
  fontFamily: "Nunito",
  fontSize: "13px",
  fontWeight: "300",
  letterSpacing: "0",
  lineHeight: "24px",
});

export const ListItemValue = styled('span')({
  color: "#3fd9ff",
  fontFamily: "Nunito",
  fontSize: "13px",
  fontWeight: "600",
  letterSpacing: "0",
  lineHeight: "24px",
});

export const ViewPropertyTableBtn = styled('button')(
  ({ display }) => {
    if(display) {
      return {
        cursor: "pointer",
        fontSize: "9px",
        width: "100%",
        height: "50px",
        height: "50px",
        marginTop: "15px",
        border: "1px solid #14212b",
        backgroundColor: "#14212b",
        color: "#ffffff",
        fontFamily: "Lato",
        fontSize: "16px",
        lineHeight: "13px",
        textAlign: "center",
        borderBottomLeftRadius: "5px",
        borderBottomRightRadius: "5px",
      }
    }
    return {
      display: 'none',
    };
  }
)
