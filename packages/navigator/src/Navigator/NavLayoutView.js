import React from 'react';
import { Alert } from '@mui/material';
import { getDictionary } from './controller/Dictionary';
import { ModelContextProvider } from './state/NavContextProvider';
import NavigatorView from './NavigatorController';
import { getFilterItems } from './controller/Filter';
import TableView from './components/Table/TableView';
import GraphView from './components/xyFlowGraph/GraphView';
import { generateNodeTree } from './components/xyFlowGraph/Canvas/CanvasHelper';
import HeaderView from './components/Header/HeaderView';

const DataModelNavigatorView = ({
  propertiesYamlFilePath,
  nodesYamlFilePath,
  node2DPosition,
  headerConfig,
  graphConfig,
  readMeConfig,
}) => {
  /**
   * model / properties end points
   */
  if (!propertiesYamlFilePath || !nodesYamlFilePath) {
    return (
      <Alert severity="error">
        Error. Provide valide YMAL Url !!!
      </Alert>
    );
  }

  /**
   * generate dictionary
   */
  const { dictionary } = getDictionary(nodesYamlFilePath, propertiesYamlFilePath);
  if (!dictionary) {
    return (
      <>
        loaging....
      </>
    );
  }
  /**
   * create node tree
   */
  const nodeTree = node2DPosition || generateNodeTree(dictionary);

  const {
    filterByNode,
    filterByProperty,
    facetFilterData,
    facetItemCount,
    node2FacetItem,
    props2FacetItem,
    facet2FacetItem,
  } = getFilterItems(dictionary);

  const filterSections = { filterByNode, filterByProperty };

  const config = {
    nodeTree,
    readMeConfig,
    graphConfig,
    filterSections,
    facetFilterData,
    node2FacetItem,
    props2FacetItem,
    facetItemCount,
    facet2FacetItem,
  };

  // configuretable
  const NavTableView = (props) => (
    <TableView {...props} config={config} />
  );

  // configure graph
  const NavGraphView = (props) => (
    <GraphView {...props} />
  );

  return (
    <>
      <HeaderView
        headerLogo={headerConfig.headerLogo}
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
};

const NavaigatorLayoutView = ({
  headerConfig,
  graphConfig,
  propertiesYamlFilePath,
  nodesYamlFilePath,
  readMeConfig,
  node2DPosition
}) => (
  <>
    <ModelContextProvider>
      <DataModelNavigatorView
        headerConfig={headerConfig}
        graphConfig={graphConfig}
        propertiesYamlFilePath={propertiesYamlFilePath}
        nodesYamlFilePath={nodesYamlFilePath}
        readMeConfig={readMeConfig}
        node2DPosition={node2DPosition}

      />
    </ModelContextProvider>
  </>
);

export default NavaigatorLayoutView;
