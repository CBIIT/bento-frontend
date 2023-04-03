import React from 'react';
import Stats from '../../../components/Stats/AllStatsController';
import Login from '@bento-core/authentication'

function loginController(props) {
  return (
    <div>
      <Stats />
      <Login {...props} />
    </div>
  );
}

export default loginController;
