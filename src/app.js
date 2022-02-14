import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import indexRouter from './routes/index.js';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/pokemon', indexRouter);

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "PokeAPI with Swagger",
            version: "1.0.0",
            description:
                "A simple API for retrieving information about your favourites Pokemons",
            contact: {
                name: "Elena Garrigos",
                email: "elenacpsafa@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:8080/pokemon/",
            },
        ],
    },
    apis: ["./routes/index.js"],
};

const specs = swaggerJsdoc(options);
server.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

server.listen(8080, () => {
    console.log('\nPoke Server started! :)\n');
    console.log('By Elena Garrigos\n\n');

    console.log('Go to /docs for HowToUse information');
});

export default server;