import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import "core-js";
import "regenerator-runtime";
import { ApolloProvider } from '@apollo/client'
import { QueryClientProvider } from '@tanstack/react-query';
import client from "./utils/graphqlClient";
import queryClient from './utils/react-query-client';
import App from "./App";
import store from "./store";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <>
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App/>
        </Provider>
      </QueryClientProvider>
    </ApolloProvider>
  </>,
);
