/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  withStyles, Button, Grid, Typography,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import { cn, CustomDataTable } from 'bento-components';

import Stats from '../../../components/Stats/AllStatsController';
import { columnInfo, options } from '../../../bento/userDetailViewData';
import AlertMessage from '../../../components/alertMessage/AlertMessageView';
import {
  adminPortalIcon,
  viewPageTitle,
  editViewPageTitle,
  SAVE_UPDATED_USER,
  VIEW,
  EDIT,
} from '../../../bento/adminData';
import getDateInFormat from '../../../utils/date';
import custodianUtils from '../../../utils/custodianUtilFuncs';
import { NODE_LEVEL_ACCESS } from '../../../bento/siteWideConfig';
// import TableThemeProvider from './tableThemeConfig';

// acl is array of object.
function getApprovedArms(acl) {
  const approvedArms = [];
  acl.forEach((arm) => {
    if (arm.accessStatus.toLowerCase() === 'approved') {
      approvedArms.push(
        [
          arm.armName,
          getDateInFormat(arm.requestDate, '/'),
          getDateInFormat(arm.reviewDate, '/'),
          arm.reviewAdminName,
          arm.armID,
        ],
      );
    }
  });

  return approvedArms;
}

function getColumnInfo(accessType, approvedRenderer, removeRenderer) {
  return columnInfo.concat([{
    name: 'date2',
    label: 'Approved By',
    options: {
      customBodyRender: approvedRenderer,
    },
  },
  {
    name: 'remove',
    label: 'Remove',
    options: {
      display: (accessType === EDIT),
      customBodyRender: removeRenderer,
    },
  }]);
}

const CustomCheckbox = withStyles({
  root: {
    color: '#375FAC',
    '&$checked': {
      color: '#375FAC',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const UserDetailView = ({ classes, data, accessType = VIEW }) => {
  const [userInfo, setUserInfo] = useState(data.getUser);
  const [userRole, setUserRole] = useState(userInfo.role.toLowerCase());
  const [seletedArms, setSeletedArms] = useState([]);
  const [notification, setNotification] = React.useState('');
  const { getAuthenticatorName, capitalizeFirstLetter } = custodianUtils;

  // GraphQL Operations
  // eslint-disable-next-line no-unused-vars
  const [mutate, { loading, error }] = useMutation(SAVE_UPDATED_USER, {
    context: { clientName: 'userService' },
    onCompleted() {
      // INPUT parm can be 'responseData'

    },
    onError() {
      // INPUT parm can be 'ApolloError'
    },
  });

  const showAlert = (alertType, errorMsg = '') => {
    const key = Math.random();
    if (alertType === 'error') {
      setNotification(
        <AlertMessage classNames={classes.alertMsg} key={key} severity="error" borderColor="#f44336" backgroundColor="#f44336" timeout={5000}>
          {errorMsg}
        </AlertMessage>,
      );
    }

    if (alertType === 'success') {
      setNotification(
        <AlertMessage classNames={classes.alertMsg} key={key} severity="error" timeout={5000}>
          All changes have been saved
        </AlertMessage>,
      );
    }

    return null;
  };

  const approvedRender = (value) => {
    const spltStr = value.split(' ');

    if (spltStr.length !== 2) {
      return value;
    }
    return `${spltStr[1]}, ${spltStr[0]}`;
  };

  const checkBoxRenderFunc = (value) => {
    const { checked } = seletedArms.includes(value);
    return (
      <div>
        <Checkbox
          checked={checked}
          value={checked}
          onChange={() => {
            const armIndex = seletedArms.indexOf(value);
            const updatedSeletedArms = seletedArms;
            if (armIndex > -1) {
              updatedSeletedArms.splice(armIndex, 1);
            } else {
              updatedSeletedArms.push(value);
            }
            setSeletedArms(updatedSeletedArms);
          }}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </div>
    );
  };

  // TODO: Remove this function
  const getPastMembershipStatus = (acl) => {
    if (acl.length <= 0) return { role: 'non-member', userStatus: '' };

    const { approved, revoked } = acl.reduce((results, node) => {
      const { accessStatus } = node;
      if (!results[accessStatus]) {
        results[accessStatus] = 0;
      }

      results[accessStatus] += 1;

      return results;
    }, {});

    if (approved) return { role: 'member', userStatus: 'active' };
    if (!approved && revoked) return { role: 'member', userStatus: 'inactive' };
    return { role: 'non-member', userStatus: '' };
  };

  const toggleAdminRole = (event) => {
    if (userRole !== 'admin') {
      if (event.target.checked) {
        setUserRole('admin');
      }
    } else if (userRole.toLowerCase() === 'admin') {
      if (!event.target.checked) {
        const { acl } = userInfo;
        const { role } = getPastMembershipStatus(acl);
        setUserRole(role);
      }
    }
  };

  const columns = getColumnInfo(accessType, approvedRender, checkBoxRenderFunc);

  const approvedArms = getApprovedArms(userInfo.acl);

  function handleSaveUserDetails() {
    const updatedUserDetails = {
      userID: userInfo.userID,
      role: userRole,
      armIDs: seletedArms,
      comment: '',
    };

    if (userRole === 'admin') updatedUserDetails.userStatus = 'active';

    mutate({ variables: { ...updatedUserDetails } }).then(({ data: responseData }) => {
      if (responseData) {
        setUserInfo(responseData.editUser);
        showAlert('success');
      }
    }).catch(() => {
      showAlert('error');
    });
  }

  return (
    <>
      <div className={classes.pageContainer}>
        <Stats />
        <Grid container item justifyContent="center" className={classes.emptySpace}>
          {notification}
        </Grid>
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.logo}>
              <img
                src={adminPortalIcon.src}
                alt={adminPortalIcon.alt}
              />
            </div>
            <div className={classes.headerTitle}>
              <Typography className={classes.headerMainTitle}>
                <span className={classes.adminTitle}>Admin Portal</span>
                <span> / </span>
                <span className={classes.reviewTitle}>
                  {(accessType === EDIT) ? editViewPageTitle : viewPageTitle }
                </span>
              </Typography>
            </div>
          </div>
          <div className={
            accessType === EDIT
              ? cn(classes.editUserInfoHeader, classes.userInfoHeader)
              : classes.userInfoHeader
          }
          >
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
                      checked={userRole.toLowerCase() === 'admin'}
                      onChange={toggleAdminRole}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                  </span>
                </Typography>
              </div>
            </div>
          </div>
          <Grid container>
            {userInfo.role.toLowerCase() !== 'admin' ? (
              <Grid item xs={12}>
                {/* <TableThemeProvider> */}
                <CustomDataTable
                  data={approvedArms}
                  columns={columns}
                  options={options}
                />
                {/* </TableThemeProvider> */}
              </Grid>
            )
              : (
                <Grid item xs={12} className={classes.adminMessageGrid}>
                  <div className={classes.adminMessage}>
                    <span className={classes.adminTxtMessage}>
                      You have access to all
                      {' '}
                      {NODE_LEVEL_ACCESS ? custodianUtils.getNodeLevelLabel() : 'data'}
                    </span>
                  </div>
                </Grid>
              )}
            {accessType === EDIT ? (
              <Grid item xs={12} style={{ textAlign: 'center' }} justifyContent="center">
                <Button
                  variant="contained"
                  type="submit"
                  className={classes.saveButtton}
                  endIcon={loading ? <CircularProgress color="secondary" size={20} /> : null}
                  onClick={handleSaveUserDetails}
                >
                  Save changes
                </Button>
              </Grid>
            ) : null }
          </Grid>
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

export default withStyles(styles, { withTheme: true })(UserDetailView);
