import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  DialogActions,
} from '@material-ui/core';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import * as text from './OverlayText.json';
import DialogThemeProvider from './OverlayThemConfig';

const OverlayWindow = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem('overlayLoad', 'true');
  };

  useEffect(() => {
    if (!sessionStorage.length) {
      setOpen(true);
    }
  }, [open]);

  const content = text.content.map((item) => (
    <DialogContentText id="alert-dialog-description">
      {item}
    </DialogContentText>
  ));
  const list = text.list.map((item, index) => (
    <ListItem key={`${index}`}>
      <ListItemIcon>
        <FiberManualRecord style={{ fontSize: 8 }} />
      </ListItemIcon>
      <ListItemText>
        {item}
      </ListItemText>
    </ListItem>
  ));

  return (
    <>
      <div>
        <DialogThemeProvider>
          <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="md"
          >
            <DialogTitle id="alert-dialog-title">
              Warning
            </DialogTitle>
            <Divider />
            <DialogContent>
              {content}
              {' By using this system, you understand and consent to the following: '}
              <List>
                {list}
              </List>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button onClick={handleClose}>
                Continue
              </Button>
            </DialogActions>
          </Dialog>
        </DialogThemeProvider>
      </div>
    </>
  );
};

export default OverlayWindow;
