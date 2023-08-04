import { db } from "../database/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    try {
        if (password !== confirmPassword) {
            return res.status(422).send({ message: "As senhas são diferentes!" });
        }
        const user = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
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