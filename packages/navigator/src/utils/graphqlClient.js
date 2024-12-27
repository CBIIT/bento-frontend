import {
  ApolloClient, InMemoryCache, ApolloLink, HttpLink,
} from '@apollo/client';
import env from './env';

const BACKEND = env.REACT_APP_BACKEND_API;
const INTEROP_SERVICE = `${env.REACT_APP_INTEROP_SERVICE_URL}`;

const backendService = new HttpLink({
  uri: BACKEND,
});

const interopService = new HttpLink({
  uri: INTEROP_SERVICE,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: BACKEND,
  link: ApolloLink.split(
    (op) => op.getContext().clientName === 'interopService',
    interopService, backendService,
  ),
});
export default client;
