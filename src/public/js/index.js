const socket = io();

socket.emit('newClient', 'new client connected')

const productData = document.getElementById('productosActualizados')



socket.on('productList', function (data) {
   console.log(data)}
)



// socket.on("productList", async (data)=>{
//     let prodsList = "";
//           await data.forEach((e)=>{
//             console.log(e);
//         prodsList += `
//             <ul>
//                 <li> Titulo:${e.title},
//                     Id:${e.id},
//                     Precio:${e.price},
//                     Stock:${e.stock}
//                 </li>
//             </ul>`
//         });
//         productData.innerHTML = prodsList;
        
// });