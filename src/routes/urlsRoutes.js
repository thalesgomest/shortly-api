import { Router } from 'express';
import urlsController from '../controllers/urlsController.js';
import verifyTokenMiddleware from './../middlewares/verifyTokenMiddleware.js';
import schemaValidationMiddleware from '../middlewares/schemaValidationMiddleware.js';
import urlSchema from '../schemas/urlSchema.js';

const urlsRouter = Router();

urlsRouter.post(
    '/urls/shorten',
    verifyTokenMiddleware,
    schemaValidationMiddleware(urlSchema),
    urlsController.createUrl
);

urlsRouter.get('/urls/:id', urlsController.getUrlById);
urlsRouter.get('/urls/open/:shortUrl', urlsController.redirectUrl);

// urlsRouter.delete('/:id', verifyToken, UrlsController.deleteUrl);

export default urlsRouter;
