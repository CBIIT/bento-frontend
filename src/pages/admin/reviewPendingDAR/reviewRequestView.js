import React, { useState } from 'react';
import {
  Button, Grid, Typography, withStyles,
} from '@material-ui/core';
import { cn, CustomDataTable, getColumns } from 'bento-components';
import { useMutation } from '@apollo/client';
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
import custodianUtils from '../../../utils/custodianUtilFuncs';
import { adminPortal } from '../../../bento/siteWideConfig';

const ReviewRequestView = ({ classes, data }) => {
  const { listRequest } = data;
  // Redirect to Admin page once all individual DAR has been given an Access
  if (listRequest.length === 0) return <Redirect to={adminPortal} />;

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
  const { getAuthenticatorName, capitalizeFirstLetter } = custodianUtils;

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
                    {capitalizeFirstLetter(userInfo.firstName)}
                    ,&nbsp;
                    {capitalizeFirstLetter(userInfo.lastName)}
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
                </Typography>
              </div>
              <div>
                <Typography className={classes.userInfo}>
                  <span className={classes.infoValue}>
                    {capitalizeFirstLetter(userInfo.organization)}
                  </span>
                  <span className={classes.infoValue}>
                    {capitalizeFirstLetter(userInfo.userStatus)}
                  </span>
                  <span className={classes.infoValue}>
                    {capitalizeFirstLetter(userInfo.role)}
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
                className={classes.customDataTable}
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
  customDataTable: {
    '& .MuiTableFooter-root': {
      borderBottom: '3px solid #42779A',
    },
    '& .MuiTableCell-head:first-child, .MuiTableCell-body:first-child': {
      paddingLeft: '37px',
    },
    '& .MuiTableCell-head:last-child': {
      paddingRight: '37px',
      textAlign: 'center',
    },
    '& .MuiTableCell-body:last-child': {
      paddingRight: '37px',
    },
    '& .MuiTableRow-root': {
      height: '54px',
    },
  },
});

export default withStyles(styles, { withTheme: true })(ReviewRequestView);
