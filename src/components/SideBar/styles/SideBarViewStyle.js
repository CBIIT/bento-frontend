const drawerWidth = 240;

const styles = (theme) => ({
  drawerPaperRoot: {
    backgroundColor: 'transparent',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: '250px',
    height: 'auto',
    zIndex: '90',
    position: 'relative',
    float: 'left',
    overflowX: 'hidden',
    overflowY: 'auto',
    border: 'none',
  },
  floatRight: {
    margin: '7px 0px 7px 6px',
  },
  floatLeft: {
    float: 'left',
  },
  filterTitle: {
    marginTop: '18px',
    marginLeft: '45px',
    color: '#218CD3',
    fontFamily: 'Lato',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  funnelLogoImg: {
    width: '20px',
    height: '20px',
  },
  clearAllButtonRoot: {
    margin: 'auto',
  },
  customButton: {
    borderRadius: '5px',
    maxWidth: '30px',
    maxHeight: '30px',
    minWidth: '30px',
    minHeight: '30px',
    marginTop: '0px',
    fontSize: 9,
    textTransform: 'none',
    color: '#3d4241',
    marginLeft: '0px',
    fontFamily: theme.custom.fontFamily,
    '&:hover': {
      backgroundColor: '#566672',
      color: 'white',
    },
  },
  resetText: {
    marginTop: '0px',
    marginLeft: '8px',
    color: '#638FB5',
    fontSize: 14,
  },
  listRoot: {
    paddingTop: 0,
    paddingBottom: 1,
    maxHeight: '1300px',
    maxWidth: '100%',
    overflowX: 'hidden',
    overflowY: 'overlay',
    borderBottom: 'thin solid #B1B1B1',
  },
  dividerRoot: {
    backgroundColor: '#B0CFE1',
    marginLeft: '45px',
    height: '1px',
  },
  tabPanelRoot: {
    padding: '0px',
  },
  root: {
    minWidth: '70px',
    height: '45px',
    minHeight: '40px',
    marginTop: '10px',
    marginRight: '3px',
    fontSize: '17px',
    fontFamily: 'Lato',
    fontWeight: '400',
    color: '#000000',
    lineHeight: '18px',
    paddingLeft: '5px',
    letterSpacing: '0.25px',
    borderTop: '1px solid black',
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
    textTransform: 'inherit',
    '&$selected': {
      fontWeight: 'bolder',
    },
  },
  clearFiltersBorder: {
    borderTop: '1px solid black',
  },
  labelContainer: {
  },
});

export default styles;
