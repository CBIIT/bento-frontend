/* eslint-disable */
import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { cn, CustomDataTable } from 'bento-components';
import Stats from '../../../components/Stats/AllStatsController';
import { adminPortalIcon } from '../../../bento/adminData'
import CustomizedDialogs from './components/Dialog'
import { useMutation } from '@apollo/client';

import { APPROVE_ACCESS } from '../../../bento/adminData';
import { REJECT_ACCESS } from '../../../bento/adminData';
import getFormattedDate, { showAlert } from './utils/reviewDARUtilFun';
import AlertMessage from './components/AlertView'

const ReviewRequestView = ({classes, data}) => {
  const [ accessStatus, setAccessStatus ] = useState('')
  // GraphQL Operations

  const [mutateApprove, responseApprove] = useMutation(APPROVE_ACCESS, {
    context: { clientName: 'userService' },
    onCompleted(data) {
      handleCleanUp("approved")
      console.log("Approve Query got Completed", data)
    },
    onError() {
      console.log("Approve Query got Error")
    },
  });

  // GraphQL Operations
  const [mutateReject, responseReject] = useMutation(REJECT_ACCESS, {
    context: { clientName: 'userService' },
    onCompleted(data) {
      handleCleanUp("rejected")
      console.log("Reject Query got Completed", data)
    },
    onError() {
      console.log("Reject Query got Error")
    },
  });

  const { getUser } = data;
  const userId = getUser.userID;

  const columns = [
    { name: 'armName', label: 'Arm(s)' },
    { name: 'requestDate', label: 'Request Date',
      options: { customBodyRender: (value) => <p>{getFormattedDate(value)}</p>}
    },
    { name: 'armID', label: 'Actions',
      options: {
        customBodyRender: (value) => (
          <div>
            <Button variant="contained"
              className={cn(classes.actionButton, classes.approveButton)}
              onClick={() => handleOpenAproveDialog(value)}
            >
              APPROVE
            </Button>&nbsp;&nbsp;
            <Button variant="contained"
              className={cn(classes.actionButton, classes.rejectButton)}
              onClick={() => handleOpenRejectDialog(value)}
            >
              REJECT
            </Button>
          </div>
        )
      }
    },
  ];

  const userInfo = getUser || {
    IDP: 'NIH',
    email: 'jsmith@nih.gov',
    firstName: 'Smith',
    lastName: 'John',
    organization: 'Other (CBIIT)',
    userStatus: 'Active',
    role: 'Non-member',
  };
  const hardCodedData = [
    [ 'RS 0-10, assigned endocrine therapy alone', '05/10/2022', 'id' ],
    [ 'RS 11-25, randomized to endocrine therapy alone', '05/10/2022', 'id' ],
    [ 'RS 11-25, randomized to chemo + endocrine', '05/10/2021', 'id' ],
    [ 'RS > 25, assigned to chemo +', '05/10/2022', 'id' ],
  ];

  const fakeData = hardCodedData;

  const getRequestedArms = () => {
    let data = getUser || []
    if (getUser) {
      data = getUser.acl.filter(arm => arm.accessStatus === "requested")
    }
    console.log("List of Requested Arm: ", data)
    return data
  } 

  const options = {
    selectableRows: 'none',
    responsive: 'stacked',
    search: false,
    filter: false,
    searchable: false,
    print: false,
    download: false,
    viewColumns: false,
  }

  const [openAproveDialog, setOpenAproveDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [comment, setComment] = useState('');
  const [armsToBeGivenAccess, setArmsToBeGivenAccess] = useState([])
 
  const handleOpenAproveDialog = (value) => {
    console.log("Approve armsToBeGivenAccess: ", value)
    setArmsToBeGivenAccess([value])
    setOpenAproveDialog(true)
  }
  const handleCloseAproveDialog = () => {
    setOpenAproveDialog(false)
  }

  const handleOpenRejectDialog = (value) => {
    console.log("Reject armsToBeGivenAccess: ", value)
    setArmsToBeGivenAccess([value])
    setOpenRejectDialog(true)
  }
  const handleCloseRejectDialog = () => {
    setOpenRejectDialog(false)
  }

  const handleApproveAccess = () => {
    setOpenAproveDialog(false)
   
    console.log("Approve: Handling Approve Access has been done")
    console.log("Approve: userID ", userId)
    console.log("Approve: armIDs ", armsToBeGivenAccess)
    console.log("Approve: comment ", comment)

    mutateApprove({ 
      variables: { 
        userID: userId,
        armIDs: armsToBeGivenAccess,
        comment: comment
      } 
    }).then(({ data: responseData }) => {
      console.log("Approve then responseData: ", responseData)
      console.log("Approve data: ", data)

    }).catch(() => {});


    console.log("Approve: responseApprove ", responseApprove)
  }
  const handleRejectAccess = () => {
    setOpenRejectDialog(false)
    console.log("Reject: handling Reject Access has been done ")

    console.log("Reject: userID ", userId)
    console.log("Reject: armIDs ", armsToBeGivenAccess)
    console.log("Reject: Comment ", comment)

    mutateReject({ 
      variables: { 
        userID: userId,
        armIDs: armsToBeGivenAccess,
        comment: comment
      } 
    }).then(({ data: responseData }) => {
      console.log("Reject then responseData: ", responseData)
      console.log("Reject data: ", data)

    }).catch(() => {});

    console.log("Reject: responseReject ", responseReject)
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCleanUp = (accessStatus) => {
    setAccessStatus(accessStatus)
    setComment("")
  }

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
              {<img
                src={adminPortalIcon.src}
                alt={adminPortalIcon.alt}
              />}
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
                <span className={classes.infoKey}>ACCOUNT&nbsp;TYPE: </span> <br/>
                <span className={classes.infoKey}>EMAIL&nbsp;ADDRESS: </span> <br/>
                <span className={classes.infoKey}>NAME: </span>
              </Typography>
            </div>
            <div className={classes.userInfoValue}>
              <Typography>
                <span className={classes.infoValue}> {userInfo.IDP} </span> <br/>
                <span className={classes.infoValue}> {userInfo.email} </span> <br/>
                <span className={classes.infoValue}> {userInfo.firstName}, {userInfo.lastName}</span>
              </Typography>
            </div>
          </div>
          <div className={classes.secondInfoSection}>
            <div className={classes.infoKeyWrapper}>
              <Typography className={classes.userInfo}>
                <span className={classes.infoKey}>ORGANIZATION: </span> <br/>
                <span className={classes.infoKey}>MEMBERSHIP&nbsp;STATUS: </span> <br/>
                <span className={classes.infoKey}>ROLE: </span>
              </Typography>
            </div>
            <div className={classes.userInfoValue}>
              <Typography className={classes.userInfo}>
                <span className={classes.infoValue}> {userInfo.organization} </span> <br/>
                <span className={classes.infoValue}> {userInfo.userStatus} </span> <br/>
                <span className={classes.infoValue}> {userInfo.role} </span>
              </Typography>
            </div>
          </div>
          </div>
          <Grid container>
            <Grid item xs={12}>
              <CustomDataTable
                data={getRequestedArms() || fakeData || []}
                columns={columns}
                options={options}/>
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
        accessObj = {{
          dialogTitle: "Approve Access",
          placeholder: "e.g. Access to this Arm has been approved.",
        }}
      />
      {/* Reject Dialog */}
      <CustomizedDialogs
        handleOpen={openRejectDialog}
        handleClose={handleCloseRejectDialog}
        handleConfrim={handleRejectAccess}
        comment={comment}
        handleCommentChange={handleCommentChange}
        accessObj = {{
          dialogTitle: "Reject Access",
          placeholder: "e.g. Arm is restricted to authorized personnel.",
        }}
      />
    </>
  );
}
 
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
    fontWeight: 'bold'
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
    fontFamily: "Nunito Sans",
    fontSize: '11px',
  },
  infoValue: {
  whiteSpace: 'nowrap',
    marginLeft: '21px',
    float: 'left',
    color: '#4F5D69',
    fontFamily: "Nunito Sans",
  },
  container: {
    margin: 'auto',
    maxWidth: '1440px',
    paddingLeft: '36px',
    paddingRight: '36px',
    paddingBottom: '27px',
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
    }
  },
  headerTitle: {
    maxWidth: '1440px',
    margin: 'auto',
    float: 'left',
    marginLeft: '90px',
    paddingTop: '20px',
    [theme.breakpoints.down('xs')]: {
    paddingTop: '0',
    }
  },
  headerMainTitle  : {
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
