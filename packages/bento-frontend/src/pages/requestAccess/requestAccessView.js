import React, { useEffect, useState } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/client';
import { useHistory, useLocation } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import { bentoHelpEmail } from '../../bento/userLoginData';
import AlertMessage from '../../components/alertMessage/AlertMessageView';
import SelectMenu from './components/selectMenu';
import TextBox from './components/textBox';
import Stats from '../../components/Stats/AllStatsController';
import custodianUtils from '../../utils/custodianUtilFuncs';
// Custodian data imports
import { formFields, pageTitle, SUBMIT_REQUEST_ACCESS } from '../../bento/requestAccessData';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function getRedirectedType(query) {
  const path = query.get('type') || '/';
  return path;
}

const unavailableArmsStatus = ['approved', 'pending'];

const getAvailableArms = (currentACL, listOfArms) => {
  const unavailableArms = Object.keys(currentACL).reduce((previousArms, key) => {
    const armObject = currentACL[key];
    const resultArray = previousArms;
    if (unavailableArmsStatus.includes(
      armObject.accessStatus.toLowerCase(),
    )) resultArray.push(armObject.armID);
    return resultArray;
  }, []);
  const availableArms = listOfArms.filter((arm) => !unavailableArms.includes(arm.id));
  return availableArms;
};

function requestAccessView({ data, classes }) {
  const { getMyUser, listArms } = data;
  const { email: userEmail, IDP, userStatus } = getMyUser;
  const history = useHistory();
  const query = useQuery();
  const redirectdType = getRedirectedType(query);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const { getAuthenticatorName, capitalizeFirstLetter } = custodianUtils;

  const availableArms = getAvailableArms(getMyUser.acl, listArms);
  const getDefaultACL = () => (availableArms[0] || []).id;

  // Initial State and Reset functions
  const fieldsToChk = formFields.map(
    (field) => (field.required ? field.id : null),
  );
  const setDefaultValues = () => formFields.reduce((values, field) => {
    const {
      id, type, multiple, display,
    } = field;

    if (!values[id]) {
      // eslint-disable-next-line no-param-reassign
      values[id] = (['dropdown', 'aclDropdown'].includes(type) && !display) ? getDefaultACL() : multiple ? [] : getMyUser[id] || '';
    }

    return values;
  }, {});

  // Init state for inputs.
  const [formValues, setFormValues] = useState(setDefaultValues());
  const [isFormSubmitted, setSubmitted] = useState(false);

  const isInputDisabled = () => isFormSubmitted || (availableArms.length <= 0);

  // GraphQL Operations
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
  const { loading, error, data: successData } = response;

  const getErrorDetails = () => {
    const {
      networkError: {
        statusCode,
      },
    } = error;

    return statusCode === 409 ? 'The request arm does not exist or attempting to request an invalid ARM' : 'Server Error';
  };

  const showAlert = (alertType) => {
    switch (alertType) {
      case 'error':
        return (
          <AlertMessage severity="error" backgroundColor="#f44336">
            {getErrorDetails()}
          </AlertMessage>
        );
      case 'success':
        return (
          <AlertMessage severity="success" timeout={5000000}>
            The Data Access Request has been sent to a System Administrator for review
          </AlertMessage>
        );
      case 'noAclToRequest':
        return (
          <AlertMessage severity="error" backgroundColor="#f44336">
            Your data access request has been submitted. No additional access can be requested.
          </AlertMessage>
        );
      case 'noAccess':
        return (
          <AlertMessage severity="success" timeout={5000000}>
            Please submit a Data Access Request (DAR) to access protected pages
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

    if (validInputValues) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  };

  // use effect to track form changes
  useEffect(validateFields);

  // State Change Managemnt
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

    return null;
  }

  return (
    <div className={classes.Container}>
      <Stats />
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

const styles = () => ({
  Container: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Nunito',
  },
  pageTitle: {
    color: '#3974A8',
    fontSize: '27px',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: '40px',
    marginBottom: '10px',
    marginTop: '10px',
  },
  pageTitleUnderline: {
    boxSizing: 'border-box',
    height: '2px',
    width: '474px',
    minWidth: '200px',
    border: '1px solid #88B4DA',
    backgroundColor: '#F2F6FA',
    boxShadow: '-4px 8px 27px 4px rgb(27 28 28 / 9%)',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  brace: {
    flex: 1,
  },
  SummaryBox: {
    boxSizing: 'border-box',
    flexDirection: 'column',
    minWidth: '500px',
    justifyContent: 'center',
    fontFamily: 'Nunito',
    padding: '0 0 0 110px',
    flex: '1.5',
    marginBottom: '20px',
    marginTop: '10px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5px',
  },
  column: {
    '&:first-child': {
      flex: '.60',
    },
    flex: 1,
  },
  itemTitles: {
    color: '#708292',
    textTransform: 'uppercase',
    fontFamily: 'Nunito',
    fontWeight: 300,
    fontSize: '12px',
    fontStyle: 'italic',
    letterSpacing: '0',
    lineHeight: '34px',
    flex: 1,
    textAlign: 'left',
    padding: '0 0px 0 0px',
  },
  itemValue: {
    color: '#4F5D69',
    fontFamily: 'Nunito',
    fontSize: '17px',
    fontWeight: '500',
    letterSpacing: '0',
    lineHeight: '34px',
    flex: 1,
  },
  Box: {
    width: '535px',
    boxShadow: '-4px 8px 27px 4px rgba(27,28,28,0.09);',
    border: '#A9C8E3 2px solid',
    borderRadius: '10px',
    margin: '10px 0px',
    padding: '30px 10px 0px 10px !important',
    backgroundColor: '#F2F6FA',
  },
  helperMessage: {
    textAlign: 'center',
    width: '397px',
    color: '#323232',
    fontFamily: 'Nunito',
    fontSize: '14px',
    fontWeight: '300',
    letterSpacing: '0',
    lineHeight: '22px',
    margin: 'auto',
    marginTop: '25px',
  },
  createAccountMessage: {
    marginTop: '4px',
    marginBottom: '18px',
  },
  formButton: {
    height: '45px',
    color: '#FFFFFF',
    backgroundColor: '#5D53F6',
    marginTop: '23px',
    marginBottom: '50px',
    '&:disabled': {
      backgroundColor: '#A7A4F8',
      color: '#FFFFFF',
    },
    '&:hover': {
      backgroundColor: '#5D53F6',
    },
  },
  goToHomeButton: {
  },
  submitButton: {
    width: '139px',
  },
  emptySpace: {
    height: '50px',
  },

  // Page Styles
  inputSelect: {
    boxSizing: 'border-box',
    height: '37px',
    width: '359px',
  },

  inputText: {
    width: '359px',
    border: '1px solid #61A6E6',
    height: '35px',
    boxSizing: 'border-box',
    borderRadius: '5px',
    backgroundColor: '#FFFFFF',
    padding: '0px 0px 0px 15px',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  selectMenuItem: {
    paddingTop: '0px',
    paddingRight: '10px',
    paddingBottom: '0px',
  },

  // Styles for inputs
  required: {
    color: '#BC3900',
    marginLeft: '5px',
    fontFamily: 'Lato',
    fontSize: '15px',
    letterSpacing: '-100px',
    lineHeight: '22px',
  },
  formLabel: {
    height: '18px',
    color: '#0467BD',
    fontFamily: 'Lato',
    fontSize: '18px',
    fontWeight: 500,
    letterSpacing: '0',
    lineHeight: '22px',
    marginBottom: '10px',
    marginTop: '15px',
  },
  requiredFieldMessage: {
    color: '#BC3900',
    fontFamily: 'Lato',
    fontSize: '15px',
    letterSpacing: '0',
    lineHeight: '22px',
    textAlign: 'center',
  },

});

export default withStyles(styles, { withTheme: true })(requestAccessView);
