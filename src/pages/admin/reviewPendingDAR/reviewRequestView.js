import React, { useState } from 'react';
import {
  Button, Grid, Typography, withStyles,
} from '@material-ui/core';
import { cn, CustomDataTable, getColumns } from 'bento-components';
import { useMutation } from '@apollo/client';
import _ from 'lodash';
import Stats from '../../../components/Stats/AllStatsController';
import CustomizedDialogs from './components/Dialog';
import {
  REJECT_ACCESS,
  APPROVE_ACCESS,
  rejectCommentField,
  approveCommentField,
  adminPortalIcon,
  getReviewDARConfig,
} from '../../../bento/adminData';
import { filterData, showAlert } from './utils/reviewDARUtilFun';

const ReviewRequestView = ({ classes, data }) => {
  const { getUser } = data;

  const userInfo = getUser;
  const userId = userInfo.userID;
  const arms = userInfo.acl;

  // Alert state notifier
  const [accessStatus, setAccessStatus] = useState('');

  const [openAproveDialog, setOpenAproveDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);

  const [armsToBeGivenAccess, setArmsToBeGivenAccess] = useState([]);
  // Get Arms with requested Status and formatted date
  const [filteredArms, setFilteredArms] = useState(filterData(arms));

  const [comment, setComment] = useState('');

  // Below are Function Handlers when:
  // Admin open Approve dialog
  const handleOpenAproveDialog = (value) => {
    setArmsToBeGivenAccess([value]);
    setOpenAproveDialog(true);
  };
  // Admin close or cancel Approve dialog
  const handleCloseAproveDialog = () => {
    setOpenAproveDialog(false);
    setComment('');
    setArmsToBeGivenAccess([]);
  };

  // Admin open Reject dialog
  const handleOpenRejectDialog = (value) => {
    setArmsToBeGivenAccess([value]);
    setOpenRejectDialog(true);
  };
  // Admin close Reject dialog
  const handleCloseRejectDialog = () => {
    setOpenRejectDialog(false);
    setComment('');
    setArmsToBeGivenAccess([]);
  };
  // Admin Access comment
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  // Clean up for granting Reject or Approve access
  const handleCleanUp = (armGivenAccess, accessSt) => {
    setAccessStatus(accessSt);
    setComment('');
    /*
     * Remove Arms with approved or rejected status from filteredArms
     * Right now, Arms are filtered based on the assumption that only
     * one Arm at a time can be given an Access
     * */
    const newFilteredArms = filteredArms.filter((arm) => armGivenAccess[0].armID !== arm.armID);
    setFilteredArms(newFilteredArms);
    setArmsToBeGivenAccess([]);
  };

  // Approve GraphQL Operations
  const [mutateApprove] = useMutation(APPROVE_ACCESS, {
    context: { clientName: 'userService' },
    onCompleted({ approveAccess }) {
      handleCleanUp(approveAccess, 'approved');
    },
  });

  // Reject GraphQL Operations
  const [mutateReject] = useMutation(REJECT_ACCESS, {
    context: { clientName: 'userService' },
    onCompleted({ rejectAccess }) {
      handleCleanUp(rejectAccess, 'rejected');
    },
  });

  const actionColumn = [
    {
      name: 'armID',
      label: 'Action',
      options: {
        sort: false,
        customBodyRender: (value) => (
          <div>
            <Button
              variant="contained"
              className={cn(classes.actionButton, classes.approveButton)}
              onClick={() => handleOpenAproveDialog(value)}
            >
              APPROVE
            </Button>
            &nbsp;&nbsp;
            <Button
              variant="contained"
              className={cn(classes.actionButton, classes.rejectButton)}
              onClick={() => handleOpenRejectDialog(value)}
            >
              REJECT
            </Button>
          </div>
        ),
      },
    },
  ];
  const tableConfig = getReviewDARConfig();

  const columns = getColumns(tableConfig, classes).concat(actionColumn);

  // Table Options
  const options = {
    selectableRows: 'none',
    responsive: 'stacked',
    search: false,
    filter: false,
    searchable: false,
    print: false,
    download: false,
    viewColumns: false,
  };

  const handleApproveAccess = () => {
    setOpenAproveDialog(false);

    mutateApprove({
      variables: {
        userID: userId,
        armIDs: armsToBeGivenAccess,
        comment,
      },
    });
  };
  const handleRejectAccess = () => {
    setOpenRejectDialog(false);

    mutateReject({
      variables: {
        userID: userId,
        armIDs: armsToBeGivenAccess,
        comment,
      },
    });
  };
  return (
    <>
      <div className={classes.pageContainer}>
        <Stats />
        { /* Alert Box */}
        <Grid container item justifyContent="center" className={classes.alertContainer}>
          {accessStatus && showAlert(accessStatus, setAccessStatus)}
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
                <span className={classes.reviewTitle}>Review Data Access Request(s)</span>
              </Typography>
            </div>
          </div>
          <div className={classes.userInfoHeader}>
            <div className={classes.firstInfoSection}>
              <div className={classes.infoKeyWrapper}>
                <Typography>
                  <span className={classes.infoKey}>ACCOUNT&nbsp;TYPE: </span>
                  <br />
                  <span className={classes.infoKey}>EMAIL&nbsp;ADDRESS: </span>
                  <br />
                  <span className={classes.infoKey}>NAME: </span>
                </Typography>
              </div>
              <div className={classes.userInfoValue}>
                <Typography>
                  <span className={classes.infoValue}>
                    {_.startCase(userInfo.IDP)}
                  </span>
                  <br />
                  <span className={classes.infoValue}>
                    {userInfo.email}
                  </span>
                  <br />
                  <span className={classes.infoValue}>
                    {_.startCase(userInfo.firstName)}
                    ,&nbsp;
                    {_.startCase(userInfo.lastName)}
                  </span>
                </Typography>
              </div>
            </div>
            <div className={classes.secondInfoSection}>
              <div className={classes.infoKeyWrapper}>
                <Typography className={classes.userInfo}>
                  <span className={classes.infoKey}>ORGANIZATION: </span>
                  <br />
                  <span className={classes.infoKey}>MEMBERSHIP&nbsp;STATUS: </span>
                  <br />
                  <span className={classes.infoKey}>ROLE: </span>
                </Typography>
              </div>
              <div className={classes.userInfoValue}>
                <Typography className={classes.userInfo}>
                  <span className={classes.infoValue}>
                    {_.startCase(userInfo.organization)}
                  </span>
                  <br />
                  <span className={classes.infoValue}>
                    {_.startCase(userInfo.userStatus)}
                  </span>
                  <br />
                  <span className={classes.infoValue}>
                    {_.startCase(userInfo.role)}
                  </span>
                </Typography>
              </div>
            </div>
          </div>
          <Grid container>
            <Grid item xs={12}>
              <CustomDataTable
                data={filteredArms}
                columns={columns}
                options={options}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      {/* Approve Dialog */}
      <CustomizedDialogs
        handleOpen={openAproveDialog}
        handleClose={handleCloseAproveDialog}
        handleConfrim={handleApproveAccess}
        comment={comment}
        handleCommentChange={handleCommentChange}
        commentField={approveCommentField}
        accessObj={{
          dialogTitle: 'Approve Access',
          placeholder: 'e.g. Access to this Arm has been approved.',
        }}
      />
      {/* Reject Dialog */}
      <CustomizedDialogs
        handleOpen={openRejectDialog}
        handleClose={handleCloseRejectDialog}
        handleConfrim={handleRejectAccess}
        comment={comment}
        handleCommentChange={handleCommentChange}
        commentField={rejectCommentField}
        accessObj={{
          dialogTitle: 'Reject Access',
          placeholder: 'e.g. Arm is restricted to authorized personnel.',
        }}
      />
    </>
  );
};
const styles = (theme) => ({
  alertContainer: {
    position: 'absolute',
    top: '184px', // Logo(100px) + NavBar(39px) + Stats(47px) - 2px
    height: '70px',
  },
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
    fontFamily: 'Nunito Sans',
    fontStyle: 'italic',
    fontWeight: '400', // regular
    fontSize: '12px',
    color: '#708292',
    letterSpacing: 0,
    lineHeight: '34px',
  },
  infoValue: {
    marginLeft: '21px',
    float: 'left',
    fontFamily: 'Nunito Sans',
    fontStyle: 'italic',
    fontWeight: '300', // light
    fontSize: '17px',
    color: '#4F5D69',
    letterSpacing: 0,
    lineHeight: '35px',
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
    height: '108px',
    paddingTop: '15px',
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
    fontSize: '13px',
    borderRadius: '8px',
    fontFamily: 'Lato',
  },
  approveButton: {
    backgroundColor: '#0F8573',
  },
  rejectButton: {
    backgroundColor: '#BA2810',
  },
});

export default withStyles(styles, { withTheme: true })(ReviewRequestView);
