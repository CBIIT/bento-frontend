import styled from '@emotion/styled';
import {
  Dialog,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

export const OuterContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  padding: '12px',
});

export const AcceptValueLabel = styled('p')({
  margin: '0',
  minWidth: '130px',
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
      };
    }
    return {};
  },
);

export const MuiListItemIcon = styled(ListItemIcon)({
  color: '#00002dd9',
  display: 'inline-flex',
  minWidth: '10px',
  flexShrink: '0',
  paddingLeft: '0',
});

export const MuiListItem = styled(ListItem)({
  padding: '0',
});

export const MuiListItemText = styled(ListItemText)({
  '& span': {
    fontFamily: 'Nunito',
    fontWeight: '300',
    fontSize: '14px',
  },
});

export const MuiDialog = styled(Dialog)({
  '&.MuiPaper-root': {
    padding: '8px 16px',
  },
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
  fontFamily: 'Nunito',
  fontWeight: '600',
});
