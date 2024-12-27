import React, { useEffect, useReducer, useState } from 'react';
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { getDataModel, getDictionary, getModelData } from '../Navigator/controller/Navigator';
import HeaderView from '../Navigator/components/header/HeaderView';
import { ModelContextProvider, useModelContext } from '../Navigator/state/NavContextProvider';
import reducer from '../Navigator/state/reducers/reducers';
import { updateDictionary } from '../Navigator/state/actions/Action';
import NavigatorView from '../Navigator/NavigatorView';
import { getFilterItems } from '../Navigator/controller/Filter';

const readMeConfig =  {
  readMeUrl: 'https://raw.githubusercontent.com/rana22/category_partition/main/README.md',
  readMeTitle: 'Understanding the ICDC Data Model',
};

const graphConfig = {
  canvas: {
    fit: {
      x: 0,
      y: 0,
      zoom: 0.5,
      minZoom: 0.5,
      maxZoom: 2,
      xInterval: 250,
      yInterval: 90,
    },
    // nodeTree: customNodeTree,
  }
}

const DataModelNavigatorView = () => {
  const { dictionary } = getDictionary();

  if(!dictionary) {
    return (
      <>
        loaging....
      </>
    )
  }
  const filterSections = getFilterItems(dictionary);

  const config = {
    readMeConfig,
    graphConfig,
    filterSections
  }

  return (
    <>
      <HeaderView />
      <NavigatorView
        dictionary={dictionary}
        config={config}
      />
      <p>{JSON.stringify(dictionary)}</p>
    </>
  );
}

const LayoutView = ({
}) => {
  
  return (
    <>
      <HashRouter>
        <div >
          <Switch>
            <ModelContextProvider>
              <Route exact path="/" component={DataModelNavigatorView} />
            </ModelContextProvider>
          </Switch>
        </div>
      </HashRouter>
    </>
  );
};

export default LayoutView;
