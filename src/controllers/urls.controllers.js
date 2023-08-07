import { nanoid } from "nanoid";
import { checkEmail, checkToken } from "../repository/users.repository.js";
import { checkUser, createShortUrl, deleteShort, deleteUrlById, getRanking, getShortUrl, getUrlById, getUrlByShort, insertShortUrl, updateCount } from "../repository/urls.repository.js";

export async function postUrls(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const { url } = req.body;
    try {
        const logged = await checkToken(token);
        if (logged.rows.length === 0) {
            return res.status(401).send({ message: "Usuário não autorizado!" });
        }
        const user = await checkEmail(logged.rows[0].email); 
        const shortUrl = nanoid(8);
        await createShortUrl(shortUrl, url);
        const short = await getShortUrl(shortUrl);
        await insertShortUrl(user.rows[0].id, short.rows[0].id);
        res.status(201).send({ id: short.rows[0].id, shortUrl });
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export async function getUrlId(req, res) {
    const { id } = req.params;
    try {
        const shortId = await getUrlById(id);
        if (shortId.rows.length === 0) {
            return res.status(404).send({ message: "URL não encontrada!" });
        }
        res.status(200).send({ id: shortId.rows[0].id, shortUrl: shortId.rows[0].shortUrl, url: shortId.rows[0].url });
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export async function getUrlOpen(req, res) {
    const { shortUrl } = req.params;
    try {
        const short = await getUrlByShort(shortUrl);
        if (short.rows.length === 0) {
            return res.status(404).send({ message: "URL não encontrada!" });
        }
        await updateCount(short.rows[0].visitCount, shortUrl)
        res.redirect(short.rows[0].url);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export async function deleteUrl(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const { id } = req.params;
    try {
        const logged = await checkToken(token);
        if (logged.rows.length === 0) {
            return res.status(401).send({ message: "Usuário não autorizado!" });
        }
        const url = await getUrlById(id);
        if (url.rows.length === 0) {
            return res.status(404).send({ message: "URL não encontrada!" });
        }
        const user = await checkEmail(logged.rows[0].email);
        const shortUrl = await checkUser(user.rows[0].id, id);
        if (shortUrl.rows.length === 0) {
            return res.status(401).send({ message: "O usuário não tem autorização para deletar essa URL!" });
        }
        await deleteShort(id);
        await deleteUrlById(id);

        res.sendStatus(204);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export async function ranking(req, res) {
    try {
        const ranking = await getRanking();
    res.status(200).send(ranking.rows);
    } catch (e) {
        res.status(500).send(e.message);
    }
}






