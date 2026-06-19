import fs from 'fs';
import sqlite3 from 'sqlite3';

const DB_PATH = './db/database.sqlite';

const schema = fs.readFileSync('./db/schema.sql', 'utf8');
const seed = fs.readFileSync('./db/seed.sql', 'utf8');

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }

    console.log('Connected to SQLite database.');
});

db.serialize(() => {

    db.exec(schema, (err) => {
        if (err) {
            console.error('Schema creation failed:', err.message);
            return;
        }

        console.log('Schema created successfully.');

        db.exec(seed, (err) => {
            if (err) {
                console.error('Seed execution failed:', err.message);
                return;
            }

            console.log('Seed data inserted successfully.');
        });
    });

});

db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
        return;
    }

    console.log('Database connection closed.');
});