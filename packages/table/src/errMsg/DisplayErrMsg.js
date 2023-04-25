import {
  Container,
  createTheme,
  ThemeProvider,
  Typography,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import defaultTheme from './DefaultThemConfig';

const DisplayErr = ({
  classes,
  table,
  customTheme,
}) => {
  const { tableMsg } = table;
  const themeConfig = createTheme({ overrides: { ...defaultTheme(), ...customTheme } });

  return (
    <ThemeProvider theme={themeConfig}>
      <Container
        className={classes.errContainer}
      >
        <Typography className="errMsgText">
          {tableMsg && tableMsg.noMatch}
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

const styles = () => ({
  errContainer: {
    textAlign: 'center',
    height: '40px',
    paddingTop: '10px',
  },
});

export default withStyles(styles)(DisplayErr);
