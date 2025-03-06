//importando os modulos
const fs = require('fs'); //Modulo de manipulação de arquivos
const path = require('path'); //Modulos para manipulação de caminhos
const express = require('express'); //Módulos para criação de servidor WEB

//Criando uma instancia de servidor usando express
const app = express();

//Configurando porta em que o servidor irá escutar
const port = 3000;

//Caminho do arquivo JSON que contém os dados dos carros
const carrosPath = path.join(_dirname, 'carros_luxo.json');

//Lendo e convertendo os dados do arquivo JSON em JS
const carrosData = fs.readFileSync(carrosPath, 'utf-8');
const carros = JSON.parse(carrosData);

//Função para buscar um carro em especifico pelo nome
function buscarCarro(nome) {
    //Utilizando o método FIND para procurar um carro
    //Com o nome correspondente do array
    return carros.find(carro => carro.nome.toLowerCase() === nome.toLowerCase());
}

//Rotas para buscar e exibir um carro pelo nome
app.get('/buscar-carros/:nome', (req, res) => {
    //Obtendo o nome do carro a ser buscado a partir da URL
    const nomeDoCarroBuscado = req.params.nome;

    //Chamando a função para buscar o carro pelo nome
    const carroEncontrado = buscarCarroPorNome(nomeDoCarroBuscado);

    //Verificando se o carro foi encontrado
    if (carroEncontrado) {
        res.send(`<h1>Carro encontrado: </h1> <pre>${JSON.stringify(carroEncontrado, null, 2)}</pre>`);
    }
    else {
        //Enviando uma resposta indicando que o carro não foi encontrado
        res.send(`<h1>Carro não encontrado</h1>`);
    }
})

//Iniciar o servidor e escutar a porta exepecificada
app.listen(port, () => {
    console.log(`Servidor rodando em https://localhost:${PORT}`);
});
