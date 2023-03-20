import React from 'react';
import {
  withStyles, Typography,
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { cn } from 'bento-components';
import custodianUtils from '../../../utils/custodianUtilFuncs';

const CustomCheckbox = withStyles({
  root: {
    color: '#375FAC',
    '&$checked': {
      color: '#375FAC',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const UserDetails = ({
  handleCheckbox = () => {},
  classes,
  userInfo,
  userRole,
}) => {
  const { capitalizeFirstLetter, getAuthenticatorName } = custodianUtils;

  return (
    <>
      <div className={classes.firstInfoSection}>
        <div className={classes.infoKeyWrapper}>
          <Typography className={classes.userInfo}>
            <span className={classes.infoKey}>ACCOUNT&nbsp;TYPE: </span>
            <span className={classes.infoKey}>EMAIL&nbsp;ADDRESS: </span>
            <span className={classes.infoKey}>NAME: </span>
          </Typography>
        </div>
        <div>
          <Typography className={classes.userInfo}>
            <span className={classes.infoValue}>
              {getAuthenticatorName(userInfo.IDP)}
            </span>
            <span className={classes.infoValue}>
              {userInfo.email}
            </span>
            <span className={classes.infoValue}>
              {capitalizeFirstLetter(userInfo.lastName)}
              ,
              &nbsp;
              {capitalizeFirstLetter(userInfo.firstName)}
            </span>
          </Typography>
        </div>
      </div>
      <div className={classes.secondInfoSection}>
        <div className={classes.infoKeyWrapper}>
          <Typography className={classes.userInfo}>
            <span className={classes.infoKey}>ORGANIZATION: </span>
            <span className={classes.infoKey}>MEMBERSHIP&nbsp;STATUS: </span>
            <span className={classes.infoKey}>ROLE: </span>
            <span className={cn(classes.infoKey, classes.toggleAdmin)}>
              ADMIN PERMISSIONS:
            </span>
          </Typography>
        </div>
        <div>
          <Typography component="div" className={classes.userInfo}>
            <span className={classes.infoValue}>
              {capitalizeFirstLetter(userInfo.organization)}
            </span>
            <span className={classes.infoValue}>
              {userInfo.userStatus === '' ? 'N/A' : capitalizeFirstLetter(userInfo.userStatus)}
            </span>
            <span className={classes.infoValue}>{capitalizeFirstLetter(userInfo.role)}</span>
            <span className={classes.infoValue}>
              <CustomCheckbox
                checked={userRole === 'admin'}
                onChange={handleCheckbox}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </span>
          </Typography>
        </div>
      </div>
    </>
  );
};

const styles = (theme) => ({
  adminTitle: {
    borderBottom: '1px solid #274FA5',
  },
  alertMsg: {
    borderRadius: '0',
  },
  reviewTitle: {
    fontWeight: 'bold',
  },
  pageContainer: {
    background: '#fff',
  },
  userInfoHeader: {
    minWidth: 'fit-content',
    margin: '42px 0 48px 0',
    padding: '0 0 0 36px',
    display: 'flex',
    gap: '12px',
    fontFamily: 'Nunito',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  editUserInfoHeader: {
    margin: '30px 0 48px 0',
  },
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
  selectRole: {
    width: '140px',
    fontFamily: 'Nunito',
    // fontStyle: 'italic',
    fontWeight: '300', // light
    fontSize: '17px',
    color: '#4F5D69',
    minHeight: '20px',
    whiteSpace: 'nowrap',
    marginLeft: '7px',
    float: 'left',
    '& .MuiSelect-select:focus': {
      backgroundColor: 'white',
    },
    '& .MuiInput-input': {
      paddingLeft: '15px !important',
    },
    '& .MuiSelect-icon': {
      fontSize: '32px',
      top: '0px',
      color: '#5E6A76',
    },
  },
  menuPaperStyle: {
    width: '232px',
    border: '1px solid #8493A0',
    backgroundColor: '#F1F5FD',
    borderRadius: '0px',
    boxShadow: 'none',
    '& .MuiList-padding': {
      padding: '0px',
    },
  },
  menuItem: {
    fontFamily: 'Nunito',
    fontSize: '16px',
    color: '#4F5D69 !important',
    height: '29px',
    paddingLeft: '14px',
  },
  upperCase: {
    textTransform: 'capitalize',
  },
  container: {
    margin: 'auto',
    maxWidth: '1440px',
    marginTop: '-50px',
    paddingLeft: '60px',
    paddingRight: '60px',
    paddingBottom: '80px',
  },
  header: {
    paddingLeft: '20px',
    paddingRight: '50px',
    borderBottom: '#AAB2C8 10px solid',
    height: '128px',
    paddingTop: '35px',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '0',
      paddingRight: '0',
    },
  },
  headerTitle: {
    maxWidth: '1440px',
    margin: 'auto',
    float: 'left',
    marginLeft: '90px',
    paddingTop: '20px',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '0',
    },
  },
  underlined: {
    // borderBottom: '1px solid black',
    textDecoration: 'underline',
  },
  headerMainTitle: {
    fontFamily: 'Lato',
    letterSpacing: '0.005em',
    color: '#274FA5',
    fontSize: '26px',
    marginTop: '16px',
    lineHeight: '25px',
    marginLeft: '-3px',
  },
  logo: {
    position: 'absolute',
    float: 'left',
    marginLeft: '-17px',
    width: '100px',
  },
  actionButton: {
    height: '28px',
    width: '80px',
    color: '#fff',
  },
  saveButtton: {
    height: '40px',
    color: '#FFFFFF',
    backgroundColor: '#5D53F6',
    marginTop: '33px',
    marginBottom: '50px',
    '&:hover': {
      backgroundColor: '#5D53F6',
    },
  },
  adminMessageGrid: {
    boxSizing: 'border-box',
    height: '143px',
    borderTop: '1px solid #88B4DA',
    borderBottom: '1px solid #88B4DA',
    backgroundColor: '#fff',
  },
  adminMessage: {
    color: '#000000',
    height: '121px',
    fontFamily: 'Nunito',
    fontSize: '18px',
    letterSpacing: '0',
    lineHeight: '74px',
    textAlign: 'center',
    margin: '10px auto',
    backgroundColor: '#F6F6F6',
  },
  adminTxtMessage: {
    paddingTop: '20px',
  },
  emptySpace: {
    height: '50px',
  },
});

export default withStyles(styles)(UserDetails);
