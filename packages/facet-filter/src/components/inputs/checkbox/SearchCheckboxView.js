import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import BaseCheckBoxView from './BaseCheckboxView';
import defaultStyles from './CheckboxStyle';

const CheckBoxView = (props) => (
  <BaseCheckBoxView {...props} showDivider />
);

const styles = () => {
  const defaults = defaultStyles();

  return {
    listItemGutters: (props) => ({
      ...defaults.listItemGutters,
      ...(props.facet && props.facet.style && props.facet.style.checkbox
        && props.facet.style.checkbox.listItemGutters
        ? props.facet.style.checkbox.listItemGutters
        : {}),
    }),
    checkboxRoot: (props) => ({
      ...defaults.checkboxRoot,
      ...(props.facet && props.facet.style && props.facet.style.checkbox
        && props.facet.style.checkbox.checkboxRoot
        ? props.facet.style.checkbox.checkboxRoot
        : {}),
    }),
    panelDetailText: (props) => ({
      ...defaults.panelDetailText,
      ...(props.facet && props.facet.style && props.facet.style.checkbox
        && props.facet.style.checkbox.panelDetailText
        ? props.facet.style.checkbox.panelDetailText
        : {}),
    }),
    panelSubjectText: (props) => ({
      ...defaults.panelSubjectText,
      ...(props.facet && props.facet.style && props.facet.style.checkbox
        && props.facet.style.checkbox.panelSubjectText
        ? props.facet.style.checkbox.panelSubjectText
        : {}),
    }),
    checkboxLabel: (props) => ({
      ...defaults.checkboxLabel,
      ...(props.facet && props.facet.style && props.facet.style.checkbox
        && props.facet.style.checkbox.checkboxLabel
        ? props.facet.style.checkbox.checkboxLabel
        : {}),
    }),
    checkboxName: (props) => ({
      ...defaults.checkboxName,
      ...(props.facet && props.facet.style && props.facet.style.checkbox
        && props.facet.style.checkbox.checkboxName
        ? props.facet.style.checkbox.checkboxName
        : {}),
    }),
  };
};

export default withStyles(styles)(CheckBoxView);
