import React, { useState } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import { registrationForm, SUBMIT_REGISTER } from '../../../bento/userRegistrationData';
import { bentoHelpEmail } from '../../../bento/userLoginData';
import AlertMessage from './alertMessage';
import SelectMenu from './components/selectMenu';
import TextBox from './components/textBox';

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

function userRegistrationView({ classes }) {
  // Initial State and Reset functions
  const setDefaultValues = () => registrationForm.reduce((values, field) => {
    const { id, type, multiple } = field;
    if (!values[id]) {
      // eslint-disable-next-line no-param-reassign
      values[id] = (type === 'dropdown' && multiple) ? [] : '';
    }
    return values;
  }, {});

  // Init state for inputs.
  const [formValues, setFormValues] = useState(setDefaultValues());

  const clearAll = () => {
    setFormValues(setDefaultValues());
  };

  // GraphQL Operations
  const [mutate, response] = useMutation(SUBMIT_REGISTER, {
    context: { clientName: 'authService' },
    onCompleted() {
      // INPUT parm can be 'responseData'
      clearAll();
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

    return statusCode === 409 ? 'The provided email and IDP combination is already registered' : 'Server Error';
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
        <AlertMessage severity="success">
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
    const user = formValues;
    mutate({ variables: { user } });
  };

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
          {successData && successData.registerUser && showAlert('success')}

        </Grid>

        {/* ROW 2 */}
        <Grid container item justifyContent="center">
          <Grid container>
            {/* Spacing */}
            <Grid container item sm={4} />

            {/* Box Grid */}
            <Grid container item sm={4} justifyContent="center">
              <div className={classes.pageTitle}>
                User Registration
              </div>

              {/* Box Grid */}
              <div className={classes.Box}>
                <Grid container alignItems="center" justify="center" direction="column">
                  <form onSubmit={handleSubmit}>
                    {registrationForm.map((field) => (
                      field.type === 'dropdown'
                        ? SelectMenu(field, formValues, handleInputChange, classes)
                        : field.type
                          ? TextBox(field, formValues, handleInputChange, classes)
                          : null))}
                    <Grid item sm={12} style={{ textAlign: 'center' }} justifyContent="center">
                      <Button
                        variant="contained"
                        type="submit"
                        className={classes.submitButtton}
                        endIcon={loading ? <CircularProgress color="secondary" size={20} /> : null}
                      >
                        Submit
                      </Button>
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
    fontSize: '30px',
    textAlign: 'center',
    fontFamily: 'Nunito',
    fontWeight: '500',
    lineHeight: '40px',
    marginBottom: '10px',
    marginTop: '10px',
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

  formLabel: {
    height: '18px',
    color: '#0467BD',
    fontFamily: '"Nunito"',
    fontSize: '18px',
    fontWeight: 'bold',
    letterSpacing: '0',
    lineHeight: '22px',
    marginBottom: '10px',
    marginTop: '10px',
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

});

export default withStyles(styles, { withTheme: true })(userRegistrationView);
