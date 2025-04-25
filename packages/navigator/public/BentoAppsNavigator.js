import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Box, Typography } from '@mui/material';
import {
  createHashRouter,
  RouterProvider,
  Outlet,
  Link
} from "react-router-dom";
import HubNavigatorView from './DataHub/HubNavigator';
import ICDCNavigatorView from './ICDC/IcdcNavigator';
import C3DCNavigatorView from './C3DC/C3DCNavigator';

function Layout({
  children
}) {
  return (
    <div>
      <nav>
        <Link to="/c3dc">C3DC</Link> | {"   "}
        <Link to="/hub">Hub</Link> | {"   "}
        {/* <Link to="/icdc">ICDC</Link> */}
      </nav>
      <hr />
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
      // {
      //   path: "icdc",
      //   element: <ICDCNavigatorView />,
      // },
    ],
  },
]);

const root = createRoot(document.getElementById('root'));
root.render(
  <>
    <RouterProvider router={router} />
  </>
);
