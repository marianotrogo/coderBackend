const socket = io();



socket.emit('newClient', 'new client connected')



const getProducts = async () => {

   const res = await fetch('http://localhost:8080/api/products')
   const data = await res.json()

   return data.payload
}

const renderProducts = async () => {
   const products = await getProducts()
   const container = document.getElementById('productosActualizados')

   container.innerHTML = ''

   products.forEach(element => {
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


const title = document.getElementById('title')
const description = document.getElementById('description')
const price = document.getElementById('price')
const code = document.getElementById('code')
const stock = document.getElementById('stock')
const formAdd = document.getElementById('formAdd')



formAdd.addEventListener('submit', (e) =>{
   e.preventDefault()
      const prodsAct ={
         title: title.value,
         description: description.value,
         price: price.value,
         code: code.value,
         stock: stock.value
      }
     
   
      socket.emit('actProds', prodsAct)
   })

   socket.on('prodsAct', data=>{
      console.log(data);
   })
   








