import React from 'react';
import { useHistory } from 'react-router';
import { SessionTimeoutGenerator } from '@bento-core/session-timeout';
import { useAuth } from '@bento-core/authentication';
import env from '../../utils/env';
import {
  PING_INTERVAL,
  REDIRECT_AFTER_SIGN_OUT,
  SHOW_WARNING_BEFORE,
} from '../../bento/siteWideConfig';
import { useGlobal } from '../Global/GlobalProvider';

const {
  REACT_APP_AUTH_SERVICE_API,
} = env;

const { SessionTimeout } = SessionTimeoutGenerator({
  config: {
    pingInterval: PING_INTERVAL,
    thresholdTime: SHOW_WARNING_BEFORE,
    extendEndpoint: `${REACT_APP_AUTH_SERVICE_API}authenticated`,
    ttlEndpoint: `${REACT_APP_AUTH_SERVICE_API}session-ttl`,
  },
});

/**
 * Provides the SessionTimeout component with the required props
 * for default Bento implementations
 *
 * @returns {JSX.Element}
 */
export default () => {
  const history = useHistory();
  const { signOut } = useAuth();
  const onSignOut = () => signOut(history, REDIRECT_AFTER_SIGN_OUT);

  const { Notification } = useGlobal();
  const onShowNotification = (content, duration) => Notification.show(content, duration);

  return (
    <SessionTimeout
      signOut={onSignOut}
      showNotification={onShowNotification}
    />
  );
};
