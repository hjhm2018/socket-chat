var socket = io();


// Chequear lo que viene de la url
var params = new URLSearchParams(window.location.search);

if(!params.has('nombre') || !params.has('sala')){
    window.location = 'index.html'
    throw new Error('El nombre y sala es necesario');
}

// Recibir el nombre por la url

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')

}
socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(res){
        console.log("Usuarios conectados", res)
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});


// Escuchar cambios de usuarios, cuando entra o sale un usuario

socket.on('listaPersona', function(personas) {

    console.log(personas);

});


// Mensajes privados

socket.on('mensajePrivado', function(mensaje) {

    console.log('Mensaje privado:', mensaje);

});


