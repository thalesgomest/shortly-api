import { Router } from 'express';
import usersController from '../controllers/usersController.js';
import verifyTokenMiddleware from '../middlewares/verifyTokenMiddleware.js';

const usersRouter = Router();

usersRouter.get(
    '/users/:id',
    verifyTokenMiddleware,
    usersController.getUserByIdWithUrls
);
usersRouter.get('/ranking', usersController.getUsersRanking);

export default usersRouter;
