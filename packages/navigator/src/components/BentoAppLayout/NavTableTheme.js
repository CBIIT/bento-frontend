import { 
  Container, 
  createTheme, 
  ThemeProvider, 
} from "@mui/material";
import {
  withStyles,
} from '@material-ui/core';
import React from "react";

const styles = {
  customClass: {
    color: 'orange'
  }
}

const NavTableTheme = ({
  children
}) => {
    const theme = {
      styles,
      components: {
        MuiContainer: {
          styleOverrides: {
            root: {
              '& span.nodeTitle_program': {
                color: 'red', // test 
              },
              padding: '0',
              '@media (min-width: 1920px)': {
                padding: '0',
              },
              '@media (min-width: 600px)': {
                padding: '0',
              },
              '@media (min-width: 1200px)': {
                maxWidth: '100%',
              },
            },
          }
        },
      }
    };

    return (
      <ThemeProvider theme={createTheme(theme)}>
        <Container>
          {children}
        </Container>
      </ThemeProvider>
    )
}

export default NavTableTheme;
