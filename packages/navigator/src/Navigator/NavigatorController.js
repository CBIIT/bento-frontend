import React, { useEffect, useReducer } from 'react';
import reducer from './state/reducers/reducers';
import { useModelContext } from './state/NavContextProvider';
import NavigatorView from './NavigatorView';

const NavigatorController = (props) => {
  const {
    dictionary,
    config,
  } = props;

  const initModelState = () => ({
    dictionary,
    ...config,
  });
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
    <NavigatorView
      dictionary={modelState.dictionary}
      {...props}
    />
  );
};

export default NavigatorController;
