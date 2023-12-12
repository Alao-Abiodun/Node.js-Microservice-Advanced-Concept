import express from 'express';
import catalogRouter from './api/catalog.routes';
import 'reflect-metadata';

const app = express();
app.use(express.json());

app.use('/', catalogRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;