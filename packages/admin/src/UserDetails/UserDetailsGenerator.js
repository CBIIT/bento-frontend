import React from 'react';
import {
  withStyles, Typography,
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

import DEFAULT_CONFIG from './config';
import DEFAULT_STYLES from './styles';
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

/**
 * Generate a SearchBox component with the custom configuration
 * applied
 *
 * @param {object} [uiConfig]
 * @returns {object} { SearchBox }
 */
export const UserDetailsGenerator = (uiConfig = DEFAULT_CONFIG) => {
  const { functions } = uiConfig;

  const cn = functions && typeof functions.cn === 'function'
    ? functions.cn
    : DEFAULT_CONFIG.functions.cn;

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

  return {
    // @ts-ignore
    // eslint-disable-next-line max-len
    UserDetails: withStyles(DEFAULT_STYLES, { withTheme: true })(UserDetails),
  };
};

export default UserDetailsGenerator;
