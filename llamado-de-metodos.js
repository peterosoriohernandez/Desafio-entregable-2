const ProductManager = require('./ProductManager');

const productManager = new ProductManager('products.json');

const productId = productManager.addProduct({
    title: 'empanadas',
    description:'Estan hecha co masa de maiz y rellenas de carne, pollo, queso',
    price: '120',
    thumbnail: 'link',
    code: '02',
    stock: '700'
});

console.log(productId)


