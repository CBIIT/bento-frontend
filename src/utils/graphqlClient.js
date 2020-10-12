import ApolloClient from 'apollo-boost';
import env from './env';

const BACKEND = env.REACT_APP_BACKEND_API;

const client = new ApolloClient({
  uri: BACKEND,
});

export default client;
