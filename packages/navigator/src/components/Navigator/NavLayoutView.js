import React from 'react';
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { getDictionary } from './controller/Dictionary';
import { ModelContextProvider } from './state/NavContextProvider';
import NavigatorView from './NavigatorController';
import { getFilterItems } from './controller/Filter';
import TableView from './components/Table/TableView';
import GraphView from './components/xyFlowGraph/GraphView';
import { generateNodeTree } from './components/xyFlowGraph/Canvas/CanvasHelper';
import NavTableTheme from '../BentoAppLayout/NavTableTheme';
import NavGraphTheme from '../BentoAppLayout/NavGraphTheme';
import HeaderView from './components/Header/HeaderView';

const dogIconSrc = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/4a3fb8e201e6ba2a858d7ec1226d2fd6ea2b5298/icdc/images/svgs/Icon-DMNav.85x85.svg';

const readMeConfig =  {
  readMeUrl: 'https://raw.githubusercontent.com/CBIIT/icdc-readMe-content/dev/Data_Model_Navigator_README.md',
  readMeTitle: 'Understanding the ICDC Data Model',
};

const imagesConfig = {
  headerLogo: dogIconSrc,
}

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
  }
};

const DataModelNavigatorView = () => {
  const { dictionary } = getDictionary();
  if(!dictionary) {
    return (
      <>
        loaging....
      </>
    )
  }
  /**
   * create node tree
   */
  const nodeTree = generateNodeTree(dictionary);

  const {
    filterByNode,
    filterByProperty,
    facetFilterData,
    facetItemCount,
    node2FacetItem,
    props2FacetItem,
    facet2FacetItem
  } = getFilterItems(dictionary);

  const filterSections = {filterByNode, filterByProperty};

  const config = {
    nodeTree,
    readMeConfig,
    graphConfig,
    filterSections,
    facetFilterData,
    node2FacetItem,
    props2FacetItem,
    facetItemCount,
    facet2FacetItem
  }

  // configuretable
  const NavTableView = (props) => (
    <NavTableTheme>
      <TableView {...props} config={config} />
    </NavTableTheme>
  );

  // configure graph
  const NavGraphView = (props) => (
    <NavGraphTheme>
      <GraphView {...props} />
    </NavGraphTheme>
  );
  
  return (
    <>
      <HeaderView
        headerLogo={imagesConfig.headerLogo}
        readMeConfig={readMeConfig}
      />
      <NavigatorView
        dictionary={dictionary}
        config={config}
        NavTableView={NavTableView}
        NavGraphView={NavGraphView}
      />
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
