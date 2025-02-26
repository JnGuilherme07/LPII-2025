var http = require('http');
var url = require('url');
var fs = require('fs');

function readFile(response, file) {

    fs.readFile(file, function (err, data) {

        response.end(data);
    });
}

function callback(request, response) {
    response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" })
    var parts = url.parse(request.url);
    var path = parts.path;
    if (path == '/mercado/produtos') {
        readFile(response, "produtos.json");
    }
    else if (path == '/mercado/clientes') {
        readFile(response, "clientes.json");
    }
    else if (path == '/mercado/pedidos') {
        readFile(response, "pedidos.json");
    }
    else if (path == '/mercado/categorias') {
        readFile(response, "categorias.json");
    }
    else {
        response.end("ERRO : " + path);
    }
}

var server = http.createServer(callback);
server.listen(3000);
console.log("servidor iniciado em http://localhost:3000/")
