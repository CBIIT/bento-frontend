import React, { useEffect, useState } from 'react';
import { getModelData } from '../../Navigator/controller/Dictionary';
import { generateNodeTree } from '../../Navigator/components/xyFlowGraph/Canvas/CanvasHelper';
import { getFilterItems } from '../../Navigator/controller/Filter';
import { ModelContextProvider } from '../../Navigator/state/NavContextProvider';
import HeaderView from '../../Navigator/components/Header/Muiv5+/HeaderView';
import NavigatorView from './NavigatorLayoutView';
import NavigatorController from '../../Navigator/NavigatorController';

const headerIcon = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/4a3fb8e201e6ba2a858d7ec1226d2fd6ea2b5298/icdc/images/svgs/Icon-DMNav.85x85.svg';

const graphConfig = {
  canvas: {
    fit: {
      x: 0, // init x position of parent/ origin node
      y: 0, // init y position of parent / origin node
      zoom: 0.5,
      minZoom: 0.5,
      maxZoom: 2,
      xInterval: 250, // space x - axis
      yInterval: 80, // space y-axis
    },
  },
};

const pdfDownloadConfig = {
  fileType: 'pdf',
  prefix: 'ICDC_',
  templatePrefix: 'ICDC_Data_Loading_Template-',
  fileTransferManifestName: 'ICDC_Data_Loading_Template-file-manifest',
  landscape: 'true',
  footnote: 'test',
  enabled: true,
};

const readMeConfig = {
  readMeUrl: 'https://raw.githubusercontent.com/CBIIT/icdc-readMe-content/dev/Data_Model_Navigator_README.md',
  readMeTitle: 'Understanding Data Model',
};

const pageConfig = {
  title: 'DMN',
  iconSrc: 'https://api.placeholder.app/image/85x85',
};

// const headerConfiguration = {
//   headerLogo: headerIcon, // proivde bento app specific icon
// };

export const loadingExampleConfig = {
  type: 'dynamic', // static or dynamic
  url: 'https://raw.githubusercontent.com/CBIIT/icdc-data-loading-example-sets/main/config.json', // premade ZIP for static, config.json for dynamic
};

// node view and table config
const tableConfig = {
  columns: [
  ],
};

/**
* example layout setup and configuration
*/
const DATA_MODEL = 'https://raw.githubusercontent.com/CBIIT/icdc-model-tool/develop/model-desc/icdc-model.yml';
const DATA_MODEL_PROPS = 'https://raw.githubusercontent.com/CBIIT/icdc-model-tool/develop/model-desc/icdc-model-props.yml';

const nodesYamlFilePath = DATA_MODEL;
const propertiesYamlFilePath = DATA_MODEL_PROPS;

const ICDCNavigator = () => {
  const [dictionary, setDictionary] = useState(null);
  const [loading, setLoading] = useState(true);

  // retrive all data for navigator
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1] = await Promise.all([
          getModelData(nodesYamlFilePath, propertiesYamlFilePath),
        ]);
        const { dictionary: Dictionary } = res1;
        setDictionary(Dictionary);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
  Object.keys(dictionary).forEach((key) => {
    dictionary[key].isTemplateAndDocsDownlaod = false;
    if (key === 'file') {
      dictionary[key].isManifest = true;
    }
  });

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
    tableConfig,
    filterSections,
    facetFilterData,
    node2FacetItem,
    props2FacetItem,
    facetItemCount,
    facet2FacetItem,
  };

  return (
    <>
      <ModelContextProvider>
        <HeaderView
          headerLogo={headerIcon}
          readMeConfig={readMeConfig}
        />
        <NavigatorController
          dictionary={dictionary}
          config={config}
          CustomNavigatorView={NavigatorView}
        />
      </ModelContextProvider>
    </>
  );
};

export default ICDCNavigator;
