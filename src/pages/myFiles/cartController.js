import React from 'react';
import { tableConfig } from '../../bento/fileCentricCartWorkflowData';
import CartView from './cartView';

const CartController = () => {
  console.log('new cart');
  return (
    <>
      <CartView
        config={tableConfig}
      />
    </>
  );
};

export default CartController;
