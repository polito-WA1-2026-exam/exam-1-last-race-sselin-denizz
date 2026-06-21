import sqlite3 from 'sqlite3';
import crypto from 'crypto';

const db = new sqlite3.Database('./db/database.sqlite');

const users = [
    {
        name: 'Selin Deniz',
        email: 'selin.deniz@polito.it',
        password: 'iLoveWebApp1'
    },
    {
        name: 'Fulvio Corno',
        email: 'fulvio.corno@polito.it',
        password: 'iLoveWebApp2'
    },
    {
        name: 'Francesca Russo',
        email: 'francesca.russo@polito.it',
        password: 'iLoveWebApp3'
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