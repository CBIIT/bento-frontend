import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import generateStyle from './utils/generateStyle';
import { useAuth } from '../../components/Auth/AuthProvider';
import AlertMessage from '../AlertMessage/AlertMessageView';
import Stats from '../../components/Stats/AllStatsController';
import useQuery from './hooks/useQuery';
import getRedirectPath from './utils/getRedirectPath';
import getIdps from './utils/getIdps';
import { redirect } from '../../components/Layout/privateRoute';

/* Login componenent */
function Login({
  styles,
  authenticationProviders,
  onSuccess,
  onError
}) {
  /* styles */
  const generatedStyle = generateStyle(styles);
  const useStyles = makeStyles(generatedStyle);
  const classes = useStyles();

  /* states */
  const [error, setError] = useState('');

  /* hooks */
  const { signInWithGoogle, signInWithNIH } = useAuth();
  const history = useHistory();
  const query = useQuery();

  /* variables */
  const internalRedirectPath = getRedirectPath(query);
  const idps = getIdps(authenticationProviders);

  /* event handlers */
  const onSuccessDefault = () => redirect(history, internalRedirectPath);
  const onErrorDefault = () => {};
  const onSuccessHandler = onSuccess?onSuccess:onSuccessDefault;
  const onErrorHandler = onError?onError:onErrorDefault;

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
          signInWithGoogle(onSuccessHandler, onErrorHandler);
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

  /* useEffect hooks */
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

export default Login;
