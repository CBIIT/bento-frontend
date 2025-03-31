import React, { useState } from 'react';

export const TableContext = React.createContext({
  context: {},
  setContext: () => {},
});

const TableContextProvider = ({
  children,
}) => {
  const [context, setContext] = useState({});
  const setContextHandler = (tblContext) => {
    setContext(tblContext);
  };
  return (
    <TableContext.Provider
      value={{
        context,
        setContext: setContextHandler,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableContextProvider;
