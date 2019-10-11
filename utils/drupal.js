import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import fetch from 'isomorphic-fetch';
import { InMemoryCache } from "apollo-cache-inmemory";

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://dev-drupal-next-boilerplate.pantheonsite.io/graphql',
    fetch: fetch,
  }),
  cache: new InMemoryCache()
});

export default client;
