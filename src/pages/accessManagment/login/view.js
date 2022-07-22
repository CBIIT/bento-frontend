import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Grid, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useAuth } from '../../../components/Auth/AuthProvider';
import AlertMessage from '../../../components/alertMessage';

// Custodian data imports
import {
  pageTitle,
  loginProvidersData,
} from '../../../bento/userLoginData';
import { afterLoginRedirect } from '../../../components/Layout/privateRoute';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function getRedirectPath(query) {
  const path = query.get('redirect') || '/';
  return path;
}

function loginView({ classes }) {
  const { signInWithGoogle, signInWithNIH } = useAuth();
  const history = useHistory();
  const query = useQuery();
  const internalRedirectPath = getRedirectPath(query);

  const onSuccess = () => afterLoginRedirect(history, internalRedirectPath);
  const onError = () => {};

  const signInCall = (provider) => {
    // if(!provider.enabled) callAlert();
    if (provider) {
      if (provider.key === 'google') signInWithGoogle(onSuccess, onError);
      if (provider.key === 'NIH') signInWithNIH({ internalRedirectPath });
      if (provider.key === 'loginGov') signInWithNIH({ internalRedirectPath });
    }
  };

  const showAlert = (alertType) => {
    if (alertType === 'error') {
      return (
        <AlertMessage severity="error" borderColor="#f44336" backgroundColor="#f44336" timeout={5000000}>
          {/* {getErrorDetails()} */}
          Sample
        </AlertMessage>
      );
    }

    if (alertType === 'redirect') {
      return (
        <AlertMessage severity="error" timeout={5000}>
          Please sign in to access
          {' '}
          {internalRedirectPath}
        </AlertMessage>
      );
    }

    return null;
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
          {/* TODO: Add error for whitelisted users */}
          {/* {showAlert('error')} */}
          {internalRedirectPath !== '/' && showAlert('redirect')}
        </Grid>

        {/* ROW 2 */}
        <Grid container item justifyContent="center">
          <Grid container spacing={1}>
            {/* Spacing */}
            <Grid container item sm={4} />

            <Grid container item sm={4} justifyContent="center">
              {/* Page Title */}
              <div className={classes.pageTitle}>
                {pageTitle}
              </div>

              {/* Login Box */}
              <div className={classes.Box}>
                <Grid container alignItems="center" justify="center" direction="column">
                  <div className={classes.LoginBoxTitle}>
                    Log in with either of these Identity providers:
                  </div>
                  <Grid container item xs={12} justifyContent="center" className={classes.LoginButtonGroup}>

                    {Object.values(loginProvidersData).map((provider) => (provider.enabled
                      ? (
                        <Grid container item xs={12} justifyContent="center">
                          <Button
                            variant="outlined"
                            className={[classes.LoginButton, classes.Color_092E50]}
                            disableRipple
                            onClick={() => signInCall(provider)}
                          >
                            <Grid container item xs={1} justifyContent="center">
                              <img src={provider.icon} className={classes.root} alt="alt coming" />
                            </Grid>
                            <Grid container item xs={11} justifyContent="center">
                              {provider.loginButtonText}
                            </Grid>
                          </Button>
                        </Grid>
                      )
                      : null))}
                  </Grid>
                </Grid>
              </div>
            </Grid>

            {/* Spacing */}
            <Grid container item sm={4} />
          </Grid>
        </Grid>
      </Grid>

      {/* Bottom Space */}
      <Grid container item justifyContent="center" className={[classes.emptySpace, classes.extraSpaceInBorrom]} />

    </div>
  );
}

const styles = () => ({
  Container: {
    backgroundColor: '#FFFFFF',
    marginTop: '-47px',
    fontFamily: 'Nunito',
  },
  NoBold: {
    fontWeight: 'normal',
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
    boxShadow: '-4px 8px 27px 4px rgba(27,28,28,0.09);',
    border: '#A9C8E3 2px solid',
    borderRadius: '10px',
    margin: '10px 0px',
    padding: '5px !important',
    backgroundColor: '#F2F6FA',
  },
  LoginBoxTitle: {
    height: '16px',
    width: '350px',
    color: '#092E50',
    fontSize: '16px',
    letterSpacing: '0',
    lineHeight: '22px',
    textAlign: 'center',
    marginTop: '35px',
    marginBottom: '25px',
  },
  LoginButtonGroup: {

  },
  LoginButton: {
    width: '350px',
    height: '35px',
    background: '#FFFFFF',
    boxShadow: 'none',
    border: '1px #B1B1B1 solid',
    marginBottom: '14px',
    justifyContent: 'left',
    textTransform: 'none',
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
  },
  createAccountMessage: {
    marginTop: '4px',
    marginBottom: '18px',
  },
  RegisterBox: {
    justifyContent: 'center',
    paddingLeft: '50px !important',
    paddingRight: '50px !important',
  },
  RegisterBoxTitle: {
    height: '16px',
    width: '271px',
    color: '#092E50',
    fontFamily: 'Nunito',
    fontSize: '16px',
    letterSpacing: '0',
    lineHeight: '22px',
    textAlign: 'center',
    marginTop: '35px',
    marginBottom: '25px',
  },
  registerButtton: {
    height: '40px',
    color: '#FFFFFF',
    backgroundColor: '#5D53F6',
    '&:hover': {
      backgroundColor: '#5D53F6',
    },
  },
  registerHelpMessage: {
    marginTop: '18px',
    marginBottom: '18px',
  },
  supportEmail: {
    display: 'inline !important',
    fontWeight: 'bold',
  },
  emptySpace: {
    height: '50px',
  },
  extraSpaceInBorrom: {
    height: '150px',
  },
  Color_092E50: {
    color: '#092E50 !important',
  },
});

export default withStyles(styles, { withTheme: true })(loginView);
