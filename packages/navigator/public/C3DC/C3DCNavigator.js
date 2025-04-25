import React, { useEffect, useState } from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  generateNodeTree,
  getChangelog,
  getFilterItems,
  getModelData,
  HeaderViewMuiv4,
  ModelContextProvider,
} from '../../dist';
import NavigatorController from '../../dist/Navigator/NavigatorController';
import DemoNavigatorView from './NavigatorLayoutView';

const headerIcon = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/4a3fb8e201e6ba2a858d7ec1226d2fd6ea2b5298/icdc/images/svgs/Icon-DMNav.85x85.svg';

const graphConfig = {
  canvas: {
    fit: {
      x: 0, // init x position of parent/ origin node 
      y: 0, // init y position of parent / origin node
      zoom: 0.5,
      minZoom: 0.5,
      maxZoom: 2, 
      xInterval: 300, // space x - axis
      yInterval: 120, // space y-axis
    },
  },
};

const pdfDownloadConfig = {
  fileType: 'pdf',
  prefix: 'CDS_',
  templatePrefix: 'CDS_Data_Loading_Template-',
  fileTransferManifestName: "CDS_Data_Loading_Template-file-manifest",
  landscape: 'true',
  footnote: 'test',
  enabled: true,
};

const readMeConfig = {
  readMeUrl: 'https://raw.githubusercontent.com/CBIIT/crdc-datahub-models/dev2/cache/CDS/6.0.2/README.md',
  readMeTitle: 'Understanding Data Model',
};

const pageConfig = {
  title: "DMN",
  iconSrc: "https://api.placeholder.app/image/85x85",
};

const headerConfiguration = {
  // headerLogo: dogIconSrc, // proivde bento app specific icon
};

export const loadingExampleConfig = {
  type: 'dynamic', // static or dynamic
  url: 'https://raw.githubusercontent.com/CBIIT/icdc-data-loading-example-sets/main/config.json', // premade ZIP for static, config.json for dynamic
}

const node2DPosition = [
  ['program'],
  ['study'],
  ['participant'],
  ['diagnosis', 'treatment', 'sample'],
  ['file'],
  ['genomic_info', 'image', 'proteomic'],
  ['MultiplexMicroscopy', 'NonDICOMMRimages', 'NonDICOMPETimages'],
  ['NonDICOMCTimages', 'NonDICOMpathologyImages', 'NonDICOMradiologyAllModalities'],
  ['version']
];

/**
* example layout setup and configuration
*/
const DATA_MODEL = 'https://raw.githubusercontent.com/CBIIT/c3dc-model/main/model-desc/c3dc-model.yml';
const DATA_MODEL_PROPS = 'https://raw.githubusercontent.com/CBIIT/c3dc-model/main/model-desc/c3dc-model-props.yml';

const nodesYamlFilePath = DATA_MODEL;
const propertiesYamlFilePath = DATA_MODEL_PROPS;
const changelogUrl = 'https://raw.githubusercontent.com/CBIIT/crdc-datahub-models/dev2/cache/CDS/6.0.2/version-history.md';
const readMeUrl = "https://raw.githubusercontent.com/CBIIT/crdc-datahub-models/dev2/cache/CDS/6.0.2/README.md";

const C3DCNavigatorView = () => {
  const [dictionary, setDictionary] = useState(null);
  const [versInfo, setVersionInfo] = useState(null);
  const [changelogData, setChangelogData] = useState(null);
  const [loading, setLoading] = useState(true);

  // retrive all data for navigator
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2] = await Promise.all([
          getModelData(nodesYamlFilePath, propertiesYamlFilePath),
          getChangelog(changelogUrl),
        ]);
        const { dictionary: Dictionary, versionInfo } = res1;
        setDictionary(Dictionary);
        setVersionInfo(versionInfo);
        setChangelogData(res2);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /**
  * generate dictionary
  *  *** configure any additional change this dictionary ***
  */
  if (loading || !dictionary) {
    return (
      <>
        loaging....
      </>
    );
  }
  /**
  * apply any additional dictionary changes
  * 1. logic to display or hide element in node views
  * 2. any additional fields to display
  */

  /**
  * create node tree
  * node2DPosition - node placement - 2D array of the node name
  * generateNodeTree - will assign the default position
  */
  const nodeTree = generateNodeTree(dictionary);

  // create necessary data for navigator
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

  // bundle all config value and data to initize State
  const config = {
    nodeTree,
    loadingExampleConfig,
    pdfDownloadConfig,
    readMeConfig,
    pageConfig,
    graphConfig,
    filterSections,
    facetFilterData,
    node2FacetItem,
    props2FacetItem,
    facetItemCount,
    facet2FacetItem,
    versionInfo: versInfo,
    changelogInfo: {
      changelogMD: changelogData,
    },
  };

  return (
    <ModelContextProvider>
      <HeaderViewMuiv4 />
      <NavigatorController
        dictionary={dictionary}
        config={config}
        CustomNavigatorView={DemoNavigatorView}
      />
    </ModelContextProvider>
  );
}

export default C3DCNavigatorView;

// const root = createRoot(document.getElementById('root'));
// root.render(
//   <>
//     <Router>
//       <Routes>
//         {/* The main layout route */}
//         <Route path="/" element={<HubNavigatorView />}>
//           {/* Nested routes */}
//         </Route>
//       </Routes>
//     </Router>
//   </>
// );
