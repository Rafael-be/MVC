/**
 * Representa um produto cadastrado no sistema.
 */
class Product {
    /**
     * Cria uma nova instancia de produto.
     *
     * @param {number} id - Identificador unico do produto.
     * @param {string} name - Nome do produto.
     */
    constructor(id, name){
        /**
         * Identificador unico do produto.
         *
         * @type {number}
         */
        this.id = id;

        /**
         * Nome do produto.
         *
         * @type {string}
         */
        this.name = name;
    }
}

/**
 * Lista de usuarios autorizados a acessar a aplicacao.
 *
 * @type {Array<{id: number, username: string, password: string}>}
 */
const usuarios = [
    { id: 1, username: "rafa", password: "123" }
];

/**
 * Lista em memoria dos produtos cadastrados durante a execucao da aplicacao.
 *
 * @type {Product[]}
 */
const produtos = [];

module.exports = { Product, produtos, usuarios };
