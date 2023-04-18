const defaultNotification = {
    error:{
        message:null,
        color:'#f44336'
    },
    success:{
        message:'The Data Access Request has been sent to a System Administrator for review.',
        color:'#3CD4A0'
    },
    noAclToRequest:{
        message:'Your data access request has been submitted. No additional access can be requested.',
        color:'#f44336'
    },

    noAccess:{
        message:'Please submit a Data Access Request (DAR) to access protected pages.',
        color:'#3CD4A0'
    },

    disabled:{
        message:'Request failed, disabled users are not allowed to submit data access reqeusts.',
        color:'#f44336'
    },

};

export default defaultNotification;
