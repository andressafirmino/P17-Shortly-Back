import { db } from "../database/database";
import bcrypt from "bcrypt";


export async function signUp(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    try {
        if(password !== confirmPassword) {
            return res.status(422).send({message: "As senhas são diferentes!"});
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