import { db } from "../database/database.js";

export async function postUrls (req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    console.log(token);
    try {
        const logged = await db.query(`SELECT * FROM logged WHERE token = $1;`, [token]);
        if(logged.rows.length === 0) {
            return res.status(401).send({message: "Usuário não autorizado!"});
        }
        res.sendStatus(201);
    } catch (e) {
        res.status(500).send(e.message);
    }
}


