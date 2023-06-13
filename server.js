const Hapi = require("@hapi/hapi");
const routes = require("./src/routes");

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 8080,
    host: "0.0.0.0",
    routes: {
      payload: {
        multipart: true,
        output: "file",
        parse: true,
        allow: "multipart/form-data",
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log("Running On %s", server.info.uri);
};

init();
