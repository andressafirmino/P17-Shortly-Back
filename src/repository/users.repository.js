import { db } from "../database/database.js";

export function checkEmail(email) {
    const res = db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
    return res;
}

export function createUser(name, email, hash) {
    const res = db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, hash]);
    return res;
}

export function login(name, email, token) {
    const res = db.query(`INSERT INTO logged (name, email, token) VALUES ($1, $2, $3);`, [name, email, token])
    return res;
}

export function checkToken(token) {
    const res = db.query(`SELECT * FROM logged WHERE token = $1;`, [token]);
    return res;
}

export function allUser(email) {
    const res = db.query(`SELECT users.id, users.name,
    CAST(SUM(urls."visitCount")AS INTEGER) AS "visitCount",
    json_agg(
        json_build_object('id', urls.id, 'shortUrl', urls."shortUrl", 'url', urls.url, 'visitCount', urls."visitCount")
    ) AS "shortenedUrls"
    FROM users
    JOIN shorts ON shorts."userId" = users.id
    JOIN urls ON urls.id = shorts."shortId"
    WHERE users.email = $1
    GROUP BY users.id, users.name
    ;`, [email]);
    return res;
}