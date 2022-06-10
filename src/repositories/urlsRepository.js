import db from './../config/database.js';
import sqlstring from 'sqlstring';

export default class urlsRepository {
    static createUrl = async ({ url, shortUrl, userId }) => {
        const query = sqlstring.format(
            'INSERT INTO urls (url, "shortUrl", "userId") VALUES (?, ?, ?)',
            [url, shortUrl, userId]
        );
        const { rows } = await db.query(query);
        return rows[0];
    };

    static getUrlById = async (id) => {
        const query = sqlstring.format('SELECT * FROM urls WHERE id = ?', [id]);
        const { rows } = await db.query(query);
        return rows[0];
    };

    static redirectUrl = async (shortUrl) => {
        const query = sqlstring.format(
            'SELECT * FROM urls WHERE "shortUrl" = ?',
            [shortUrl]
        );
        const { rows } = await db.query(query);
        return rows[0];
    };

    static increaseVisitCount = async (shortUrl) => {
        const query = sqlstring.format(
            'UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = ?',
            [shortUrl]
        );
        await db.query(query);
    };
}
