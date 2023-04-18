const defaultTheme = () => ({
  MuiContainer: {
    maxWidthLg: {
      '@media (min-width: 1280px)': {
        maxWidth: '70vw',
      }
    },
    root: {
      backgroundColor: '#ffffff',
      '@media (min-width: 600px)': {
        padding: '0',
      },
      // '& img.profileIcon': {
      //   height: '150px',
      // },
      // '& div.profile_header_container': {
      //   display: 'flex',
      //   flexDirection: 'row',
      //   boxSizing: 'border-box',
      //   justifyContent: 'space-between',
      //   borderBottom: '10px solid #aab2c8',
      // },
      // '& div.profile_header_left': {
      //   display: 'flex',
      // },
      // '& div.profile_header_icon': {
      //   height: '120px',
      //   padding: '0 10px',
      // },
      // '& div.profile_header_right': {
      //   display: 'flex',
      //   flex: 1,
      //   flexDirection: 'column',
      // },
      // '& div.profile_header_bottom': {
      //   height: '30px',
      //   backgroundColor: '#aab2c8',
      // },
      // '& div.profile_header_text': {
      //   fontFamily: 'Lato',
      //   letterSpacing: '0.025em',
      //   color: '#274fa5',
      //   fontSize: '24pt',
      //   margin: '30px 0 10px 0',
      //   lineHeight: '25px',
      // }
    },
  },
});
  
export default defaultTheme;
  