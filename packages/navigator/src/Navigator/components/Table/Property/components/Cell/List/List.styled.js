import styled from '@emotion/styled';
import {
  Button,
  Dialog,
  IconButton,
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
    return {
      padding: '0',
    };
  },
);

export const MuiListItemIcon = styled(ListItemIcon)({
  color: '#00002dd9',
  display: 'inline-flex',
  minWidth: '10px',
  flexShrink: '0',
  paddingLeft: '0',
  paddingTop: '11px',
});

export const MuiListItem = styled(ListItem)({
  '&.MuiListItem-root': {
    paddingRight: '16px',
    width: '100%',
    display: 'flex',
    position: 'relative',
    boxSizing: 'border-box',
    marginTop: '-10px',
    textAlign: 'left',
    fontWeight: '300',
    padding: '2px 16px 0px 0px',
    justifyContent: 'flex-start',
    textDecoration: 'none',
    alignItems: 'inherit',
  },
});

export const MuiListItemText = styled(ListItemText)({
  flex: '1 1 auto',
  padding: '4px',
  minWidth: '0',
  marginTop: '0px',
  marginBottom: '0px',
  '& span.MuiTypography-body1': {
    fontFamily: 'Nunito',
    fontWeight: '300',
    fontSize: '14px',
  },
  '& span.MuiListItemText-primary': {
    fontFamily: 'Nunito',
    fontWeight: '300',
    fontSize: '14px',
  },
});

export const MuiDialog = styled(Dialog)({
});

export const ActionBtn = styled('div')({
  width: '225px',
  textAlign: 'right',
  float: 'right',
});

export const DialogTitleContent = styled('div')({
});

export const DialogTitle = styled('h2')({
  marginTop: '0',
  float: 'left',
  fontFamily: 'Nunito',
  fontWeight: '600',
  color: '#0d71a3',
  fontSize: '18px',
});

export const ShowMoreBtn = styled(Button)({
  '&.MuiButton-root': {
    fontSize: '14px',
    textTransform: 'none',
    color: '#0d71a3',
    fontFamily: 'Nunito Sans',
    float: 'right',
    background: 'none',
    padddingTop: '0px',
    marginRight: '20px',
    fontStyle: 'italic',
    '&:hover': {
      backgroundColor: 'transparent',
      cursor: 'pointer',
    },
  },
});

export const CloseButton = styled(IconButton)({
  '&.MuiButtonBase-root': {
    float: 'right',
    marginLeft: '10px',
  },
});
