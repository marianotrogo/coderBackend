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
const btn = document.getElementById('agree')

let updateProds = {}

btn.addEventListener('click', (e) =>{
   e.preventDefault()
      const prodsAct ={
         title: title.value,
         description: description.value,
         price: price.value,
         code: code.value,
         stock: stock.value
      }
      updateProds.push(prodsAct)
      socket.emit('actProds', updateProds)
   })
   
socket.on('rendProdAct', data=>{
   console.log(data);
})







