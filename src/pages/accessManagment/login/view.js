import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Grid, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { useAuth } from '../../../components/Auth/AuthProvider';
import AlertMessage from '../../../components/alertMessage/AlertMessageView';
import Stats from '../../../components/Stats/AllStatsController';

// Custodian data imports
import {
  loginProvidersData,
} from '../../../bento/userLoginData';
import globalData from '../../../bento/siteWideConfig';
import { redirect } from '../../../components/Layout/privateRoute';

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
  const { authProviders } = globalData;
  const history = useHistory();
  const query = useQuery();
  const internalRedirectPath = getRedirectPath(query);
  const [error, setError] = React.useState('');

  const onSuccess = () => redirect(history, internalRedirectPath);
  const onError = () => {};

  const defaultIdP = {
    google: {
      key: 'google',
      icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/png/google.png',
      loginButtonText: 'Sign in with Google',
    },
  };

  function filterObject(obj, callback) {
    return Object.fromEntries(Object.entries(obj).filter(([key]) => callback(key)));
  }

  let idps = filterObject(loginProvidersData, (key) => authProviders.includes(key));

  if (typeof (idps) === 'undefined' || Object.values(idps).length === 0) {
    idps = defaultIdP;
  }

  const showAlert = (alertType, errorMsg = '') => {
    const key = Math.random();
    if (alertType === 'error') {
      setError(
        <AlertMessage key={key} severity="error" borderColor="#f44336" backgroundColor="#f44336" timeout={5000}>
          {errorMsg}
        </AlertMessage>,
      );
    }

    if (alertType === 'redirect') {
      setError(
        <AlertMessage key={key} severity="error" timeout={5000}>
          Please login to access protected data
        </AlertMessage>,
      );
    }

    return null;
  };

  const signInCall = (provider) => {
    if (provider) {
      switch (provider.key) {
        case 'google':
          signInWithGoogle(onSuccess, onError);
          break;
        case 'nih':
          signInWithNIH({ internalRedirectPath });
          break;
        case 'loginGov':
          signInWithNIH({ internalRedirectPath });
          break;
        default:
          showAlert('error', `The selected Identity Provider, ${provider.key}, is not currently supported. Please contact bento-help@nih.gov for more information.`);
      }
    }
  };

  useEffect(() => {
    if (internalRedirectPath !== '/') {
      showAlert('redirect');
    }
  }, []);

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
          {error}
        </Grid>

        {/* ROW 2 */}
        <Grid container item justifyContent="center">
          <Grid container spacing={1}>
            {/* Spacing */}
            <Grid container item sm={4} />

            <Grid container item sm={4} justifyContent="center">
              {/* Page Title */}
              {/* <Grid
                container
                xs={12}
                alignItems="center"
                justify="center"
                direction="column"
                className={classes.pageTitle}
              >
                {pageTitle}
              </Grid> */}

              {/* Login Box */}
              <Grid container xs={12} alignItems="center" justify="center" direction="column" className={classes.Box}>
                <Grid container item justifyContent="center" className={classes.LoginBoxTitle}>
                  Log in with either of these Identity providers:
                </Grid>
                <Grid container item justifyContent="center" className={classes.LoginButtonGroup}>
                  {Object.values(idps).map((provider) => (
                    <Grid container item xs={12} justifyContent="center">
                      <Button
                        variant="outlined"
                        className={[classes.LoginButton, classes.Color_092E50]}
                        disableRipple
                        onClick={() => signInCall(provider)}
                      >
                        <Grid container item xs={1} justifyContent="center">
                          {provider.icon
                            ? <img src={provider.icon} className={classes.root} alt="alt coming" />
                            : <VpnKeyIcon />}

                        </Grid>
                        <Grid container item xs={11} justifyContent="center">
                          {provider.loginButtonText}
                        </Grid>
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
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
    fontWeight: 600,
  },
  LoginButtonGroup: {

  },
  LoginButton: {
    width: '257px',
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
    height: '50px',
  },
  Color_092E50: {
    color: '#092E50 !important',
  },
});

export default withStyles(styles, { withTheme: true })(loginView);
