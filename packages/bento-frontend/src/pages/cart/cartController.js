import React from 'react';
import { connect } from 'react-redux';
import {
  onDeleteAllCartFile,
  onDeleteCartFile,
  CartContextProvider,
} from '@bento-core/cart';
import { tableConfig } from '../../bento/fileCentricCartWorkflowData';
import CartView from './cartView';
import { TableContextProvider } from '../../bento-core/PaginationTable';

const CartController = (props) => (
  <CartContextProvider>
    <TableContextProvider>
      <CartView
        {...props}
        config={tableConfig}
      />
    </TableContextProvider>
  </CartContextProvider>
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
