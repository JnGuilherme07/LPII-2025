//carrega os modulos
var http = require('http');
var url = require('url');
var fs = require('fs');
//função para ler um arquivo e escrevolo na response.
function readFile(response, file) {
    //faz a leitura do arquivo de forma assincrona
    fs.readFile(file, function(err, data) {
        //quando ler, escreve na response o conteúdo do arquivo JSON.
        response.end(data);
    });
}

//função de callback para servidor HTTP
function  callback(request, response) {
    //cabeçalho (header) com o tipo da resposta + UTF-8 como charset
    response.writeHead(200, {"Content-Type": "application/json; charset=uft-8"});
    //faz o parser  da URL separando o caminho (path)
    var parts = url.parse(request.url);
    var path = parts.path;

    //varifica o path
    if (path == '/carros/classicos') {
        //retorna o JSON dos carros clássicos
        readFile(response, "carros_classicos.json");
    }
    else if (path == '/carros/esportivos') {
        //retorna o JSON dos carros esportivo
        readFile(response, "carros_esportivos.json");
    }
    else if (path == '/carros/luxo') {
        //retorna o JSON dos carros luxo
        readFile(response, "carros_luxo.json");
    }
    else{
        response.end("Path não mapeado:" + path);
    }
}

//criar um servidor HTTP que vai responder "Hello World" para todos requisições
var server = http.createServer(callback);
//porta que o servidor vai escutar
server.listen(3000);
//mensagem ao iniciar o servidor
console.log("Servidor iniciando em http://localhost:3000/");