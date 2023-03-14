import React, { useState } from 'react';

export const TableContext = React.createContext({
  tblState: {},
  setTblState: () => {},
});

const TableContextProvider = ({
  children,
}) => {
  const [table, setState] = useState({});
  const setStateHandler = (state) => {
    setState(state);
  };
  return (
    <TableContext.Provider
      value={{ tblState: table, setTblState: setStateHandler }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableContextProvider;
