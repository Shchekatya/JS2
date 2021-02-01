
const Shop = {
    data() {
        return {
            API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
            catalogUrl: '/catalogData.json',
            cartUrl: '/getBasket.json',
            products: [],
            imgCatalog: 'https://placehold.it/150x150',
            imgCart: 'https://placehold.it/100x50',
            productsCart: [],
            showCart: false,
            searchLine: ''
        }
    },
    
    
    computed:{
        FilterGoods(){
            return this.products.filter(item => new RegExp(this.searchLine, 'i').test(item.product_name));
        }
    },
    
    methods: {
        getJson(url){
            return fetch(url)
            .then(result => result.json())
            .catch(error => console.log(error));
        },
        
        addProduct(product){
            this.getJson(`${this.API}/addToBasket.json`)
                .then(data => {
                    if (data.result) {
                        let find = this.productsCart.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++
                        } else {
                            let prod = Object.assign({quantity:1}, product);
                            this.productsCart.push(prod);
                        }
                    }
                });
        },
        
        remove(product){
              this.getJson(`${this.API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result) {                        
                        if (product.quantity >1) {
                            product.quantity--
                        } else {                            
                            this.productsCart.splice(this.productsCart.indexOf(product), 1);
                        }
                    }
                });
        }
    },
    
    mounted() {
        this.getJson(`${this.API + this.catalogUrl}`)
            .then(data => {
                for (let product of data) {
                    this.products.push(product);
                }
            });        
        
        this.getJson(`getProducts.json`)
            .then(data => {
            for (let product of data){
                this.products.push(product);
            }
        });
        
                this.getJson(`${this.API + this.cartUrl}`)
            .then(data => {
                for (let product of data.contents) {
                    this.productsCart.push(product);
                }
            }); 
        
    }
};

Vue.createApp(Shop).mount('#app');




//
//let getData = (url) => {
//    return new Promise ((resolve, reject) => {
//        let xhr = new XMLHttpRequest();
//        xhr.open(GET, url, true);
//        xhr.onreadystatechange=() => {
//        if (xhr.readyState===4) {
//            if (xhr.status !==200) {
//                reject('error')
//            } else {
//                resolve(xhr.responseText);
//            }
//        }
//    }
//        
//    });                         
//};
//
//class Item {
//  constructor (product, img='https://placehold.it/150x100') {
//      let { product_name, price=0, id_product } = product;
//      this.title = product_name;
//      this.img = img;
//      this.price = price;
//      this.id = id_product;
//      this.rendered = false;
//      }
//
//    
//  render() {
//      this.rendered = true;
//      return `<div class="product-item">
//      <img src="${this.img}" alt="${this.title}">
//      <h3>${this.title}</h3>
//      <p>${this.price} руб</p>
//      <button class="bth-buy" data-id="${this.id}">Купить</button>
//      </div>`  
//    }
//}
//
//class Product extends Item {}
//
//class CartItem extends Item {
//    constructor (el, img='https://placehold.it/50x50'){
//        super(el, img);
//        this.quantity = el.quantity;
//    }
//    
//    changeQuantity(count) {
//        this.quantity += count;
//        this._updateItem();
//    }
//    
//    remove() {
//        document.querySelector('.cart-item[data-id="${this.id}"]').remove();
//    }
//    
//     render() {
//        this.rendered = true;
//        return `<div class="cart-item" data-id="${this.id}>
//        <div class="product-bio">
//        <img src="${this.img}" alt="${this.title}">
//        <div class="product-desc">
//        <p class="product-title">${this.title}</p>
//        <p class="product-quantity">Количество:${this.quantity}</p>
//        </div> 
//        <div class="product-price-del">
//        <p class="product-price">${this.quantity*this.price} руб</p>
//        <button class="bth-del" data-id="${this.id}">&times;</button>
//        </div>  
//        </div>      
//        </div>`  
//    }
//    
//    _updateItem() {
//        const block = document.querySelector('.cart-item[data-id="${this.id}"]');
//        block.querySelector('product-quantity').textContent = 'Количество:${this.quantity}';
//        block.querySelector('product-price').textContent = '${this.quantity*this.price}';
//    }
//    
//}
//
//
//class List {
//    static API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
//    static itemsMap = {
//        List: Item,
//        Cart: CartItem,
//        ProductsList: Product
//    };
//
//    constructor (url, container = '.products'){
//        this.url = url;
//        this.products = [];
//        this.container = document.querySelector(container);
//        this.init();
//        }
//    
//init(){
//    return false;
//}
//     
//culcPrice(){
//    return this.products.reduce((accum, item) => accum += item.price, 0);
//}
//
//    getJson(url) {
//        return fetch(url ? url : `${List.API + this.url}`)
//            .then(result => result.json())
//            .catch(error => console.log(error));
//    }
//    
//    handleData(data) {
//        for (let dataEl of data) {
//            const product = new List.itemsMap[this.constructor.name](dataEl);
//            this.products.push(product);
//        }
//
//        this._render();
//    }
//
//
//getItem(id){
//    return this.products.find(product => product.id ===id);
//}
//
//    _render() {
//        for (let product of this.products) {
//            if (product.rendered) {
//                continue;
//            }
//            this.container.insertAdjacentHTML('beforeend', product.render());
//        }
//    }
//}
//
//
//class ProductList extends List{
//    constructor (cart, url='/catalogData.json', container = '.products'){    
//        super (url, container);
//        this.cart=cart;
//        this.getJson()
//            .then((data) => this.handleData(data));
//    }
//    
//    init(){
//        this.container.addEventListener('click', e=> {
//            if (e.target.classList.contains('bth-buy')) {
//                const id = +e.target.dataset['id'];
//                this.cart.addProduct(this.getItem(id));
//            }
//        })
//    }
//}
//
//
//class Cart extends List{
//     constructor (url='/getBasket.json', container = '.cart-block'){    
//        super (url, container);        
//        this.getJson()
//            .then((data) => this.handleData(data.contents));
//}
//    
//    
//init(){
//    this.container.addEventListener('click', e=>{
//         if (e.target.classList.contains('bth-del')) {
//                const id = +e.target.dataset['id'];
//                this.removeProduct(this.getItem(id));
//            }
//    });
//    document.querySelector('.btn-cart').addEventListener('click', ()=>{
//        this.container.classList.toggle('invisible');
//    })
//}    
//    
//    addProduct(product) {
//        this.getJson('${List.API}/addToBasket.json')
//            .then(data => {
//              if (data.result) {
//                  let find = this.products.find(el => el.id === product.id);
//                  if (find) {
//                      find.changeQuantity(1);
//                  } else {
//                      let prod = Object.assign({quantity:1, product_name: product.title, id_product: product_id}, product);
//                      this.handleData([prod]);
//                  }
//              } else {
//                  console.log('error');
//              }
//        })
//    }
//    
//    removeProduct(product) {
//        this.getJson('${List.API}/deleteFromBasket.json')
//            .then(data => {
//              if (data.result) {
//                 if (product.quantity>1) {
//                     product.changeQuantity(-1)
//                 } else {
//                     this.product.splice(this.products.indexOf(product), 1);
//                     product.remove();
//                 }
//              } else {
//                  console.log('error');
//              }
//        })
//    }
//}
//
//
//let cart = new Cart();
//const list = new ProductList(cart);
//list.init();
//
