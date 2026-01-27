import SearchIcon from './assets/Search_Icon.svg';

const defaultStyles = {
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '55px',
  },
  closeButton: {
    marginLeft: '769px',
    position: 'absolute',
  },
  resetIcon: {
    marginLeft: '10px',
    minWidth: '5px',
    width: '5px',
    borderRadius: '9px',
    height: '30px',
  },
  modalTitle: {
    fontFamily: 'Poppins',
    fontSize: '19px',
    fontWeight: '400',
    lineHeight: '21px',
    letterSpacing: '0.02em',
    textAlign: 'center',
    color: '#000000',
  },
  modalBody: {
    position: 'absolute',
    top: '5%',
    left: '25%',
    width: '836px',
    height: '671px',
    background: '#FFFFFF',
    border: '1px solid #505050',
    borderRadius: '40px',
    overflow: 'hidden',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTop: '3px solid #939393',
    borderBottom: '3px solid #939393',
    height: '51px',
  },
  searchInputbox: {
    marginRight: '10px',
    fontFamily: 'Poppins',
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '27px',
    letterSpacing: '-0.02em',
    textAlign: 'left',
    color: '#7A437A',
  },
  searchBox: {
    fontSize: '12px',
    fontWeight: '400',
    fontFamily: 'Nunito',
    width: '437px',
    height: '28px',
    marginTop: '5px',
    marginBottom: '5px',
    borderRadius: '8px',
    background: `url(${SearchIcon}) right 5px center no-repeat`,
    border: '1.5px solid #646464',
  },
  highlight: {
    color: '#b2c6d6',
  },
  sortGroup: {
    paddingTop: '10px',
    marginBottom: '5px',
    borderTop: '1px solid #B1B1B1',
    textAlign: 'left',
    marginLeft: '-4px',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    gap: '8px',
  },
  sortGroupIcon: {
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '10px',
    marginRight: '12px',
    marginLeft: '24px',
  },
  sortGroupItem: {
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '10px',
    marginRight: '32px',
  },
  NonSortGroup: {
    marginBottom: '5px',
    borderTop: '1px solid #B1B1B1',
    textAlign: 'left',
    paddingLeft: '10px',
  },
  NonSortGroupItem: {
    fontFamily: 'Nunito',
    fontSize: '10px',
    marginRight: '32px',
  },
  sortGroupItemCounts: {
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '10px',
    marginRight: '19px',
    marginLeft: 'auto',
  },
  itemContainer: {
  },
};

export default () => ({
  header: (props) => ({
    ...defaultStyles.header,
    ...(props.facet && props.facet.style && props.facet.style.modal
      && props.facet.style.modal.header
      ? props.facet.style.modal.header
      : {}),
  }),
  closeButton: (props) => ({
    ...defaultStyles.closeButton,
    ...(props.facet && props.facet.style && props.facet.style.modal
      && props.facet.style.modal.closeButton
      ? props.facet.style.modal.closeButton
      : {}),
  }),
  resetIcon: (props) => ({
    ...defaultStyles.resetIcon,
    ...(props.facet && props.facet.style && props.facet.style.modal
      && props.facet.style.modal.resetIcon
      ? props.facet.style.modal.resetIcon
      : {}),
  }),
  modalTitle: (props) => ({
    ...defaultStyles.modalTitle,
    ...(props.facet && props.facet.style && props.facet.style.modal
      && props.facet.style.modal.modalTitle
      ? props.facet.style.modal.modalTitle
      : {}),
  }),
  modalBody: (props) => ({
    ...defaultStyles.modalBody,
    ...(props.facet && props.facet.style && props.facet.style.modal
      && props.facet.style.modal.modalBody
      ? props.facet.style.modal.modalBody
      : {}),
  }),
  searchContainer: (props) => ({
    ...defaultStyles.searchContainer,
    ...(props.facet && props.facet.style && props.facet.style.modal
      && props.facet.style.modal.searchContainer
      ? props.facet.style.modal.searchContainer
      : {}),
  }),
  searchInputbox: (props) => ({
    ...defaultStyles.searchInputbox,
    ...(props.facet && props.facet.style && props.facet.style.modal
      && props.facet.style.modal.searchInputbox
      ? props.facet.style.modal.searchInputbox
      : {}),
  }),
  searchBox: (props) => ({
    ...defaultStyles.searchBox,
    ...(props.facet && props.facet.style && props.facet.style.modal
      && props.facet.style.modal.searchBox
      ? props.facet.style.modal.searchBox
      : {}),
  }),
  highlight: (props) => ({
    ...defaultStyles.highlight,
    ...(props.facet && props.facet.style && props.facet.style.modal
      && props.facet.style.modal.highlight
      ? props.facet.style.modal.highlight
      : {}),
  }),
  sortGroup: (props) => ({
    ...defaultStyles.sortGroup,
    ...(props.facet && props.facet.style && props.facet.style.modal
      && props.facet.style.modal.sortGroup
      ? props.facet.style.modal.sortGroup
      : {}),
  }),
  sortGroupIcon: (props) => ({
    ...defaultStyles.sortGroupIcon,
    ...(props.facet && props.facet.style && props.facet.style.modal
      && props.facet.style.modal.sortGroupIcon
      ? props.facet.style.modal.sortGroupIcon
      : {}),
  }),
  sortGroupItem: (props) => ({
    ...defaultStyles.sortGroupItem,
    ...(props.facet && props.facet.style && props.facet.style.modal
      && props.facet.style.modal.sortGroupItem
      ? props.facet.style.modal.sortGroupItem
      : {}),
  }),
  NonSortGroup: (props) => ({
    ...defaultStyles.NonSortGroup,
    ...(props.facet && props.facet.style && props.facet.style.modal
      && props.facet.style.modal.NonSortGroup
      ? props.facet.style.modal.NonSortGroup
      : {}),
  }),
  NonSortGroupItem: (props) => ({
    ...defaultStyles.NonSortGroupItem,
    ...(props.facet && props.facet.style && props.facet.style.modal
      && props.facet.style.modal.NonSortGroupItem
      ? props.facet.style.modal.NonSortGroupItem
      : {}),
  }),
  sortGroupItemCounts: (props) => ({
    ...defaultStyles.sortGroupItemCounts,
    ...(props.facet && props.facet.style && props.facet.style.modal
      && props.facet.style.modal.sortGroupItemCounts
      ? props.facet.style.modal.sortGroupItemCounts
      : {}),
  }),
  itemContainer: (props) => ({
    ...defaultStyles.itemContainer,
    ...(props.facet && props.facet.style && props.facet.style.modal
      && props.facet.style.modal.itemContainer
      ? props.facet.style.modal.itemContainer
      : {}),
  }),
});
