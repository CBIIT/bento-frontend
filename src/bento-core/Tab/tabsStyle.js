const tabsStyle = {
  tabsContainer: {},
  muiTabs: {
    root: {
      marginTop: '15px',
    },
    flexContainer: {
      borderBottom: '10px solid #40789C',
      overflow: 'visible !important',
    },
  },
  muiTab: {
    root: {
      width: '250px',
      height: '45px',
      minHeight: '40px',
      marginRight: '10px',
      background: '#EAEAEA',
      fontSize: '18px',
      fontFamily: 'Raleway',
      fontWeight: '400',
      lineHeight: '18px',
      paddingLeft: '5px',
      letterSpacing: '0.25px',
      borderTop: '1px solid black',
      borderLeft: '1px solid black',
      borderRight: '1px solid black',
      '&$selected': {
        fontWeight: 'bolder',
      },
    },
  },
  tabsLabel: {
    fontFamily: 'Lato',
    textTransform: 'capitalize',
    fontSize: '21px',
  },
  tabsPanel: {},
};

export default tabsStyle;
