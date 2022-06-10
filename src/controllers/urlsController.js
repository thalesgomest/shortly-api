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

    static getUrlById = async (req, res) => {
        const { id } = req.params;

        try {
            const url = await urlsRepository.getUrlById(id);

            if (!url) {
                return res.status(404).json({ error: 'URL not found' });
            }

            res.status(200).json({
                id: url.id,
                shortUrl: url.shortUrl,
                url: url.url,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static redirectUrl = async (req, res) => {
        const { shortUrl } = req.params;

        try {
            const url = await urlsRepository.redirectUrl(shortUrl);

            if (!url) {
                return res.status(404).json({ error: 'URL not found' });
            }

            await urlsRepository.increaseVisitCount(shortUrl);

            res.redirect(url.url);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static deleteUrl = async (req, res) => {
        const { id } = req.params;

        const { user } = res.locals;

        try {
            const url = await urlsRepository.getUrlById(id);

            if (!url) {
                return res.status(404).json({ error: 'URL not found' });
            }

            if (url.userId !== user.id) {
                return res
                    .status(401)
                    .json({ error: 'User not authorized to delete' });
            }

            await urlsRepository.deleteUrl(id);

            res.status(204).json({
                message: 'URL deleted successfully',
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}
