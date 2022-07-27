/* eslint-disable no-unused-vars */
import {
  ApolloClient, InMemoryCache, ApolloLink, HttpLink,
} from '@apollo/client';
import env from './env';

const BACKEND = env.REACT_APP_BACKEND_API;
const AUTH_SERVICE = `${env.REACT_APP_AUTH_SERVICE_API}graphql`;
const USER_SERVICE = `${env.REACT_APP_USER_SERVICE_API}graphql`;

const backendService = new HttpLink({
  uri: BACKEND,
});

const authService = new HttpLink({
  uri: AUTH_SERVICE,
});

const userService = new HttpLink({
  uri: USER_SERVICE,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === 'authService',
    // the string "authService" can be anything you want,
    authService, // <= apollo will send to this if clientName is "authService"
    ApolloLink.split( // This is 2nd level of ApolloLink.
      (operation) => operation.getContext().clientName === 'userService',
      // the string "userService" can be anything you want,
      userService, // <= apollo will send to this if clientName is "userService"
      backendService, // <= otherwise will send to thisnpm
    ), // <= otherwise will send to this
  ),
});
export default client;
