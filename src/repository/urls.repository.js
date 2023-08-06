import { db } from "../database/database.js";

export function createShortUrl(shortUrl, url) {
    const res = db.query(`INSERT INTO urls ("shortUrl", url) VALUES ($1, $2);`, [shortUrl, url]);
    return res;
}

export function getShortUrl(shortUrl) {
    const res = db.query(`SELECT * FROM urls WHERE "shortUrl" = $1;`, [shortUrl]);
    return res;
}

export function insertShortUrl(user, short) {
    const res = db.query(`INSERT INTO shorts ("userId", "shortId") VALUES ($1, $2);`, [user, short]);
    return res;
}

export function getUrlById(id) {
    const res = db.query(`SELECT * FROM urls WHERE id = $1;`, [id]);
    return res;
}

export function getUrlByShort(shortUrl) {
    const res = db.query(`SELECT * FROM urls WHERE "shortUrl" = $1;`, [shortUrl]);
    return res;
}

export function updateCount (visitCount, shortUrl) {
    const res = db.query(`UPDATE urls SET "visitCount"= $1 WHERE "shortUrl" = $2;`, [visitCount + 1, shortUrl]);
    return res;
}

export function checkUser(user, id) {
    const res = db.query(`SELECT * FROM shorts WHERE "userId" = $1 AND "shortId" = $2;`, [user, id]);
    return res;
}

export function deleteShort(id) {
    const res = db.query(`DELETE FROM shorts WHERE "shortId" = $1;`, [id]);
    return res;
}

export function deleteUrlById(id) {
    const res = db.query(`DELETE FROM urls WHERE id = $1;`, [id]);
    return res;
}

export function getRanking() {
    const res = db.query(`
    SELECT users.id, users.name,
    CAST(COUNT(shorts."userId")AS INTEGER) AS "linksCount",
    CAST(SUM(urls."visitCount")AS INTEGER) AS "visitCount"
    FROM users
    JOIN shorts ON users.id = shorts."userId"
    JOIN urls ON urls.id = shorts."shortId"
    WHERE users.id = shorts."userId"
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10
    ;`);
    return res;
}