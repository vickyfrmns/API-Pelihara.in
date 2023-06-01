const Hapi = require('@hapi/hapi');
// const Joi = require('@hapi/joi');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port : 8080,
        host : 'localhost',
        routes: 
        {
          cors: 
          {
            origin: ['*'],
          },
        },
    });

    server.route(routes);

    await server.start();
    console.log('Running On %s', server.info.uri);
};

init();