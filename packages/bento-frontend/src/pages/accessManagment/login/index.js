import React from 'react';
import Login from '../../../bento-core/Authentication/Login';

function loginController(props) {
  return (
    <div>
      <Login {...props} />
    </div>
  );
}

export default loginController;
