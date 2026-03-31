const express = require('express');
const app = express();
const path = require('path');
const productController = require('./routes/userRoutes');

app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/sobre", (req, res) => {
    res.render("sobre");
});

app.get("/contato", (req, res) => {
    res.render("contato");
});

app.use(productController);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});