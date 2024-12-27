import React from 'react';
import {
  BrowserRouter,
} from 'react-router-dom';
import { CustomThemeProvider } from './ThemeContext';
import Layout from './components/Layout/NavLayoutView';

const App = () => {
  return (
    <CustomThemeProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </CustomThemeProvider>
  );
};

export default App;