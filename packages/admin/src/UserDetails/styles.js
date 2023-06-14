/**
 * User Details View Styles
 */
export default (theme) => ({
  userInfoHeader: {
    minWidth: 'fit-content',
    margin: '32px 0 38px 0',
    padding: '0 0 0 36px',
    display: 'flex',
    gap: '12px',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  firstInfoSection: {
    display: 'flex',
    flexGrow: 1,
  },
  secondInfoSection: {
    display: 'flex',
    flexGrow: 1,
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
    fontWeight: '300', // light
    fontSize: '12px',
    color: '#708292',
    letterSpacing: 0,
    lineHeight: '30px',
  },
  toggleAdmin: {
    color: '#375FAC',
    fontFamily: 'Nunito',
    fontSize: '11px',
    fontWeight: 'bold',
  },
  infoValue: {
    lineHeight: '30px',
    fontFamily: 'Nunito',
    fontStyle: 'italic',
    fontWeight: '300', // light
    fontSize: '17px',
    color: '#4F5D69',
    letterSpacing: 0,
    whiteSpace: 'nowrap',
    marginLeft: '21px',
    float: 'left',
  },
});
