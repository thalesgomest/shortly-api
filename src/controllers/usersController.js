import usersRepository from '../repositories/usersRepository.js';
import dotenv from 'dotenv';
dotenv.config();

export default class usersController {
    static getUserByIdWithUrls = async (req, res) => {
        const { id } = req.params;

        try {
            const user = await usersRepository.getUserByIdWithUrlsRelationship(
                id
            );

            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }

            if (user.visitCount === null) {
                user.visitCount = 0;
                user.shortenedUrls = [];
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                error: error.message,
            });
        }
    };

    static getUsersRanking = async (req, res) => {
        try {
            const users = await usersRepository.getUsersVisitCountRanking();

            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({
                error: error.message,
            });
        }
    };
}
