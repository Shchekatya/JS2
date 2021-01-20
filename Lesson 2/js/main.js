class Product {
  constructor (product, img='https://placehold.it/150x100') {
      let { title, price=0, id } = product;
      this.title = title;
      this.img = img;
      this.price = price;
      this.id = id;
      }

    
  render() {
      return `<div class="product-item">
      <img src="${this.img}" alt="${this.title}">
      <h3>${this.title}</h3>
      <p>${this.price} руб</p>
      <button class="bth-buy">Купить</button>
      </div>`  
    }
}

class ProductList{
    constructor (container = '.products'){
        this.data = [];
        this.products = [];
        this.container = document.querySelector(container);
    }
    
    init() {
        this._fetchData();
        this._render();
    }
    
    calcPrice(){
        let sum=0;
        for (let product of this.products) {
            sum+=product.price;
        }
        return sum;
    }
    
    _fetchData() {
        this.data = [
           { id: 1, title: 'Notebook', price: 2000 },
           { id: 2, title: 'Keyboard', price: 200 },
           { id: 3, title: 'Mouse', price: 100 },
           { id: 4, title: 'Gamepad' },
        ]
    }
    
    _render() {
        for (let dataEl of this.data) {
            const product = new Product(dataEl);
            this.products.push(product);
            this.container.insertAdjacentHTML('beforeend', product.render());
        }
    }
}

const list = new ProductList();
list.init();

console.log(list.calcPrice());


class CartProduct{
    constructor(){
//      title - название товара, добавленного в корзину
//      price - его цена
    }
}


class CartProductList{
    constructor(){
//      массив products - массив товаров, добавленных в корзину
    }
}
