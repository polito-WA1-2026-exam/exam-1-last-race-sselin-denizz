import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./db/database.sqlite');

export function getUserByEmail(email) {
    return new Promise((resolve, reject) => {

        const sql = `
            SELECT *
            FROM users
            WHERE email = ?
        `;

        db.get(sql, [email], (err, row) => {
            if (err)
                reject(err);
            else
                resolve(row);
        });
    });
}

export function getUserById(id) {
    return new Promise((resolve, reject) => {

        const sql = `
            SELECT id, email, name
            FROM users
            WHERE id = ?
        `;

        db.get(sql, [id], (err, row) => {
            if (err)
                reject(err);
            else
                resolve(row);
        });
    });
}