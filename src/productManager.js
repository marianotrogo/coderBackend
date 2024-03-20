import fs from "fs";


class productManager {
    #path="./src/productos.json";
    #acumulator = 0;
    
    constructor(path) {
        this.#path = path;
    }

    async addProducts(
        title, 
        description, 
        price, 
        //thumbnail, 
        code, 
        stock,
        ) {
        const products = await this.getProducts();

        const productExistentes = products.find((p) => p.code === code);
        if (productExistentes) {
            throw new Error(`Producto con codigo${code} existe`);
        }

        const newProduct = {
            id: this.#acumulator,
            title,
            description,
            price,
            // thumbnail,
            code,
            stock,
        };

        const updatedProduct = [...products, newProduct];

        await fs.promises.writeFile(this.#path, JSON.stringify(updatedProduct));

        this.#acumulator++;

        return newProduct;
    }
    async getProducts() {
        try {
            const productJSON = await fs.promises.readFile(this.#path);
            return JSON.parse(productJSON);
        } catch (err) {
            return [];
        }
    }

    async getProductsById(id) {
        const products = await this.getProducts();
        const product = products.find((p) => p.id === id);
        if (!product) {
            throw new Error(`Not Found ${id}`);
        }
        return product;
    }

    async updateProduct(id, data) {
        const products = await this.getProducts();
        const updatedProducts = products.map((p) => {
            if (p.id === id) {
                return {
                    ...p,
                    ...data,
                    id,
                };
            }
            return p;
        });

        await fs.promises.writeFile(this.#path, JSON.stringify(updatedProducts));
    }
    async deleteProduct(id) {
        const products = await this.getProducts();
        const updatedProducts = products.filter((p) => {
            return p.id !== id;
        });
        await fs.promises.writeFile(this.#path, JSON.stringify(updatedProducts));
    }
}


export default productManager;