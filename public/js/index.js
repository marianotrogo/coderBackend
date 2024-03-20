const socket = io();

const productData = document.getProductsById("prodsList-display");
socket.on("productList", async(data)=>{
    console.log(data);
    let prodsList = "";
    await data.forEach((e)=>{
        prodsList += `
            <ul>
                <li> Titulo:${e.title},
                    Id:${e.id},
                    Precio:${e.precio},
                    Stock:${e.stock}
                </li>
            </ul>`
        });
        productData.innerHTML = prodsList;
});