/**
 * SearchBox styles
 */
export default (theme) => ({
  firstInfoSection: {
    display: 'flex',
    flexGrow: 1,
  },
  secondInfoSection: {
    display: 'flex',
    flexGrow: 2,
  },
  infoKeyWrapper: {
    [theme.breakpoints.down('xs')]: {
      width: '120px',
    },
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  infoKey: {
    whiteSpace: 'nowrap',
    fontFamily: 'Nunito',
    letter: '50px',
    // fontStyle: 'italic',
    fontWeight: '400', // regular
    fontSize: '11px',
    color: '#708292',
    letterSpacing: 0,
    lineHeight: '34px',
  },
  toggleAdmin: {
    color: '#375FAC',
    fontFamily: 'Nunito',
    fontSize: '11px',
    fontWeight: 'bold',
  },
  infoValue: {
    lineHeight: '34px',
    fontFamily: 'Nunito',
    // fontStyle: 'italic',
    fontWeight: '300', // light
    fontSize: '17px',
    color: '#4F5D69',
    letterSpacing: 0,
    minHeight: '32px',
    whiteSpace: 'nowrap',
    marginLeft: '21px',
    float: 'left',
  },
});
