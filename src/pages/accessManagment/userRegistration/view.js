/* eslint-disable jsx-quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { useQuery, useMutation } from '@apollo/client';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { registrationForm, SUBMIT_REGISTER } from '../../../bento/userRegistrationData';
import { bentoHelpEmail } from '../../../bento/userLoginData';
import BootstrapInput from './bootstrapInput';
import AlertMessage from './alertMessage';

const getDropdownComponent = (field, formValues, handleInputChange, classes) => {
  const {
    id, options, multiple, required,
  } = field;
  const selectOptions = options; // Add API Call
  console.log(formValues);

  return (
    <Grid item>
      <FormControl>
        <div className={classes.formLabel}>{field.label}</div>
        <Select
          id="demo-customized-select-native"
          multiple={multiple}
          name={id}
          displayEmpty
          value={formValues[id]}
          required={required}
          onChange={handleInputChange}
          input={<BootstrapInput />}
          className={classes.inputSelect}
          renderValue={(selectedKey) => (
            (selectedKey.length === 0) ? field.label
              : multiple
                ? (
                  <div className={classes.chips}>
                    {selectedKey.map((value) => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                  </div>
                ) : selectOptions[selectedKey].title
          )}
        >
          {Object.keys(selectOptions).map((key) => (
            <MenuItem key={key} value={key}>
              <Checkbox checked={formValues[id].indexOf(key) > -1} />
              <ListItemText primary={selectOptions[key].title} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

const getTextBoxComponent = (field, formValues, handleInputChange, classes) => {
  const { id, type, required } = field;

  return (
    <Grid item>
      <div className={classes.formLabel}>{field.label}</div>
      <TextField
        id="name-input"
        name={id}
        placeholder={field.placeHolder}
        type={type}
        required={required}
        variant="outlined"
        value={formValues[id]}
        onChange={handleInputChange}
        InputProps={{ classes: { input: classes.inputText } }}
      />
    </Grid>
  );
};

// eslint-disable-next-line no-unused-vars
function userRegistrationView({ data, classes }) {
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
    onCompleted(responseData) {
      console.log(responseData);
      clearAll();
    },
    onError(ApolloError) {
      console.log(ApolloError.networkError);
    },
  });
  const { loading, error, data: successData } = response;

  const getErrorDetails = (errorObject) => {
    const {
      networkError: {
        statusCode,
      },
    } = errorObject;

    return statusCode === 409 ? 'The provided email and IDP combination is already registered' : 'Server Erro';
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
        <Grid container item justifyContent="center" className={classes.emptySpace} />

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

              {/* ######## ALERT MESSAGES ######## */}
              {/* Error on Submit */}
              {error ? (
                <Alert severity="error">
                  {getErrorDetails(error)}
                </Alert>
              ) : null}

              {/* Success on Submit */}
              {successData && successData.registerUser && (
              <AlertMessage severity="success" timeout={50000}>
                <AlertTitle>Congratulatons, Sign Up request is submitted!</AlertTitle>
                You will recive an email one request is approved.
              </AlertMessage>
              )}

              {/* Box Grid */}
              <div className={classes.Box}>
                <Grid container alignItems="center" justify="center" direction="column">
                  <form onSubmit={handleSubmit}>
                    {registrationForm.map((field) => (
                      field.type === 'dropdown'
                        ? getDropdownComponent(field, formValues, handleInputChange, classes)
                        : field.type ? getTextBoxComponent(field, formValues, handleInputChange, classes)
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
});

export default withStyles(styles, { withTheme: true })(userRegistrationView);
