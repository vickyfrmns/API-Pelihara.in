const { getArticleCat, getArticleDog, addArticleDog, editArticleDog, deleteArticleDog, editArticleCat, deleteArticleCat, addArticleCat } = require("./handler");

const routes = [
    {
        method : 'GET',
        path : '/home/cat/{idCat}',
        handler : getArticleCat,
    },
    {
        method : 'PUT',
        path : '/home/cat/{idCat}',
        handler : editArticleCat
    },
    {
        method : 'DELETE',
        path : '/home/cat/{idCat}',
        handler : deleteArticleCat
    },
    {
        method : 'POST',
        path : '/home/cat',
        handler : addArticleCat
    },
    {
        method : 'GET',
        path : '/home/dog/{idDog}',
        handler : getArticleDog,
    },
    {
        method : 'PUT',
        path : '/home/dog/{idDog}',
        handler : editArticleDog
    },
    {
        method : 'DELETE',
        path : '/home/dog/{idDog}',
        handler : deleteArticleDog
    },
    {
        method : 'POST',
        path : '/home/dog',
        handler : addArticleDog
    },
];

module.exports = routes;