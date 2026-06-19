import sqlite3 from 'sqlite3';
import crypto from 'crypto';

const db = new sqlite3.Database('./db/database.sqlite');

const users = [
    {
        name: 'Selin Deniz',
        email: 'selin.deniz@polito.it',
        password: 'password'
    },
    {
        name: 'Adelina Popescu',
        email: 'adelina.popescu@polito.it',
        password: 'password'
    },
    {
        name: 'Xavier Dupont',
        email: 'xavier.dupont@polito.it',
        password: 'password'
    }
];

db.serialize(() => {

    const stmt = db.prepare(`
        INSERT INTO users(email, name, hash, salt)
        VALUES (?, ?, ?, ?)
    `);

    for (const user of users) {

        const salt = crypto.randomBytes(16).toString('hex');

        const hash = crypto
            .scryptSync(user.password, salt, 32)
            .toString('hex');

        stmt.run(
            user.email,
            user.name,
            hash,
            salt
        );
    }

    stmt.finalize();
});

db.close();

console.log('Users inserted successfully.');