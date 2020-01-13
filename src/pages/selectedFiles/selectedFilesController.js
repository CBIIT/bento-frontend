import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectedFilesView from './selectedFilesView';
import { initCart } from '../selectedCases/selectedCasesState';
import { Typography } from '../../components/Wrappers/Wrappers';

const selectedFilesController = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initCart());
  }, []);

  const cart = useSelector((state) => state.cart);
  return (cart.isError
    ? <Typography variant="headline" color="warning" size="sm">{cart.error && `An error has occurred in loading CART : ${cart.error}`}</Typography>
    : <SelectedFilesView data={cart.files === null || cart.files === '' ? [] : cart.files} />);
};


export default selectedFilesController;
