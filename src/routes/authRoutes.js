import { Router } from 'express';
import authController from '../controllers/authController.js';
import schemaValidationMiddleware from '../middlewares/schemaValidationMiddleware.js';
import signUpSchema from '../schemas/signUpSchema.js';
import signInSchema from '../schemas/signInSchema.js';

const authRouter = Router();

authRouter.post(
    '/signup',
    schemaValidationMiddleware(signUpSchema),
    authController.signup
);
authRouter.post(
    '/signin',
    schemaValidationMiddleware(signInSchema),
    authController.signin
);

export default authRouter;
