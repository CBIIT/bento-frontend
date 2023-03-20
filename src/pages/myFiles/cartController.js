import React from 'react';
import { table } from '../../bento/fileCentricCartWorkflowData';
import CartView from './cartView';

const CartController = () => {
  console.log('new cart');
  return (
    <>
      <CartView
        config={table}
      />
    </>
  );
};

export default CartController;
