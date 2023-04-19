export default () => ({
  root: {
    backgroundColor: 'rgba(20, 24, 35, 0.5)',
  },
  paper: {
    height: 300,
    width: 500,
    borderRadius: 10,
    border: '0.5px solid #000000',
    boxShadow: '0 0 29px 16px rgba(0,0,0,0.36)',
  },
  alignCenter: {
    textAlign: 'center',
  },
  buttonGroup: {
    color: '#FFFFFF',
    fontFamily: 'Lato',
    fontSize: '11px',
    lineHeight: '22px',
    width: '150px',
    border: '1px solid #626262',
    marginTop: '30px',
  },
  extandButton: {
    backgroundColor: '#566672',
    '&:hover': {
      backgroundColor: '#566672',
    },
  },
  logOutButton: {
    marginLeft: '20px',
    backgroundColor: '#437BBE',
    '&:hover': {
      backgroundColor: '#437BBE',
    },
  },
});
