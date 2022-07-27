import React, { useState } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import { bentoHelpEmail } from '../../bento/userLoginData';
import AlertMessage from '../../components/alertMessage';
import SelectMenu from './components/selectMenu';
import TextBox from './components/textBox';

// Custodian data imports
import { pageTitle, formFields, SUBMIT_REQUEST_ACCESS } from '../../bento/requestAccessData';

// eslint-disable-next-line no-unused-vars
const checkIsValid = (field, formValues) => {
  const { type, id } = field;
  const value = formValues[id];

  if (type === 'email') {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
  }

  if (value !== '') {
    return true;
  }
  return false;
};

const unavailableArmsStatus = ['approved', 'requested'];

const getAvailableArms = (currentACL, listOfArms) => {
  const unavailableArms = Object.keys(currentACL).reduce((previousArms, key) => {
    const armObject = currentACL[key];
    const resultArray = previousArms;
    if (unavailableArmsStatus.includes(armObject.accessStatus)) resultArray.push(armObject.armID);
    return resultArray;
  }, []);
  const availableArms = listOfArms.filter((arm) => !unavailableArms.includes(arm.id));
  return availableArms;
};

function requestAccessView({ data, classes }) {
  const { getMyUser, listArms } = data;
  const { email: userEmail, IDP, userStatus } = getMyUser;
  const history = useHistory();

  const availableArms = getAvailableArms(getMyUser.acl, listArms);

  // Initial State and Reset functions
  const setDefaultValues = () => formFields.reduce((values, field) => {
    const { id, type, multiple } = field;
    if (!values[id]) {
      // eslint-disable-next-line no-param-reassign
      values[id] = (type === 'dropdown' && multiple) ? [] : getMyUser[id] || '';
    }
    return values;
  }, {});

  // Init state for inputs.
  const [formValues, setFormValues] = useState(setDefaultValues());
  const [isFormSubmitted, setSubmitted] = useState(false);

  // const clearAll = () => {
  //   setFormValues(setDefaultValues());
  // };

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
    if (alertType === 'error') {
      return (
        <AlertMessage severity="error" backgroundColor="#f44336">
          {getErrorDetails()}
        </AlertMessage>
      );
    }

    if (alertType === 'success') {
      return (
        <AlertMessage severity="success" timeout={5000000}>
          Your registration request has been submitted for review.
        </AlertMessage>
      );
    }

    return null;
  };

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
          {/* ######## ALERT MESSAGES ######## */}
          {/* Error on Submit */}
          {error && (showAlert('error'))}

          {/* Success on Submit */}
          {successData && successData.requestAccess && showAlert('success')}

        </Grid>

        {/* ROW 2 */}
        <Grid container item justifyContent="center">
          <Grid container>
            {/* Spacing */}
            <Grid container item sm={4} />

            <Grid container item sm={4} justifyContent="center">
              {/* Page Title */}
              <Grid container item xs={12} justifyContent="center">
                <div className={classes.pageTitle}>
                  {pageTitle}
                  <hr className={classes.pageTitleUnderline} />
                </div>
              </Grid>

              {/* User's Email Address */}
              <Grid container item xs={12} justifyContent="center">
                <div className={classes.emailAddress}>
                  Email Address:
                  <span className={classes.emailAddressValue}>
                    {' '}
                    {userEmail}
                    {' '}
                  </span>
                </div>
              </Grid>

              {/* User's Account type */}
              <Grid container item xs={12} justifyContent="center">
                <div className={classes.emailAddress}>
                  Account Type:
                  <span className={classes.emailAddressValue}>
                    {' '}
                    {IDP}
                    {' '}
                  </span>
                </div>
              </Grid>

              {/* User's Membership Status */}
              <Grid container item xs={12} justifyContent="center">
                <div className={classes.emailAddress}>
                  Membership Status:
                  <span className={classes.emailAddressValue}>
                    {' '}
                    {userStatus}
                    {' '}
                  </span>
                </div>
              </Grid>

              {/* Box Grid */}
              <div className={classes.Box}>
                <Grid container alignItems="center" justify="center" direction="column">
                  <form onSubmit={handleSubmit}>
                    {formFields.map((field) => (
                      field.type === 'dropdown'
                        ? SelectMenu(field, formValues, handleInputChange,
                          data, classes, availableArms, isFormSubmitted)
                        : field.type
                          ? TextBox(field, formValues, handleInputChange, classes, isFormSubmitted)
                          : null))}
                    <Grid item sm={12} style={{ textAlign: 'center' }} justifyContent="center">
                      {isFormSubmitted ? (
                        <Button
                          variant="contained"
                          className={classes.submitButtton}
                          endIcon={loading ? <CircularProgress color="secondary" size={20} /> : null}
                          onClick={() => redirectUser('/')}
                        >
                          Home
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          type="submit"
                          className={classes.submitButtton}
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
            <Grid container item sm={4} />
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
    marginTop: '-47px',
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
    width: '434px',
    border: '1px solid #88B4DA',
    backgroundColor: '#F2F6FA',
    boxShadow: '-4px 8px 27px 4px rgb(27 28 28 / 9%)',
  },
  emailAddress: {
    color: '#0467BD',
    fontFamily: 'Nunito',
    fontSize: '18px',
    fontWeight: 'bold',
    lineHeight: '22px',
    marginBottom: '15px',
  },
  emailAddressValue: {
    color: '#8493A0',
    fontFamily: 'Nunito',
    fontSize: '16px',
    fontStyle: 'italic',
    fontWeight: '600',
    lineHeight: '35px',
  },
  Box: {
    width: '535px',
    boxShadow: '-4px 8px 27px 4px rgba(27,28,28,0.09);',
    border: '#A9C8E3 2px solid',
    borderRadius: '10px',
    margin: '10px 0px',
    padding: '20px 5px 5px 5px !important',
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
  submitButtton: {
    height: '40px',
    color: '#FFFFFF',
    backgroundColor: '#5D53F6',
    marginTop: '33px',
    marginBottom: '50px',
    '&:hover': {
      backgroundColor: '#5D53F6',
    },
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
    fontFamily: 'Nunito',
    fontSize: '18px',
    fontWeight: 'bold',
    letterSpacing: '0',
    lineHeight: '22px',
    marginBottom: '10px',
    marginTop: '10px',
  },

});

export default withStyles(styles, { withTheme: true })(requestAccessView);

/* TODO:
1. Dropdown is not generalized.
2. After Submit it's not clreaing and referashing updated arms.
3. Need reset button.
*/
