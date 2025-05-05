import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Tab, Tabs, Box } from '@mui/material';
import styled from '@emotion/styled';
// import { styled } from '@mui/material/styles';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import {
  ICDCNavigator,
  GCNavigator,
  CTDCNavigator,
} from '../dist/index';

// Styled Tab
const StyledTabView = styled(Tab)(() => ({
  '&.MuiButtonBase-root': {
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    color: 'gray',
    margin: '0 12px',
    minWidth: '100px',
    '&.Mui-selected': {
      color: '#1976d2', // nice blue when selected
      borderBottom: '3px solidrgb(94, 104, 113)', // underline
      backgroundColor: '#e3f2fd', // light blue background
    },
  },
}));

const configUrl = 'https://raw.githubusercontent.com/CBIIT/bento-frontend/refs/heads/bento_core_navigator/packages/navigator/src/Staging/Iframe/config.json';

function Layout({
  children,
}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <StyledTabView label="GC Model" />
          <StyledTabView label="CTDC" />
          <StyledTabView label="ICDC" />
          <StyledTabView label="Iframe" />
        </Tabs>
        {value === 0 && (
          <GCNavigator
            nodesYamlFilePath = 'https://raw.githubusercontent.com/CBIIT/crdc-datahub-models/prod/cache/CDS/6.0.4/cds-model.yml'
            propertiesYamlFilePath = 'https://raw.githubusercontent.com/CBIIT/crdc-datahub-models/prod/cache/CDS/6.0.4/cds-model-props.yml'
            changelogUrl = 'https://raw.githubusercontent.com/CBIIT/crdc-datahub-models/prod/cache/CDS/6.0.4/version-history.md'
          />
        )}
        {value === 1 && (
          <CTDCNavigator />
        )}
        {value === 2 && <ICDCNavigator />}
        {value === 3 && (
          <iframe
            src={"http://localhost:7700?configUrl=https://raw.githubusercontent.com/CBIIT/bento-frontend/refs/heads/bento_core_navigator/packages/navigator/src/Staging/Iframe/config.json"}
            width="100%"
            height="800"
          />
        )}
      </Box>
    </>
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
      {componentLoaded ? (
        <div id="component-container">
        </div>  // Where the React component will render
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
  },
]);

const root = createRoot(document.getElementById('root'));
root.render(
  <>
    <RouterProvider router={router} />
  </>
);
