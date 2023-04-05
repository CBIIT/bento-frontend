import React from 'react';
import UserRegistrationView from './view';

function userRegistrationController(props) {
  return (
    <div>
      <UserRegistrationView {...props} />
    </div>
  );
}

export default userRegistrationController;
