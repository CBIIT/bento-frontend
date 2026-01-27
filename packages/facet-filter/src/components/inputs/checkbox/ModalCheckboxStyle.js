const defaultStyles = {
  listItemGutters: {
    padding: '10px 10px 10px 0px',
    width: '33.33%',
    borderRight: '0.5px solid #000000',
    borderBottom: '0.5px solid #000000',
  },
  checkboxRoot: {
    marginLeft: '8px',
    height: 12,
  },
  panelDetailText: {
    color: '#323232',
    fontFamily: 'Nunito',
    fontSize: '14px',
    fontWeight: '200',
  },
  panelSubjectText: {
    color: '#323232',
    fontFamily: 'Nunito',
    fontSize: '14px',
    marginRight: '0px',
  },
  checkboxLabel: {
    margin: '0',
  },
  checkboxName: {
    margin: '0',
    color: '#000000',
    fontSize: '16px',
    fontWeight: 300,
    marginTop: '1.5px',
    fontFamily: 'Nunito',
    lineHeight: '120%',
  },
};

export default () => ({
  listItemGutters: (props) => ({
    ...defaultStyles.listItemGutters,
    ...(props.facet && props.facet.style && props.facet.style.modalCheckbox
      && props.facet.style.modalCheckbox.listItemGutters
      ? props.facet.style.modalCheckbox.listItemGutters
      : {}),
  }),
  checkboxRoot: (props) => ({
    ...defaultStyles.checkboxRoot,
    ...(props.facet && props.facet.style && props.facet.style.modalCheckbox
      && props.facet.style.modalCheckbox.checkboxRoot
      ? props.facet.style.modalCheckbox.checkboxRoot
      : {}),
  }),
  panelDetailText: (props) => ({
    ...defaultStyles.panelDetailText,
    ...(props.facet && props.facet.style && props.facet.style.modalCheckbox
      && props.facet.style.modalCheckbox.panelDetailText
      ? props.facet.style.modalCheckbox.panelDetailText
      : {}),
  }),
  panelSubjectText: (props) => ({
    ...defaultStyles.panelSubjectText,
    ...(props.facet && props.facet.style && props.facet.style.modalCheckbox
      && props.facet.style.modalCheckbox.panelSubjectText
      ? props.facet.style.modalCheckbox.panelSubjectText
      : {}),
  }),
  checkboxLabel: (props) => ({
    ...defaultStyles.checkboxLabel,
    ...(props.facet && props.facet.style && props.facet.style.modalCheckbox
      && props.facet.style.modalCheckbox.checkboxLabel
      ? props.facet.style.modalCheckbox.checkboxLabel
      : {}),
  }),
  checkboxName: (props) => ({
    ...defaultStyles.checkboxName,
    ...(props.facet && props.facet.style && props.facet.style.modalCheckbox
      && props.facet.style.modalCheckbox.checkboxName
      ? props.facet.style.modalCheckbox.checkboxName
      : {}),
  }),
});
