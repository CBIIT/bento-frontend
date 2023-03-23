import React from 'react';
import { connect } from 'react-redux';
import { onDeleteAllCartFile, onDeleteCartFile } from '../../bento-core/Cart/store/actions';
import { tableConfig } from '../../bento/fileCentricCartWorkflowData';
import CartView from './cartView';

const CartController = (props) => (
  <>
    <CartView
      {...props}
      config={tableConfig}
    />
  </>
);

const mapStateToProps = (state) => ({
  filesId: state.cartReducer.filesId,
});

/**
* return file id to delete (attr file_id)
*/
const getFileId = (row) => row.file_id;

const mapDispatchToProps = (dispatch) => ({
  deleteAllFiles: () => dispatch(onDeleteAllCartFile()),
  deleteCartFile: (row) => dispatch(onDeleteCartFile(getFileId(row))),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartController);
