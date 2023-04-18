import defaultNotification from "../data/defaultNotification";

const generateNotification= (customNotification = {}) => {
  const notification = { ...defaultNotification };

  if (customNotification.error) {
    notification.error = { ...notification.error, ...customNotification.error };
  }

  if (customNotification.success) {
    notification.success= { ...notification.success, ...customNotification.success };
  }
  if (customNotification.noAclToRequest) {
    notification.noAclToRequest = { ...notification.noAclToRequest, ...customNotification.noAclToRequest };
  }

  if (customNotification.noAccess) {
    notification.noAccess= { ...notification.noAccess, ...customNotification.noAccess };
  }

  if (customNotification.disabled) {
    notification.disabled = { ...notification.disabled, ...customNotification.disabled };
  }

  return notification;
};

export default generateNotification;
