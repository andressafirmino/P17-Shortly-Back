import { db } from "../database/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { createUser } from "../repository/users.repository.js";

export async function signUp(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    try {
        if (password !== confirmPassword) {
            return res.status(422).send({ message: "As senhas são diferentes!" });
        }
        const user = await createUser(name);
        if (user.rows.length !== 0) {
            return res.status(409).send({ message: "Usuário já cadastrado!" });
        }
        const hash = bcrypt.hashSync(password, 10);
        await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, hash]);
        res.sendStatus(201);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const user = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        if (user.rows.length === 0) {
            return res.status(401).send({ message: "Usuário e/ou senha inválido!" });
        }
        const compare = bcrypt.compareSync(password, user.rows[0].password);
        if (!compare || (!compare && user.rows.length === 0)) {
            return res.status(401).send({ message: "Usuário e/ou senha inválido!" });
        }
        const token = uuid();
        await db.query(`INSERT INTO logged (name, email, token) VALUES ($1, $2, $3);`, [user.rows[0].name, email, token]);
        res.status(200).send({ token });
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export async function getUser(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try {
        const logged = await db.query(`SELECT * FROM logged WHERE token = $1;`, [token]);
        if (logged.rows.length === 0) {
            return res.status(401).send({ message: "Usuário não autorizado!" });
        }

        const userMe = await db.query(`SELECT users.id, users.name,
        CAST(SUM(urls."visitCount")AS INTEGER) AS "visitCount",
        json_agg(
            json_build_object('id', urls.id, 'shortUrl', urls."shortUrl", 'url', urls.url, 'visitCount', urls."visitCount")
        ) AS "shortenedUrls"
        FROM users
        JOIN shorts ON shorts."userId" = users.id
        JOIN urls ON urls.id = shorts."shortId"
        WHERE users.email = $1
        GROUP BY users.id, users.name
    ;`, [logged.rows[0].email]);
        res.status(200).send(userMe.rows[0]);
    } catch (e) {
        res.status(500).send(e.message);
    }
}
