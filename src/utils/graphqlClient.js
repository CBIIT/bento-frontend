/* eslint-disable no-unused-vars */
import {
  ApolloClient, InMemoryCache, ApolloLink, HttpLink,
} from '@apollo/client';
import env from './env';

const BACKEND = env.REACT_APP_BACKEND_API;
const PUBLIC_BACKEND = env.REACT_APP_BACKEND_PUBLIC_API;
const MOCK = 'https://f20e5514-ae0a-4e09-b498-94283cdf9d2c.mock.pstmn.io/v1/graphql';
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

const publicService = new HttpLink({
  uri: PUBLIC_BACKEND,
});

const mockService = new HttpLink({
  uri: MOCK,
  headers: {
    'x-mock-match-request-body': true,
  },
});

const serviceMap = {
  backendService,
  authService,
  userService,
  publicService,
  mockService,
};

const getService = (strname) => {
  if (!strname || typeof strname !== 'string' || strname.length === 0) {
    return serviceMap.backendService;
  }

  if (Object.prototype.hasOwnProperty.call(serviceMap, strname)) {
    return serviceMap[strname];
  }

  return serviceMap.backendService;
};

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.split(
    (op) => op.getContext().clientName === 'publicService',
    publicService,
    ApolloLink.split(
      (operation) => operation.getContext().clientName === 'mockService',
      mockService,
      ApolloLink.split(
        (operation) => operation.getContext().clientName === 'authService',
        // the string "authService" can be anything you want,
        authService, // <= apollo will send to this if clientName is "authService"
        ApolloLink.split( // This is 2nd level of ApolloLink.
          (operation) => operation.getContext().clientName === 'userService',
          // the string "userService" can be anything you want,
          userService, // <= apollo will send to this if clientName is "userService"
          backendService, // <= otherwise will send to this
        ), // <= otherwise will send to this
      ),
    ),
  ),
});

export default client;
