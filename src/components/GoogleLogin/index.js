/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GoogleAuth extends Component {

  componentDidMount() {
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          // client_id: process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID,
          clientId: '196014713877-0d926jpdd691roubuc0kpu6r6ha9b9t5.apps.googleusercontent.com'
          // scope: "email",
        })
        .then(() => {
          // create auth variable
          this.auth = window.gapi.auth2.getAuthInstance();
          // update state so that component will re-render
          // this.onAuthChange(this.auth.isSignedIn.get());
          // listen for changes to authentication status
          // this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  // triggered when authentication status changes
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      // this.props.signIn(this.auth.currentUser.get().getId());
      console.log('I am signedin');


    } else {
      // this.props.signOut();
      console.log('I am signed out');

    }
  };

  // manually trigger GAPI auth change
  onSignInClick = () => {

    this.auth.grantOfflineAccess().then(function(resp) {
      var auth_code = resp.code;
    });
    // this.auth.signIn();
  };

  signInCallback = (authResult) => {
    if (authResult['code']) {

        // Hide the sign-in button now that the user is authorized, for example:
        $('#signinButton').attr('style', 'display: none');

        // Send the code to the server
        (async () => {
            const rawResponse = await fetch('/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({code: authResult['code']})
            });
            const content = await rawResponse.json();

            console.log(content);
        })();
    } else {
        // There was an error.
    }
}

  onSignOutClick = () => {
    this.auth.signOut();
  };
  

  // helper function
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }

  render() {
    return (
        <>{this.renderAuthButton()}</>
    );
  }
}
export default GoogleAuth;
