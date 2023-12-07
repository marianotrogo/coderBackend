class ProductManager {
    products =[];
    #acumulador = 0;

    addProduct(title,description,price,thumbnail,code,stock){
        const product = this.products.find((prod)=> prod.code === code);
        if(!product){
            const newProduct = {
                id: this.#acumulador,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };
            this.products = [...this.products, newProduct];
            this.#acumulador++
        }else{
            throw new Error(`Error el producto code ${code} existe`);

        }
    }

    getProducts(){
        return this.products;
    }
    getProductsById(idProduct){
        const product = this.products.find((prod)=>prod.id === idProduct);
        if(!product){
            throw new Error(`Not Found`);

        }else{
            console.log(`EL producto con ${product.id} existe`)
            return product
        }
        }
}

const manager = new ProductManager();
console.log(manager.getProducts());

manager.addProduct(
    'Bladurs Gate 3',
    'PC',
    99,
    'img bg',
    '4456',
    12
)
manager.addProduct(
    'Red Dead Redeption',
    'PC',
    109,
    'img red',
    '0023',
    12
)

console.log(manager.getProducts());

manager.getProductsById(0);
manager.getProducts(1)

//realizare cambios aqui

//Mauro envio esto para no perder la entrega