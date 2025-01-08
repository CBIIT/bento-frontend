import React from 'react';
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { getDictionary } from '../Navigator/controller/Dictionary';
import HeaderView from '../Navigator/components/Header/HeaderView';
import { ModelContextProvider } from '../Navigator/state/NavContextProvider';
import NavigatorView from '../Navigator/NavigatorController';
import { getFilterItems } from '../Navigator/controller/Filter';
import TableView from '../Navigator/components/Table/TableView';
import GraphView from '../Navigator/components/xyFlowGraph/GraphView';
import { generateNodeTree } from '../Navigator/components/xyFlowGraph/Canvas/CanvasHelper';
import NavTableTheme from './NavTableTheme';
import NavGraphTheme from './NavGraphTheme';

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
  }
};

const DataModelNavigatorView = () => {
  const { dictionary } = getDictionary();
  console.log(dictionary);
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
    facetSectionCount,
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
    facetSectionCount,
    node2FacetItem,
    props2FacetItem,
    facetSectionCount,
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
      <HeaderView />
      <NavigatorView
        dictionary={dictionary}
        facetSectionCount={facetSectionCount}
        facetItemCount={facetItemCount}
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
