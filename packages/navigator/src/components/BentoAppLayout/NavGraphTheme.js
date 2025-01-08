import { Container, createTheme, ThemeProvider } from "@mui/material";
import React from "react";

const NavGraphTheme = ({
  children
}) => {
    const theme = {
      components: {
        MuiContainer: {
          styleOverrides: {
            root: {
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              '& div.labelWrapper': {
                color: 'green'
              },
              '@media (min-width: 1200px)': {
                maxWidth: '100%',
              },
              '& span.nodeTitle_program': {
                color: 'red', // test 
              },
              padding: '0',
              '@media (min-width: 1920px)': {
                padding: '0',
                maxWidth: '100%',
              },
              '@media (min-width: 600px)': {
                padding: '0',
              }
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

export default NavGraphTheme;
