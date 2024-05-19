import fetch from 'isomorphic-fetch';
import {
  ClientBuilder,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

const projectKey = 'codecraft';
const scopes = [
  'manage_customer_groups:codecraft',
  'manage_cart_discounts:codecraft',
  'manage_project_settings:codecraft',
  'manage_customers:codecraft',
  'manage_my_profile:codecraft',
  'manage_order_edits:codecraft',
  'manage_my_orders:codecraft',
  'manage_tax_categories:codecraft',
  'manage_shipping_methods:codecraft',
  'manage_products:codecraft',
  'manage_payments:codecraft',
  'create_anonymous_token:codecraft',
  'manage_categories:codecraft',
  'manage_my_shopping_lists:codecraft',
  'manage_types:codecraft',
  'manage_my_payments:codecraft',
  'manage_orders:codecraft',
  'manage_extensions:codecraft',
  'manage_shopping_lists:codecraft',
  'manage_discount_codes:codecraft',
];
const region = 'europe-west1.gcp';
const clientID = 'CoCgAlV-gfIpaZaIbTlUAhq6';
const clientSecret = 'trN5-CHITl9NLW8YPu793dWlgke6Re4G';

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `https://auth.${region}.commercetools.com`,
  projectKey,
  credentials: {
    clientId: `${clientID}`,
    clientSecret: `${clientSecret}`,
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `https://api.${region}.commercetools.com`,
  fetch,
};

// Export the ClientBuilder
const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();

export default ctpClient;
