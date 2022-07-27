/* eslint-disable */
import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { cn, CustomDataTable } from 'bento-components';
import Stats from '../../../components/Stats/AllStatsController';
import { adminPortalIcon } from '../../../bento/adminData'
import CustomizedDialogs from './components/Dialog'
 
const ReviewRequestView = ({classes, data}) => {
 const columns = [
   { name: 'arm', label: 'Arms' },
   { name: 'date', label: 'Request Date' },
   { name: 'action', label: 'Actions',
     options: {
       customBodyRender: () => (
         <div>
           <Button variant="contained"
             className={cn(classes.actionButton, classes.approveButton)}
             onClick={handleOpenAproveDialog}
           >
             APPROVE
           </Button>&nbsp;&nbsp;
           <Button variant="contained"
             className={cn(classes.actionButton, classes.rejectButton)}
             onClick={handleOpenRejectDialog}
           >
             REJECT
           </Button>
         </div>
       )
     }
   },
 ];
 
 const fakeData = [
   [ 'RS 0-10, assigned endocrine therapy alone', '05/10/2022', 'id' ],
   [ 'RS 11-25, randomized to endocrine therapy alone', '05/10/2022', 'id' ],
   [ 'RS 11-25, randomized to chemo + endocrine', '05/10/2021', 'id' ],
   [ 'RS > 25, assigned to chemo +', '05/10/2022', 'id' ],
 ];
 
 const individualName = "Smith, John"
 const individualOrganization = "Other (CBIIT)"
 
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
 const [openRefectDialog, setOpenRefectDialog] = useState(false);
 const [comment, setComment] = useState('');
 
 
 const handleOpenAproveDialog = () => {
   setOpenAproveDialog(true)
 }
 const handleCloseAproveDialog = () => {
   setOpenAproveDialog(false)
 }
 
 const handleOpenRejectDialog = () => {
   setOpenRefectDialog(true)
 }
 const handleCloseRejectDialog = () => {
   setOpenRefectDialog(false)
 }
  const handleApproveAccess = () => {
   setOpenAproveDialog(false)
   console.log("handle Approve Access been done")
 }
 const handleRejectAccess = () => {
   setOpenRefectDialog(false)
   console.log("handle Reject Access been done")
 }
 const handleCommentChange = (event) => {
  setComment(event.target.value);
};
 
 return (
   <>
     <div className={classes.pageContainer}>
       <Stats />
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
         <div className={classes.nameOrganizationHeader}>
           <Typography className={classes.userInfo}>
             <span className={classes.nameOrgSpan}>NAME:&nbsp; &nbsp; &nbsp; &nbsp; </span>
               <span className={classes.floatRight}> {individualName} </span> <br/>
             <span className={classes.nameOrgSpan}>Organization: &nbsp; &nbsp; &nbsp; &nbsp; </span>
               <span className={classes.floatRight}> {individualOrganization} </span>
           </Typography>
         </div>
 
         <Grid container>
           <Grid item xs={12}>
             <CustomDataTable
               data={fakeData}
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
       handleOpen={openRefectDialog}
       handleClose={handleCloseRejectDialog}
       handleConfrim={handleRejectAccess}
       accessObj = {{
         dialogTitle: "Reject Access",
         placeholder: "e.g. Arm is restricted to authorized personnel.",
       }}
     />
   </>
 );
}
 
 
const styles = (theme) => ({
 adminTitle: {
   borderBottom: '1px solid #274FA5',
 },
 reviewTitle: {
   fontWeight: 'bold'
 },
 pageContainer: {
   background: '#fff',
 },
 nameOrganizationHeader: {
   padding: '42px 0 38px 36px',
 
 },
 nameOrgSpan: {
   paddingLeft: '5px',
   color: '#708292',
   fontFamily: "Nunito Sans",
   fontSize: '11px',
 },
 floatRight: {
   float: 'right',
   color: '#4F5D69',
   fontFamily: "Nunito Sans",
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
 },
 headerTitle: {
   maxWidth: '1440px',
   margin: 'auto',
   float: 'left',
   marginLeft: '90px',
   paddingTop: '20px',
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
   color: '#fff'
 },
 approveButton: {
   backgroundColor: '#0F8573',
 },
 rejectButton: {
   backgroundColor: '#BA2810',
 },
 userInfo: {
   width: 'fit-content',
 },
});
 
export default withStyles(styles, { withTheme: true })(ReviewRequestView);
