import React, { useEffect, useReducer, useState } from 'react';
import reducer from './state/reducers/reducers';
import { useModelContext } from './state/NavContextProvider';
// import HeaderView from './components/header/HeaderView';
import FacetSections from './components/filter/FacetController';

const NavigatorView = ({
  dictionary,
  config
}) => {
  
  const initModelState = () => ({ dictionary, ...config });
  /**
  * Initailize useReducer state
  * 1. model: state
  * 2. dispatch: dispatch action to update filter or any state value
  */
  const [modelState, dispatch] = useReducer(reducer, {}, initModelState);
  /**
  * use context access data model state
  */
  const modelContext = useModelContext();
  useEffect(() => {
    const { setContext } = modelContext;
    setContext({ ...modelState, dispatch });
    console.log(modelState);
  }, [modelState]);


  return (
    <>
      <h2>Navigator View 123</h2>
      <FacetSections />
    </>
  );
}

export default NavigatorView;
