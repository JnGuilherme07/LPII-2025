const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

const pilotosPath = path.join(__dirname, 'pilotos.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let pilotosData = fs.readFileSync(pilotosPath, 'utf-8');

function salvarDados(novosPilotos) {
    fs.writeFileSync(pilotosPath, JSON.stringify(novosPilotos, null, 2));
}

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/filtrar-pilotos', (req, res) => {
    res.sendFile(path.join(__dirname, 'pilotos.json'));
});

app.get('/adicionar-piloto', (req, res) => {
    res.sendFile(path.join(__dirname, 'adicionarPiloto.html'));
});

app.post('/adicionar-piloto', (req, res) => {
    const novoPiloto = req.body;

    let pilotos = JSON.parse(fs.readFileSync(pilotosPath, 'utf-8'));

    if (pilotos.find(piloto => piloto.nome.toLowerCase() === novoPiloto.nome.toLowerCase())) {
        res.send('<h1>Esse piloto já existe. Não é possível adicionar duplicatas.</h1><br> <a href="/home">Voltar à Página Inicial</a>');
        return;
    }

    pilotos.push(novoPiloto);
    salvarDados(pilotos);

    res.send('<h1>Piloto adicionado com sucesso!</h1> <br> <a href="/home">Voltar à Página Inicial</a>');
});

app.get('/atualizar-piloto', (req, res) => {
    res.sendFile(path.join(__dirname, 'atualizarPiloto.html'));
});

app.post('/atualizar-piloto', (req, res) => {
    const { nome, nacionalidade, equipe } = req.body;

    let pilotos = JSON.parse(fs.readFileSync(pilotosPath, 'utf-8'));

    const pilotoIndex = pilotos.findIndex(piloto => piloto.nome.toLowerCase() === nome.toLowerCase());

    if (pilotoIndex === -1) {
        res.send('<h1>Piloto não encontrado.</h1> <br> <a href="/home">Voltar à Página Inicial</a>');
        return;
    }

    pilotos[pilotoIndex].nacionalidade = nacionalidade;
    pilotos[pilotoIndex].equipe = equipe;

    salvarDados(pilotos);

    res.send('<h1>Dados do piloto atualizados com sucesso!</h1> <br> <a href="/home">Voltar à Página Inicial</a>');
});

function excluirDados(pilotos) {
    fs.writeFileSync(pilotosPath, JSON.stringify(pilotos, null, 2));
}

app.get('/excluir-piloto', (req, res) => {
    res.sendFile(path.join(__dirname, 'excluirPiloto.html'));
});

app.post('/excluir-piloto', (req, res) => {
    const { nome } = req.body;

    let pilotosData = fs.readFileSync(pilotosPath, 'utf-8');
    let pilotos = JSON.parse(pilotosData);

    const pilotoIndex = pilotos.findIndex(piloto => piloto.nome.toLowerCase() === nome.toLowerCase());

    if (pilotoIndex === -1) {
        res.send('<h1>Piloto não encontrado.</h1> <br> <a href="/home">Voltar à Página Inicial</a>');
        return;
    }

    res.send(`
    <script>
    if (confirm('Tem certeza de que deseja excluir o piloto ${nome}?')) {
        window.location.href = '/excluir-piloto-confirmado?nome=${nome}';
    } else {
        window.location.href = '/excluir-piloto';
    }
    </script>
    `);
});

app.get('/excluir-piloto-confirmado', (req, res) => {
    const nome = req.query.nome;

    let pilotosData = fs.readFileSync(pilotosPath, 'utf-8');
    let pilotos = JSON.parse(pilotosData);

    const pilotoIndex = pilotos.findIndex(piloto => piloto.nome.toLowerCase() === nome.toLowerCase());

    if (pilotoIndex === -1) {
        res.send('<h1>Piloto não encontrado.</h1> <br> <a href="/home">Voltar à Página Inicial</a>');
        return;
    }

    pilotos.splice(pilotoIndex, 1);

    excluirDados(pilotos);

    res.send(`<h1>O piloto ${nome} foi excluído com sucesso!</h1> <br> <a href="/home">Voltar à Página Inicial</a>`);
});

app.get('/buscar-piloto-nome', (req, res) => {
    res.sendFile(path.join(__dirname, 'buscarPilotoNome.html'));
});

app.get('/buscar-piloto-por-nome', (req, res) => {
    const nomeBuscado = req.query.nome;

    let pilotos = JSON.parse(fs.readFileSync(pilotosPath, 'utf-8'));

    const pilotoEncontrado = pilotos.find(piloto => piloto.nome.toLowerCase() === nomeBuscado.toLowerCase());

    if (pilotoEncontrado) {
        res.send(`<h1>Piloto encontrado</h1><pre>${JSON.stringify(pilotoEncontrado, null, 2)}</pre><br><a href="/home">Voltar à Página Inicial</a>`);
    } else {
        res.send('<h1>Piloto não encontrado.</h1><br><a href="/home">Voltar à Página Inicial</a>');
    }
});

app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}/home`);
});