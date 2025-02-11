import styled from '@emotion/styled';

export const SearchHistoryContainer = styled('div')({
  padding: "15px",
  borderTop: "1px solid #606060",
  fontSize: "14px",
  color: "#606060",
});

export const TitleText = styled('h4')({
  display: "inline",
});

export const ClearBtn = styled('span')({
  color: "#3283c8",
  cursor: "pointer",
  fontFamily: "Open Sans",
  float: "right",
  "&:hover": {
    color: "#05b8ee",
  },
});

export const SerachedItemsView = styled('div')({
  marginTop: "10px",
});

export const SearchedText = styled('div')({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px",
  borderBottom: "#e7e7e7 1px solid",
  borderLeft: "#e7e7e7 1px solid",
  borderRight: "#e7e7e7 1px solid",
  cursor: "pointer",
  "&:first-child": {
    borderTop: "#e7e7e7 1px solid",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
  },
  "&:last-child": {
    borderTop: "#e7e7e7 1px solid",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
  },
  "&:hover": {
    backgroundColor: "#f1f1f1",
  },
});

export const KeyWord = styled('span')({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  fontSize: 'Nunito',
  fontWeight: '600'
});

export const ItemBadge = styled('span')({
  color: "#0d71a3",
  fontSize: "14px",
  fontFamily: "Nunito",
  marginRight: "0px",
});
