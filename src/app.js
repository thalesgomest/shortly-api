import express, { json } from 'express';
import cors from 'cors';
import chalk from 'chalk';
import dotenv from 'dotenv';
import db from './config/database.js';

const app = express();
app.use(cors());
app.use(json());
dotenv.config();

app.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const query = await db.query(
            `INSERT INTO products (name) VALUES ('${name}')`
        );
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(500);
    }
});

app.listen(process.env.PORT, () => {
    console.log(
        chalk.bold.yellow(`Server running on port ${process.env.PORT}`)
    );
});
