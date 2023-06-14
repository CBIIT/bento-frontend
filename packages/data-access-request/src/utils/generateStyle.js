import dataAccessRequestStyle from '../dataAccessRequestStyle';

const generateStyle = (customStyle = {}) => {
  const style = { ...dataAccessRequestStyle };

  if (customStyle.Container) {
    style.Container = { ...style.Container, ...customStyle.Container };
  }

  if (customStyle.pageTitle) {
    style.pageTitle = { ...style.pageTitle, ...customStyle.pageTitle };
  }

  if (customStyle.pageTitleUnderline) {
    style.pageTitleUnderline = { ...style.pageTitleUnderline, ...customStyle.pageTitleUnderline };
  }

  if (customStyle.container) {
    style.container = { ...style.container, ...customStyle.container };
  }

  if (customStyle.brace) {
    style.brace = { ...style.brace, ...customStyle.brace };
  }

  if (customStyle.SummaryBox) {
    style.SummaryBox = { ...style.SummaryBox, ...customStyle.SummaryBox };
  }

  if (customStyle.row) {
    style.row = { ...style.row, ...customStyle.row };
  }

  if (customStyle.column) {
    style.column = { ...style.column, ...customStyle.column };
  }

  if (customStyle.itemTitles) {
    style.itemTitles = { ...style.itemTitles, ...customStyle.itemTitles };
  }

  if (customStyle.itemValue) {
    style.itemValue = { ...style.itemValue, ...customStyle.itemValue };
  }

  if (customStyle.Box) {
    style.Box = { ...style.Box, ...customStyle.Box };
  }

  if (customStyle.helperMessage) {
    style.helperMessage = { ...style.helperMessage, ...customStyle.helperMessage };
  }

  if (customStyle.createAccountMessage) {
    style.createAccountMessage = {
      ...style.createAccountMessage,
      ...customStyle.createAccountMessage,
    };
  }

  if (customStyle.formButton) {
    style.formButton = { ...style.formButton, ...customStyle.formButton };
  }

  if (customStyle.goToHomeButton) {
    style.goToHomeButton = { ...style.goToHomeButton, ...customStyle.goToHomeButton };
  }

  if (customStyle.submitButton) {
    style.submitButton = { ...style.submitButton, ...customStyle.submitButton };
  }

  if (customStyle.emptySpace) {
    style.emptySpace = { ...style.emptySpace, ...customStyle.emptySpace };
  }

  if (customStyle.inputSelect) {
    style.inputSelect = { ...style.inputSelect, ...customStyle.inputSelect };
  }

  if (customStyle.inputText) {
    style.inputText = { ...style.inputText, ...customStyle.inputText };
  }

  if (customStyle.chips) {
    style.chips = { ...style.chips, ...customStyle.chips };
  }

  if (customStyle.chip) {
    style.chip = { ...style.chip, ...customStyle.chip };
  }

  if (customStyle.selectMenuItem) {
    style.selectMenuItem = { ...style.selectMenuItem, ...customStyle.selectMenuItem };
  }

  if (customStyle.required) {
    style.required = { ...style.required, ...customStyle.required };
  }

  if (customStyle.formLabel) {
    style.formLabel = { ...style.formLabel, ...customStyle.formLabel };
  }

  if (customStyle.requiredFieldMessage) {
    style.requiredFieldMessage = {
      ...style.requiredFieldMessage,
      ...customStyle.requiredFieldMessage,
    };
  }

  return style;
};

export default generateStyle;
