/* eslint-disable guard-for-in */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable space-infix-ops */
/* eslint-disable prefer-template */
/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
/* eslint-disable import/extension */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable import/no-cycle */
/* eslint-disable no-multiple-empty-lines */
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
    ...config
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
