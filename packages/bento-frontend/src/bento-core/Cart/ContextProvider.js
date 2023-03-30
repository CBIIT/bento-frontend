import React, { useEffect, useReducer, useState } from 'react';
import cartReducer from './state/reducers';

/**
* cart state provider
*/
export const CartContext = React.createContext({
  context: {},
  setContext: () => {},
});

const CartContextProvider = ({
  children,
}) => {
  /**
  * configure cart state
  */
  const initCartState = (initailState) => ({
    ...initailState,
    comment: '',
  });
  /**
  * Initailize useReducer state/dispatch for cart component
  */
  const [cart, dispatch] = useReducer(cartReducer, {}, initCartState);
  /**
  * set dispatch action on the context provider
  */
  const [context, setContext] = useState({ cart, dispatch });

  useEffect(() => {
    setContext({ cart, dispatch });
  }, [cart]);

  const cartContextHandler = (value) => {
    setContext(value);
  };

  return (
    <CartContext.Provider
      value={{
        context,
        setContext: cartContextHandler,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
