import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { allUser, checkEmail, checkToken, createUser, login } from "../repository/users.repository.js";

export async function signUp(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    try {
        if (password !== confirmPassword) {
            return res.status(422).send({ message: "As senhas são diferentes!" });
        }
        const user = await checkEmail(email);
        if (user.rows.length !== 0) {
            return res.status(409).send({ message: "Usuário já cadastrado!" });
        }
        const hash = bcrypt.hashSync(password, 10);
        await createUser(name, email, hash);
        res.sendStatus(201);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const user = await checkEmail(email);
        if (user.rows.length === 0) {
            return res.status(401).send({ message: "Usuário e/ou senha inválido!" });
        }
        const compare = bcrypt.compareSync(password, user.rows[0].password);
        if (!compare || (!compare && user.rows.length === 0)) {
            return res.status(401).send({ message: "Usuário e/ou senha inválido!" });
        }
        const token = uuid();
        await login(user.rows[0].name, email, token);
        res.status(200).send({ token, name: user.rows[0].name });
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export async function getUser(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try {
        const logged = await checkToken(token);
        if (logged.rows.length === 0) {
            return res.status(401).send({ message: "Usuário não autorizado!" });
        }
        const userMe = await allUser(logged.rows[0].email);
        res.status(200).send(userMe.rows[0]);
    } catch (e) {
        res.status(500).send(e.message);
    }
}
