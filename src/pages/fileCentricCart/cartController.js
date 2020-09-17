import React from 'react';
import { fakeDB } from '../../bento/fileCentricCartWorkflowData';
import CartView from './cartView';

const cartController = () => (
  <CartView
    isLoading={false}
    data={fakeDB}
  />
);

export default cartController;
