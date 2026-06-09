const { Product, produtos } = require("../models/userModel");

/**
 * Cria um novo produto com base nos dados enviados pelo formulario.
 *
 * @param {import("express").Request<{}, {}, {name: string}>} req - Requisicao HTTP com o nome do produto no corpo.
 * @param {import("express").Response} res - Resposta HTTP usada para redirecionar o usuario.
 * @returns {void}
 */
exports.criarProduto = (req, res) => {
    const {name} = req.body;
    const novoProduto = new Product(Date.now(), name);
    produtos.push(novoProduto);
    res.redirect("/CRUD");  
}
 
/**
 * Renderiza a pagina de CRUD com todos os produtos cadastrados.
 *
 * @param {import("express").Request} req - Requisicao HTTP recebida pela rota.
 * @param {import("express").Response} res - Resposta HTTP usada para renderizar a view.
 * @returns {void}
 */
exports.getProdutos = (req, res) => {
   console.log(produtos);
   res.render("CRUD", { produtos });
}; 



/**
 * Remove um produto da lista em memoria pelo id informado na rota.
 *
 * @param {import("express").Request<{id: string}>} req - Requisicao HTTP com o id do produto nos parametros da rota.
 * @param {import("express").Response} res - Resposta HTTP usada para redirecionar o usuario.
 * @returns {void}
 */
 exports.deletarProduto = (req, res) => {
    const idProduct = Number(req.params.id);
    const index = produtos.findIndex(p => p.id === idProduct);
    
    if (index !== -1) {
        produtos.splice(index, 1);
    }
     res.redirect('/CRUD');
 }
 


/**
 * Atualiza o nome de um produto existente pelo id informado na rota.
 *
 * @param {import("express").Request<{id: string}, {}, {name: string}>} req - Requisicao HTTP com o id na rota e o novo nome no corpo.
 * @param {import("express").Response} res - Resposta HTTP usada para redirecionar o usuario.
 * @returns {void}
 */
exports.atualizarProduto = (req, res) => {
    const idProduct = req.params.id;
    const novoNome = req.body.name;

    const produto = produtos.find(p => p.id == idProduct);
    
    if (produto) {
        produto.name = novoNome; 
    }

    res.redirect("/CRUD");
};
