/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  withStyles, Button, Grid, Typography,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { cn, CustomDataTable } from 'bento-components';
import Stats from '../../../components/Stats/AllStatsController';

import { adminPortalIcon, SAVE_UPDATED_USER, GET_USER } from '../../../bento/adminData';
import getDateInFormat from '../../../utils/date';

// acl is array of object.
function getApprovedArms(acl) {
  const approvedArms = [];
  acl.forEach((arm) => {
    if (arm.accessStatus === 'approved') {
      approvedArms.push(
        [
          arm.armName,
          getDateInFormat(arm.requestDate),
          getDateInFormat(arm.reviewDate),
          arm.reviewAdminName,
          arm.armID,
        ],
      );
    }
  });

  return approvedArms;
}

function test(seletedArms, value) {
  const testResult = seletedArms.indexOf(value);
  console.log(testResult);
  return testResult;
}

const ReviewRequestView = ({ classes, data }) => {
  const { getUser: userInfo } = data;
  const [seletedArms, setSeletedArms] = useState([]);
  const [userRole, setUserRole] = useState(userInfo.role);

  // GraphQL Operations
  const [mutate, response] = useMutation(SAVE_UPDATED_USER, {
    context: { clientName: 'userService' },
    refetchQueries: [
      { query: GET_USER }, // DocumentNode object parsed with gql
    ],
    onCompleted() {
      // INPUT parm can be 'responseData'

    },
    onError() {
      // INPUT parm can be 'ApolloError'
    },
  });

  // TODO: Move to Custodian files.
  const columns = [
    { name: 'arm', label: 'Arms' },
    { name: 'date', label: 'Request Date' },
    { name: 'date1', label: 'Approved Date' },
    { name: 'date2', label: 'Approved By' },
    {
      name: 'remove',
      label: 'Remove',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const { id } = value;
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
        },
      },
    },
  ];

  const approvedArms = getApprovedArms(userInfo.acl);

  const options = {
    selectableRows: false,
    responsive: 'stacked',
    search: false,
    filter: false,
    searchable: false,
    print: false,
    download: false,
    viewColumns: false,
  };

  const loading = false;

  function handleSaveUserDetails() {
    const Obj = {
      userID: userInfo.userID,
      role: userRole,
      userStatus: userInfo.userStatus,
      armIDs: seletedArms,
      comment: '',
    };

    mutate({ variables: { ...Obj } });
  }

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setUserRole(value);
  };

  return (
    <>
      <div className={classes.pageContainer}>
        <Stats />
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
                <span className={classes.reviewTitle}>Edit User</span>
              </Typography>
            </div>
          </div>
          <div className={classes.userInfoHeader}>
            <div className={classes.firstInfoSection}>
              <div className={classes.infoKeyWrapper}>
                <Typography>
                  <span className={classes.infoKey}>ACCOUNT&nbsp;TYPE: </span>
                  {' '}
                  <br />
                  <span className={classes.infoKey}>EMAIL&nbsp;ADDRESS: </span>
                  {' '}
                  <br />
                  <span className={classes.infoKey}>NAME: </span>
                </Typography>
              </div>
              <div className={classes.userInfoValue}>
                <Typography>
                  <span className={classes.infoValue}>
                    {' '}
                    {userInfo.IDP}
                    {' '}
                  </span>
                  {' '}
                  <br />
                  <span className={classes.infoValue}>
                    {' '}
                    {userInfo.email}
                    {' '}
                  </span>
                  {' '}
                  <br />
                  <span className={classes.infoValue}>
                    {' '}
                    {userInfo.firstName}
                    ,
                    {' '}
                    {userInfo.lastName}
                  </span>
                </Typography>
              </div>
            </div>
            <div className={classes.secondInfoSection}>
              <div className={classes.infoKeyWrapper}>
                <Typography className={classes.userInfo}>
                  <span className={classes.infoKey}>ORGANIZATION: </span>
                  {' '}
                  <br />
                  <span className={classes.infoKey}>MEMBERSHIP&nbsp;STATUS: </span>
                  {' '}
                  <br />
                  <span className={classes.infoKey}>ROLE: </span>
                </Typography>
              </div>
              <div className={classes.userInfoValue}>
                <Typography className={classes.userInfo}>
                  <span className={classes.infoValue}>
                    {' '}
                    {userInfo.organization}
                    {' '}
                  </span>
                  {' '}
                  <br />
                  <span className={classes.infoValue}>
                    {' '}
                    {userInfo.userStatus}
                    {' '}
                  </span>
                  {' '}
                  <br />
                  <span className={classes.infoValue}>
                    {' '}
                    <Select
                      value={userRole}
                      onChange={handleRoleChange}
                      displayEmpty
                      className={classes.selectEmpty}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value="admin"> Admin </MenuItem>
                      <MenuItem value="member"> Member </MenuItem>
                    </Select>
                    {' '}
                  </span>
                </Typography>
              </div>
            </div>
          </div>
          <Grid container>
            <Grid item xs={12}>
              <CustomDataTable
                data={approvedArms}
                columns={columns}
                options={options}
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }} justifyContent="center">
              <Button
                variant="contained"
                type="submit"
                className={classes.saveButtton}
                endIcon={loading ? <CircularProgress color="secondary" size={20} /> : null}
                onClick={handleSaveUserDetails}
              >
                Save
              </Button>
            </Grid>
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
  reviewTitle: {
    fontWeight: 'bold',
  },
  pageContainer: {
    background: '#fff',
  },
  userInfoHeader: {
    minWidth: 'fit-content',
    margin: '42px 0 38px 0',
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
  infoKey: {
    whiteSpace: 'nowrap',
    color: '#708292',
    fontFamily: 'Nunito Sans',
    fontSize: '11px',
  },
  infoValue: {
    whiteSpace: 'nowrap',
    marginLeft: '21px',
    float: 'left',
    color: '#4F5D69',
    fontFamily: 'Nunito Sans',
  },
  container: {
    margin: 'auto',
    maxWidth: '1440px',
    paddingLeft: '36px',
    paddingRight: '36px',
    paddingBottom: '50px',
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
});

export default withStyles(styles, { withTheme: true })(ReviewRequestView);
