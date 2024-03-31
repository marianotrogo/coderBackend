const socket = io();

const chatBox = document.getElementById('chatBox');

const getUserName = async () => {
    try {
        const userName = await Swal.fire({
            title: "Bienvenido al Chat",
            text: "Ingresa tu Nombre de usuario",
            input: "text",
            icon: "success"
        });

        console.log(userName.value)
    } catch (error) {
        console.log(error);
    }

}

getUserName();

chatBox.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        const data = chatBox.value
        chatBox.value = ''
        console.log(data);
        socket.emmit('message', data)
    }
})