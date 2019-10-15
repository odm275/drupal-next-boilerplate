import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import unfetch from 'isomorphic-unfetch';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://dev-drupal-next-boilerplate.pantheonsite.io/graphql',
    fetch: typeof window !== 'undefined' ? fetch.bind() : unfetch
  }),
  cache: new InMemoryCache()
});

export default client;
