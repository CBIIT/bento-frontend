import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { IframeNavigatorController } from '../dist/index';

const Layout = () => {
  const params = new URLSearchParams(window.location.search);
  const configUrl = params.get('configUrl');
  return (
    <>
      <IframeNavigatorController />
    </>
  );
};

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
