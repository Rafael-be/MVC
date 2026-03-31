const express = require('express');
const app = express();
const path = require('path');
const produtoRotas = require('./routes/userRoutes');

// 1. CONFIGURAÇÃO DE ARQUIVOS ESTÁTICOS (DEVE VIR PRIMEIRO)
// Isso garante que o CSS seja encontrado antes de qualquer rota
app.use(express.static(path.join(__dirname, 'public')));

// 2. CONFIGURAÇÕES DO ENGINE (EJS)
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// 3. MIDDLEWARES DE PARSE (Para ler os dados do formulário)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 4. ROTAS
// Rota da Home direta no server.js
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/sobre", (req, res) => {
    res.render("sobre");
});

app.get("/contato", (req, res) => {
    res.render("contato");
});

// Todas as outras rotas do CRUD
app.use(produtoRotas);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});