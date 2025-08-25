const fs = require('fs');
const path = require('path');
const express = require('express');
const port = 3000;

//criando uma instancia do servidor para o express
const app = express();

//caminho do arquivo JSON 
const carrosPath = path.join(__dirname, 'carros.json');

//lendo e convertendo os dados de JSON para objeto JS
const carrosData = fs.readFileSync(carrosPath, 'utf-8');
const carros = JSON.parse(carrosData);

//função para buscar carro especifico
function buscarCarroPorNome(nome){
    //utilizando o metodo FIND
    return carros.find(carro => carro.nome.toLowerCase() === nome.toLowerCase());

}

//rota para exibir o HTML
app.get('/', (req, res) => {
    res.send(path.join(__dirname, '/buscarCarro.html'));
});

//Rota para enviar formulario e buscar o carro por nome
app.get('/buscarCarro.html', (req,res) => {
    const nomeCarroBuscado = req.query.nome;
    const carroEncontrado = buscarCarroPorNome(nomeCarroBuscado);

    //criando condições para se o nome for encontrado
    if (carroEncontrado){
        res.send(`<h1>Carro encontrado: </h1><pre>${JSON.stringify (carrosEncontrado), null, 2}</pre>`);
    }
    else{
        res.send(`<h1>Não Encontrei</h1>`)
    }
});

//Iniciar o servidor
app.listen('/', (req, res) => {
    console.log(`Iniciando o server em http:/localhost:${port}`);
});