const {
  getArticleCat,
  getArticleDog,
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
];

module.exports = routes;
