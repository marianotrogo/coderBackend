const socket = io();

socket.emit('newClient', 'new client connected')

const productData = document.getElementById('productosActualizados')

socket.on("productList", async data=>{
    const dataProd = JSON.parse(data)
    console.log(dataProd);
    let prodsList = "";
          await dataProd.forEach((e)=>{
        prodsList += `
            <ul>
                <li> Titulo:${e.title},
                    Id:${e.id},
                    Precio:${e.price},
                    Stock:${e.stock}
                </li>
            </ul>`
        });
        productData.innerHTML = prodsList;
        
});