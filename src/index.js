const camelCase = require('camelcase')
const createClient = require('./create-client');
const
  PRODUCTS_QUERY = require('./queries');
class ShopifySource {
  static defaultOptions() {
    return {
      shopName: undefined,
      accessToken: undefined,
      typeName: 'Shopify',
    }
  }

  constructor(api, options) {
    this.options = options
    this.typesIndex = {}
    this.client = createClient(options.shopName, options.accessToken)

    api.loadSource(async actions => {
      const variables = {
        first: 250
      }
      const {
        shop
      } = await this.client.request(PRODUCTS_QUERY, variables);
      const productCollection = actions.addCollection({
        typeName: 'Product',
        route: '/product/:handle'
      })


      for (const product of shop.products.edges) {
        console.log(product.node.title)
        productCollection.addNode({
          id: product.node.id,
          handle: product.node.handle,
          title: product.node.title,
          images: product.node.images.edges.map(each => each.node.originalSrc)
        })
      }

    })
  }


  createTypeName(name = '') {
    return camelCase(`${this.options.typeName} ${name}`, {
      pascalCase: true
    })
  }
}


module.exports = ShopifySource