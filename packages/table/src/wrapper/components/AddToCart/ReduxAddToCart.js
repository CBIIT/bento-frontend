import React from 'react';
import { connect } from 'react-redux';
import { onAddCartFiles } from '@bento-core/cart';
import AddToCartView from './AddToCartView';

const AddToCartRedux = (props) => <AddToCartView {...props} />;

/**
* create query variable with actie filters
*/
const mapStateToProps = (state) => ({
  count: state.cartReducer && state.cartReducer.count,
  alreadyInCartCount: state.cartReducer && state.cartReducer.alreadyInCartCount,
  cartFiles: state.cartReducer && state.cartReducer.filesId,
});

const mapDispatchToProps = (dispatch) => ({
  addFiles: (files) => { dispatch(onAddCartFiles(files)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartRedux);
