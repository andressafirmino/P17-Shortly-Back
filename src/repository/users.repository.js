import { db } from "../database/database.js";

export async function createUser(email) {
    const user = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
    return user;
}