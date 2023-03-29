const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, '[]');
    }
  }

  getNextId() {
    const products = this.getProducts();
    const lastProduct = products[products.length - 1];
    return lastProduct ? lastProduct.id + 1 : 1;
  }

  addProduct(product) {
    product.id = this.getNextId();
    const products = this.getProducts();
    products.push(product);
    fs.writeFileSync(this.path, JSON.stringify(products));
    return product.id;
  }

  getProducts() {
    const products = fs.readFileSync(this.path, 'utf-8');
    return JSON.parse(products);
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find(product => product.id === id);
  }

  updateProduct(id, updates) {
    const products = this.getProducts();
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      return false;
    }
    const updatedProduct = {...products[productIndex], ...updates};
    products[productIndex] = updatedProduct;
    fs.writeFileSync(this.path, JSON.stringify(products));
    return true;
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const updatedProducts = products.filter(product => product.id !== id);
    fs.writeFileSync(this.path, JSON.stringify(updatedProducts));
  }
}


module.exports = ProductManager;
