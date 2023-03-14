import React from 'react';
import LoginView from './view';

function loginController(props) {
  return (
    <div>
      <LoginView {...props} />
    </div>
  );
}

export default loginController;
