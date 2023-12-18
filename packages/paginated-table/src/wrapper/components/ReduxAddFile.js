import React from 'react';
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-unresolved
import { onAddCartFiles } from '@bento-core/cart';
import AddFiles from './AddFiles';

const AddFilesRedux = (props) => <AddFiles {...props} />;

/**
* create query variable with actie filters
*/
const mapStateToProps = (state) => ({
  count: state.cartReducer && state.cartReducer.count,
});

const mapDispatchToProps = (dispatch) => ({
  addFiles: (files) => { dispatch(onAddCartFiles(files)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFilesRedux);
