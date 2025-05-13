import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { IframeNavigatorController } from '../dist/index';

const Layout = () => {
  return (
    <div>
      <IframeNavigatorController />
    </div>
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
