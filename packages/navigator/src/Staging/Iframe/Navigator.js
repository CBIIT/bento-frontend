/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { getChangelog } from '../../Navigator/controller/Changelog';
import { getModelData } from '../../Navigator/controller/Dictionary';
import { generateNodeTree } from '../../Navigator/components/xyFlowGraph/Canvas/CanvasHelper';
import { getFilterItems } from '../../Navigator/controller/Filter';
import { ModelContextProvider } from '../../Navigator/state/NavContextProvider';
import NavigatorController from '../../Navigator/NavigatorController';

const defaultUrl = 'https://raw.githubusercontent.com/CBIIT/bento-frontend/refs/heads/bento_core_navigator/packages/navigator/src/Staging/Iframe/config.json';
export const IframeNavigator = ({
  jsonData,
}) => {
  // retrive configuratoin
  const nodesYamlFilePath = jsonData?.nodesYamlFilePath;
  const propertiesYamlFilePath = jsonData?.propertiesYamlFilePath;
  const changelogUrl = jsonData?.changelogUrl;

  if (!nodesYamlFilePath || !propertiesYamlFilePath) {
    return (
      <>
        <Alert severity="error" sx={{ width: '100%' }}>
          Missign Node or Prorperty YML URL !!!
        </Alert>
      </>
    );
  }

  // readme config
  const readMeConfig = jsonData?.readMeConfig;
  const settings = jsonData?.ui_settings?.configuration;
  const graphConfig = settings?.graphViewConfig;
  const pdfDownloadConfig = settings?.pdfConfig;

  if (!readMeConfig) {
    return (
      <>
        <Alert severity="error" sx={{ width: '100%' }}>
          Missign ReadMe configuration !!!
        </Alert>
      </>
    );
  }

  if (!graphConfig) {
    return (
      <>
        <Alert severity="error" sx={{ width: '100%' }}>
          Missign graph configuration !!!
        </Alert>
      </>
    );
  }

  if (!pdfDownloadConfig) {
    return (
      <>
        <Alert severity="error" sx={{ width: '100%' }}>
          Missign Pdf configuration !!!
        </Alert>
      </>
    );
  }

  const [dictionary, setDictionary] = useState(null);
  const [versInfo, setVersionInfo] = useState(null);
  const [changelogData, setChangelogData] = useState(null);
  const [loading, setLoading] = useState(true);

  const resolveCalls = [getModelData(nodesYamlFilePath, propertiesYamlFilePath)];
  if (changelogData) {
    resolveCalls.push(getChangelog(changelogUrl));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2] = await Promise.all(resolveCalls);
        const { dictionary: Dictionary, versionInfo } = res1;
        setDictionary(Dictionary);
        if (versInfo) {
          setVersionInfo(versionInfo);
        }
        if (res2) {
          setChangelogData(res2);
        }
      } catch (err) {
        console.error('Error fetching data', err);
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
  * create node tree
  * node2DPosition - node placement - 2D array of the node name
  * generateNodeTree - will assign the default position
  */
  const node2DPosition = graphConfig?.canvas?.nodeTree;
  const nodeTree = node2DPosition || generateNodeTree(dictionary);

  const pageConfig = jsonData?.pageConfig;
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

  if (changelogData) {
    config.changelogInfo = {
      changelogMD: changelogData,
    };
  }

  return (
    <>
      <ModelContextProvider>
        <NavigatorController
          dictionary={dictionary}
          config={config}
        />
      </ModelContextProvider>
    </>
  );
};

const IframeNavigatorController = () => {
  const params = new URLSearchParams(window.location.search);
  const configUrl = params.get('configUrl');
  const url = configUrl;

  if (!url) {
    return (
      <>
        <Alert severity="error" sx={{ width: '100%' }}>
          Missign Config Url !!!
        </Alert>
      </>
    );
  }

  const [jsonData, setJsonData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);
  console.log(url);
  useEffect(() => {
    const fetchData = async () => {
      setLoader(true); // start loading
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJsonData(data);
      } catch (err) {
        console.error('Error fetching JSON:', err);
        setError(err.message);
      } finally {
        setLoader(false); // done loading
      }
    };
    fetchData();
  }, [url]);

  if (!jsonData || error) {
    return (
      <Alert severity="error" sx={{ width: '100%' }}>
        Provide URL for JSON configuration !!!
      </Alert>
    );
  }

  if (loader) {
    return <div>Loading...</div>; // You can replace this with a spinner
  }

  return (
    <>
      <IframeNavigator jsonData={jsonData} />
    </>
  );
};

export default IframeNavigatorController;
