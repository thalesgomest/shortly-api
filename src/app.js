import express, { json } from 'express';
import cors from 'cors';
import chalk from 'chalk';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes.js';
import urlsRouter from './routes/urlsRoutes.js';
import usersRouter from './routes/usersRoutes.js';

const app = express();
app.use(cors());
app.use(json());
dotenv.config();

app.use(authRouter);
app.use(urlsRouter);
app.use(usersRouter);

app.listen(process.env.PORT, () => {
    console.log(
        chalk.bold.yellow(`Server running on port ${process.env.PORT}`)
    );
});
