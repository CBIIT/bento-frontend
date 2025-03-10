import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link, Outlet  } from "react-router-dom";
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


function Layout() {
  return (
    <div>
      <h1>My React App</h1>
      <nav>
        <ul>
          <li>
            <Link to="/standalone">Navigator Standalone</Link>
          </li>
          <li>
            <Link to="/component">component</Link>
          </li>
        </ul>
      </nav>

      <hr />
      {/* Nested routes will be rendered here */}
      <Outlet />
    </div>
  );
}

function StandaloneNavView() {
  const [componentLoaded, setComponentLoaded] = useState(false);
  useEffect(() => {
    // Dynamically load the script (if not using it via a script tag)
    const script = document.createElement("script");
    script.src = "./Navigator.bundle.js";
    script.onload = () => setComponentLoaded(true);
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div>
      <ul>
          <li>
            <Link to="/standalone">Navigator Standalone</Link>
          </li>
          <li>
            <Link to="/component">component</Link>
          </li>
        </ul>
      <h1>Host App</h1>
      {componentLoaded ? (
        <div id="component-container">
        </div>  // Where the React component will render
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
  <>
    <Router>
      <Routes>
        {/* The main layout route */}
        <Route path="/" element={<Layout />}>
          {/* Nested routes */}
          <Route index element={
             <NavaigatorLayoutView
             headerConfig={headerConfiguration}
             graphConfig={graphViewConfig}
             propertiesYamlFilePath={DATA_MODEL_PROPS}
             nodesYamlFilePath={DATA_MODEL}
             readMeConfig={exampleReadMeConfig}
           />
          } />
          <Route path="component" element={
             <NavaigatorLayoutView
             headerConfig={headerConfiguration}
             graphConfig={graphViewConfig}
             propertiesYamlFilePath={DATA_MODEL_PROPS}
             nodesYamlFilePath={DATA_MODEL}
             readMeConfig={exampleReadMeConfig}
           />
          } />
          <Route path="standalone" element={<StandaloneNavView />} />
        </Route>
      </Routes>
    </Router>
  </>
);
