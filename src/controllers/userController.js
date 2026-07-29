const { Product, produtos } = require("../models/userModel");

exports.criarProduto = (req, res) => {
    const {name} = req.body;
    const novoProduto = new Product(Date.now(), name);
    produtos.push(novoProduto);
    res.redirect("/CRUD");  
}
 
exports.getProdutos = (req, res) => {
   console.log(produtos);
   res.render("CRUD", { produtos });
}; 



 exports.deletarProduto = (req, res) => {
    const idProduct = Number(req.params.id);
    const index = produtos.findIndex(p => p.id === idProduct);
    
    if (index !== -1) {
        produtos.splice(index, 1);
    }
     res.redirect('/CRUD');
 }
 


exports.atualizarProduto = (req, res) => {
    const idProduct = req.params.id;
    const novoNome = req.body.name;

    const produto = produtos.find(p => p.id == idProduct);
    
    if (produto) {
        produto.name = novoNome; 
    }

    res.redirect("/CRUD");
};