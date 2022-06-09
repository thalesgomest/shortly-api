import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import usersRepository from '../repositories/usersRepository.js';
import dotenv from 'dotenv';
dotenv.config();

export default class UsersController {
    static signup = async (req, res) => {
        const { name, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = bcrypt.hashSync(password, salt);
        try {
            const emailAlreadyExists = await usersRepository.getUserByEmail(
                email
            );

            if (emailAlreadyExists) {
                return res.status(400).json({
                    error: 'Email already exists',
                });
            }

            const user = await usersRepository.createUser({
                name,
                password: passwordHash,
                email,
            });
            res.sendStatus(201);
        } catch (error) {
            res.status(500).json({
                error: error.message,
            });
        }
    };

    static signin = async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await usersRepository.getUserByEmail(email);
            if (!user) {
                return res.status(401).json({
                    error: 'Email or password is incorrect',
                });
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({
                    error: 'Email or password is incorrect',
                });
            }

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            res.status(200).json({
                token,
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
            });
        }
    };
}
