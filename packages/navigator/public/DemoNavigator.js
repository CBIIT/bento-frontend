import React from 'react';
import { createRoot } from 'react-dom/client';
import { NavaigatorLayoutView } from '../src';

const dogIconSrc = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/4a3fb8e201e6ba2a858d7ec1226d2fd6ea2b5298/icdc/images/svgs/Icon-DMNav.85x85.svg';

const exampleReadMeConfig = {
  readMeUrl: 'https://raw.githubusercontent.com/CBIIT/icdc-readMe-content/dev/Data_Model_Navigator_README.md',
  readMeTitle: 'Understanding Data Model',
};

const DATA_MODEL = 'https://raw.githubusercontent.com/CBIIT/icdc-model-tool/master/model-desc/icdc-model.yml';
const DATA_MODEL_PROPS = 'https://raw.githubusercontent.com/CBIIT/icdc-model-tool/master/model-desc/icdc-model-props.yml';

const headerConfiguration = {
  headerLogo: dogIconSrc, // proivde bento app specific icon
};

const graphViewConfig = {
  canvas: {
    fit: {
      x: 0, // init x position of parent/ origin node 
      y: 0, // init y position of parent / origin node
      zoom: 0.5,
      minZoom: 0.5,
      maxZoom: 2, 
      xInterval: 250, // space x - axis
      yInterval: 90, // space y-axis
    },
  },
};

const root = createRoot(document.getElementById('root'));

root.render(
  <NavaigatorLayoutView
    headerConfig={headerConfiguration}
    graphConfig={graphViewConfig}
    propertiesYamlFilePath={DATA_MODEL_PROPS}
    nodesYamlFilePath={DATA_MODEL}
    readMeConfig={exampleReadMeConfig}
  />
);