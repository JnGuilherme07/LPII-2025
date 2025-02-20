const http = require('http');

const server = http.createServer((req,res) => {
    //rota  principal
    if (req.url === '/'){
        res.writeHead(200, {'Content-type' : 'text/plain'});

        res.end('Hello World \n');
    }

    //rota pagina de aluno
    else if(req.url === '/aluno'){
        res.writeHead(200, {'Content-type' : 'text/plain'});
        res.end('Alunos');
    }

    //rota pagina de professores
    else if(req.url === '/professores'){
        res.writeHead(200, {'Content-type' : 'text/plain'});
        res.end('Professores');
    }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Servidor rodando em https://localhost:${PORT}`);
});