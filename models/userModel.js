class Product {
    constructor(id, name){
        this.id = id;
        this.name = name;
    }
}

const usuarios = [
    { id: 1, username: "rafa", password: "123" }
];

const produtos = [];

module.exports = { Product, produtos, usuarios };