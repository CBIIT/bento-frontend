import React from 'react';
import {
  withStyles, Typography,
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { cn } from 'bento-components';
import utils from '../utils';

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
  classes,
  handleCheckbox,
  userInfo,
  userRole,
}) => {
  const { capitalizeFirstLetter, getAuthenticatorName } = utils;
  let checkbox = null;
  let checkboxLabel = null;

  // Determine whether to create a checkbox
  if (handleCheckbox) {
    checkbox = (
      <span className={classes.infoValue}>
        <CustomCheckbox
          checked={userRole === 'admin'}
          onChange={handleCheckbox}
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
      </span>
    );
    checkboxLabel = (
      <span className={cn(classes.infoKey, classes.toggleAdmin)}>
        ADMIN PERMISSIONS:
      </span>
    );
  }

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
            {checkboxLabel}
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
            {checkbox}
          </Typography>
        </div>
      </div>
    </>
  );
};

const styles = (theme) => ({
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

export default withStyles(styles)(UserDetails);
