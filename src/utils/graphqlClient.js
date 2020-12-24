import { ApolloClient, InMemoryCache } from '@apollo/client';
import env from './env';

const BACKEND = env.REACT_APP_BACKEND_API;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: BACKEND,
});
export default client;
