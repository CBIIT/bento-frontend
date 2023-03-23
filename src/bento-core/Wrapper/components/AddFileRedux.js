import React from 'react';
import { connect } from 'react-redux';
import { getFilters } from '../../FacetFilter/utils/filter';
import { onAddCartFiles } from '../../Cart/store/actions';
import AddFiles from './AddFiles';

const AddFilesRedux = (props) => <AddFiles {...props} />;

/**
* create query variable with actie filters
*/
const mapStateToProps = (state) => ({
  activeFilters: getFilters(state.statusReducer.filterState),
  count: state.cartReducer.count,
});

const mapDispatchToProps = (dispatch) => ({
  addFiles: (files) => { dispatch(onAddCartFiles(files)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFilesRedux);
