import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectedCasesView from './selectedCasesView';
import { initCart } from './selectedCasesState';
import { Typography } from '../../components/Wrappers/Wrappers';

const selectedCasesController = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initCart());
  }, []);

  const cart = useSelector((state) => state.cart);
  return (cart.isError
    ? <Typography variant="headline" color="warning" size="sm">{cart.error && `An error has occurred in loading CART : ${cart.error}`}</Typography>
    : <SelectedCasesView data={cart.cases === null || cart.cases === '' ? [] : cart.cases} />);
};


export default selectedCasesController;
