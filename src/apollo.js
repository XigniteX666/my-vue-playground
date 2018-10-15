
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import {  createHttpLink, HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client';
import { createAuthMiddlewareForClientCredentialsFlow }
  from '@commercetools/sdk-middleware-auth/dist/commercetools-sdk-middleware-auth.cjs';
import settings from '@/config/settings';


// Install the vue plugin
Vue.use(VueApollo);

const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP || `https://api.commercetools.com/${config.ct.auth.projectKey}/graphql`;
//const httpEndpoint =  `https://api.sphere.io/myplayground-68/graphql`;

// Create commercetools authentication middleware
const authMiddleware = createAuthMiddlewareForClientCredentialsFlow(settings.ct.auth);

function addAuthHeader(request) {
  console.log(settings.ct.auth)
  return new Promise(success => authMiddleware(requestWithAuth => success(requestWithAuth))(request));
}

const link = setContext(request => addAuthHeader(request)).concat(new HttpLink({ uri: httpEndpoint }));

// const link2  = createHttpLink({
//   uri:httpEndpoint,
//   headers:{
//     Authorization: 'Bearer ' + process.env.VUE_APP_SECRET
//   }
// })

// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  httpEndpoint,
  // You can use `wss` for secure connection (recommended in production)
  // Use `null` to disable subscriptions
  wsEndpoint: null,
  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  websocketsOnly: false,
  // Is being rendered on the server?
  ssr: false,

  // Override default http link
  link: link
  // Override default cache
  // cache: myCache

  // Additional ApolloClient options
  // apollo: { ... }

  // Client local data (see apollo-link-state)
  // clientState: { resolvers: { ... }, defaults: { ... } }
};

export default function createProvider(options = {}) {
  // Create apollo client
  const { apolloClient, wsClient } = createApolloClient({
    ...defaultOptions,
    ...options,
  });
  apolloClient.wsClient = wsClient;

  // Create vue apollo provider
  return new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        // fetchPolicy: 'cache-and-network',
      },
    },
    errorHandler(error) {
      // eslint-disable-next-line no-console
      console.error(error.message);
    },
  });
}
