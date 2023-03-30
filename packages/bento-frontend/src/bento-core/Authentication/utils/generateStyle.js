import loginStyle from '../loginStyle';

const generateStyle = (customStyle = {}) => {
  const style = { ...loginStyle };

  if (customStyle.Container) {
    style.Container = { ...style.Container, ...customStyle.Container };
  }

  if (customStyle.NoBold) {
    style.NoBold = { ...style.NoBold, ...customStyle.NoBold };
  }

  if (customStyle.pageTitle) {
    style.pageTitle = { ...style.pageTitle, ...customStyle.pageTitle };
  }

  if (customStyle.Box) {
    style.Box = { ...style.Box, ...customStyle.Box };
  }

  if (customStyle.LoginButtonGroup) {
    style.LoginButtonGroup = { ...style.LoginButtonGroup, ...customStyle.LoginButtonGroup };
  }

  if (customStyle.LoginBoxTitle) {
    style.LoginBoxTitle = { ...style.LoginBoxTitle, ...customStyle.LoginBoxTitle };
  }

  if (customStyle.helperMessage) {
    style.LoginButton = { ...style.LoginButton, ...customStyle.LoginButton };
  }

  if (customStyle.createAccountMessage) {
    style.createAccountMessage = { ...style.createAccountMessage, ...customStyle.createAccountMessage };
  }

  if (customStyle.RegisterBox) {
    style.RegisterBox = { ...style.RegisterBox, ...customStyle.RegisterBox };
  }

  if (customStyle.RegisterBoxTitle) {
    style.RegisterBoxTitle = { ...style.RegisterBoxTitle, ...customStyle.RegisterBoxTitle };
  }

  if (customStyle.registerButtton) {
    style.registerButtton = { ...style.registerButtton, ...customStyle.registerButtton };
  }

  if (customStyle.registerHelpMessage) {
    style.registerHelpMessage = { ...style.registerHelpMessage, ...customStyle.registerHelpMessage };
  }

  if (customStyle.supportEmail) {
    style.supportEmail = { ...style.supportEmail, ...customStyle.supportEmail };
  }

  if (customStyle.emptySpace) {
    style.emptySpace = { ...style.emptySpace, ...customStyle.emptySpace };
  }

  if (customStyle.Color_092E50) {
    style.Color_092E50 = { ...style.Color_092E50, ...customStyle.Color_092E50 };
  }

  return style;
};

export default generateStyle;
