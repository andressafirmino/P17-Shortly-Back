import { nanoid } from "nanoid";
import { db } from "../database/database.js";

export async function postUrls(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const { url } = req.body;
    try {
        const logged = await db.query(`SELECT * FROM logged WHERE token = $1;`, [token]);
        if (logged.rows.length === 0) {
            return res.status(401).send({ message: "Usuário não autorizado!" });
        }
        const user = await db.query(`SELECT * FROM users WHERE email = $1;`, [logged.rows[0].email]);
        const shortUrl = nanoid(8);
        await db.query(`INSERT INTO urls ("shortUrl", url) VALUES ($1, $2);`, [shortUrl, url]);
        const short = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1;`, [shortUrl]);
        await db.query(`INSERT INTO shorts ("userId", "shortId") VALUES ($1, $2);`, [user.rows[0].id, short.rows[0].id]);
        res.status(201).send({ id: short.rows[0].id, shortUrl });
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export async function getUrlId(req, res) {
    const { id } = req.params;
    try {
        const shortId = await db.query(`SELECT * FROM urls WHERE id = $1;`, [id]);
        if (shortId.rows.length === 0) {
            return res.status(404).send({ message: "URL não encontrada!" });
        }
        res.status(200).send({ id: shortId.rows[0].id, shortUrl: shortId.rows[0].shortUrl, url: shortId.rows[0].url });
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export async function getUrlOpen(req, res) {
    const {shortUrl} = req.params;
    try {
        const short = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1;`, [shortUrl]);
        if(short.rows.length === 0) {
            return res.status(404).send({message: "URL não encontrada!"});
        }
        res.redirect(`/urls/open/${short.rows[0].url}`);
    } catch (e) {
        res.status(500).send(e.message);
    }
}




