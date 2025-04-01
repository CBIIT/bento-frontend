/* eslint-disable import/no-extraneous-dependencies */
import styled from '@emotion/styled';
import { Button, Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const MuiDialog = styled(Dialog)({
  paddingBottom: '10px',
  minWidth: '750px',
  overflowY: 'scroll',
});

export const TitleContent = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const Title = styled('div')({
  fontSize: '23px',
  marginTop: '20px',
  display: 'inherit',
  fontWeight: '500',
  color: '#0d71a3',
  float: 'left',
  fontFamily: 'Nunito',
});

export const BtnContainer = styled('div')({
  padding: '5px',
  textAlign: 'right',
  fontSize: '30px',
});

export const DownloadButton = styled(Button)({
  height: '30px',
  width: '30px',
  marginBottom: '-10px',
  marginRight: '7px',
});

export const DownloadIcon = styled('img')({
  color: '#fff',
  height: '30px',
  width: '30px',
});

export const MuiIconButton = styled(IconButton)({

});

export const ClsIcon = styled(CloseIcon)({
  paddingTop: '10px',
});

export const Content = styled('div')({
  height: '700px',
  overflowY: 'scroll',
  paddingRight: '20px',
  paddingLeft: '25px',
  lineHeight: '1.5',
  '& h1, h2, h3, h4, h5': {
    color: '#000000',
    marginBottom: '0px',
    fontWeight: '700',
    lineHeight: '1.2',
  },
  '& p': {
    marginTop: '5px',
    fontSize: '14px',
    fontWeight: '300',
    marginBottom: '0px',
  },
});
