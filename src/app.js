import express from 'express';
import indexRouter from './routes/index.js';



const app = express();

app.use('/pokemon', indexRouter);

app.listen(8080, () => {

});

export default app;