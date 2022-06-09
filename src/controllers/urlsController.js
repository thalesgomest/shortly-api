import urlsRepository from '../repositories/urlsRepository.js';
import { nanoid } from 'nanoid';

export default class urlsController {
    static createUrl = async (req, res) => {
        const { url } = req.body;
        const shortUrl = nanoid(8);

        const userId = res.locals.user.id;

        try {
            const urlCreated = await urlsRepository.createUrl({
                url,
                shortUrl,
                userId,
            });

            res.status(201).json({ shortUrl });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}
