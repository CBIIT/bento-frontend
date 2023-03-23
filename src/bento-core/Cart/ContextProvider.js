import React, { useState } from 'react';

/**
* cart state provider
*/
export const CartContext = React.createContext({
  cartState: {},
  setCartState: () => {},
});

const CartContextProvider = ({
  children,
}) => {
  const [cart, setCartState] = useState({});
  const cartStateHandler = (state) => {
    setCartState(state);
  };
  return (
    <CartContext.Provider
      value={{ cartState: cart, setCartState: cartStateHandler }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
