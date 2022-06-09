import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import usersRepository from '../repositories/usersRepository.js';

const verifyTokenMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            error: 'Unauthorized',
        });
    }
    if (authorization.slice(0, 7) !== 'Bearer ') {
        return res.status(422).json({
            error: 'Unauthorized',
        });
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await usersRepository.getUserById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                error: 'Unauthorized',
            });
        }

        res.locals.user = user;
        next();
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

export default verifyTokenMiddleware;
