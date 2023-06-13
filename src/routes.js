const {
  getArticleCat,
  getArticleDog,
  addArticleCat,
  addArticleDog,
  getallArticleCat,
  getallArticleDog,
} = require("./handler");

const routes = [
  {
    method: "GET",
    path: "/Cat/{id}",
    handler: getArticleCat,
  },
  {
    method: "GET",
    path: "/Cat",
    handler: getallArticleCat,
  },
  {
    method: "POST",
    path: "/Cat",
    handler: addArticleCat,
  },

  ////// =========================  Split Between Cat and Dog Routes ==================== ///

  {
    method: "GET",
    path: "/Dog/{id}",
    handler: getArticleDog,
  },
  {
    method: "GET",
    path: "/Dog",
    handler: getallArticleDog,
  },
  {
    method: "POST",
    path: "/Dog",
    handler: addArticleDog,
  },
];

module.exports = routes;
