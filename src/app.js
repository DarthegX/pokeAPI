import express from 'express';
import indexRouter from './routes/index.js';


/**
 * Instance of Express application
 */
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
//this.server.use(cookieParser());
server.use('/pokemon', indexRouter);
server.listen(777, () => {
    console.log('Poke Server started! :)\n');
    console.log('By Elena Garrigos');
});

export default server;