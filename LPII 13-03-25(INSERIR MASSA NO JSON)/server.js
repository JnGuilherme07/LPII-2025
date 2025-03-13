const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const port = 3001;

const carrosPath = path.join(_dirname, 'carros_classicos.json');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//lendo os dados do arquivo json
let carrosData = fs.readFileSync(carrosPath, 'utf-8');
let carros = JSON.parse(carrosData);

//função para inserir novos dados esalvar no arquivo Json
function salvarDados(){
    fs.writeFileSync(carrosPath, Json.stringfy(carros, null, 2));
};

//rota para exibir formulário HTML
app;get('/adicionar-carro' , (req,res) => {
    res.sendFile(path.join(__dirname, 'adiconarcarro.html'));
});

//rota para processar a requisição POST do formulário
app.post('/adicionar-carro', (req,res) =>{
    const novoCarro = req.body;

    //verificando se o carro já existe pelo nome
    if(carros.find(carro.nome.toLowerCase() === novoCarro.nome.tpLowerCase())){
        res.send('<h1> Carro já existe. Não é possivel adicionar duplicaas</h1>');
        return;
    };
    //adicionar o novo carro ao arrey de carro
    carros.push(novoCarro);

    //savando os dados no arquivo Json
    salvarDados();

    //Enviando uma resposta indicando que o carro foi adicionado com sucesso
    res.send('<h1>Carro adicionado com sucesso</h1>');

});

//Iniciar o servidor e escutar a porta exepecificada
app.listen(port, () => {
    console.log(`Servidor rodando em https://localhost:3001`);
});