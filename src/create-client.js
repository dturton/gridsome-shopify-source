const {
  GraphQLClient
} = require("graphql-request");
/**
 * Create a Shopify Storefront GraphQL client for the provided name and token.
 */
const createClient = (shopName, accessToken) =>
  new GraphQLClient(`https://veestro.com/api/2019-07/graphql.json`, {
    headers: {
      "X-Shopify-Storefront-Access-Token": accessToken,
    },
  })

module.exports = createClient