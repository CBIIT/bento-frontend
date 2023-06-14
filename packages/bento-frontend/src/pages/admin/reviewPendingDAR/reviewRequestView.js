import React, { useState } from 'react';
import {
  Button, Grid, Typography, withStyles,
} from '@material-ui/core';
import { getColumns } from '@bento-core/util';
import clsx from 'clsx';
import { useMutation } from '@apollo/client';
import { ReviewRequestsTableGenerator } from '@bento-core/admin';
import { UserDetailsGenerator } from '@bento-core/admin';
import REVIEW_REQUESTS_TABLE_CONFIG from './reviewRequestsTableConfig';
import USER_DETAILS_CONFIG from '../userDetails/userDetailsViewConfig';
import { Redirect } from 'react-router-dom';
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
import { reformatDate, showAlert } from './utils/reviewDARUtilFun';
import { adminPortalPath } from '../../../bento/siteWideConfig';

const ReviewRequestView = ({ classes, data }) => {
  const { listRequest } = data;
  const { UserDetails } = UserDetailsGenerator(USER_DETAILS_CONFIG);
  const { ReviewRequestsTable } = ReviewRequestsTableGenerator(REVIEW_REQUESTS_TABLE_CONFIG);
  // Redirect to Admin page once all individual DAR has been given an Access
  if (listRequest.length === 0) return <Redirect to={adminPortalPath} />;

  const userInfo = listRequest[0];
  const userId = userInfo.userID;
  const arms = userInfo.acl;

  // Alert state notifier
  const [accessStatus, setAccessStatus] = useState('');

  const [openAproveDialog, setOpenAproveDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);

  const [armsToBeGivenAccess, setArmsToBeGivenAccess] = useState([]);
  // Get Arms with formatted date
  const [filteredArms, setFilteredArms] = useState(reformatDate(arms));

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
          <div className={classes.actionColumn}>
            <Button
              variant="contained"
              className={clsx(classes.actionButton, classes.approveButton)}
              onClick={() => handleOpenAproveDialog(value)}
            >
              APPROVE
            </Button>
            &nbsp;&nbsp;
            <Button
              variant="contained"
              className={clsx(classes.actionButton, classes.rejectButton)}
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
          <UserDetails
            userInfo={userInfo}
            userRole={userInfo.role}
          />
          <ReviewRequestsTable
            data={filteredArms}
            columns={columns}
            options={options}
            className={classes.customDataTable}
          />
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
  container: {
    margin: 'auto',
    maxWidth: '1000px',
    paddingLeft: '36px',
    paddingRight: '36px',
    paddingBottom: '80px',
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
  actionColumn: {
    textAlign: 'center',
    minWidth: '170px',
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
