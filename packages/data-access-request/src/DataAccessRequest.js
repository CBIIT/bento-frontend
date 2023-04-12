import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import generateStyle from './utils/generateStyle';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/client';
import { useHistory} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import AlertMessage from '../../bento-frontend/src/bento-core/AlertMessage';
import SelectMenu from './components/selectMenu';
import TextBox from './components/textBox';
import getRedirectedType from './utils/getRedirectType';
import useQuery from './hooks/useQuery';
import getAvailableArms from './utils/getAvailableArms';
import isDisabledMember from './utils/isDisabledMember';
import setDefaultValues from './utils/setDefaultValues';
import generateNotification from './utils/generateNotification';

/* DataAccessRequest coponenent */
function DataAccessRequest({
  data,
  formFields, 
  pageTitle, 
  SUBMIT_REQUEST_ACCESS,
  bentoHelpEmail,
  custodianUtils,
  notification,
  styles,
}) {
  /* styles */
  const generatedStyle = generateStyle(styles);
  const useStyles = makeStyles(generatedStyle);
  const classes = useStyles();

  /* Component states */
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [isFormSubmitted, setSubmitted] = useState(false);

  /* hooks */
  const history = useHistory();
  const query = useQuery();
  const [mutate, response] = useMutation(SUBMIT_REQUEST_ACCESS, {
    context: { clientName: 'userService' },
    onCompleted() {
      // INPUT parm can be 'responseData'
      setSubmitted(true);
    },
    onError() {
      // INPUT parm can be 'ApolloError'
    },
  });

  /* variables */
  const { getMyUser, listArms } = data;
  const {
    email: userEmail,
    IDP,
    role,
    userStatus,
  } = getMyUser;
  const redirectdType = getRedirectedType(query);
  const { getAuthenticatorName, capitalizeFirstLetter } = custodianUtils;
  const { loading, error, data: successData } = response;
  const availableArms = getAvailableArms(getMyUser.acl, listArms);
  const fieldsToChk = formFields.map(
    (field) => (field.required ? field.id : null),
  );
  const [formValues, setFormValues] = useState(setDefaultValues(formFields,getMyUser,availableArms));

  /* event handlers */
  const isInputDisabled = () => isFormSubmitted || (availableArms.length <= 0) || userStatus==="Disabled";


  const getErrorDetails = () => {
    const {
      networkError: {
        result: {
          errors,
        },
        statusCode,
      },
    } = error;

    if (statusCode !== 409) {
      return 'Server Error';
    }

    // Return API error message for disabled members
    if (isDisabledMember(role, userStatus)) {
      return errors[0].error;
    }

    // Default error message
    return 'The request arm does not exist or attempting to request an invalid ARM';
  };

  const showAlert = (alertType) => {
    const notificationSchema = generateNotification(notification);

    switch (alertType) {
      case 'error':
        return (
          <AlertMessage severity="error" backgroundColor={notificationSchema.error.color}>
            {notificationSchema.error.message? notificationSchema.error.message : getErrorDetails()}
          </AlertMessage>
        );
      case 'success':
        return (
          <AlertMessage severity="success" backgroundColor={notificationSchema.success.color}>
            {notificationSchema.success.message}
          </AlertMessage>
        );
      case 'noAclToRequest':
        return (
          <AlertMessage severity="error" backgroundColor={notificationSchema.noAclToRequest.color}>
            {notificationSchema.noAclToRequest.message}
          </AlertMessage>
        );
      case 'noAccess':
        return (
          <AlertMessage severity="success" timeout={5000000} backgroundColor={notificationSchema.noAccess.color}>
            {notificationSchema.noAccess.message}
          </AlertMessage>
        );
      case 'disabled':
      return (
        <AlertMessage severity="error" timeout={5000000} backgroundColor={notificationSchema.disabled.color}>
          {notificationSchema.disabled.message}
        </AlertMessage>
      );
      default:
        return null;
    }
  };

  const validateFields = () => {
    // First check if any arms available for selection?
    // This function is useful when page is loaded and no arms are available.
    if (availableArms.length <= 0) {
      setDisableSubmit(true);
      return;
    }
   
    // if not cehck form values are corrct or not.
    const validInputValues = fieldsToChk.reduce((status, field) => {
      const fieldValue = formValues[field];
      return (fieldValue.length >= 1) && status;
    }, true);

    if (validInputValues && userStatus!=="Disabled") {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userInfo = formValues;
    mutate({ variables: { userInfo } });
  };

  function redirectUser(path) {
    history.push(path);
  }

  function isACLAvailable() {
    return availableArms.length > 0;
  }

  function getNotification() {
    if (error) { return showAlert('error'); }

    if (!isACLAvailable()) { return showAlert('noAclToRequest'); }

    if (successData && successData.requestAccess) { return showAlert('success'); }

    if (redirectdType && redirectdType === 'noAccess') { return showAlert(redirectdType); }

    if (userStatus==='Disabled') { return showAlert('disabled'); }

    return null;
  }

  /* useEffect hooks */
  useEffect(validateFields);

  return (
    <div className={classes.Container}>
      {/* ROW 1 */}
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        {/* Top Space */}
        <Grid container item justifyContent="center" className={classes.emptySpace}>
          {getNotification()}
        </Grid>

        {/* ROW 2 */}
        <Grid container item justifyContent="center">
          <Grid container>
            {/* Spacing */}
            <Grid container item sm={2} />

            <Grid container item sm={8} justifyContent="center">
              {/* Page Title */}
              <Grid container item sm={4} />
              <Grid container item xs={4} justifyContent="center">
                <div className={classes.pageTitle}>
                  {pageTitle}
                  <hr className={classes.pageTitleUnderline} />
                </div>
              </Grid>
              <Grid container item sm={4} />

              {/* START: Summary Section  */}
              <Grid container item sm={4} />
              <Grid
                container
                item
                xs={4}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <div>
                  <div className={classes.brace} />
                  <div className={classes.SummaryBox}>

                    {/* User's Account type */}
                    <div className={classes.row}>
                      <div className={classes.column}>
                        <div className={classes.itemTitles}>Account Type:</div>
                      </div>
                      <div className={classes.column}>
                        <div className={classes.itemValue}>{getAuthenticatorName(IDP || '')}</div>
                      </div>
                    </div>

                    {/* User's Email Address */}
                    <div className={classes.row}>
                      <div className={classes.column}>
                        <div className={classes.itemTitles}>Email Address:</div>
                      </div>
                      <div className={classes.column}>
                        <div className={classes.itemValue}>
                          {' '}
                          {userEmail}
                          {' '}
                        </div>
                      </div>
                    </div>

                    {/* User's Membership Status */}
                    <div className={classes.row}>
                      <div className={classes.column}>
                        <div className={classes.itemTitles}> Membership Status: </div>
                      </div>
                      <div className={classes.column}>
                        <div className={classes.itemValue}>
                          {' '}
                          {userStatus === '' ? 'N/A' : capitalizeFirstLetter(userStatus)}
                          {' '}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={classes.brace} />
                </div>
              </Grid>
              <Grid container item sm={4} />
              {/* END: Summery Section  */}

              {/* Box Grid */}
              <div className={classes.Box}>
                <Grid container alignItems="center" justifyContent="center" direction="column">
                  <form onSubmit={handleSubmit}>
                    {formFields.map((field) => {
                      if (!field.display) { return null; }
                      switch (field.type) {
                        case 'aclDropdown':
                          return SelectMenu(field, formValues, handleInputChange,
                            data, classes, availableArms, isInputDisabled());
                        case 'dropdown':
                          return SelectMenu(field, formValues, handleInputChange,
                            data, classes, availableArms, isInputDisabled());
                        case 'textBox':
                          return TextBox(field, formValues, handleInputChange,
                            classes, isInputDisabled());
                        default:
                          return null;
                      }
                    })}
                    <Grid item sm={12} style={{ textAlign: 'center', marginTop: '19px' }} justifyContent="center">
                      <span className={classes.requiredFieldMessage}>
                        * denotes  required field
                      </span>
                    </Grid>
                    <Grid item sm={12} style={{ textAlign: 'center' }} justifyContent="center">
                      {isFormSubmitted ? (
                        <Button
                          variant="contained"
                          className={[classes.formButton, classes.goToHomeButton]}
                          endIcon={loading ? <CircularProgress color="secondary" size={20} /> : null}
                          onClick={() => redirectUser('/')}
                        >
                          Go Back To Home Page
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          type="submit"
                          className={[classes.formButton, classes.submitButton]}
                          disabled={disableSubmit}
                          endIcon={loading ? <CircularProgress color="secondary" size={20} /> : null}
                        >
                          Submit
                        </Button>
                      )}
                    </Grid>
                  </form>
                </Grid>
              </div>
            </Grid>

            {/* Spacing */}
            <Grid container item sm={2} />
          </Grid>
        </Grid>
      </Grid>

      <div className={classes.helperMessage}>
        If you have any questions about access or the registration process,
        please contact
        {' '}
        <span className={classes.supportEmail}><a href={`mailto:${bentoHelpEmail}`}>{bentoHelpEmail}</a></span>
      </div>

      {/* Bottom Space */}
      <Grid container item justifyContent="center" className={classes.emptySpace} />

    </div>
  );
}

export default DataAccessRequest;
