const { 
    getArticleCat, 
    getArticleDog, 
    addArticleDog, 
    editArticleDog,
    deleteArticleDog,
    editArticleCat, 
    deleteArticleCat, 
    addArticleCat, 
    getallArticleCat, 
    deleteallArticleCat, 
    getallArticleDog, 
    deleteallArticleDog 
} = require("./handler");

const routes = [
    {
        method : 'GET',
        path : '/Cat/{id}',
        handler : getArticleCat,
    },
    {
        method : 'GET',
        path : '/Cat',
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
        path : '/Dog/{id}',
        handler : getArticleDog,
    },
    {
        method : 'GET',
        path : '/Dog',
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
        path : '/Dog',
        handler : addArticleDog
    },
];

module.exports = routes;