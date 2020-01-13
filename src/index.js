import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Provider } from 'react-redux';
import { ApolloProvider as ApolloProviderHooks } from "react-apollo-hooks";
import store from './store';
import client from './utils/graphqlClient';

ReactDOM.render(
  <ApolloProvider client={client}>
    {" "}
    <ApolloProviderHooks client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProviderHooks>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
