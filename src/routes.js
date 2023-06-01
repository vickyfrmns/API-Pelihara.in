const { getArticleCat, getArticleDog, addArticleDog, editArticleDog, deleteArticleDog, editArticleCat, deleteArticleCat, addArticleCat, getallArticleCat, deleteallArticleCat, getallArticleDog, deleteallArticleDog } = require("./handler");

const routes = [
    {
        method : 'GET',
        path : '/home/cat/{idCat}',
        handler : getArticleCat,
    },
    {
        method : 'GET',
        path : '/home/cat',
        handler : getallArticleCat,
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
        method : 'DELETE',
        path : '/home/cat',
        handler : deleteallArticleCat
    },
    {
        method : 'POST',
        path : '/home/cat',
        handler : addArticleCat
    },

    ////// =========================  Split Between Cat and Dog Routes ==================== ///

    {
        method : 'GET',
        path : '/home/dog/{idDog}',
        handler : getArticleDog,
    },
    {
        method : 'GET',
        path : '/home/dog',
        handler : getallArticleDog,
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
        method : 'DELETE',
        path : '/home/dog',
        handler : deleteallArticleDog
    },
    {
        method : 'POST',
        path : '/home/dog',
        handler : addArticleDog
    },
];

module.exports = routes;