const defaultTheme = () => ({
  MuiContainer: {
    maxWidthLg: {
      '@media (min-width: 1280px)': {
        maxWidth: '70vw',
      },
    },
    root: {
      backgroundColor: '#ffffff',
      '@media (min-width: 600px)': {
        padding: '0',
      },
    },
  },
  MuiTableHead: {
    root: {
      height: '50px',
    },
  },
});

export default defaultTheme;
