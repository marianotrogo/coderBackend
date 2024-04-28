const socket = io();


const chatBox = document.getElementById('chatBox')
const messagesBox = document.getElementById('messagesBox')


const getUsername = async () => {
    try {
        const userName = await Swal.fire({
            title: "Bienvenido al Chat",
            text: "Ingrese el Nombre de Usuario",
            input: "text",
            icon: "success"
        })

        socket.emit('newUser', { userName: userName.value })
        socket.on('userConnected', user => {
            swal.fire({
                text: `${user.userName} Conectado!`,
                toast: true,
                position: "top-end",
                timer: 3000,
                timerProgressBar: true,
                icon: "success"
            })
        })

        chatBox.addEventListener('keyup', async e => {
            if (e.key === 'Enter') {
                const data = {
                    userName: userName.value,
                    message: chatBox.value
                }
                chatBox.value = ''

                socket.emit('message', data)
                
            }
        })
    } catch (error) {
        console.log(error)
    }
}


getUsername()


socket.on('messagesBox', data => {
    let messages = '';
    data.forEach(chat => (messages += `${chat.userName} dice: ${chat.message} <hr>`))
    messagesBox.innerHTML = messages
})

