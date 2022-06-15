import {
  ApolloClient, InMemoryCache, ApolloLink, HttpLink,
} from '@apollo/client';
import env from './env';

const BACKEND = env.REACT_APP_BACKEND_API;

const backendService = new HttpLink({
  uri: BACKEND,
});

const authService = new HttpLink({
  uri: 'https://bento-dev.bento-tools.org/api/auth/graphql',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === 'authService',
    // the string "authService" can be anything you want,
    authService, // <= apollo will send to this if clientName is "authService"
    backendService, // <= otherwise will send to this
  ),
});
export default client;
