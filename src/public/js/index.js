const socket = io();


socket.emit('newClient', 'new client connected')







const productData = document.getElementById("prodsList-display");

socket.on("productList", async(data)=>{
    let prodsList = "";
    console.log(data);
    await data.forEach((e)=>{

        console.log(data);
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