import React, { useState, useContext } from 'react';

/**
* migrate model data from global redux to state 
* use context provider to set or access model state
*/
export const ModelContext = React.createContext({
  context: {},
  setContext: () => {},
});

export const ModelContextProvider = ({
  children,
}) => {
  const [context, setContext] = useState({});
  const setContextHandler = (tblContext) => {
    setContext(tblContext);
  };

  return (
    <ModelContext.Provider
      value={{
        context,
        setContext: setContextHandler,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

// access form context
export const useModelContext = () => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useModelContext must be used within a ModelProvider");
  }
  return context;
};
