import styled from '@emotion/styled';
import { Dialog, DialogContent, List, ListItem, ListItemText } from '@mui/material';

export const OuterContainer = styled('div')({
  display: "flex",
  flexDirection: "column",
});

export const AcceptValueLabel = styled('p')({
  margin: "0",
  minWidth: "130px",
});

export const MuiList = styled(List)(
  ({ display }) => {
    if (display) {
      return {
        paddingBottom: '0',
        fontWeight: '500',
        listStyleType: 'disc',
        WebkitColumns: 3,
        MozColumns: 3,
        columns: 3,
      }
    }
  }
);

export const MuiListItem = styled(ListItem)(
  ({ display }) => {

});

export const MuiListItemText = styled(ListItemText)({

});

export const MuiDialog= styled(Dialog)({

});

export const ActionBtn = styled('div')({
  width: '225px',
  padding: '20px',
  textAlign: 'right',
  float: 'right',
});

export const DialogTitleContent = styled('div')({
});

export const DialogTitle = styled('h2')({
  float: 'left',
});
