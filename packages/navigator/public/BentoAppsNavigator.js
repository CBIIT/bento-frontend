import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Tab, Tabs, Box } from '@mui/material';
import styled from '@emotion/styled';
// import { styled } from '@mui/material/styles';
import {
  createHashRouter,
  RouterProvider,
  Outlet,
  Link
} from "react-router-dom";
import HubNavigatorView from './DataHub/HubNavigator';
import ICDCNavigatorView from './ICDC/IcdcNavigator';
import C3DCNavigatorView from './C3DC/C3DCNavigator';

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
      borderBottom: '3px solid #1976d2', // underline
      backgroundColor: '#e3f2fd', // light blue background
    },
  },
}));

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
          <StyledTabView label="C3DC" />
          <StyledTabView label="Hub" />
          <StyledTabView label="ICDC" />
        </Tabs>
        {value === 0 && <C3DCNavigatorView />}
        {value === 1 && <HubNavigatorView />}
        {value === 2 && <ICDCNavigatorView />}
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
    children: [
      {
        path: "c3dc",
        element: <C3DCNavigatorView />,
      },
      {
        path: "hub",
        element: <HubNavigatorView />,
      },
      {
        path: "icdc",
        element: <ICDCNavigatorView />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById('root'));
root.render(
  <>
    <RouterProvider router={router} />
  </>
);
