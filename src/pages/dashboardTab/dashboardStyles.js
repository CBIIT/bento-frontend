const styles = (theme) => ({
  dashboardContainer: {
    backgroundColor: '#FFFFFF',
  },
  dashboardDivider: {
    height: 16,
    marginTop: '32px',
    backgroundColor: '#E2E7EC',
  },
  dashboardDividerTop: {
    height: 16,
    backgroundColor: theme.palette.widgetBackground.main,
  },
  rightContent: {
    maxWidth: 'calc(100% - 250px)',
    position: 'relative',
    borderRight: 'thin solid #B1B1B1',
  },
  content: {
    display: 'flex',
    maxWidth: '1800px',
    margin: 'auto',
  },
  widgetsContainer: {
    background: theme.palette.widgetBackground.main,
  },
  contentShift: {
    width: `calc(100vw - ${theme.custom.drawerWidth})`,
    marginLeft: theme.custom.drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  card: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  sunburst: {
    textAlign: 'center',
  },
  widgetInner: {
    marginTop: '-8px',
    borderBottom: '6px solid #E2E7EC',
  },
  widgetsCollapse: {
    background: theme.palette.widgetBackground.main,
  },
  floatRight: {
    float: 'right',
    marginRight: '80px',
  },
  floatLeft: {
    float: 'left',
  },
  customSwitch: {
    marginTop: '-6px',
  },
  customButton: {
    borderRadius: '0 0 18px 18px',
    minHeight: '20px',
    fontSize: 8,
    color: '#ffffff',
    textTransform: 'none',
    backgroundColor: '#566672',
    marginRight: '4px',
    fontFamily: theme.custom.fontFamilySans,
    marginTop: '-4px',
    '&:hover': {
      backgroundColor: '#566672',
    },
  },
  backgroundWidgets: {
    background: theme.palette.widgetBackground.main,
  },
  sideBar: {
    width: '250px',
    overflowX: 'hidden',
    backgroundColor: 'transparent',
    borderRight: 'thin solid #B1B1B1',
    borderLeft: 'thin solid #B1B1B1',
    overflow: 'auto',
    zIndex: '99',
  },
  statsBar: {
    position: 'fixed',
  },
  switchBase: {
    color: theme.palette.widgetBackground.contrastText,
    '&$checked': {
      color: theme.palette.widgetBackground.contrastSwicthColor,
    },
    '&$checked + $track': {
      backgroundColor: theme.palette.widgetBackground.contrastText,
    },
  },
  checked: {},
  track: {},
});

export default styles;
