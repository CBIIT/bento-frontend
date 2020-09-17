import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartView from './cartView';
import { initCart } from './store/cartAction';

const cartController = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initCart());
  }, []);

  const files = useSelector((state) => state.cart.files);

  // get all the data from store
  const dashboardData = useSelector((state) => (state.dashboard
        && state.dashboard
    ? state.dashboard : {}));

  const { caseOverview } = dashboardData;

  // combine case properties with files.
  const transform = (accumulator, currentValue) => {
    const caseAttrs = {};
    Object.keys(currentValue).forEach((key) => {
      if (key && !Array.isArray(currentValue[key])) {
        caseAttrs[key] = currentValue[key];
      }
    });
    if (currentValue.files) {
      return accumulator.concat(currentValue.files.map((f) => ({ ...f, ...caseAttrs })));
    }
    return accumulator;
  };

  const fileData = caseOverview && caseOverview.data ? caseOverview.data.reduce(transform, []) : [];

  return (
    <CartView
      isLoading={dashboardData.isLoading}
      data={fileData.filter((d) => {
        if (files.includes(d.uuid)) {
          return true;
        }
        return false;
      })}
    />
  );
};

export default cartController;
