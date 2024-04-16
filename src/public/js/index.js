const socket = io();

socket.emit('newClient', 'new client connected')

const getProducts = async()=>{

   const res = await fetch('http://localhost:8080/api/products')
   const data = await res.json()

   return data.payload
}

const renderProducts = async()=>{
   const products = await getProducts()
   const container = document.getElementById('productosActualizados')

   container.innerHTML = ''

   products.forEach(element =>{
      container.innerHTML += `
      <ul>
         <li>
         Titulo: ${element.title},
         Id: ${element.id},
         Precio: ${element.price}
         Stock: ${element.stock}
         </li>
      </ul>   
      `
   })
}

renderProducts()

socket.emit('petProds', async()=>{
   const petProds = await getProducts()
   console.log(petProds);
}
)