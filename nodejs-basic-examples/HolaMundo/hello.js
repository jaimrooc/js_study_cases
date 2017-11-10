let http = require("http");

let manejador = function(solicitud, respuesta){
		console.log("hola");
		respuesta.end("Hola mundo, jairo, hugo, pedro");
}

let servidor = http.createServer(manejador);

servidor.listen(1000);