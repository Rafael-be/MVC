const express = require('express');
const session = require('express-session'); // Troque cookie-parser por isso
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const productRoutes = require('./routes/userRoutes');
const authController = require('./controllers/authController');

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração Obrigatória da Sessão
app.use(session({
    secret: 'chave_secreta_faculdade',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 } // 1 hora de expiração
}));

// --- ROTAS PÚBLICAS (Sem login) ---
app.get("/login", (req, res) => res.render("login", { error: null }));
app.post("/login", authController.login);
app.get("/logout", authController.logout);

// --- ROTAS PROTEGIDAS (Tudo abaixo precisa de login) ---
// O professor disse: "Nenhuma página deve ser acessada sem autenticação"
const authMiddleware = require('./middleware/authMiddleware');
app.use(authMiddleware); 

app.get("/", (req, res) => res.render("index"));
app.get("/sobre", (req, res) => res.render("sobre"));
app.get("/contato", (req, res) => res.render("contato"));

app.use(productRoutes);

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));