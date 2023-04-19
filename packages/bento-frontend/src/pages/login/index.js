import React from 'react';
import { LoginGenerator } from '@bento-core/authentication';
import { withStyles } from '@material-ui/core';
import { enabledAuthProviders } from '../../bento/siteWideConfig';
import { loginProvidersData } from '../../bento/loginData';
import AlertMessage from '../../bento-core/AlertMessage';
import Stats from '../../components/Stats/AllStatsController';


function loginController(props) {
  const { classes } = props;
  const componentProp = { 
    enabledAuthProviders,
    authenticationProviders: loginProvidersData,
    AlertMessage,
    };
    
  const { Login } = LoginGenerator();
  
  return (
    <div className={classes.Container}>
      <Stats />
       <Login {...componentProp} />
    </div>
  );
}

const styles = () => ({
  Container: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Nunito',
  },
});

export default withStyles(styles, { withTheme: true })(loginController);
