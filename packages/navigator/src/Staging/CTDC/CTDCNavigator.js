import React, { useEffect, useState } from 'react';
import DemoNavigatorView from './NavigatorLayoutView';
import { generateNodeTree } from '../../Navigator/components/xyFlowGraph/Canvas/CanvasHelper';
import { getFilterItems } from '../../Navigator/controller/Filter';
import { getModelData } from '../../Navigator/controller/Dictionary';
import { ModelContextProvider } from '../../Navigator/state/NavContextProvider';
import HeaderViewMuiv4 from '../../Navigator/components/Header/Muiv4/Header.component';
import NavigatorController from '../../Navigator/NavigatorController';

// const headerIcon = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/4a3fb8e201e6ba2a858d7ec1226d2fd6ea2b5298/icdc/images/svgs/Icon-DMNav.85x85.svg';

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
  fileTransferManifestName: 'CDS_Data_Loading_Template-file-manifest',
  landscape: 'true',
  footnote: 'HTTPS://HUB.DATACOMMONS.CANCER.GOV/MODEL-NAVIGATOR/CTDC',
  enabled: true,
};

const readMeConfig = {
  readMeUrl: 'https://raw.githubusercontent.com/CBIIT/crdc-datahub-models/dev2/cache/CDS/6.0.2/README.md',
  readMeTitle: 'Understanding Data Model',
};

const pageConfig = {
  title: 'DMN',
  iconSrc: 'https://api.placeholder.app/image/85x85',
};

export const loadingExampleConfig = {
  type: 'dynamic', // static or dynamic
  url: 'https://raw.githubusercontent.com/CBIIT/icdc-data-loading-example-sets/main/config.json', // premade ZIP for static, config.json for dynamic
};

const node2DPosition = [
  ['program'],
  ['study'],
  ['principal_investigator', 'associated_link', 'image_collection', 'participant'],
  ['demographic', 'exposure', 'diagnosis', 'participant_status'],
  ['targeted_therapy', 'non_targeted_therapy', 'surgery', 'specimen', 'radiotherapy'],
  ['data_file'],
];

/**
* example layout setup and configuration
*/
const DATA_MODEL = 'https://raw.githubusercontent.com/CBIIT/crdc-datahub-models/prod/cache/CTDC/1.2.0/ctdc_model_file.yaml';
const DATA_MODEL_PROPS = 'https://raw.githubusercontent.com/CBIIT/crdc-datahub-models/prod/cache/CTDC/1.2.0/ctdc_model_properties_file.yaml';

const HubNavigatorView = ({
  nodesYamlFilePath = DATA_MODEL,
  propertiesYamlFilePath = DATA_MODEL_PROPS,
}) => {
  const [dictionary, setDictionary] = useState(null);
  const [versInfo, setVersionInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // retrive all data for navigator
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1] = await Promise.all([
          getModelData(nodesYamlFilePath, propertiesYamlFilePath),
        ]);
        const { dictionary: Dictionary, versionInfo } = res1;
        setDictionary(Dictionary);
        setVersionInfo(versionInfo);
      } catch (error) {
        console.error('Error fetching data', error);
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
  const nodeTree = node2DPosition || generateNodeTree(dictionary);

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
};

export default HubNavigatorView;
