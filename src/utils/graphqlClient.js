import ApolloClient from 'apollo-boost';

const BACKEND = process.env.REACT_APP_BACKEND_API;

const client = new ApolloClient({
  uri: BACKEND,
});

export default client;
