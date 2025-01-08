import styled from '@emotion/styled';
import { Button, ButtonGroup } from '@mui/material';

export const Container =  styled('div')({
  display: "flex",
  flexDirection: "column",
  gap: "2em",
  width: "100%",
  "&:hover $nodeTitle": {
    color: "#3283c8",
  },
});

export const TitleAndDescContainer =  styled('div')({
  display: "flex",
});

export const NodeTitle =  styled('span')({
      width: "260px",
      flexGrow: "0",
      flexShrink: "0",
      "-moz-user-select": "none",
      "-webkit-user-select": "none",
      fontWeight: "700",
      "-ms-user-select": "none",
      userSelect: "none",
      fontSize: "15px",
      fontFamily: "Nunito",
      lineHeight: "14px",
      "&:hover": {
        color: "#3283c8",
      },
});

export const TagsAndDescriptionContainer =  styled('div')({
  display: "flex",
  flexDirection: "column",
  gap: "34px",
  width: "100%",
  paddingRight: "5px",
});

export const NodeDescription =  styled('p')({
  paddingRight: "33px",
  fontSize: "14px",
  fontFamily: "Nunito",
  lineHeight: "17px",
  fontWeight: "300",
  overflow: "hidden",
  textOverflow: "ellipsis",
  color: "#4A4A4A",
  textAlign: "justify",
  margin: "0px",
});

export const TagsAndBtnContainer = styled('div') ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

export const DisplayPropertyTableButton = styled(Button)({
  width: "150px",
  height: "26px",
  backgroundColor: "#EEF5F7",
  textTransform: "capitalize",
  color: "#000000",
  borderRadius: "0px",
  fontSize: "14px",
  fontWeight: "700",
  color: "#42779a",
  fontFamily: "Open Sans"
});

export const AssignmentAndClassTags = styled('div')({
  display: "flex",
  gap: "15px",
});

export const NodeLabel = styled('span')({
  color: "#000000",
  padding: "0 17px",
  borderRadius: "100px",
  border: "1px solid #cdcdcd",
  background: "#fff",
  fontSize: "12px",
  height: "22px",
  width: "136px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",
});

export const NodeAssignment = styled('span')({
  color: "#009dc4",
  fontWeight: "600",
  fontFamily: "Nunito",
});

export const NodeClass = styled('span')({
  color: "#009dc4",
  fontWeight: "600",
  fontFamily: "Nunito",
});

export const DownloadContainer = styled('div')({
  paddingRight: "10px"
});

export const MuiButtonGroup = styled(ButtonGroup)({
  
})